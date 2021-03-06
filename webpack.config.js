'use strict'
const webpack = require('webpack');
const path = require('path');

let plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins = [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
}

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'build/js'),
    filename: 'app.js'
  },
  plugins,
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: __dirname
    }]
  }
};
