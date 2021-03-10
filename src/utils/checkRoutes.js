function checkRoutes (routes) {
  for (let i = 0, len = routes.length; i < len; i++) {
    const route = routes[i]
    if (route.name) {
      // const menuInfo = consts['MENU/AUTHMAP'][route.name]
      const menuInfo = []
      if (menuInfo) {
        !route.meta && (route.meta = {})
        // 如果portal没有设置title，则从meta中读取
        route.meta.title = menuInfo.title || route.meta.title
        // 在meta上存一份portalmenu信息
        route.meta.menuInfo = menuInfo
      }
    }
    if (route.children) {
      checkRoutes(route.children)
    }
  }

  return routes
}

export default checkRoutes
