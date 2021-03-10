import MainLayout from '@/layout/MainLayout'
import EmptyLayout from '@/layout/EmptyLayout'
import checkRoutes from '@/utils/checkRoutes'

const Home = () => import('@/modules/home')

const DenyPage = () => import('@/modules/deny/404.vue')
const DenyPermission = () => import('@/modules/deny/403.vue')

/**
 * 主页面配置项说明
 * title: 当portal没有配置中文名时生效
 * showPageHeader: 为false的时候不显示pageHeader
 * showBack: 是否显示pageHeader的返回按钮，默认：不在右侧菜单上显示的时候为true
 * deny: 是否为验证页面，是验证页面在路由拦截器中不做校验
 */
const mainRoutes = []

/**
 * 无权限和404页面
 */
const denyRoutes = [
  {
    path: '/deny',
    component: EmptyLayout,
    children: [
      { path: '404', name: 'DENY_NOT_FOUND', meta: { deny: true }, component: DenyPage },
      { path: '403', name: 'DENY_NOT_PERMISSION', meta: { deny: true }, component: DenyPermission }
    ]
  }
]

export default [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'HOME', meta: { title: '首页' }, component: Home }
    ]
  },
  ...denyRoutes,
  ...checkRoutes([
    ...mainRoutes
  ])
]
