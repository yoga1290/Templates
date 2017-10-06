// see https://webpack.js.org/guides/production/

var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var common = require('./webpack.common.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

var config = {
  // https://webpack.js.org/configuration/plugins/#plugins
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJSPlugin({
      ecma: 7,
      parallel: {
        cache: true,
        workers: 2 // for e.g
      },
      output: {
        comments: false,
        beautify: false,
      },
      compress: {
        passes: 3,
        drop_console: true,
        drop_debugger: true
      },
      warnings: false
    })
  ],

  resolve: {
    alias: {
      'configuration': path.join(__dirname, 'config', 'prod.js')
    }
  },

};

module.exports = merge(common, config)
