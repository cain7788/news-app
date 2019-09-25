<template>
  <div class="Edit_wrap">
    <HeaderNormal title="编辑资料"></HeaderNormal>
    <div class="head">
      <img :src="profile.head_img" alt />
    </div>
    <CellBar title="昵称" :text="profile.nickname"></CellBar>
    <CellBar title="密码" type="password" :text="profile.password"></CellBar>
    <CellBar title="性别" :text="profile.gender = 1?'男':'女'"></CellBar>
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";
import CellBar from "@/components/CellBar";
export default {
  components: {
    HeaderNormal,
    CellBar
  },
  data() {
    return {
      profile: []
    };
  },
  methods: {},

  mounted() {
    this.$axios({
      url: "/user_update/" + localStorage.getItem("user_id"),
      // 添加头信息
      headers: {
        Authorization: localStorage.getItem("token")
      },
      method: "POST"
    }).then(res => {
      console.log(res.data);
    const {data} = res.data;

    this.profile = data

    if(data){
        // 判断有没有头像
        if(data.head_img){
            this.profile.head_img = this.$axios.defaults.baseURL + this.profile.head_img;
            // console.log(this.profile.head_img);
        }else {
            this.profile.head_img = './static/default_img.jpg'
        }
    }
     
    });
  }
};
</script>

<style lang="less" scoped>
.Edit_wrap {
  .head {
    display: flex;
    justify-content: center;
    width: 100%;
    img {
      width: 70 / 360 * 100vw;
      height: 70 / 360 * 100vw;
      border-radius: 50%;
    }
  }
}
</style>