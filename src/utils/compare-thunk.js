import bcrypt from 'bcrypt'

export default function compareThunk(password, hash) {
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
