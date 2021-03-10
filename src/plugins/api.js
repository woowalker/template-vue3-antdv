import axios from './axios'
import { API_DEFAULT_CONFIG } from '@/config'
import API_CONFIG from '@/service/api'
import { assert } from '@/utils'
import { pick, assign, isEmpty } from 'lodash'

class MakeApi {
  constructor (options) {
    this.api = {}
    this.apiBuilder(options)
  }

  apiBuilder ({
    sep = '|',
    config = {},
    debug = false
  }) {
    Object.keys(config).map(namespace => {
      this._apiSingleBuilder({
        namespace,
        sep,
        config: config[namespace],
        debug
      })
    })
  }

  _apiSingleBuilder ({
    namespace,
    sep,
    config,
    debug
  }) {
    config.forEach(api => {
      const { name, desc, params, method, path } = api
      const apiName = `${namespace}${sep}${name}`
      const apiUrl = path

      debug && assert(name, `${apiUrl}: 接口name属性不能为空`)
      debug && assert(apiUrl.indexOf('/') === 0, `${apiUrl}: 接口路径path，首字符应为/`)

      Object.defineProperty(this.api, apiName, {
        /**
         * 使用 this.$api['host/action'](outerParams, outerOptions)
         * this.$api 是一个对象，['host/action'] 是对象属性
         *
         * @param outerParams: 如果outerParams中的属性名有与 service -> api -> host.js 中的 path 的路径名相同，则url会被替换，
         * 比如：'/instance/:id/:type' ，然后outerParams: {id: '123', type: 'reset'},
         * 则 _replaceURLparams 会将 url 替换成：'/instance/123/reset'
         *
         * @param outerOptions: 在axios中的级别是与 url 和 method 同级别的
         *
         * 然后 _normoalize 函数的作用则是：
         * 如果 service -> api -> host.js 中的 params 的有定义属性，并且该请求为'POST', 'PUT', 'PATCH'之一，
         * 那么 _normoalize 就是将 outerParams 中与 params 中的同名属性 pick 出来，作为 options.data 传递给axios，
         * 比如：
         * outerParams: {account: 'admin', password: 'admin'}, method: 'PUT'
         * 此时如果在 service -> api -> host.js 中这样定义 params: {account: '', password: ''}
         * 则此次的 axios 请求的 data 负载（注意不是 params 负载）就是 {account: 'admin', password: 'admin'}
         */
        value (outerParams, outerOptions) {
          /**
           * params 为 service -> api -> host.js 中定义的 params
           * this.$api['host/fetch'](outerParams, outerOptions)
           */
          const _params = isEmpty(outerParams) ? params : assign({}, params, outerParams)
          const _data = pick(_params, Object.keys(params))
          const url = _replaceURLparams(apiUrl, _params)
          return axios(_normoalize(assign({
            url,
            method,
            desc
          }, outerOptions), _data))
        }
      })
    })
  }
}

/**
 * 替换 service -> api -> host.js 文件中的 path 属性中定义的字段
 * @param url
 * @param data
 * @returns {*}
 * @private
 */
function _replaceURLparams (url, data) {
  return url.replace(/:([\w\d]+)/ig, (reg, key) => {
    return data[key]
  })
}

/**
 * 设置 axios 的请求为 GET 还是 POST
 * 其中 GET 请求对应的请求参数名是 params
 * 其他诸如 POST、PUT等请求的请求参数名是 data
 * @param options
 * @param data
 * @returns {*}
 * @private
 */
function _normoalize (options, data) {
  const method = options.method.toUpperCase()
  if (['POST', 'PUT', 'PATCH', 'DELETE'].indexOf(method) > -1) {
    options.data = data
  } else {
    options.params = data
  }

  return options
}

export default new MakeApi({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG
})['api']
