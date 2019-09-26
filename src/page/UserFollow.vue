<template>
  <div>
    <HeaderNormal title="我的关注"></HeaderNormal>
    <div v-for="(item,index) in follow" :key="index" class="follow_list">
      <img :src="$axios.defaults.baseURL+item.head_img" alt />
      <div class="follow_content">
        <p>{{item.nickname}}</p>
        <span class="time">2019-9-26</span>
      </div>
      <div class="unfollow" @click="unfollow(index)" >取消关注</div>
    </div>
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";
export default {
  data() {
    return {
      follow: []
    };
  },

  components: {
    HeaderNormal
  },

  mounted() {
    this.$axios({
      url: "/user_follows",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data);

      const { data } = res.data;

      this.follow = data;
    });
  },

  methods: {
    unfollow(index) {

        const id = index
      //   console.log(123);
      this.$axios({
        url: "/user_unfollow/" + id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res=>{
        //   console.log(res.data);
          const {message} = res.data;

          if(message === "取消关注成功"){
            //   因为页面的渲染时根据本地当中的follow遍历渲染的，所以我们更改本地中的follow也是可以实现删除刷新的
            this.follow.splice(index,1)

              this.$toast.success(message)
          }

          
      })
    }
  }
};
</script>

<style lang="less" scoped>
.follow_list {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 12px 20px;
  border-bottom: 1px solid #eee;

  img {
    display: block;
    width: 40 / 360 * 100vw;
    height: 40 / 360 * 100vw;
    object-fit: cover;
    border-radius: 50%;
  }

  .follow_content {
    flex: 1;
    text-align: left;
    margin-left: 10px;

    .time {
      font-size: 14px;
      color: #aaa;
    }
  }

  .unfollow {
    display: block;
    width: 76px;
    height: 26px;
    font-size: 12px;
    text-align: center;
    padding: 5px 10px;
    background-color: #eee;
    border-radius: 14px;
  }
}
</style>