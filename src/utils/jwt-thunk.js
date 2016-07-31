import jwt from 'jsonwebtoken'

import settings from '../../config'

let jwtThunk = {}

jwtThunk.sign = function (payload) {
  /*
   * Wrapper arround jwt.sign that returns a promise
   * it also sets secret and options from config file
   */
  return new Promise((resolve, reject) => {
    jwt.sign(payload, settings.SECRET_KEY, settings.JWT_OPTIONS, 
             (error, token) => {
      if (error) return reject(error)
      resolve(token)
    })
  })
}

jwtThunk.verify = function (token) {
  /*
   * A wrapper arround jwt.verify that returns a promise
   */
  return new Promise((resolve, reject) => {
    jwt.verify(token, settings.SECRET_KEY, (error, decoded) => {
      if (error) return reject(error)
      resolve(decoded)
    })
  })
}

jwtThunk.needRefresh = function (payload) {
  /*
   * Return true if token is at more than half than
   * it's life
   */
  console.log(payload)
}

export default jwtThunk
