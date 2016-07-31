import crypto from 'crypto'
import { create_user_scheme } from './models'
import validate_object from '../utils/validator'
import bcrypt from '../utils/bcrypt-thunk'
import jwt from '../utils/jwt-thunk'
import timespan from '../utils/timespan'
import settings from '../../config'

let user = {}



user.authenticate = function* (next) {
  /*
   * Login user if token is present in cookies,
   * otherwise return 401
   * Set new token if cookie expiration date is soon
   */

  let token = this.cookies.get('auth_token')
  
  // if we have no token, retun 401
  if (! token) {
    this.status = 401
    return this.body = {
      detail: "Authentication credentials were not provided."
    }
  }
  try {
    // verify token and refresh it if necessairy
    this.user = yield jwt.verify(token)
    jwt.needRefresh(this.user)
  }
  catch (error) {
    this.status = 401
    console.log(error)
    return this.body = {
      detail: "Invalid token"
    }
  }

  yield next
}



user.login = function* () {
  /*
   * Login user with given credentials
   *
   */
}



// create a new user
user.create = function* () {
  // we only accept POST method
  if ('POST' != this.method) return yield next
    
  // loggued in users can't create accounts
  if (this.user) {
    this.status = 400
    return this.body = { non_field_errors:
      'Loggued in users can\'t create new accounts'
    }
  }
  // check form for errors
  try {
      this.validated_data = validate_object(
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
    {email: this.validated_data.email}
  )
  let used_username = yield users.count(
    {username: this.validated_data.username}
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
  let hash = yield bcrypt.hash(this.validated_data.password, 4)

  // get filename for ejson (sha1 of username + email)
  let s = this.validated_data.username + this.validated_data.email
  let ejson = crypto.createHash('sha1').update(s).digest("hex") + '.ejson'

  // create new user object
  let user = {
    username: this.validated_data.username,
    email: this.validated_data.email,
    email_validated: false,
    password: hash,
    ejson: ejson
  }

  // insert new user in db
  this.user = yield users.insert(user)
  
  // we don't store password in token nor in context
  delete this.user.password

  // TODO send email validation mail
  
  // set user jwt
  let token = yield jwt.sign(this.user)

  // set jwt as cookie
  this.cookies.set('auth_token', token, {
    expires: timespan(settings.JWT_OPTIONS.expiresIn)
  })

  // send response
  this.status = 201
  this.body = {
    username: this.user.username,
    email: this.user.email,
    ejson: ""
  }
}

export default user
