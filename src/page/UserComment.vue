<template>
  <div>
    <HeaderNormal title="我的跟帖"></HeaderNormal>
    <div class="comment-list" v-for="(item,index) in comments" :key="index">
      <span class="time">2019-9-25 10:25</span>

      <div class="reply" v-if="item.parent">
        <i>回复：{{item.parent.user.nickname}}</i>
        <br />
        <span class="reply-from">{{item.parent.content}}</span>
      </div>

      <router-link to="#">
        <!--跳转原文链接还没定 -->
        <p class="reply-text">{{item.content}}</p>
        <div class="post">
          <span>原文：{{item.post.title}}</span>
          <i class="iconfont iconjiantou1"></i>
        </div>
      </router-link>
    </div>

    <div class="morecomments">更多跟帖</div>
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";
export default {
  components: {
    HeaderNormal
  },

  data() {
    return {
      comments: []
    };
  },

  mounted() {
    this.$axios({
      url: "/user_comments",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data);

      const { data } = res.data;

      this.comments = data;
    });
  }
};
</script>

<style lang="less" scoped>
.comment-list {
  padding: 10px 20px;
  font-size: 15px;
  color: #bbb;
  border-bottom: 2px solid #e4e4e4;

  .reply {
    padding: 10px;
    color: rgb(172, 172, 172);
    margin: 10px 0;

    background-color: #e4e4e4;
    width: 100%;

    > i {
      font-size: 14px;
      line-height: 1.8;
    }

    .reply-from {
      font-variant-east-asian: 14px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }

  .reply-text {
    color: rgb(37, 37, 37);
  }

  .post {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 10px;
    line-height: 20px;

    span {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      i {
        display: block;
        font-size: 20px;
      }
    }
  }
}

.morecomments {
  color: rgb(172, 172, 172);
  width: 100%;
  text-align: center;
  padding: 10px;
}
</style>