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
      </div>-->

      <!-- 模板标签当中传入数据 -->
      <AuthInput
        type="text"
        :value="form.username"
        @input="handleUserName"
        placeholder="手机号码"
        :rule="/^1[0-9]{4,10}$/"
        err_message="手机号格式不正确"
      ></AuthInput>

      <AuthInput
        type="password"
        v-model="form.password"
        placeholder="密码"
        :rule="/^[0-9a-zA-Z]{3,12}$/"
        err_message="密码格式不正确"
      ></AuthInput>

      <AuthButton text="登录" @click="handleSubmit"></AuthButton>

      <span>
        没有账号?
        <!-- <i>去注册</i>  -->
        <router-link to="/register" class="jump">去注册</router-link>
      </span>
    </div>
  </div>
</template>


<script>
// 导入input组件文件
import AuthInput from "@/components/AuthInput";
// 导入按钮组件
import AuthButton from "@/components/AuthButton";
// 导入axios 组件
//import axios from 'axios';    在main.js 已经将这个插件挂载到原型上了

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },

  // 导入框架组件
  components: {
    AuthInput,
    AuthButton
  },

  methods: {
    // 获取到username中的value的值进行传输
    handleUserName(value) {
      // 将子组件传过来的当前输入框中的value值赋值给数据中的username
      this.form.username = value;
      // console.log(this.form);
    },
    // 表单提交
    handleSubmit() {

      if(this.form.username === "" || this.form.password === ""){
        // console.log(123);
          this.$toast.fail("填写完整的登录信息")
          return 
      }
      // 这里用到的请求方式是axios，下面是固有的属性和方法
      this.$axios({
        url: "/login",
        method: "POST",
        data: this.form
      }).then(res => {
        // 打印res查看返回的数据中，成功的提示是什么
        console.log(res);
        // 解构出错误信息和data信息，取到data中的
        const { message,data } = res.data;
        if (message === "登录成功") {

          // 登录成功的话，将res响应中的token存储到本地当中
          localStorage.setItem("token",data.token)
          localStorage.setItem("user_id",data.user.id)



          this.$notify({
            type: "success",
            message: "登录成功"
          });
          // 成功后跳转到个人中心页面
          this.$router.push("/personal");
        }
      });
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
  span {
    font-size: 14px;
    display: block;
    margin-top: 20px;
    text-align: right;

    .jump {
      color: rgb(92, 169, 233);
    }
  }
  .loginbtn {
    font-size: 36 / 635 * 100vw;
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