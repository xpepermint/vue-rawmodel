var path = require('path');
var webpack = require('webpack');

module.exports = {
  devServer: {
    contentBase: __dirname,
    hot: false,
    inline: false,
    compress: true
  },
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'app.js')
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
