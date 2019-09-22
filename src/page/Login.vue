<template>
  <!-- 登录页 -->
  <div class="container">
    <!-- 关闭按钮 -->
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <!-- logo -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <!-- 用户名密码输入框 -->
    <div class="main">
      <!-- <div>
        <input type="text" />
      </div>

      <div>
        <input type="password" />
      </div> -->

      <!-- 模板标签当中传入数据 -->
      <AuthInput :value="username"  @inputuse="handleUserName"></AuthInput>
      
      <button class="loginbtn">登录</button>

      <span>
        没有账号?
        <i>去注册</i> 
        </span>
    </div>
  </div>
</template>


<script>
// 导入input组件文件
import AuthInput from '@/components/AuthInput'

export default {
  data(){
    return {
      form: {
        username:"",
        password:""
      }
    }
  },

  // 导入框架组件
  components:{
    AuthInput
  },


  methods:{
    // 获取到username中的value的值进行传输
    handleUserName(value){
        // 将子组件传过来的当前输入框中的value值赋值给数据中的username
        this.form.username = value
        // console.log(this.value);
        
    },



  }

};
</script>

<style lang="less">
// scoped只作用于当前组件
.container {
  padding: 20px;
}
.colse {
  span {
    font-size: 27/360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126/360 * 100vw;
    color: #d81e06;
  }
}

.main {
  // 将样式放到AuthInput文件当中了.
  // input {
  //   width:100%;
  //   height: 38 / 360 * 100vw;
  //   padding:25px;
  //   box-sizing: border-box;
  //   background: #fff;
  //   border:none;
  //   border-bottom: 1px #666 solid;
  //   outline: none;
  //   font-size: 20px;
  // }

  span {
    font-size: 14px;
    display: block;
    margin-top: 20px;
    text-align: right;

    i {
      color: rgb(92, 169, 233)
    }
  }
  .loginbtn {
    font-size: 36 / 635 *100vw;
    color: #fff;
    margin-top: 12px;
    border: none;
    width: 100%;
    height: 60 / 635 * 100vw;
    background-color: #cc3300;
    border-radius: 50px;
  }
}
</style>