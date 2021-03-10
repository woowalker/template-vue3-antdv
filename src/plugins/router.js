import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '@/routes'
import { routerBeforeEachFunc, routerAfterEachFunc } from '@/config/interceptors'

// 注入默认配置和路由表
const routerInstance = createRouter({
  history: createWebHashHistory(),
  routes
})

// 注入拦截器
routerInstance.beforeEach(routerBeforeEachFunc)
routerInstance.afterEach(routerAfterEachFunc)

export default routerInstance
