<template>
  <div>
    <!-- 头部搜索栏 -->
      <div class="head_nav">
          <span class="iconfont icon-news logo"></span>
          <!-- 跳转到搜索页面 -->
          <router-link to="#">
          <div class="head_search">
            <span class="iconfont iconsearch"></span>
            <i>搜索新闻</i> 
          </div>
          </router-link>
          <span class="iconfont iconwode"></span>
      </div>

    <!-- 导航栏 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab v-for="(item,index) in categorys" :title="item.name" :key="index">
        <!-- <p v-for="index in 100" :key="index">内容 {{ index }} </p>  -->
        <!-- 渲染文章列表 -->
        
        
        <!-- 调用组件渲染 -->
        <PostCart>


        </PostCart>
        


        





      </van-tab>
</van-tabs>


  </div>
</template>

<script>
import PostCart from '@/components/PostCart'
export default {
  components:{
    PostCart,
  },
  data(){
    return {
      categorys:[],
      active:localStorage.getItem("token")?1:0,     //判断，当登陆状态的时候，在头条左边显示关注栏目，头条
                                                    // 的id为1，所以active为1.反之没有关注栏目则为0.
      cid:999,
    }
  },

  watch:{
    // 监听当前active的状态，表明当前是哪一块栏目，则应该对应显示该栏目的内容
    // 监听active
    active(){
        // 当变更栏目的时候取到对应栏目数据的id赋值给当前的cid。后面根据cid显示对应的内容
        this.cid = this.categorys[this.active].id
        // console.log(this.cid);
    }
  },

  mounted(){

    const config = {url:"/category"}
    // 将验证用户是否登陆的模块提取出来,判断当本地中有token的时候才执行验证,否则不验证
    // 将headers这个限制放在config对象里面,添加一个属性,因在在请求中无法添加判断,所以提取出来.后面直接请求config就可以了.
    if(localStorage.getItem("token")){
      config.headers={
        Authorization: localStorage.getItem("token")
      }
    }
      
    this.$axios(config,{
      // url:"/category",
      // headers:{
      //   Authorization: localStorage.getItem("token")
      // }
    }).then(res=>{
      console.log(res.data);
      const {data} = res.data;

      this.categorys = data

    })
  }

}
</script>

<style lang="less" scoped>

  .head_nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    background-color: #ff4b4b;
    line-height: 49 / 360 * 100vw;
    color: #fff;

    .logo {
      
      font-size: 44 / 360 * 100vw;
    }

    .head_search {
      display: flex;
      flex: 1;
      width: 210 / 360 *100vw;
      height: 30 / 360 * 100vw;
      justify-content: center;
      align-items: center;
      background-color: #f97979;
      border-radius: 15px;
      font-size: 15px;

    }
    >span {
        font-size: 20px;
      }
  }

  // /deep/ .van-tabs__nav{
  //        background:#f6f6f6;
  //   }

</style>