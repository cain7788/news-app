
<template>
  <!-- 这个文件是处理input输入框的组件 -->
  <div>
  <input class="input" 
        :class="{
          success:this.status === 'success',   //当status 状态为 success 的时候添加 success这个样式
          error:this.status === 'error'      
        }" 
        :placeholder="placeholder" 
        :value="value" 
        @input="handleInput" 
        @change="handleChange"
  />
  <!-- <input type="password" class="input" placeholder="密码" :value="value" @input="handleInput" /> -->
    </div>
</template>

<script>
export default {

  // 动态获取到父组件中传递的数据
  props: ["placeholder", "value", "name", "rule","err_message"],

    data(){
        return {
            status:""
        }
    },
//   添加事件
    methods:{
        // 每当用户在input中输入的时候触发,通过事件将数据传递给父组件
        handleInput(event){

          const {value} = event.target   // 将event.target中的value解构出来并且重新赋值
          // console.log(value);
           
            
            // 传递事件和数据给父组件
            this.$emit("input",value)
            // 每当在输入的时候，通过父组件传入的状态信息，覆盖到status当中用于判断输入框的样式.
            if(this.rule){   //首先判断有没有这个rule规则
              if(this.rule.test(value)){    // 使用父组件传入的rule判定当前value是否符合
                  // 当符合条件的时候，将status赋值为success
                  this.status = "success"
              } else {    // 否则赋值为error
                  this.status = "error"
              }
            }
            
            
            
        },

        // 当输入框失去焦点的时候触发
        handleChange(){
          if(this.err_message && this.status === 'error'){   // 当存在错误信息的时候
              alert(this.err_message);
              console.log(this.status);
          }
          
        }

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
    border-radius: 15px;
  }
  .success {
    border-bottom-color: rgb(64, 224, 131);
    box-shadow:0px 1px 0px  rgb(64, 224, 131);

  }

  .error {
    border-bottom-color: rgb(221, 20, 20);
    box-shadow:0px 1px 0px  rgb(221, 20, 20);
  }


</style>