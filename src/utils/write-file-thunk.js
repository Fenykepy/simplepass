import fs from 'fs'

export default function writeFileThunk(src, data) {
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
