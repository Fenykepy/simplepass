import objectValidator from '../utils/validator'

let user = {}


user_validation_scheme = {
  username: {
    type: 'string',
    max_length: 254
  },
  email: {
    type: 'email',
  },
  // TODO add regex to ensure there is at least one number
  password: {
    type: 'string',
    max_length: 800,
    min_length: 8,
  }
}


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
  // check if email is free
  this.status = 400
  errors.

  // insert new user in db
  // create a default ejson for user
  // log new user in
  // get user jwt
  // send ejson file
  this.status = 201
}

export default user
