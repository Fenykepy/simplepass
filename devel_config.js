import path from 'path'

let settings = {}
/*
 * Absolute path to the directory
 * where ejson files are stored,
 * it must have write access for node proccess user
 */
settings.EJSON_DIR = path.join(__dirname, 'db/')

/*
 * whether or not express must serve static files
 * true: statics files are served by a proxy (like nginx)
 * false: they are served by express
 */
settings.STATICS_PROXY = false


/*
 * port on which koa app will listen at.
 * it can be a port number (default is 3000)
 * or a unix socket filepath (like '/tmp/my_unix_socket.sock')
 */
settings.PORT = 3000


/*
 * Mongo database parameters object
 * read koa-mongo docs for more info
 * https://www.npmjs.com/package/koa-mongo
 * uri is required
 * options can be any MongoClient Option
 */
settings.DB = {
  uri: "mongodb://localhost",
  options: {}
}


export default settings
