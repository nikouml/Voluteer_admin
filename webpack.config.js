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
        ACCESS_KEY: '3I7GdPEmkgP1TZdOUWxD_20-FBbACXSJNImbBQ37',
        SECRET_KEY: 'mf-VSlpbhUoUUNbkc2I1gRfPdajhaHNIPNFk6kyx',
        bucket: 'test',
        path: 'fe/'
      })
    )
  }
  return webpackConfig
}
