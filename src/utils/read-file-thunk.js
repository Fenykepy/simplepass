import fs from 'fs'

export default function readFileThunk(src) {
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
