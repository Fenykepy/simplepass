import path from 'path'

import {
  readFileThunk,
  writeFileThunk,
} from '../helpers'

let ejson = {}


// retrieve file content as json
ejson.retrieve = function* (next) {
  if ('GET' != this.method) return yield next
    let ejson = yield readFileThunk(path.join(this.db_path, 'fred.ejson'))
    this.body = {ejson: ejson}
}


// update file from json
ejson.update = function* (next) {
  if ('PUT' != this.method) return yield next
  // if we got ejson, save it in file
  if (this.request.body.ejson && 
      typeof(this.request.body.ejson) == 'string') {
    yield writeFileThunk(path.join(this.db_path, 'fred.ejson'), 
        this.request.body.ejson)
    return this.body = {ejson: this.request.body.ejson}
  }
  // if no ejson or if it's not a string
  this.status = 400
  this.body = {error: "ejson must be provided as a string."}
}


export default ejson
