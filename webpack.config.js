const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const bootstapEntryPoint = require('./webpack.bootstrap.config');
const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: './dist'
})
const cssConfig = isProd ? cssProd : cssDev;
const bootstrapcConfig = isProd ? bootstapEntryPoint.prod : bootstapEntryPoint.dev;

module.exports = {
  entry: {
    app: './src/app.js',
    bootstrap: bootstrapcConfig
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.pug$/,
        use: ["html-loader", "pug-html-loader"]﻿
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        use: [
          'file-loader?name=images/[name].[ext]',
          'image-webpack-loader'
        ]
      },
      { 
        test: /\.(woff2?|svg)$/,
        use: 'url-loader?limit=10000&name=fonts/[name].[ext]'
      },
      { 
        test: /\.(ttf|eot)$/,
        use: 'file-loader?&name=fonts/[name].[ext]'
      },
      { 
        test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        use: 'imports-loader?jQuery=jquery'
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
      filename: '/css/[name].css',
      disable: !isProd,
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