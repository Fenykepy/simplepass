import crypto from 'crypto'
import path from 'path'
import { 
  create_user_scheme,
  login_user_scheme,
} from './models'

import validate_object from '../utils/validator'
import bcrypt from '../utils/bcrypt-thunk'
import jwt from '../utils/jwt-thunk'
import fsThunk from '../utils/fs-thunk'
import timespan from '../utils/timespan'
import settings from '../../config'

let user = {}

const AUTH_COOKIE = 'auth_token'
const AUTH_FLAG_COOKIE = 'authenticated'


function setAuthCookies(context, token) {
  let expires = new Date(timespan(settings.JWT_OPTIONS.expiresIn) * 1000)

  // set JWT cookie
  context.cookies.set(AUTH_COOKIE, token, {expires: expires})
  
  // set authenticated flag cookie to true :
  // as client js has no access to jwt cookie, it has no way
  // to know if user is possibly authenticated.
  // this cookie is not http only and indicates if token is present
  context.cookies.set(AUTH_FLAG_COOKIE, 'true', {
    expires: expires,
    httpOnly: false,
  })
}

function resetAuthCookies(context) {
  let expires = new Date()

  // reset JWT cookie
  context.cookies.set(AUTH_COOKIE, '', {expires: expires})
  // reset authenticated flag cookie
  context.cookies.set(AUTH_FLAG_COOKIE, '', {expires: expires})
}



function getJWTUserData(full_user) {
  // public data about a user (stored in jwt)
  let user = Object.assign({}, full_user)
  // we don't store password hash in jwt
  delete user.password

  return user
}


user.authenticate = function* (next) {
  /*
   * Login user if token is present in cookies,
   * Set new token if cookie expiration date is soon
   * set context.user
   */

  let token = this.cookies.get(AUTH_COOKIE)
  
  // if we have no token, we pass next
  if (! token) {
    return yield next
  }

  // if we have a token, we verify it
  try {
    // verify token and refresh it if necessairy
    this.state.user = yield jwt.verify(token)
    if (jwt.needRefresh(this.state.user)) {
      // compute new token
      let token = yield jwt.sign(this.state.user)
      // set auth cookies
      setAuthCookies(this, token)
    }
  }
  // if token is invalid, we reset auth cookie and user
  catch (e) {
    resetAuthCookies(this)
    this.state.user = null
  }

  yield next
}



user.authenticationRequired = function* (next) {
  /*
   * Throw a 401 error if user isn't loogued in
   * this.state.user must be set
   * you must call authenticate middleware first
   */
  this.assert(this.state.user, 401, JSON.stringify({error: 'Authentication credentials were not provided.'}))

  yield next
}



user.login = function* (next) {
  /*
   * Login user with given credentials
   *
   */

  // we only accept POST method
  if ('POST' != this.method) return yield next

  // loggued in users must logout first
  if (this.state.user) {
    this.status = 400
    return this.body = { non_field_errors:
      ['Loggued in users must logout before logging in']
    }
  }

  // check form from errors
  try {
    this.state.validated_data = validate_object(
      this.request.body, login_user_scheme)
  }
  catch (errors) {
    this.status = 400
    return this.body = errors
  }
  
  // get users collection
  let users = this.db.get('users')
  // get user to login from db
  let full_user = yield users.findOne(
    {username: this.state.validated_data.username})

  if (! full_user) {
    this.status = 400
    return this.body = { non_field_errors:
      ['Wrong password or username.']
    }
  }
  // compare passwords
  let password_check = yield bcrypt.compare(
    this.state.validated_data.password,
    full_user.password)
  if (! password_check) {
    this.status = 400
    return this.body = { non_field_errors:
      ['Wrong password or username.']
    }
  }

  // set user
  this.state.user = getJWTUserData(full_user)
  
  // compute new token
  let token = yield jwt.sign(this.state.user)

  // set auth cookies
  setAuthCookies(this, token)

  // send response
  this.status = 200
  this.body = this.state.user
}



user.logout = function* (next) {
  /*
   * We need an API endpoint to logout
   * because we can't simply delete cookie
   * client side as it is http only
   *
   * must be call after authenticationRequired middleware
   */

  // reset auth cookie
  resetAuthCookies(this)
  // reset context user
  this.state.user = null
  // send response
  this.status = 200
  this.body = {message: 'Successfully loggued out'}

}



user.retrieve = function* (next) {
  /*
   * Return current user object
   * Necessairy as content of jwt can't be
   * read client side because cookie is http only
   *
   * must be call after authenticationRequired middleware
   */
  
  // send response with current user
  this.status = 200
  this.body = this.state.user
}



user.create = function* (next) {
  /*
   * Create a new user from posted datas
   */

  // we only accept POST method
  if ('POST' != this.method) return yield next
    
  // loggued in users can't create accounts
  if (this.state.user) {
    this.status = 400
    return this.body = { non_field_errors:
      ['Loggued in users can\'t create new accounts']
    }
  }
  // check form for errors
  try {
    this.state.validated_data = validate_object(
      this.request.body, create_user_scheme)
  }
  catch (errors) {
    this.status = 400
    return this.body = errors
  }

  // get users collection
  let users = this.db.get('users')
  
  // check if email and username are free
  let used_mail = yield users.count(
    {email: this.state.validated_data.email}
  )
  let used_username = yield users.count(
    {username: this.state.validated_data.username}
  )

  // if mail or username are used, return 400 with error message
  if (used_mail || used_username) {
    this.status = 400
    let errors = {}
    if (used_mail) {
      errors.email = ['A user with that email already exists.']
    }
    if (used_username) {
      errors.username = ['A user with that username already exists.']
    }
    return this.body = errors
  }

  // get hash from password
  let hash = yield bcrypt.hash(this.state.validated_data.password, 4)

  // get filename for ejson (sha1 of username + email)
  let s = this.state.validated_data.username + this.state.validated_data.email
  let ejson_path = crypto.createHash('sha1').update(s).digest("hex") + '.ejson'

  // get users number
  let n_users = yield users.count()

  // create new user object
  let user = {
    username: this.state.validated_data.username,
    email: this.state.validated_data.email,
    email_validated: false,
    password: hash,
    ejson_path: ejson_path,
    admin: false
  }
  
  // first user in db is automatically admin
  if (n_users == 0) user.admin = true

  // insert new user in db
  let new_user = yield users.insert(user)
  
  // we don't store password in token nor in context
  this.state.user = getJWTUserData(new_user)

  try {
    // we write file with empty string
    yield fsThunk.writeFile(path.join(this.EJSON_DIR, this.state.user.ejson_path), '')
  }
  catch (e) {
    this.throw({error: 'An error occured writing ejson file.'}, 500)
  }

  // TODO send email validation mail
  
  // set user jwt
  let token = yield jwt.sign(this.state.user)

  // set authentication cookiescookie
  setAuthCookies(this, token)

  // send response
  this.status = 201
  this.body = this.state.user
}

export default user
