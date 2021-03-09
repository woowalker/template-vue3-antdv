const path = require('path')
const packageJson = require('./package.json')
const buildConfig = require('./config')
const argv = require('minimist')(process.argv.slice(2))

const getDomain = function () {
  const server = argv.server || process.env.npm_config_server
  const servers = packageJson.servers ? packageJson.servers : require('./server.config').servers
  const domain = server ? servers[server]['domain'] : ''
  return domain
}

function resolve (dir) {
  return path.join(__dirname, dir)
}

function getPublicPath () {
  if (process.env.NODE_ENV === 'production') {
    return `${getDomain()}/${packageJson.name}/prd/`
  } else if (process.env.NODE_ENV === 'test') {
    return `/${packageJson.name}/prd/`
  } else {
    return `//localhost:${argv.port || 8080}/${packageJson.name}/prd/`
  }
}

module.exports = {
  publicPath: getPublicPath(),
  outputDir: resolve('prd'),
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
    },
    index: resolve('public/index.html'),
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [{ from: /.*/g, to: `/${packageJson.name}/prd/index.html` }]
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
