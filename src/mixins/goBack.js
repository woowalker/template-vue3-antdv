export default {
  methods: {
    $$GoBack (fn) {
      // console.log('$router:', this.$router, ';length:', this.$router.history.length, ';$route:', this.$route)
      if (fn instanceof Function) {
        fn()
        return
      }
      if (window.history.length <= 1) {
        const { matched } = this.$route
        if (matched[matched.length - 2].path) {
          this.$router.replace({
            path: matched[matched.length - 2].path
          })
          return
        }
      }
      this.$router.go(-1)
    }
  }
}
