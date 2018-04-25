const webpack = require('webpack').default
const QiniuPlugin = require('qiniu-webpack-plugin').default
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
        ACCESS_KEY: 'd7ZKJbvhgPIYLqOaiKFtyTgV-A2W8fuMpEp13rs1',
        SECRET_KEY: 'SHbtGrVzupLB9vsY2KnGHkZRd53u8YK10vdTLaq8',
        bucket: 'laowang'
      })
    )
  }
  return webpackConfig
}
