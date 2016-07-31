import bcrypt from 'bcrypt'

let bcryptThunk = {}

bcryptThunk.hash = function (password, saltRounds) {
  /*
   * Wrapper arround bcrypt.hash that returns a promise
   * which resolve with hashed password
   */
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (error, hash) => {
      if (error) return reject(error)
      resolve(hash)
    })
  })
}

bcryptThunk.compare = function (password, hash) {
  /*
   * Wrapper arround bcrypt.compare that returns a promise
   * which resover with boolean (if password and hash match
   * or not
   */
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (error, result) => {
      if (error) return reject(error)
      resolve(result)
    })
  })
}

export default bcryptThunk

