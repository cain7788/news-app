
// 导入app文件
import App from './App'
// 导入vue组件
import Vue from 'vue' 
// 导入下载好的路由文件
import VueRouter from 'vue-router'
// 导入vant组件
import Vant from 'vant'    // 这个组件会将所有的方法都加载到prototype原型当中，由此可以通过this.获取到所有方法和属性

// 导入axios
import axios from "axios";

// 导入页面
import Login from '@/page/Login.vue'
// 添加注册页面
import Register from '@/page/Register.vue'


// 注册模板标签
Vue.use(VueRouter);
Vue.use(Vant);

// 把axios挂载到原型
Vue.prototype.$axios = axios; // this.$axios   挂载到Vue的原型上后，可以使用this.$axios 调用请求

// 基准路径，以后每次请求都会自动在前面加上该路径
axios.defaults.baseURL = "http://localhost:3000";


// 配置路由
const routes = [
    // 配置页面路由
    {path:'/login',component:Login},
    {path:'/register',component:Register}

]

var router = new VueRouter({
    routes
})


new Vue({
    el:"#app",
    // data:{
    //     msg:"hello webpack and vue"
    // },
    render(createElement){
        return createElement(App)
    },
    router
})