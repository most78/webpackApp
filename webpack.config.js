var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'app.bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpackApp - Marcos.Ostos',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: './src/index.html',
    })
  ]
}