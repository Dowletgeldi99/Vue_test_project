const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  node: {
    fs: "empty"
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader', exclude: '/node_modules/' },
      { test: /\.txt$/, loader: 'raw-loader', exclude: '/node_modules/' },
      { test: /\.json$/, loader: 'json', exclude: '/node_modules/' },
      { test: /\.css$/, use: 'css-loader', exclude: '/node_modules/' },
      { test: /\.scss$/, use: ['vue-style-loader', 'css-loader', 'sass-loader'], exclude: '/node_modules/' },
      { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
      { test: /\.js$/, loader: 'babel-loader', exclude: '/node_modules/' },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'url-loader' }
    ]
  },
  plugins: [
   new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    minify: {
      useShortDoctype: true,
      removeStyleLinkTypeAttributes: true,
      removeScriptTypeAttributes: true,
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true
    }
  }),
   new VueLoaderPlugin()
 ],
  devtool: "source-map",
  resolve: {
    extensions: ['.js', '.json', '.vue', '.html'],
    alias: {
      '$vue': './dist/bundle.js'
    }
  }
};