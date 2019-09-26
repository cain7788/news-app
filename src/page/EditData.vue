<template>
  <div class="Edit_wrap">
    <HeaderNormal title="编辑资料"></HeaderNormal>
    <div class="head">
      <img :src="profile.head_img" alt />
      <van-uploader :after-read="afterRead" class="afterRead" />
    </div>

    <!-- 编辑昵称 -->
    <CellBar title="昵称" :text="profile.nickname" @click="show1 = !show1"></CellBar>
    <van-dialog title="编辑昵称" v-model="show1" show-cancel-button @confirm="handleNickname">
      <van-field :value="profile.nickname" placeholder="请输入昵称" v-model="nicknameCache" />
    </van-dialog>

    <!-- 编辑密码 -->
    <CellBar title="密码" type="password" :text="profile.password" @click="show2 = !show2"></CellBar>
    <van-dialog title="编辑昵称" v-model="show2" show-cancel-button @confirm="handlePassword">
      <van-field :value="profile.password" placeholder="请输入密码" v-model="passwordCache" />
    </van-dialog>

    <!-- 编辑性别 -->
    <CellBar title="性别" :text="profile.gender === '1'?'男':'女'" @click="show3 = !show3"></CellBar>

    <van-dialog title="修改性别" v-model="show3" show-cancel-button @confirm="handleGender">
      <van-radio-group v-model="genderCache">
        <van-cell-group>
          <van-cell title="男" clickable @click="genderCache = '1'">
            <van-radio slot="right-icon" name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="genderCache = '0'">
            <van-radio slot="right-icon" name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
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
      profile: {},

      show1: false,
      show2: false,
      show3: false,

      //   昵称临时值
      nicknameCache: "",
      passwordCache: "",
      genderCache: ""
    };
  },

  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      // 添加头信息
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      //   console.log(res.data);
      const { data } = res.data;
      //   console.log(res);
      if (data) {
        //   保存到data
        this.profile = data;

        //   输入框默认值
        this.nicknameCache = this.profile.nickname;
        this.passwordCache = this.profile.password;
        this.genderCache   = String(this.profile.gender);
        // console.log(data.gender);

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
    // 封装修改后台数据的请求方法,调用的时候要在前面添加this调用
    editProfile(data, callback) {
      // 先判断是否存在data，没有的话就不用继续执行了
      if (!data) return;

      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "POST",
        // 添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data
      }).then(res => {
        const { message } = res.data;
        // 当修改成功的时候
        if (message === "修改成功") {
          // 替换当前数据
          if (callback) {
            callback();
          }
          // this.profile.nickname = this.nicknameCache
          // 将提示弹窗
          this.$toast.success(message);
        }
      });
    },

    // 上传图片——————————————————————————————————————————————————————————————————————————————————————————
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      //console.log(file);        //选择图片后会返回一个对象，包含了生成的

      // 构造表单数据
      const formData = new FormData();
      // 通过表单使用append方法追加数据
      formData.append("file", file.file);

      this.$axios({
        url: "/upload",
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: formData
      }).then(res => {
        // console.log(res);

        const { data } = res.data;

        //替换掉用户资料的头像
        this.profile.head_img = this.$axios.defaults.baseURL + data.url;

        // 到现在为止，提交了图片给服务器保存并且返回了路径在页面上渲染，接着我们还要替换掉用户数据中的头像路径
        this.$axios({
          url: "/user_update/" + localStorage.getItem("user_id"),
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token")
          },
          // 将当前的图片地址替换掉用户中的头像地址
          data: { head_img: data.url }
        }).then(res => {
          const { message } = res.data;

          if (message === "修改成功") {
            this.$toast.success(message);
          }
        });
      });
    },

    // ____________________________________________________________________________________________
    //   点击确认输入框事件
    handleNickname() {
      //   console.log(value);
      // 点击确认后应该获取到当前输入框中的值，替换数据库中对应的值
      // console.log(this.nicknameCache);

      this.editProfile({ nickname: this.nicknameCache }, () => {
        this.profile.nickname = this.nicknameCache;
      });
    },

    handlePassword() {
      this.editProfile({ password: this.passwordCache });
    },

    // 修改性别
    handleGender(){
        
        this.editProfile({gender:this.genderCache},()=>{
          this.profile.gender = String(this.genderCache)
        })
    },
  }
};
</script>

<style lang="less" scoped>
.Edit_wrap {
  .head {
    display: flex;
    justify-content: center;
    // width: 100%;
    position: relative;

    .afterRead {
      position: absolute;
      opacity: 0;
    }
    img {
      width: 70 / 360 * 100vw;
      height: 70 / 360 * 100vw;
      border-radius: 50%;
    }
  }
  // 如果要修改第三方组件库的样式时候，需要在前面加上/deep/， 因为组件库的样式不受scoped的影响
  /deep/ .van-uploader__upload {
    margin: 0;
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
  }
}
</style>