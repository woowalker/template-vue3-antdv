const path = require('path')
const buildConfig = require('./config')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack (config) {
    buildConfig[process.env.NODE_ENV].configureWebpack(config)
  },
  chainWebpack (config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    /* config.plugin('html') */
    config.plugin('html')
      .tap(args => {
        args[0].template = resolve('public/index.html')
        return args
      })

    /* 设置 resolve.alias */
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('mixins', resolve('src/mixins'))

    buildConfig[process.env.NODE_ENV].chainWebpack(config)
  }
}
