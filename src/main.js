import { createApp } from 'vue'
import App from './App.vue'
import router from '@/plugins/router'
import store from '@/plugins/store'
import inject from '@/plugins/inject'
import directive from '@/directives'
// 自定义全局组件
import globalComponent from '@/components/global'
// 样式文件
import '@/styles/index.less'

const app = createApp(App)
// 注入全局方法
inject.install(app)
// 加载自定义指令
directive.install(app)

app.use(router)
app.use(store)
app.use(globalComponent)
app.mount('#app')

global.vbus = app
