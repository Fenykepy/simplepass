/* sources of learning webpack :
 *
 * http://christianalfoni.github.io/react-webpack-cookbook/Running-a-workflow.html
 * https://github.com/petehunt/webpack-howto
 *
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var AssetsPlugin = require('assets-webpack-plugin');
var BabelPolyfill = require("babel-polyfill");

var config = {
  // sourceMaps simplified to a single mapping per line
  //devtool: 'cheap-module-eval-source-map',
  devtool: 'eval',
  entry: {
    app: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/public/app/client'
    ]
  },
  output: {
    path: path.join( __dirname, 'dist' ),
    filename: 'bundle.js',
    publicPath: '/static/',

  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new AssetsPlugin(),
    new ExtractTextPlugin("styles.css", {
      allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        // json files
        test: /\.json$/, loader: 'json'
      },
      {
        // js files
        test: /\.js$/,
        loaders: ['babel'],
        exclude: path.join( __dirname, '/node_modules/'),
        include: __dirname
      },
      {
        // less files, get extracted
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', '!css-loader!less-loader'),
        exclude: path.join( __dirname, '/node_modules/'),
      },
      { 
        // images are stored separately
        test: /\.(png|jpg)$/, 
        loader: 'file-loader?name=images/[hash].[ext]',
        exclude: path.join( __dirname, '/node_modules/'),
      },
      { 
        // svg are optimised then stored separately
        test: /\.(svg)$/, 
        loaders: [ 'file-loader?name=images/[hash].[ext]', 'svgo-loader?useConfig=svgoConfig'],
        exclude: path.join( __dirname, '/node_modules/'),
      },
    ],
  },
  svgoConfig: {
    plugins: [
      {removeTitle: true},
      {convertColors: {shorthex: false}},
      {convertPathData: false}
    ]
  },
};



module.exports = config;


