import bcrypt from 'bcrypt'

export default function hashThunk(password, saltRounds) {
  /*
   * Wrapper arround bcrypt.hash that returns a promise
   * which resolve with hashed password
   */
  console.log('start hash')
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (error, hash) => {
      if (error) return reject(error)
      resolve(hash)
    })
  })
}
