<template>
  <div>
    <!-- 普通文章的渲染 -->
    <div v-if="detail.type === 1">
      <div class="header">
        <!-- 顶部导航 -->
        <div class="header-top">
          <span class="iconfont iconjiantou2" @click="$router.back()"></span>
          <i class="iconfont icon-news"></i>
          <em v-if="detail.has_follow" @click="handleUnfollow">已关注</em>
          <em
            v-if="!detail.has_follow"
            :class="!detail.has_follow?'unfollow':''"
            @click="handleFollow"
          >关注</em>
        </div>
        <!-- 标题部分 -->
        <div class="header-content">
          <h3>{{detail.title}}</h3>
          <div class="post-nickname">
            <p>{{detail.user.nickname}} 2019-9-29</p>
          </div>
        </div>
      </div>

      <!-- 内容部分 -->
      <div class="post-content">
        <div v-html="detail.content"></div>
        <div class="post-btn">
          <div class="like" @click="handleLike" :class="{like_active:detail.has_like}">
            <i class="iconfont icondianzan" :class="{like_btn:detail.has_like}"></i>
            <span>{{detail.like_length}}</span>
          </div>
          <div class="wechat">
            <i class="iconfont iconweixin"></i>
            <a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#1">微信</a>
            <!-- <span>微信</span> -->
          </div>
        </div>
      </div>
    </div>

    <!-- 渲染视频文章页面 -->
    <div class="video-wrap" v-if="detail.type === 2">
      <video
        src="https://video.pearvideo.com/mp4/adshort/20191005/cont-1609088-14451996_adpkg-ad_hd.mp4"
        class="video"
        controls
        poster="https://image.pearvideo.com/cont/20191005/cont-1609088-12151293.png"
      ></video>

      <!-- 头像和关注功能 -->
      <div class="video-info">
        <div class="video-user">
          <img :src="$axios.defaults.baseURL + detail.user.head_img" />
          <span>{{detail.user.nickname}}</span>
        </div>

        <span class="focus" v-if="!detail.has_follow" @click="handleFollow">关注</span>
        <span class="focus focus_active" v-else @click="handleUnfollow">已关注</span>
      </div>

      <!-- 点赞和分享功能 -->
      <div class="video-btn">
        <div class="video-like" @click="handleLike" :class="{like_active:detail.has_like}">
          <i class="iconfont icondianzan" :class="{like_btn:detail.has_like}"></i>
          <span>{{detail.like_length}}</span>
        </div>
        <div class="video-wechat">
          <i class="iconfont iconweixin"></i>
          <a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#1">微信</a>
          <!-- <span>微信</span> -->
        </div>
      </div>
    </div>
    <!-- 导入PostFooter部分 -->
    <PostFooter :post="detail" @handleStar="handleStar" />
  </div>
</template>

<script>
// 导入底部评论栏目
import PostFooter from "@/components/PostFooter";

export default {
  components: {
    PostFooter
  },

  data() {
    return {
      detail: {
        user: {}
      }
    };
  },

  methods: {
    // 点击取消关注功能按钮
    handleUnfollow() {
      const id = this.detail.user.id;
      const config = {
        url: "/user_unfollow/" + id
      };

      if (localStorage.getItem("token")) {
        config.headers = {
          Authorization: localStorage.getItem("token")
        };
      }

      this.$axios(config).then(res => {
        const { message } = res.data;
        console.log(message);
        if (message === "取消关注成功") {
          // 取消关注成功后要将本地的数据更改为false
          this.detail.has_follow = false;

          this.$toast.success(message);
        }
      });
    },

    // 点击关注功能按钮
    handleFollow() {
      const id = this.detail.user.id;
      const config = {
        url: "/user_follows/" + id
      };

      if (localStorage.getItem("token")) {
        config.headers = {
          Authorization: localStorage.getItem("token")
        };
      }

      this.$axios(config).then(res => {
        const { message } = res.data;

        if (message === "已关注" || message === "关注成功") {
          console.log(message);
          // 关注成功后要将本地的数据更改为true
          this.detail.has_follow = true;

          this.$toast.success(message);
        }
      });
    },

    // 点赞功能
    handleLike() {
      // if(this.detail.has_like){
      //   this.$toast.success("你已经点过赞了哦~")
      //   return
      // }

      const id = this.detail.id;
      const config = {
        url: "/post_like/" + id
      };

      if (localStorage.getItem("token")) {
        config.headers = {
          Authorization: localStorage.getItem("token")
        };
      }

      // const id = this.detail.id;
      this.$axios(config).then(res => {
        const { message } = res.data;

        if (message === "点赞成功") {
          // 更改本地中的has_like的值
          this.detail.has_like = true;
          this.detail.like_length++;
          this.$toast.success(message);
        }

        if (message === "取消成功") {
          // 更改本地中的has_like的值
          this.detail.has_like = false;
          this.detail.like_length--;
          this.$toast.success(message);
        }
      });
    },

    // 收藏文章功能
    handleStar() {
      console.log(this.detail);
      const id = this.detail.id;
      this.$axios({
        url: "/post_star/" + id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const { message } = res.data;

        if (message === "收藏成功") {
          this.detail.has_star = true;
          this.$toast.success(message);
        }

        if (message === "取消成功") {
          this.detail.has_star = false;
          this.$toast.success(message);
        }
      });
    }
  },

  mounted() {
    const { id } = this.$route.params;

    const config = {
      url: "/post/" + id
    };

    if (localStorage.getItem("token")) {
      config.headers = {
        Authorization: localStorage.getItem("token")
      };
    }

    this.$axios(config).then(res => {
      const { data } = res.data;
      // 保存到详情
      this.detail = data;
      console.log(this.detail);
    });
  }
};
</script>

<style lang="less" scoped>
.header {
  padding: 0 20px 10px;
}
.header-top,
.video-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // line-height: 36 / 360 * 100vw;

  .video-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
    img {
      display: block;
      width: 40 / 360 * 100vw;
      height: 40 / 360 * 100vw;
      object-fit: cover;
      border-radius: 50%;
    }

    span {
      margin-left: 10px;
      font-size: 14px;
      color: #666;
    }
  }


  >span {
    font-size: 12px;
  }
  i {
    display: block;
    flex: 1;
    padding-left: 10px;
    font-size: 36px;
  }

  em,.focus {
    width: 60 / 360 * 100vw;
    height: 22 / 360 * 100vw;
    line-height: 22 / 360 * 100vw;
    text-align: center;
    font-size: 12px;
    border-radius: 50px;
    border: 1px solid #ccc;
  }
}

// 未关注时的关注按钮样式
.unfollow,
.focus_active {
  background-color: rgb(248, 72, 72);
  color: #fff;
  border: none;
}

.header-content {
  .post-nickname {
    p {
      font-size: 14px;
      color: #666;
    }
  }
  i,
  span {
    font-size: 14px;
    color: #666;
  }
}

.post-content,
.video-wrap {
  font-size: 15px;
  padding: 10px 15px;
  line-height: 1.8;
  /deep/ img {
    max-width: 100%;
  }

  
  // 视频盒子大小
  .video {
    display: block;
    width: 100%;
    height: 100%;
  }

  .post-btn,
  .video-btn {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px 0 80px 0;

    .like,
    .wechat,
    .video-wechat,
    .video-like {
      display: block;
      width: 70 / 360 * 100vw;
      height: 25 / 360 * 100vw;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 25 / 360 * 100vw;
      border-radius: 50px;
      

      i {
        font-size: 16px;
      }
    }

    .like_active {
      border: 1px red solid;
    }

    .like_btn {
      color: red;
    }
  }
}

</style>