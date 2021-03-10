import { CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE } from '../index'
import { get } from 'lodash'
import router from '@/plugins/router'

export function requestSuccessFunc (requestObj) {
  CONSOLE_REQUEST_ENABLE && console.info('requestInterceptorFunc', `url: ${requestObj.url}`, requestObj)
  // 处理权限，请求发送监控

  return requestObj
}

export function requestFailFunc (requestError) {
  // 发送请求失败处理

  return Promise.reject(requestError)
}

export function responseSuccessFunc (responseObj) {
  CONSOLE_RESPONSE_ENABLE && console.log('requestInterceptorFunc', 'data: ', responseObj.data)

  return responseObj.data
}

export function responseFailFunc (responseError) {
  if (responseError.response) {
    switch (responseError.response.status) {
      case 401: // 登录过期
        responseError.message = '登录过期，即将跳转登录页'
        setTimeout(() => { location.reload() }, 1000) // 1秒后刷新当页面，登录框架自会跳转登录页面
        break
      case 460: // 服务过期
        router.replace({
          name: 'DENY_EXPIRE'
        })
        break
      default:
        responseError.message = get(responseError, 'response.data.message', '出错啦,请联系管理员')
    }
  } else { // 无返回的默认提示
    responseError.message = '网络问题，请刷新重试'
  }

  // 超时提示
  if (responseError.message.includes('timeout')) {
    responseError.message = '请求超时，请刷新重试'
  }

  // 全局错误提示
  if (responseError.config && !responseError.config.noShowDefaultError) {
    global.vbus.$emit('global.$Message.show', responseError.message)
  }

  return Promise.reject(responseError)
}
