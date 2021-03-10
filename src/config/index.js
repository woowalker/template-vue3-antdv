// 环境
export const NODE_ENV = process.env.NODE_ENV || 'production'

// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  maxContentLength: 2000,
  headers: {},
  baseURL: '/'
}

// vuex 默认配置
export const VUEX_DEFAULT_CONFIG = {
  strict: process.env.NODE_ENV !== 'production'
}

// API 默认配置
export const API_DEFAULT_CONFIG = {
  debug: process.env.NODE_ENV !== 'production',
  sep: '/'
}

// CONST 默认配置
export const CONST_DEFAULT_CONFIG = {
  sep: '/'
}

// 还有一些方便开发的配置
export const CONSOLE_REQUEST_ENABLE = false // 开启请求参数打印
export const CONSOLE_RESPONSE_ENABLE = false // 开启响应参数打印
