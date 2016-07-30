import { create_user_scheme } from './models'
import validate_object from '../utils/validator'

let user = {}




// create a new user
user.create = function* (next) {
  // we only accept POST method
  if ('POST' != this.method) return yield next
    
  // loggued in users can't create accounts
  if (this.user) {
    this.status = 400
    return this.body = { non_field_errors: [
      'Loggued in users can\'t create new accounts'
    ]}
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
  // check if email is free
  

  // insert new user in db
  // create a default ejson for user
  // log new user in
  // get user jwt
  this.status = 201
  this.body = {
    username: this.validated_data.username,
    email: this.validated_data.email
  }
}

export default user
