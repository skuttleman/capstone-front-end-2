/* eslint-disable */
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'build/js'),
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: __dirname
    }]
  }
};



// var src = path.join(__dirname, '..', '..', 'src')
// var fs = require('fs')
// if (fs.existsSync(src)) {
//   // Use the latest src
//   module.exports.resolve = { alias: { 'react-router-redux': src } }
//   module.exports.module.loaders.push({
//     test: /\.js$/,
//     loaders: ['babel'],
//     include: src
//   });
// }
