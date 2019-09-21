
import App from './App'

import vue from 'vue' 



new vue({
    el:"#app",
    data:{
        msg:"hello webpack and vue"
    },
    render(createElement){
        return createElement(App)
    }
})