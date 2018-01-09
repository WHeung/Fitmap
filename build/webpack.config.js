const path = require('path')
const vueConfig = require('./vue-loader.config')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const WebpackShellPlugin = require('webpack-shell-plugin')
const timeStamp = ((new Date()).getTime() + '').substring(8)

const config = {
  devtool: '#source-map',
  entry: {
    app: './app.js',
    vendor: [
      'object-assign-shim',
      'es6-promise',
      'vue',
      'vue-router',
      'vuex',
      'vue-lazyload',
      'axios',
      'weixin-js-sdk'
    ]
  },
  externals: {
    'QMap': 'qq.maps'
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    publicPath: './',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name]-[chunkhash:8].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../src/public'),
      '~public': path.resolve(__dirname, '../src/public'),
      '~src': path.resolve(__dirname, '../src'),
      'tool': path.resolve(__dirname, '../src/tool')
    }
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env', 'stage-3']
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor'
    })
  ]
}

if (process.env.NODE_ENV === 'development') {
  config.entry.app = ['./src/env-mock/index.js', './src/app.js']
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new HTMLPlugin({
      template: 'src/index.html',
      title: timeStamp,
      filename: path.resolve(__dirname, '../dist/index.html'),
      env: process.env.NODE_ENV
    })
  )
}

if (process.env.NODE_ENV === 'test') {
  config.output.path = path.resolve(__dirname, '../dist/')
  config.output.publicPath = './'

  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HTMLPlugin({
      template: 'src/index.html',
      title: timeStamp,
      filename: path.resolve(__dirname, '../dist/index.html'),
      env: process.env.NODE_ENV
    })
  )
}

if (process.env.NODE_ENV === 'production') {
  delete config.devtool
  let version = null
  console.log('=========', JSON.stringify(process.argv), '===========')
  if (process.argv && process.argv.length > 0) {
    for (let i = 0; i < process.argv.length; i++) {
      if (process.argv[i].indexOf('FitMapversion=') > -1) {
        version = process.argv[i].split('=')[1].replace(/[\'\"]/g, '')
        break
      }
    }
  }
  console.log('=========version=', version, '===========')
  config.output.publicPath = './'
  config.output.path = path.resolve(__dirname, '../static/')
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        'drop_debugger': true,
        'drop_console': true
      }
    }),
    new HTMLPlugin({
      template: 'src/index.html',
      filename: path.resolve(__dirname, '../static/index.html'),
      env: process.env.NODE_ENV
    }),
    new HTMLPlugin({
      template: 'src/index.html',
      filename: path.resolve(__dirname, `../static/index${version}.html`),
      env: process.env.NODE_ENV
    }),
    new WebpackShellPlugin({
      onBuildStart: ['echo "Webpack Start PRO 😂 ' + timeStamp],
      onBuildEnd: [
        'echo "Webpack PRO End 😂' + timeStamp
      ]
    })
  )
}

module.exports = config
