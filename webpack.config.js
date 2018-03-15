const webpack = require('webpack')
const QiniuPlugin = require('qiniu-webpack-plugin')
module.exports = function (webpackConfig, env) {
  if (env !== 'production') {} else {
    webpackConfig.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        }
      }),
      new QiniuPlugin({
        ACCESS_KEY: process.env.ACCESS_KEY,
        SECRET_KEY: process.env.SECRET_KEY,
        bucket: 'test',
        path: 'fe/'
      })
    )
  }
  return webpackConfig
}