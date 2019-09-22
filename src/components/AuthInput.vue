
<template>
  <!-- 这个文件是处理input输入框的组件 -->
  <div>
  <input type="text" class="input" placeholder="手机号码" :value="value" @input="handleInput" />
  <input type="password" class="input" placeholder="密码" :value="value" @inputpwd="handleInput" />
    </div>
</template>

<script>
export default {

  // 动态获取到父组件中传递的数据
  props: ["placeholder", "value", "name", "rule"],

    // data(){
    //     return {
    //         list:[]
    //     }
    // },
//   添加事件
    methods:{
        // 每当用户在input中输入的时候触发,通过事件将数据传递给父组件
        handleInput(event){
            var obj = {}
            this.$emit("input",event.target.value)
            console.log(event.target.value);
            
        },

    }
};
</script>

<style scoped lang="less">
 .input {
    // width:100%;
    width:354px;
    // height: 38 / 360 * 100vw;
    height:30px;
    padding:10px 20px;
    box-sizing: border-box;
    background: #fff;
    border:none;
    border-bottom: 1px #666 solid;
    outline: none;
    font-size: 18px;
    margin-top: 15px;
  }


</style>