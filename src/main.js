
// 导入app文件
import App from './App'
// 导入vue组件
import Vue from 'vue' 
// 导入下载好的路由文件
import VueRouter from 'vue-router'
// 导入vant组件
import Vant from 'vant'    // 这个组件会将所有的方法都加载到prototype原型当中，由此可以通过this.获取到所有方法和属性
import {Toast} from 'vant'

// 导入axios
import axios from "axios";

// 导入页面
import Login from '@/page/Login.vue'
// 添加注册页面
import Register from '@/page/Register.vue'
// 添加个人中心页面
import Personal from '@/page/Personal.vue'
// 添加编辑个人信息页面
import EditData from '@/page/EditData.vue'
// 添加我的关注页面
import UserFollow from '@/page/UserFollow.vue'
// 添加我的跟帖页面
import UserComment from '@/page/UserComment.vue'


// 前台页面
// 首页
import Index from '@/page/Index.vue'
// 文章详情页面
import PostDetail from '@/page/PostDetail.vue'


// 注册模板标签
Vue.use(VueRouter);
Vue.use(Vant);

// 把axios挂载到原型
Vue.prototype.$axios = axios; // this.$axios   挂载到Vue的原型上后，可以使用this.$axios 调用请求

// 基准路径，以后每次请求都会自动在前面加上该路径
axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.baseURL = "http://172.20.10.2:3000";


// 配置路由
const routes = [
    // 配置页面路由
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/personal',component:Personal},
    {path:'/editdata',component:EditData},
    {path:'/user_follow',component:UserFollow},
    {path:'/user-comment',component:UserComment},
    {path:'/',component:Index},
    {path:'/post_detail',component:PostDetail},
    
]

var router = new VueRouter({
    routes
})

// 添加一个路由守卫，能够将所有页面跳转路由拦截进行处理
// to要跳转之后的页面,去哪里
// from跳转之前的页面，来自哪里
// next 必须要调用next()。调用才会执行跳转，还可以重定向，next("/login")
router.beforeEach((to,from,next)=>{
    // 所有的路由请求都会经过这里，我们需要进行筛选，只能已经登录过了的才能跳转到登录后才能看到的页面
    // 判断的标准是是否存在token

    // 取到本地中的token
    const hasToken = localStorage.getItem("token")
    // 先判断的是想要跳转的页面是不是个人页面,获取跳转属性位to.path
    if(to.path === "/personal"){
    
        // 判断是否存在token
        if(hasToken){
            // 正常跳转
            next()
        } else {
            // 没有token，跳转到登录页
            next("/login")
        }
    } else {   // 跳转目标链接不是个人页面的时候
        next()  // 正常跳转
    }
})

// 创建axios的统一拦截器，拦截响应
// 固定的声明
axios.interceptors.response.use(res => {
    // 解构出message和statusCode
    const {message,statusCode} = res.data;

    // 判断状态
    if(statusCode === 401){
        Toast.fail(message);
    }

    // 添加token判断，当token改变或者过期的时候
    if(message === "用户信息验证失败"){
        // 跳转回登录页
        touter.push('/login')
    }

    // 将截取到的res返回，保证程序正常运行
    return res
})





new Vue({
    el:"#app",
    render(createElement){
        return createElement(App)
    },
    router
})