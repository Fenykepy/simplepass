import fs from 'fs'

export function readFileThunk(src) {
  return new Promise((resolve, reject) => {
    fs.readFile(src, 'utf8', (error, data) => {
      if (error) return reject(error)
      resolve(data)
    })
  })
}

export function * responseTime(next) {
  let start = new Date;
  yield next
  let ms = new Date - start
  this.set('X-Response-Time', ms + 'ms')
}
