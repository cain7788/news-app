<template>
  <div class="Edit_wrap">
    <HeaderNormal title="编辑资料"></HeaderNormal>
    <div class="head">
      <img :src="profile.head_img" alt />
    </div>

    <CellBar title="昵称" :text="profile.nickname" @click="show1 = !show1"></CellBar>
    <van-dialog title="编辑昵称" v-model="show1" show-cancel-button @confirm="handleNickname">
      <van-field :value="profile.nickname" placeholder="请输入昵称" v-model="nicknameCache" />
    </van-dialog>

    <CellBar title="密码" type="password" :text="profile.password"></CellBar>
    <CellBar title="性别" :text="profile.gender = 1?'男':'女'"></CellBar>
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";
import CellBar from "@/components/CellBar";
export default {
  components: {
    HeaderNormal,
    CellBar
  },
  data() {
    return {
      profile: [],

      show1: false,
      show2: false,
      show3: false,

      //   昵称临时值
      nicknameCache: "",
      passwordCache: "",
      genderCache: ""
    };
  },
  methods: {},

  mounted() {
    this.$axios({
      url: "/user_update/" + localStorage.getItem("user_id"),
      // 添加头信息
      headers: {
        Authorization: localStorage.getItem("token")
      },
      method: "POST"
    }).then(res => {
      //   console.log(res.data);
      const { data } = res.data;

      this.profile = data;

      //   输入框默认值
      this.nicknameCache = this.profile.nickname;
      this.passwordCache = this.profile.password;
      this.genderCache = this.profile.gender;

      if (data) {
        // 判断有没有头像
        if (data.head_img) {
          this.profile.head_img =
            this.$axios.defaults.baseURL + this.profile.head_img;
          // console.log(this.profile.head_img);
        } else {
          this.profile.head_img = "./static/default_img.jpg";
        }
      }
    });
  },

  methods: {
    //   点击确认输入框事件
    handleNickname() {
      //   console.log(value);
      // 点击确认后应该获取到当前输入框中的值，替换数据库中对应的值
      // console.log(this.nicknameCache);
    

      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "POST",
        // 添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {nickname:this.nicknameCache},
      }).then(res => {
        console.log(res);
        const {message} = res.data
        // 当修改成功的时候
        if(message === "修改成功"){
            console.log(123);
            
            // 替换当前数据当中的nickname
            this.profile.nickname = this.nicknameCache
            // 将提示弹窗
            this.$toast.success(message)
        }



      });
    }
  }
};
</script>

<style lang="less" scoped>
.Edit_wrap {
  .head {
    display: flex;
    justify-content: center;
    width: 100%;
    img {
      width: 70 / 360 * 100vw;
      height: 70 / 360 * 100vw;
      border-radius: 50%;
    }
  }
}
</style>