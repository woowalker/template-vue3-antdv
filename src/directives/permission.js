import permission from '@/plugins/permission'

export default {
  mounted (el, binding, vnode) {
    const { context } = vnode
    if (!permission(binding.value, context.$route.name)) {
      if (vnode.componentInstance) {
        vnode.componentInstance.$destroy()
      }
      el.remove()
    }
  }
}
