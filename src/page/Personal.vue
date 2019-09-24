<template>
  <div class="pro_wrap" >
      <!-- 个人信息栏 -->
    <div class="profile">
        <img src="../../static/default_img.jpg" alt="">
        <div class="promain">
            <span class="sex iconfont iconxingbienan"></span>
            沙雕网友<br>
            <span>2019-9-24</span>
        </div>
        <span class="iconfont iconjiantou1"></span>
    </div>

    <!-- 选项栏目 -->


  </div>
</template>

<script>

export default {

}
</script>

<style lang="less" scoped>

    .pro_wrap {
        height: 100%;
        background-color: #f2f2f2;

        .profile {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 10px;
            border-bottom: 5px #ddd solid;

            img {
                display: block;
                width: 70 / 360 * 100vw;
                height: 70 / 360 * 100vw;
                border-radius: 50%
            }

            .promain {
                flex:1;
                text-align: left;
                padding: 0 10px;

                .sex {
                color: #75b9eb
                }

            }

            >span {
                font-size: 20px;
                color: #bbb
            }

            
        }
    }

</style>