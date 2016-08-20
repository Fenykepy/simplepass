import path from 'path'

import koa from 'koa'
import route from 'koa-route'
import serve from 'koa-static'
import compress from 'koa-compress'
import bodyParser from 'koa-bodyparser'
import json from 'koa-json'

import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'
import webpack from 'webpack'
import config from '../webpack.config'

import home from './home/controllers' 
import ejson from './ejson/controllers'
import user from './user/controllers'
import admin from './admin/controllers'
import responseTime from './utils/response-time'

import settings from '../config'
import monk from 'monk'

import fs from 'fs'


var app = koa()

// set settings.DB_PATH as context
app.context.EJSON_DIR = settings.EJSON_DIR

// connect to mongodb via monk
monk(settings.DB)
  .then(db =>
    // add db to context
    app.context.db = db
  )
  .catch(error => {
    throw 'Database connection error'
  })


// we are in development mode
if (process.env.NODE_ENV != 'production') {
  // use hot reloading in development
  var compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}


if (! settings.STATICS_PROXY) {
  // Serve static files for development
  app.use(serve(path.join(__dirname, 'public')))
}

// set x-response-time header
app.use(responseTime)

// parse body
app.use(bodyParser())

// automatically parse body objects to json
app.use(json({pretty: false}))

// home
app.use(route.get('/', home))
app.use(route.get('/login/', home))
app.use(route.get('/signup/', home))
app.use(route.get('/passwords/', home))
app.use(route.get('/notes/', home))
app.use(route.get('/bank-cards/', home))


// REST API

// we try to authenticate user
app.use(user.authenticate)

// public user api endpoints
app.use(route.post('/api/user/', user.create))
app.use(route.post('/api/user/login/', user.login))

// from here all users must be authenticated
app.use(user.authenticationRequired)

// private user api endpoints
app.use(route.get('/api/user/logout/', user.logout))
app.use(route.get('/api/user/', user.retrieve))
// insert profile management middlewares here.

// ejson api endpoint
app.use(route.get('/api/ejson/', ejson.retrieve))
app.use(route.put('/api/ejson/', ejson.update))


// from here all users must be admin
app.use(admin.adminRequired)

app.use(route.get('/api/admin/users/number/', admin.usersNumber))


// compress
app.use(compress())


function resetSocket(sock) {
  /* 
   * We first delete socket if file exists,
   * as it's not automatically done at shutdown,
   * else it throws a error
   */
  try {
    fs.accessSync(sock, fs.F_OK, (error) => {throw error})
    console.log("Socket file exists, delete it.")
    fs.unlinkSync(sock)
  } catch (e) {
    console.log('failed to reset socket.')
    throw e
    return
  }
}

if (typeof settings.PORT == "string") {
  /*
   * If we use a socket, first delete file if
   * it exists
   */
  resetSocket(settings.PORT)
}



app.listen(settings.PORT, function(err) {
  if (err) {
    console.log(error)
  } else {
    // we give rights to socket else nginx can't use it
    if (typeof settings.PORT == "string" && fs.lstatSync(settings.PORT).isSocket()) {
      console.log('change socket mode')
      fs.chmodSync(settings.PORT, '777');
    }

    console.info("==> Listening on port %s. Openup http://localhost:%s/ in your browser.", settings.PORT, settings.PORT)
  }
})


