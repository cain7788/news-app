<template>
  <div>
      <div class="person-nav">
        <router-link to="/">
        <span>首页</span>
        </router-link>
      </div>

    <div class="pro_wrap">
      <router-link to="/editdata">
        <!--点击头部框跳转到编辑页面 -->
        <!-- 个人信息栏 -->
        <div class="profile">
          <img :src="profile.head_img" alt />
          <div class="promain">
            <span
              class="iconfont"
              :class="profile.gender===1?'iconxingbienan blue':'iconxingbienv red'"
            ></span>
            {{profile.nickname}}
            <br />
            <span class="time">2019-9-24</span>
          </div>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </router-link>

      <!-- 选项栏目 -->
      <router-link to="/user_follow">
        <CellBar title="我的关注" text="关注的用户"></CellBar>
      </router-link>

      <router-link to="/user-comment">
        <CellBar title="我的跟帖" text="跟帖/回复"></CellBar>
      </router-link>

      <CellBar title="我的收藏" text="文章/视频"></CellBar>

      <CellBar title="退出" @click="handleLogout"></CellBar>
    </div>
  </div>
</template>

<script>
import CellBar from "@/components/CellBar";

export default {
  data() {
    return {
      profile: []
    };
  },

  components: {
    CellBar
  },

  // 当页面加载的时候发送请求，获取到对应用户的信息数据渲染到页面上。
  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      // method:"GET",
      // 添加头信息
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      // console.log(this.$axios.defaults.baseURL);
      // 解构取出得到data
      const { data } = res.data;
      // 将data赋值给profile，可以根据this.profile直接拿到用户的其他信息
      this.profile = data;
      // console.log(this.profile.head_img);

      // 根据this.profile拿到用户的头像信息进行判断
      // 先判断有没有data，避免登录失败或者新用户登陆的时候报错
      if (data) {
        // 判断数据当中有没有头像图片
        if (data.head_img) {
          // 有的话则拼接路径,基准路径（http://localhost:3000）+ 文件地址
          this.profile.head_img =
            this.$axios.defaults.baseURL + this.profile.head_img;
          // console.log(this.profile.head_img);
        } else {
          // 没有头像的话路径为默认头像的路径
          this.profile.head_img = "./static/default_img.jpg";
        }

        // return this.profile.head_img
      }
    });
  },

  methods: {
    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");

      // 删除后替换成登录页
      this.$router.replace("/login");
    }
  }
};
</script>

<style lang="less" scoped>
.person-nav {
  width: 100%;
  // height: 30px;
  // background-color: #f97979;
  padding: 5px 20px;
  border-bottom: 1px solid rgb(211, 211, 211);

  span {
    padding: 3px 0;
    text-align: center;
    display: block;
    width: 50px;
    background-color: rgb(170, 170, 170);
    color: #fff;
    border-radius: 15px;
  }
}
.pro_wrap {
  height: 100%;
  // background-color: #f2f2f2;

  .profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
    border-bottom: 5px #ddd solid;

    img {
      display: block;
      width: 70 / 360 * 100vw;
      height: 70 / 360 * 100vw;
      object-fit: cover;
      border-radius: 50%;
    }

    .promain {
      flex: 1;
      text-align: left;
      padding: 0 10px;

      // .sex {
      //   color: #75b9eb;
      // }
      .blue {
        color: #75b9eb;
      }

      .red {
        color: red;
      }

      .time {
        padding-left: 5px;
        font-size: 15px;
        color: #bbb;
      }
    }

    > span {
      font-size: 20px;
      color: #bbb;
    }
  }
}
</style>