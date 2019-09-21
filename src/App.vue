
<template>
    <div class="red">
        {{msg}}<br>
        <router-link to="/login">
        <button class="btn">点击登录</button>
        </router-link>

        <router-view></router-view>
    </div>
    
    
</template>

<script>
export default {
    
    data(){
        return {
            msg:"我是第一个单文件组件"
        }
    }
}
</script>

<style>
    .red {
        color:red;
    }
    .btn {
        width: 70px;
        height: 20px;
    }
</style>