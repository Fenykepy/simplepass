import path from 'path'

import fsThunk from '../utils/fs-thunk'

let ejson = {}


// retrieve file content as json
ejson.retrieve = function* (next) {
  if ('GET' != this.method) return yield next
    this.user = {ejson: 'fred.ejson'}
    let ejson = yield fsThunk.readFile(path.join(
      this.EJSON_DIR, this.user.ejson))
    this.body = {ejson: ejson}
}


// update file from json
ejson.update = function* (next) {
  if ('PUT' != this.method) return yield next
  // if we got ejson, save it in file
  if (this.request.body.ejson && 
      typeof(this.request.body.ejson) == 'string') {
    yield fsThunk.writeFile(path.join(this.EJSON_DIR, this.user.ejson), 
        this.request.body.ejson)
    return this.body = {ejson: this.request.body.ejson}
  }
  // if no ejson or if it's not a string
  this.status = 400
  this.body = {error: "ejson must be provided as a string."}
}


export default ejson
