import path from 'path'

/*
 * Absolute path to the directory
 * where ejson files are stored,
 * it must have write access for node proccess user
 */
let db_path = path.join(__dirname, 'db/')

/*
 * whether or not express must serve static files
 * true: statics files are served by a proxy (like nginx)
 * false: they are served by express
 */
let statics_proxy = false


/*
 * port on which koa app will listen at.
 * it can be a port number (default is 3000)
 * or a unix socket filepath (like '/tmp/my_unix_socket.sock')
 */
let port = 3000


export { statics_proxy, port, db_path}
