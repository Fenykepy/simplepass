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
import responseTime from './utils/response-time'

import settings from '../config'
import monk from 'monk'

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

// public user api endpoints
app.use(route.post('/api/user/', user.create))
app.use(route.post('/api/user/login/', user.login))

// from here user needs to be authenticated
app.use(user.authenticate)

// private user api endpoints
// insert profile management middlewares here.

// ejson api endpoint
app.use(route.get('/api/ejson/', ejson.retrieve))
app.use(route.put('/api/ejson/', ejson.update))


// compress
app.use(compress())

app.listen(settings.PORT)


