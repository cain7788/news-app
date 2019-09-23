
<template>
  <div class="button" @click="handleClick"> 
      {{text}}
  </div>
</template>

<script>
export default {
    // 将按钮名称传进来，方便后期跳转到注册页面的时候更改
    props:["text"],

    methods:{
        handleClick(event){
            this.$emit("click",event)
            // console.log(event);
            
        }
    },
}
</script>

<style lang="less" scoped>
    .button {
        width:100%;
        height: 48 / 360 * 100vw;
        display: flex;
        margin-top: 20px;
        justify-content: center;
        align-items: center;
        background:#d81e06;
        color:#fff; 
        border-radius: 50px;
        font-style: 20px;
    }
</style>>

</style>