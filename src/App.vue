

<template>

<!-- App.vue这个页面是用来存放公共部分的代码，公共样式，公共页面等 -->
    
    <div>
        <!-- 组件占位符，提供坑位用于子组件的渲染 -->
        <router-view></router-view>

    </div>
    
    
</template>


<script>


export default {
    
    data(){
        return {
            
        }
    }
}
</script>




<style lang="less">
// 在这写上所有页面的公共样式（初始化样式）

// 导入字体图标，使用原生import方法导入网上链接地址
@import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');

@import url("../node_modules/vant/lib/index.css");

    * {
        margin: 0;
        padding: 0;
    }
    a {
        // a标签属性的继承
        color: inherit
    }
    a:hover {
        text-decoration: none;
    }
    ul,li,ol {
        list-style: none;
    }
    i,em {
        // 初始化掉原本的样式，以提供更多可使用的标签
        font-style: normal;
    }


</style>