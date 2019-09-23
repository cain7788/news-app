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
      <!-- 模板标签当中传入数据 -->

      <!-- 手机号 -->
      <AuthInput
        type="text"
        :value="form.username"
        @input="handleUserName"
        placeholder="手机号码"
        :rule="/^1[0-9]{4,10}$/"
        err_message="手机号格式不正确"
      ></AuthInput>

      <!-- 昵称 -->
      <AuthInput
        type="text"
        v-model="form.nickname"
        placeholder="昵称"
        :rule="/^[0-9a-zA-Z\u4e00-\u9fa5]{2,6}$/"
        err_message="昵称格式不正确"
      ></AuthInput>

      <!-- 密码框 -->
      <AuthInput
        type="password"
        v-model="form.password"
        placeholder="密码"
        :rule="/^[0-9a-zA-Z]{3,12}$/"
        err_message="密码格式不正确"
      ></AuthInput>

      <AuthButton text="注册" @click="handleSubmit"></AuthButton>

      <span>
        有账号?
        <!-- <i>去注册</i> -->
        <router-link to="/login" class="jump" >去登录</router-link>
      </span>
    </div>
  </div>
</template>

<script>
// 导入input组件文件
import AuthInput from "@/components/AuthInput";
// 导入按钮组件
import AuthButton from "@/components/AuthButton";


export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        nickname: ""
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
      // 这里用到的请求方式是axios，下面是固有的属性和方法
      this.$axios({
        url: "/register",
        method: "POST",
        data: this.form
      }).then(res => {
        // 打印res查看返回的数据中，成功的提示是什么
        // console.log(res);
        const { message } = res.data;
        if (message === "注册成功") {
          this.$notify({
            type: "success",
            message: "注册成功"
          });
          // 成功后跳转到首页
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
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