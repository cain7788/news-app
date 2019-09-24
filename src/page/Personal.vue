<template>
  <div class="pro_wrap" >
      <!-- 个人信息栏 -->
    <div class="profile">
        <img src="../../static/default_img.jpg" alt="">
        <div class="promain">
            <span class="sex iconfont iconxingbienan"></span>
            沙雕网友<br>
            <span class="time">2019-9-24</span>
        </div>
        <span class="iconfont iconjiantou1"></span>
    </div>

    <!-- 选项栏目 -->
    <CellBar title="我的关注" text="关注的用户"></CellBar>

    <CellBar title="我的跟帖" text="跟帖/回复"></CellBar>

    <CellBar title="我的收藏" text="文章/视频"></CellBar>

    <CellBar title="退出"></CellBar>

  </div>
</template>

<script>
import CellBar from '@/components/CellBar'

export default {

    components : {
        CellBar,
    },

    methods:{

    }
}
</script>

<style lang="less" scoped>

    .pro_wrap {
        height: 100%;
        // background-color: #f2f2f2;

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

                .time {
                    padding-left: 5px;
                    font-size: 15px;
                    color: #bbb;
                }

            }

            >span {
                font-size: 20px;
                color: #bbb
            }

            
        }
    }

</style>