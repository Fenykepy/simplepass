import crypto from 'crypto'
import { 
  create_user_scheme,
  login_user_scheme,
} from './models'
import validate_object from '../utils/validator'
import bcrypt from '../utils/bcrypt-thunk'
import jwt from '../utils/jwt-thunk'
import timespan from '../utils/timespan'
import settings from '../../config'

let user = {}

function setAuthCookie(token) {
}

user.authenticate = function* (next) {
  /*
   * Login user if token is present in cookies,
   * Set new token if cookie expiration date is soon
   * set context.user
   */

  let token = this.cookies.get('auth_token')
  
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
      // set auth cookie
      this.cookies.set('auth_token', token, {
        expires: timespan(settings.JWT_OPTIONS.expiresIn)
      })
    }
  }
  catch (error) {
    this.throw('Authentication credentials were not valid.', 401)
  }

  yield next
}

user.authenticationRequired = function* (next) {
  /*
   * Throw a 401 error if user isn't loogued in
   * this.state.user must be set
   * you must call authenticate middleware first
   */
  this.assert(this.state.user, 401, 'Authentication credentials were not provided.')

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
      'Loggued in users must logout before logging in'
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
  
  console.log('get users collection')
  // get users collection
  let users = this.db.get('users')
  console.log('fetch user...')
  // get user to login from db
  let user = yield users.findOne(
    {username: this.state.validated_data.username})
  console.log('user', user)

  console.log('compare passwords...')
  // compare passwords
  let password_check = yield bcrypt.compare(
    this.state.validated_data.password,
    user.password)
  if (! password_check) {
    this.status = 400
    return this.body = { non_field_errors:
      'Wrong password or username.'
    }

  }
  console.log('set cookie')
  // set authentication cookie

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
      'Loggued in users can\'t create new accounts'
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
      errors.email = 'A user with that email already exists.'
    }
    if (used_username) {
      errors.username = 'A user with that username already exists.'
    }
    return this.body = errors
  }

  // get hash from password
  let hash = yield bcrypt.hash(this.state.validated_data.password, 4)

  // get filename for ejson (sha1 of username + email)
  let s = this.state.validated_data.username + this.state.validated_data.email
  let ejson = crypto.createHash('sha1').update(s).digest("hex") + '.ejson'

  // create new user object
  let user = {
    username: this.state.validated_data.username,
    email: this.state.validated_data.email,
    email_validated: false,
    password: hash,
    ejson: ejson
  }

  // insert new user in db
  this.state.user = yield users.insert(user)
  
  // we don't store password in token nor in context
  delete this.state.user.password

  // TODO send email validation mail
  
  // set user jwt
  let token = yield jwt.sign(this.state.user)

  // set jwt as cookie
  this.cookies.set('auth_token', token, {
    expires: timespan(settings.JWT_OPTIONS.expiresIn)
  })

  // send response
  this.status = 201
  this.body = {
    username: this.state.user.username,
    email: this.state.user.email,
    ejson: ""
  }
}

export default user
