// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import './commont/icon/font_1033391_bpdo2gvn8c/iconfont'


Vue.config.productionTip = false
Vue.prototype.$http = Axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
Vue.filter('dataset',
    function(time){
      let date = new Date(time)
      let timing =new Date().getTime() - date.getTime()
      if(timing<0){
        return ''
      }else if(timing/1000 <30){
        return '刚刚'
      }else if(timing/1000 <60){
        return `${parseInt(timing/1000)}秒前`
      }else if(timing/60000 <60){
        return `${parseInt(timing/60000)}分钟前`
      }else if(timing/3600000 <24){
        return `${parseInt(timing/3600000)}小时前`
      }else if(timing/86400000 <31){
        return `${parseInt(timing/86400000)}天前`
      }else if(timing/2592000000 <12){
        return `${parseInt(timing/2592000000)}月前`
      }else{
        return `${parseInt(timing/31536000000)}年前`
      }
    })
Vue.filter('state',
     function(post){
       if(post.good){
         return '精华'
       }else if(post.top){
         return '置顶'
       }else if(post.tab === 'ask'){
         return '问答'
       }else if(post.tab === 'share'){
         return '分享'
       }else{
         return '招聘'
       }
     }
    )