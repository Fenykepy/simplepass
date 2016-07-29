import { MongoClient } from 'mongodb'

export default function mongo(uri, options={}) {
  /*
   * uri : mongo db connection uri
   * see MongoClient documentation for more information :
   * https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
   *
   * db will be accessible in context as "db" property
   */

  if (typeof(uri) != "string") {
    throw new TypeError('You must provide uri as string')
  }

  let db

  return function* mongoDb(next) {
    if (! db) {
      try {
        db = yield MongoClient.connect(uri, options)
      }
      catch(error) {
        db = undefined

        this.throw('Database connection error', 500);

        return
      }
    }

      this.db = db
      yield next
  }

}

