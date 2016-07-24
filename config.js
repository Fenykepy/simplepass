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


export { statics_proxy, port }
