
let admin = {}


admin.adminRequired = function* (next) {
  /*
   * Throw a 403 error if user isn't admin
   * this.state.user must be set
   * you must call user.authenticate middleware first
   */
  this.assert(this.state.user.admin, 403,
              JSON.stringify({error: 'Access denied'})
  )

  yield next
}



admin.usersNumber = function* (next) {
  /*
   * Return number of users is db
   */

  let users = this.db.get('users')
  let n_users = yield users.count()

  this.status = 200
  return this.body = {
    n_users: n_users
  }
}

export default admin
