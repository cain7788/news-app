<template>
  <div>
    <!-- 正常状态 -->
    <!-- 输入评论页脚, 这里显示隐藏必须要用v-show，原因是为了获得textare的dom元素,v-if的话就没办法获得dom元素了 -->
    <div class="footer" v-show="!isFocus">
      <input type="text" placeholder=" 点击评论 " @focus="handleFocus"/>
      <div class="comment">
        <em>{{post.comment_length}}</em>
        <span class="iconfont iconpinglun-"></span>
      </div>
      <!-- 收藏按钮 -->
      <i
        class="iconfont iconshoucang"
        @click="$emit('handleStar')"
        :class="{star_active:post.has_star}"
      ></i>
      <em class="iconfont iconfenxiang"></em>
    </div>

    <!-- 输入状态 -->
    <div class="footer-comment" v-show="isFocus">
      <!-- autofocus，当切换到文本框的时候自动获得焦点的属性 -->
      <textarea ref="textarea" rows="3" placeholder="发表您的评论" @blur="handleBlur" :autofocus="isFocus"></textarea>
      <span>发送</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],

  data() {
    return {
      // 初始化输入框焦点属性
      isFocus: false
    };
  },

  methods: {
    // 输入框获得焦点的时候
    handleFocus(){
      this.isFocus = true
    },

    // 文本框失去焦点的时候
    handleBlur(){
      this.isFocus = false

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
  background-color: #fff;
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
      background: rgba(255, 0, 0, 0.9);
      border-radius: 50px;
      padding: 0 3px;
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

.footer-comment {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background-color: #fff;
  padding: 5px 10px;

  textarea {
    width: 240 / 360 * 100vw;
    background: #eee;
    padding: 10px;
    box-sizing: border-box;
    border: none;
    border-radius: 8px;
    resize: none;
  }

  span {
    font-size: 12px;
    background: red;
    width: 60 / 360 * 100vw;
    height: 26 / 360 * 100vw;
    line-height: 26 / 360 * 100vw;
    color: #fff;
    text-align: center;
    border-radius: 50px;
    margin-right: 10px;
  }
}
</style>