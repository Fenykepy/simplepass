import path from 'path'

import koa from 'koa'
import route from 'koa-route'
import serve from 'koa-static'
import compress from 'koa-compress'

import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'
import webpack from 'webpack'
import config from '../webpack.config'

import home from './home/controllers' 
import ejson from './ejson/controllers'
import { responseTime } from './helpers'



import { statics_proxy, port } from '../config'

var app = koa()

// we are in development mode
if (process.env.NODE_ENV != 'production') {
  // use hot reloading in development
  var compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}
// set x-response-time header
app.use(responseTime)

// home
app.use(route.get('/', home))

// ejson api endpoint
app.use(route.get('/api/ejson/', ejson.retrieve))
app.use(route.put('/api/ejson/', ejson.update))
app.use(route.delete('/api/ejson/', ejson.remove))

// user api endpoint

if (! statics_proxy) {
  // Serve static files for development
  app.use(serve(path.join(__dirname, 'public')))
}

// compress
app.use(compress())

app.listen(port)


