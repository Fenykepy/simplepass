import path from 'path'

import fsThunk from '../utils/fs-thunk'

let ejson = {}


// retrieve file content as json
ejson.retrieve = function* (next) {
  if ('GET' != this.method) return yield next
  try {
    let ejson = yield fsThunk.readFile(path.join(
      this.EJSON_DIR, this.state.user.ejson_path))
  }
  catch (e) {
    this.throw({error: 'An error occured reading ejson file.'}, 500)
  }
  this.body = {ejson: ejson}
}


// update file from json
ejson.update = function* (next) {
  if ('PUT' != this.method) return yield next
  if (! this.request.body.ejson && 
      ! typeof(this.request.body.ejson) == 'string') {
        // if no ejson or if it's not a string
        this.throw({error: 'Ejson must be provided as a string.'}, 400)
  }
  // if we got ejson, save it in file
  try {
    yield fsThunk.writeFile(path.join(this.EJSON_DIR, this.state.user.ejson_path), 
        this.request.body.ejson)
  }
  catch (e) {
    this.throw({error: 'An error occured writing ejson file.'}, 500)
  }
  return this.body = {ejson: this.request.body.ejson}
}


export default ejson
