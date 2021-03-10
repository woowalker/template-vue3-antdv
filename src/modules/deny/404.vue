<template>
  <div>
    <div class="deny-img-container">
      <img src="../../assets/images/deny/404.png"/>
      <div class="deny-detail-container">
        <span>抱歉，无法打开页面</span>
      </div>
    </div>
    <div class="deny-btn-container">
      <Button class="deny-btn" type="primary" ghost @click="backToMain">返回首页</Button>
    </div>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue'
export default {
  name: 'DenyPage',
  components: { Button },
  methods: {
    backToMain () {
      this.$router.replace({
        path: '/'
      })
    }
  }
}
</script>

<style scoped lang="less">
  .deny-img-container {
    position: relative;
    width: 460px;
    height: 291px;
    margin: 140px auto 0 auto;
    text-align: center;

    .deny-detail-container {
      width: 100%;
      height: 20px;
      line-height: 20px;
      text-align: center;
      position: absolute;
      bottom: 32px;

      span {
        font-size: 12px;
        color: #4b4d53;
      }
    }
  }

  .deny-attach-container {
    margin: 6px auto 0 auto;
    text-align: center;
    line-height: 20px;

    span {
      font-size: 12px;
      color: #4b4d53;
    }
  }

  .deny-btn-container {
    margin: 4px auto 0 auto;
    text-align: center;
  }
</style>
