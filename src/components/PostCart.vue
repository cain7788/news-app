<template>
  <div>
    <!-- -------------------------------------------------------------- -->
    <!-- 第一：正常文章（1~2张图片）判断post中的cover数组数量 -->
    <div class="posts" v-if="post.cover.length > 0 && post.cover.length < 3 && post.type === 1">
      <div class="post-content">
        <router-link :to="`/post_detail/${post.id}`">
          <span>{{post.title}}</span>
        </router-link>
        <!-- 单图文章cover中只有一项数据,默认取0就可以了 -->
        <div class="post-img">
          <router-link :to="`/post_detail/${post.id}`">
            <img :src="post.cover[0].url" alt />
          </router-link>
        </div>
      </div>
      <div class="post-footer">
        <span>{{post.user.nickname}}</span>
        <i>{{post.comment_length}}跟帖</i>
      </div>
    </div>

    <!-- -------------------------------------------------------------- -->
    <!-- 第一：多图文章（1~2张图片）判断post中的cover数组数量>=3,但只显示3张 -->
    <div class="posts" v-if="post.cover.length >= 3">
      <div class="post-content addcss">
        <router-link :to="`/post_detail/${post.id}`">
          <span>{{post.title}}</span>
        </router-link>
        <router-link :to="`/post_detail/${post.id}`">
          <div class="postimgs">
            <img v-for="(item,index) in post.cover" :key="index" :src="item.url" v-if="index < 3" />
          </div>
        </router-link>
        <div class="post-footer">
          <span>{{post.user.nickname}}</span>
          <i>{{post.comment_length}}跟帖</i>
        </div>
      </div>
    </div>

    <!-- -------------------------------------------------------------- -->
    <!-- 第一：视频文章 判断post中的cover数组数量=1且type === 1 -->
    <div class="posts" v-if="post.cover.length === 1 && post.type === 2">
      <div class="post-content addcss">
        <router-link :to="`/post_detail/${post.id}`">
        <span>{{post.title}}</span>
        </router-link>
        <router-link :to="`/post_detail/${post.id}`">
        <div class="video">
          <img :src="post.cover[0].url" />
          <span class="video-layer">
            <i class="iconfont iconshipin"></i>
          </span>
        </div>
        </router-link>
        <div class="post-footer">
          <span>{{post.user.nickname}}</span>
          <i>{{post.comment_length}}跟帖</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostDetail from "@/page/PostDetail";
export default {
  components: {
    PostDetail
  },
  props: ["post"],
  // data(){
  //     return {

  //     }
  // },

  mounted() {
    // console.log(this.post);
  }
};
</script>

<style lang="less" scoped>
.posts {
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid #ddd;

  .post-content {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-bottom: 5px;

    > span {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: 1.5;
    }

    .post-img {
      img {
        display: block;
        object-fit: cover;
        width: 120 / 360 * 100vw;
        height: 75 / 360 * 100vw;
        margin-left: 10px;
      }
    }

    .postimgs {
      display: flex;
      justify-content: space-between;
      margin: 8px 0;
      img {
        display: block;
        width: 33%;
        height: 80 / 360 * 100vw;
        object-fit: cover;
      }
    }

    .video {
      position: relative;
      margin-bottom: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        display: block;
        width: 100%;
        height: 170 / 360 * 100vw;
      }

      .video-layer {
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        width: 46 / 360 * 100vw;
        height: 46 / 360 * 100vw;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        i {
          color: #fff;
          font-size: 30px;
        }
      }
    }
  }
  .addcss {
    flex-direction: column;
  }

  .post-footer {
    color: #aaa;
    font-size: 14px;
  }
}
</style>