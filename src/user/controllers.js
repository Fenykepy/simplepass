
let user = {}

// create a new user
user.create = function* (next) {
  // we only accept POST method
  if ('POST' != this.method) return yield next
  this.errors = []
  // loggued in users can't create accounts
  if (this.user) {
    this.status = 400
    this.errors.push({'non_field_errors': [
      'Loggued in users can\'t create new accounts'
    ]})
    return this.body = this.errors
  }
    
    this.status = 400
    this.body = 
}

export default user
