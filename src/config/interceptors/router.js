export function routerBeforeEachFunc (to, from, next) {
  // 页面拦截、权限处理
  const { name, meta } = to
  if (!name) { // 验证不存在：没有注册，没有name
    next({
      replace: true,
      name: 'DENY_NOT_FOUND'
    })
  } else if (name && !meta.deny) { // 验证无权限：已注册，但是不在menu中（meta.deny为错误页面，不需要验证）
    next({
      replace: true,
      name: 'DENY_NOT_PERMISSION'
    })
  } else {
    next()
  }
}

export function routerAfterEachFunc (to, from) {
}
