var express = require('express')
var webpack = require('webpack')
var path = require('path')
var config = require('./build/webpack.config.js')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var request = require('request')

// html-webpack-plugin和chunkhash有冲突，所以这里要改成hash
config.output.filename = '[name].[hash].js'
config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
)
config.entry.app = ['webpack-hot-middleware/client', './app.js']

var app = express()
var compiler = webpack(config)

var devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: '/',
  stats: {
    colors: true,
    chunks: false
  },
  watchOptions: {
    poll: true
  }
})

var hotMiddleware = webpackHotMiddleware(compiler)

app.use(devMiddleware)
app.use(hotMiddleware)

app.use('*', function (req, res, next) {
  if (req.baseUrl !== '/') {
    const url = 'http://fitmap.deexcul.com' + req.originalUrl
    if (req.originalUrl === '/api/users') {
      console.log(req.method)
    }
    request({
      url: url,
      method: req.method
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.set('content-type', 'text/json')
        res.send(response.body)
        res.end()
      }
    })
    return
  }
  var filename = path.join(compiler.outputPath, 'index.html')
  compiler.outputFileSystem.readFile(filename, function (err, result) {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

app.listen(9527, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:9527')
})
