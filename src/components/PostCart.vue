<template>
  <div class="posts">
    <!-- 第一：正常文章（1~2张图片） -->


    <div class="post-content">
      <span>{{post.title}}</span>
      <img
        src="https://hbimg.huabanimg.com/838c45038f94015578740daa35b06d3cb9d92eb829ec3-01bYld_fw658"
        alt
      />
    </div>


    <div class="post-footer">
      <span>火星时报</span>
      <i>100跟帖</i>
    </div>
  </div>
</template>

<script>

export default {
    props:['post'],
    // data(){
    //     return {

    //     }  
    // },

    mounted(){
        console.log(this.post);
        
    }
};
</script>

<style lang="less" scoped>
.posts {
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid #ddd;

  .post-content {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-bottom: 5px;

    > span {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: 1.7;
    }

    img {
      display: block;
      object-fit: cover;
      width: 120 / 360 * 100vw;
      height: 75 / 360 * 100vw;
      margin-left: 10px;
    }
  }

  .post-footer {
    color: #aaa;
    font-size: 14px;
  }
}
</style>