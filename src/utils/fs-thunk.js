import fs from 'fs'

let fsThunk = {}

fsThunk.readFile = function (src) {
  /*
   * Wrapper that returns a promise
   * which resolve with a file content
   */
  return new Promise((resolve, reject) => {
    fs.readFile(src, 'utf8', (error, data) => {
      if (error) return reject(error)
      resolve(data)
    })
  })
}

fsThunk.writeFile = function (src, data) {
  /*
   * Wrapper that returns a promise
   * which resolve when file has been written
   * to disk
   */
  return new Promise((resolve, reject) => {
    fs.writeFile(src, data, 'utf8', error => {
      if (error) return reject(error)
      resolve()
    })
  })
}

export default fsThunk
