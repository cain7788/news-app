<template>
  <div>
    <div class="footer" >
      <input type="text" placeholder=" 点击评论 " />
      <div class="comment">
        <em>{{post.comment_length}}</em>
        <span class="iconfont iconpinglun-"></span>
      </div>
      <!-- 收藏按钮 -->
      <i class="iconfont iconshoucang" @click="handleStar" :class="{star_active:post.has_star}"></i>
      <em class="iconfont iconfenxiang"></em>
    </div>
  </div>
</template>

<script>
export default {
  props:["post"],

  data(){
    return {

    }
  },

  methods:{
    handleStar(){
      console.log(this.post);
      const id = this.post.id
      this.$axios({
        url:"/post_star/" + id,
        headers:{
          Authorization: localStorage.getItem("token")
        }
      }).then(res=>{
        const {message} = res.data;
        
        if(message === "收藏成功"){
          this.post.has_star = true;
          this.$toast.success(message)
        }

        if(message === "取消成功"){
          this.post.has_star = false;
          this.$toast.success(message)
        }
      })
      
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 10px;
  background-color:#fff;
  box-sizing: border-box;
  font-size: 20px;

  input {
    // font-size: 12px;
    // border: none;
    // border-radius: 50px;
    width: 50%;
    height: 32 / 360 * 100vw;
    background: #eee;
    border: none;
    font-size: 12px;
    padding: 0 15px;
    border-radius: 50px;
  }

  .comment {
    position: relative;

    em {
      display: block;
      position: absolute;
      font-size: 10px;
      background: rgba(255, 0, 0, .9);
      border-radius: 50px;
      padding:0 3px; 
      top: -5px;
    }
  }
  .iconfont {
    font-size: 24px;
  }

  .star_active {
    color: rgb(255, 0, 0);
  }
}
</style>