<template>
<!-- 登录页 -->
  <div>
      <!-- 关闭按钮 -->
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <!-- logo -->
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>

      <!-- 用户名密码输入框 -->
      <div>
        <input type="text">
      </div>

      <div>
        <input type="password">
      </div>

      <button>登录</button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
    .colse {
      padding: 20px;
        span {
          font-size: 27/360*100vw;
        }
    }

    .logo {
      display: flex;
      justify-content: center;

      span {
        display: block;
        font-size: 126/360*100vw;
        color: #d81e06
      }
    }

</style>