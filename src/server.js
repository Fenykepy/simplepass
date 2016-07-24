import koa from 'koa'
import route from 'koa-route'
import compress from 'koa-compress'

import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'
import webpack from 'webpack'
import config from '../webpack.config'

import home from './controllers/home' 




import { statics_proxy, port } from '../config'

var app = koa()

// we are in development mode
if (process.env.NODE_ENV != 'production') {
  // use hot reloading in development
  var compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}

app.use(route.get('/', home));


app.listen(port)


