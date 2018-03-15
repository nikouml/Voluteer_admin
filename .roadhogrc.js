const path = require('path')
const fs = require('fs')
let dirNames = []
let alias = {}
try {
  dirNames = fs.readdirSync(path.join(__dirname, './src')).filter(item => {
    const dirPath = path.join(__dirname, `./src/`, item)
    const stat = fs.statSync(dirPath)
    return stat && stat.isDirectory()
  })
} catch (err) {
  throw new Error('roadhog读取目录发生错误', err.message)
}
dirNames.forEach(item => {
  alias[item] = `./src/${item}`
})

export default {
  'entry': 'src/index.js',
  'disableCSSModules': true,
  'hash': true,
  'env': {
    'development': {
      'extraBabelPlugins': [
        'dva-hmr',
        'transform-runtime',
        'transform-decorators-legacy',
        ["module-resolver", {
          "alias": alias
        }]
      ]
    },
    'production': {
      'extraBabelPlugins': [
        'transform-runtime',
        'transform-decorators-legacy',
        ["module-resolver", {
          "alias": alias
        }]
      ],
      'autoprefixer': {
        'browsers': [
          'iOS >= 8', 'Android >= 4', 'ie >=9'
        ]
      }
    }
  }
}
