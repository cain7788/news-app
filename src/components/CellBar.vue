<template>
  <div class="cell_wrap" @click="$emit('click',$event)">    
      <div class="cell">
          <span>{{title}}</span>
          <i>{{type === "password"?"******":text}}</i>
          <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>

export default {
    props:[
        "title",
        "text",
        "type",
    ]

}
</script>

<style lang="less" scoped>
    .cell_wrap {
        padding: 8px 0 0 15px;

        .cell {
            font-size: 15px;
            padding: 12px 10px 12px 0;
            display: flex;
            justify-content: space-between;
            align-content: center;
            border-bottom: 1px solid #ccc;
            color: rgb(68, 68, 68);

            i {
                flex:1;
                text-align: right;
                padding-right: 10px;
                color: #aaa;
                font-size: 14px;
            }
        }
    }


</style>