
// 导入app文件
import App from './App'
// 导入vue组件
import Vue from 'vue' 
// 导入下载好的路由文件
import VueRouter from 'vue-router'

// 导入页面
import Login from './page/Login.vue'
// import Register from './page/Register.vue'

// 注册模板标签
Vue.use(VueRouter)

// 配置路由
const routes = [
    // 配置页面路由
    {path:'/login',component:Login,},
    // {path:'register',component:Register}

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