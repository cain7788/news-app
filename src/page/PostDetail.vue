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
        <h3>车主注意啦！啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦</h3>
        <div>
          <i>火星情报局</i>&nbsp;&nbsp;
          <span>2019-9-29</span>
        </div>
      </div>
    </div>

    <!-- 内容部分 -->
    <div class="post-content">
      为营造临时泊位“干静、整洁、平安、有序”面貌迎国庆，
      市交通部门拟在9月下旬对部分城市道路临时泊位进行清洁保养，
      请市民群众配合在清洁保养期间将车辆驶离泊位。第一阶段临时泊位清洁保养计划（涉及17条路段）：
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
    <PostFooter/>
  </div>
</template>

<script>
// 导入底部评论栏目
import PostFooter from '@/components/PostFooter'

export default {
  components:{
    PostFooter,
  },

  data(){
    return {

    }
  },

  // mounted(){

  //   console.log(123);
  //   const {id} = this.$route.params;

  //   console.log(id);
  //   this.$axios({
  //     url:"/post/" + id,
  //   }).then(res=>{
  //       console.log(res);
        
      
  //   })
  // }
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
        width:60 / 360 * 100vw;
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

      i,span {
        font-size: 14px;
        color: #666;
      }
    }
  }

  .post-content {
    font-size: 15px;
    padding: 10px 20px;
    line-height: 1.8;

    .post-btn {
      width:100%;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .like,.wechat {
        display: block;
        width:70 / 360 * 100vw;
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