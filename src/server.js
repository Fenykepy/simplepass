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
import mongo from './mongo'

var app = koa()

// set settings.DB_PATH as context
app.context.EJSON_DIR = settings.EJSON_DIR

// we are in development mode
if (process.env.NODE_ENV != 'production') {
  // use hot reloading in development
  var compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}
// set x-response-time header
app.use(responseTime)


// parse body
app.use(bodyParser())

// automatically parse body objects to json
app.use(json({pretty: false}))

// home
app.use(route.get('/', home))

// ejson api endpoint
app.use(route.get('/api/ejson/', ejson.retrieve))
app.use(route.put('/api/ejson/', ejson.update))

// connect to mongodb
// from now db is accessible as this.db
app.use(mongo(settings.DB.uri, settings.DB.options))

// user api endpoint
app.use(route.post('/api/user/', user.create))

if (! settings.STATICS_PROXY) {
  // Serve static files for development
  app.use(serve(path.join(__dirname, 'public')))
}

// compress
app.use(compress())

app.listen(settings.PORT)


