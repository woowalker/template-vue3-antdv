<template>
  <div>
    <div class="deny-img-container">
     <img src="../../assets/images/deny/403.png"/>
      <div class="deny-detail-container">
        <span>无权限</span>
      </div>
    </div>
    <div class="deny-attach-container">
      <span>抱歉，检测到你的账号：{{$const['APP/DISPLAY_NAME']}}，没有该页面权限，请联系管理员，或更换账号</span>
    </div>
    <div class="deny-btn-container">
      <Button class="deny-btn" type="primary" ghost @click="logout">更换账号</Button>
    </div>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue'
export default {
  name: 'DenyPermission',
  components: { Button },
  methods: {
    logout () {
      window.location.href = this.$const['APP/SIGN_OUT_URL']
    }
  }
}
</script>

<style scoped lang="less">
  .deny-img-container {
    position: relative;
    width: 460px;
    height: 291px;
    margin: 130px auto 0 auto;
    text-align: center;

    .deny-detail-container {
      width: 100%;
      height: 24px;
      line-height: 24px;
      text-align: center;
      position: absolute;
      bottom: 30px;

      span {
        font-size: 18px;
        color: #2f3136;
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
    margin: 36px auto 0 auto;
    text-align: center;
  }
</style>
