import fs from 'fs'
import path from 'path'


let ejson = {}

ejson.retrieve = function* (next) {
  if ('GET' != this.method) return yield next
    fs.readFile(path.join(__dirname , '../../db/fred.ejson'), 'utf8',
        function(err, content) {
      console.log(content)
      this.body = content
      console.log(this.body, 'body')
      this.status = 200
      this.type = 'text/plain'
    });
}

ejson.update = function* (next) {
  if ('PUT' != this.method) return yield next
}

ejson.remove = function* (next) {
  if ('DELETE' != this.method) return yield next
}

export default ejson
