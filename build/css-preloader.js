var webpackConfig = require('./webpack.config.js')

module.exports = function (source) {
  var alias = webpackConfig.resolve.alias
  source = source.replace(/url\([^\)]+\)/g, function (whole) {
    for (const key in alias) {
      if (key.indexOf('~') > -1) {
        whole = whole.replace(key, alias[key])
      }
    }
    whole = whole.replace(/\\/g, function (whole) {
      return '/'
    })
    return whole
  })
  return source
}
