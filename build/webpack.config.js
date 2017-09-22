const path = require('path')
const vueConfig = require('./vue-loader.config')
const HTMLPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
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
      'axios'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    publicPath: './',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name]-[chunkhash:8].js'
  },
  resolve: {
    alias: {
      // for img tag use
      'public': path.resolve(__dirname, '../src/public'),
      // for css use
      '~public': path.resolve(__dirname, '../src/public'),
      // for import use
      '~src': path.resolve(__dirname, '../src')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
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
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor'
    }),
    new webpack.NamedModulesPlugin()
  ]
}

if (process.env.NODE_ENV === 'development') {
  // 添加环境变量，比如安卓的webviewBridge
  config.entry.app = ['./src/env-mock/index.js', './src/app.js']
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    // generate output HTML
    new HTMLPlugin({
      template: 'src/index.html',
      title: timeStamp,
      filename: path.resolve(__dirname, '../dist/index.html'),
      env: process.env.NODE_ENV
    })
  )
}

if (process.env.NODE_ENV === 'test') {
  // delete config.devtool
  config.output.path = path.resolve(__dirname, '../dist/')
  config.output.publicPath = './'
  // 官网直销
  // config.output.path = path.resolve(__dirname, '../dist/official-order')
  // config.output.publicPath = '/dwf/public/official-order/'

  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // generate output HTML
    new HTMLPlugin({
      template: 'src/index.html',
      title: timeStamp,
      filename: path.resolve(__dirname, '../dist/index.html'),
      env: process.env.NODE_ENV
    })
  )
}

if (process.env.NODE_ENV === 'localproduction') {
  delete config.devtool
  config.output.path = path.resolve(__dirname, '../dist/')
  config.output.publicPath = './'

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
      filename: path.resolve(__dirname, '../dist/index.html'),
      env: process.env.NODE_ENV
    })
  )
}

// production start
if (process.env.NODE_ENV === 'production') {
  delete config.devtool
  // 在 yarn run 后面加 -- 就能将参数传递给webapck
  // yarn run build-pro-static -- --define dwfversion="h5/05121"
  // cross-env NODE_ENV=production webpack --config build/webpack.config.js -d --define dwfversion="h5/05121"
  // 如果打包配置中不存在 dwfversion 那么会默认使用 ./ 路径
  let version = null
  console.log('=========', JSON.stringify(process.argv), '===========')
  if (process.argv && process.argv.length > 0) {
    for (let i = 0; i < process.argv.length; i++) {
      if (process.argv[i].indexOf('dwfversion=') > -1) {
        version = process.argv[i].split('=')[1].replace(/[\'\"]/g, '')
        break
      }
    }
  }
  console.log('=========dwfversion=', version, '===========')
  if (typeof version === 'string' && /^[\d._]+$/.test(version)) {
    config.output.publicPath = `//cdn01.dwfei.com/h5/${version}/`
  } else {
    config.output.publicPath = './'
  }
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
      env: process.env.NODE_ENV,
      excludeAssets: [/vendor.*.js/]
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
// production end

module.exports = config
