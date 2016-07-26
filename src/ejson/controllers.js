import path from 'path'

import {
 readFileThunk
} from '../helpers'

let ejson = {}

ejson.retrieve = function* (next) {
  if ('GET' != this.method) return yield next
    this.body = yield readFileThunk(path.join(__dirname , '../../db/fred.ejson'))
    this.status = 200
    this.type = 'text/plain'
}

ejson.update = function* (next) {
  if ('PUT' != this.method) return yield next
}

ejson.remove = function* (next) {
  if ('DELETE' != this.method) return yield next
}

export default ejson
