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
        <!-- 渲染文章列表 -->
        <!-- 插入vant的list插件实现加载功能 -->
        <!-- immediate-check 禁止list立即出发onload -->
        <!-- 给每个栏目都加上了独立的四个属性之后，要使用item.找到对应的属性 -->
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <!-- 调用组件渲染 -->
          <!-- 注意当前传递到子组件的数据是:post="item",是每一项 -->
          <PostCart 
          v-for="(item,index) in item.posts" 
          :key="index" 
          :post="item"
          ></PostCart>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import PostCart from "@/components/PostCart";
export default {
  components: {
    PostCart
  },
  data() {
    return {
      categorys: [],
      active: localStorage.getItem("token") ? 1 : 0, //判断，当登陆状态的时候，在头条左边显示关注栏目，头条
      // 的id为1，所以active为1.反之没有关注栏目则为0.
      cid: 999,

      // ----------------------------------------------------------------------
      // posts: [], //注意,这里的文章列表是每个栏目自己的文章列表.
      // 刚加载页面的时候不立即执行加载数据，是否在加载,加载完毕后需要手动变为false
      // loading: false,
      // 默认为false，数据没有加载完成，是否有更多数据，如果加载完所有的数据，改为true
      // finished: false,
      // 设置后台数据：pageindex：显示当前页码、
      pageIndex: 1,
      // ----------------------------------------------------------------------

      // 设置后台数据：pagesize：设置每页显示的数据条数
      pageSize: 5 // 在发送请求的时候将这两个参加传进去，返回的数据就会分好页面。
    };
  },

  watch: {
    // 监听当前active的状态，表明当前是哪一块栏目，则应该对应显示该栏目的内容
    // 监听active
    active() {
      // 当变更栏目的时候取到对应栏目数据的id赋值给当前的cid。后面根据cid显示对应的内容
      this.cid = this.categorys[this.active].id;
      // console.log(this.cid);
      this.onLoad()
    }
  },

  mounted() {
    console.log(123);
    
    const config = { url: "/category" };
    // 将验证用户是否登陆的模块提取出来,判断当本地中有token的时候才执行验证,否则不验证
    // 将headers这个限制放在config对象里面,添加一个属性,因在在请求中无法添加判断,所以提取出来.后面直接请求config就可以了.
    if (localStorage.getItem("token")) {
      config.headers = {
        Authorization: localStorage.getItem("token")
      };
    }

    // 请求栏目列表
    this.$axios(config, {
      // url:"/category",
      // headers:{
      //   Authorization: localStorage.getItem("token")
      // }
    }).then(res => {
      const { data } = res.data;

      // 取到所有栏目的数据
      // this.categorys = data;
      // 当前栏目中的list中的属性（加载插件）是公共的，应该是要独立的，将这些属性提取到每一个栏目当中
      const newData = []
      // 循环给栏目中的每一项都加上四个独立的属性
      data.forEach(item=>{
        // 在item原有的数据当中添加属性
        item.posts = [];
        item.loading = false;
        item.finished = false;
        item.pageIndex = 1;
        newData.push(item)
      })

      // 保存栏目列表
      this.categorys = newData
      console.log(this.categorys);
      
    });

    // 请求文章列表
    this.$axios({
      // 通过es6拼接,获取对应cid栏目中的文章,
      url: `/post?category=${this.cid}&pageSize=${this.pageSize}&pageIndex=${this.pageIndex}`
    }).then(res => {
      const { data } = res.data;
      // 将文章列表赋值给post
      this.categorys[this.active].posts = data;
      
      // 页数加一
      this.categorys[this.active].pageIndex++;
    });
  },

  methods: {
    // 思路：当滑动到一定位置的时候，触发onload事件，触发后重新请求post数据
    // 判断数据的长度是否小于pagesize（每页显示数据条数），如果小于，则已经没有数据了
    // 就提示已经加载完毕，this.finished = true;已经加载完。如果还有数据的话则达到
    // onload条件继续触发，继续判断。
    onLoad() {

      // this.active为当前活动的栏目id
      const category  = this.categorys[this.active]
      // 延时执行加载
      setTimeout(() => {
        this.$axios({
          // 添加pagesize=5之后，每次取回的res.data都是为5条和前面不同的数据
          url: `/post?category=${this.cid}&pageSize=${this.pageSize}&pageIndex=${category.pageIndex}`
        }).then(res => {
          const { data } = res.data;
          // console.log(data,this.pageSize,data.length);
  
          // 此时判断是否还有数据未加载,data为重新请求回来的第二页数据
          if(data.length < this.pageSize){
            
            // 说明数据已经加载完毕，将finished设置为true
            category.finished = true;
          }

          // 将当前取回的数据添加到一个总数据库当中，累加，因为前面的数据还是需要加载显示的
          category.posts= [...category.posts,...data];
          // this.posts.create(data)
  
          // 此时已经加载新的一页了，pageindex要+1
          category.pageIndex++;

          // 当前的数据已经加载完毕，应当将loading设置为false，否则会一直加载中
          category.loading = false;
        });
      }, 2000);
    }
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
    width: 210 / 360 * 100vw;
    height: 30 / 360 * 100vw;
    justify-content: center;
    align-items: center;
    background-color: #f97979;
    border-radius: 15px;
    font-size: 15px;
  }
  > span {
    font-size: 20px;
  }
}

// /deep/ .van-tabs__nav{
//        background:#f6f6f6;
//   }
</style>