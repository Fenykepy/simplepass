import crypto from 'crypto'
import { create_user_scheme } from './models'
import validate_object from '../utils/validator'
import hashThunk from '../utils/hash-thunk'


let user = {}


// create a new user
user.create = function* (next) {
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
  let hash = yield hashThunk(this.validated_data.password, 4)

  // get filename for ejson (sha1 of username + email)
  let s = this.validated_data.username + this.validated_data.email
  let ejson = crypto.createHash('sha1').update(s).digest("hex") + '.ejson'

  // create new user object
  let user = {
    username: this.validated_data.username,
    email: this.validated_data.email,
    password: hash,
    ejson: ejson
  }

  // insert new user in db
  yield users.insert(user)

  
  // TODO send email validation mail
  
  // get user jwt

  // set jwt as cookie

  // send response
  this.status = 201
  this.body = {
    username: this.validated_data.username,
    email: this.validated_data.email
  }
}

export default user
