import permission from './permission'
import clickoutside from './clickoutside'

export default {
  install: (appInstance) => {
    // 需要加载的指令都放在这里
    appInstance.directive('permission', permission)
    appInstance.directive('clickoutside', clickoutside)
  }
}
