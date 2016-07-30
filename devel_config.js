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
 * Mongo database connection url
 */
settings.DB = "mongodb://localhost/simplepass"


export default settings
