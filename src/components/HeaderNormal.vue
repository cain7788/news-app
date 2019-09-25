<template>
      <div class="header"> 
        <span class="iconfont iconjiantou2" @click="$router.back()"></span>
        <i>{{title}}</i>
        <span class="iconfont iconjiantou2"></span>
        <!-- <img src="../../static/defaule_img.jpg" alt=""> -->
      </div>
</template>

<script>
export default {

    props:["title"]
}
</script>

<style lang="less" scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-content: center;
        padding: 20px;
        line-height: 21px;

        span:last-child {
            opacity: 0;
        }
    }


</style>