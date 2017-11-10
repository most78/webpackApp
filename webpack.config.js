const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader','css-loader', 'sass-loader']
      },
      {
        test: /\.pug$/,
        use: ["html-loader", "pug-html-loader"]﻿
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8000,
    stats: "errors-only",
    hot: true,
    open: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: true,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'webpackApp - Marcos.Ostos',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      excludeChunks: ['contact'],
      template: './src/index.pug',
    }),
    new HtmlWebpackPlugin({
      title: 'Contact - Marcos.Ostos',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      chunks: ['contact'],
      filename: 'contact.html',
      template: './src/contact.html',
    })
  ]
}