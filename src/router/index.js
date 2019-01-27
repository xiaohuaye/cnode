import Vue from 'vue'
import Router from 'vue-router'
import PostList from '../components/PostList'
import Artical from '../components/Artical'
import UserInfo from '../components/UserInfo';

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'root',
      path:'/',
      components:{
        main:PostList
      }
    },
    {
      name:'artical',
      path:'/topic/:id',
      components:{
        main:Artical
      }
    },
    {
      name:'userinfo',
      path:'/user/:username',
      components:{
        main:UserInfo
      }
    }
  ]
})
