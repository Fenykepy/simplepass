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
        // images and fonts
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192', // inline base64 URLs for <=8k images, direct URLs for the rest
        exclude: path.join( __dirname, '/node_modules/'),
      }
    ],
  }
};

module.exports = config;


