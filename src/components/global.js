const componentList = {}

export default {
  install: (appInstance, opts = {}) => {
    Object.keys(componentList).forEach((key) => {
      appInstance.component(key, componentList[key])
    })
  }
}
