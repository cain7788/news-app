<template>
  <div>
    <div class="header">
      <!-- 顶部导航 -->
      <div class="header-top">
        <span class="iconfont iconjiantou2" @click="$router.back()"></span>
        <i class="iconfont icon-news"></i>
        <em>已关注</em>
      </div>
      <!-- 标题部分 -->
      <div class="header-content">
        <h3>{{detail.title}}</h3>
        <div>
          <i>{{detail.user.nickname}}</i>&nbsp;&nbsp;
          <span>2019-9-29</span>
        </div>
      </div>
    </div>

    <!-- 内容部分 -->
    <div class="post-content">
      <div  v-html="detail.content"></div>
      <div class="post-btn">
        <div class="like">
          <i class="iconfont icondianzan"></i>
          <span>112</span>
        </div>
        <div class="wechat">
          <i class="iconfont iconweixin"></i>
          <span>微信</span>
        </div>
      </div>
    </div>

    <!-- 导入PostFooter部分 -->
    <PostFooter />
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
      detail:{}
    };
  },

  mounted() {
    const { id } = this.$route.params;
    
    this.$axios({
      url: "/post/" + id
    }).then(res => {
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

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // line-height: 36 / 360 * 100vw;

    span {
      font-size: 12px;
    }
    i {
      display: block;
      flex: 1;
      padding-left: 10px;
      font-size: 36px;
    }

    em {
      // display: block;
      width: 60 / 360 * 100vw;
      height: 22 / 360 * 100vw;
      line-height: 22 / 360 * 100vw;
      text-align: center;
      font-size: 12px;
      border-radius: 50px;
      border: 1px solid #ccc;
    }
  }

  .header-content {
    h3 {
      font-size: 16px;
      margin-bottom: 5px;
    }

    i,
    span {
      font-size: 14px;
      color: #666;
    }
  }
}

.post-content {
  font-size: 15px;
  padding: 10px 20px;
  line-height: 1.8;
  /deep/ img {
    max-width: 100%;
  }

  .post-btn {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin:20px 0 80px 0;

    .like,
    .wechat {
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
  }
}
</style>