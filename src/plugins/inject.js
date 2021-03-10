import api from './api'
import consts from './const'

export default {
  install: (appInstance) => {
    // 需要挂载的都放在这里
    appInstance.config.globalProperties.$api = api
    appInstance.config.globalProperties.$const = consts
  }
}
