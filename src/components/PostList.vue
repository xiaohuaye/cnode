<template>
  <div class="PostList">
    <div class="loading" v-if="isloading">
      <!-- 数据未返回时显示 -->
      <img src="../assets/loading.gif" > 
    </div>
    <div class="post-list-wrapper">
      <ul>
        <li class="topbar">
          <span>全部</span>
          <span>精华</span>
          <span>分享</span>
          <span>问答</span>
          <span>招聘</span>
        </li>
        <li class=".clearfix" v-for="(post,index) in posts" :key="index">
          <div>
            <img :src="post.author.avatar_url">
            <span v-text="post.reply_count" class="reply_count"></span>
            <span class="visit_count">/{{post.visit_count}}</span>
            <span :class="[{good:(post.good)},{top:(post.top)},share]">
              {{post | state}}
            </span>
            <router-link :to="{
              name:'artical', 
              params:{id:post.id,name:post.author.loginname}
              }">
              <span class="title">{{post.title}}</span>
            </router-link>
          </div>
          <span class="last_reply_at">{{post.last_reply_at | dataset}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>;

<script >
export default {
  name: 'PostList',
  data(){
    return {
      isloading: true,
      posts : [],
      share: 'share'
    }
  },
  methods:{
    getData(){
      this.$http.get('https://cnodejs.org/api/v1/topics',{
        params:{
          page: 1,
          limit: 20,
        }
      })
      .then((res)=>{
        this.isloading = false
        this.posts = res.data.data
        
      })
      .catch((error)=>{
        console.log(error)
      }
      )
    }
  },
  beforeMount(){
    this.isloading = true
    this.getData()
  },   
}
</script>;

<style scoped>
 .post-list-wrapper li{
   display: flex;
   align-items: center;
   justify-content: space-between;
   background-color: white;
   border-bottom: 1px solid #E1E1E1;
   /* line-height: 52px; */
   padding: 0 10px;
 }
 .post-list-wrapper li>div{
   display: flex;
   align-items: center;
 }
 .post-list-wrapper .reply_count{
   color:#9E78C0;
   margin-left: 5px;
   width: 30px;
   text-align: right;
 }
 .post-list-wrapper .topbar{
   display: flex;
   justify-content: flex-start;
   background-color:#F6F6F6;
   color: #80BD01;
 }
 .post-list-wrapper .topbar>span{
   font-size: 15px;
   margin: 11px 15px; 
 }
 .post-list-wrapper .visit_count{
   font-size: 10px;
   color: #AEAEAE;
   width: 30px;
 }
 .post-list-wrapper .last_reply_at{
   float: right;
   color: #AEAEAE;
   font-size: 12px;
 }
 .post-list-wrapper .share{
   background-color: #E5E5E5;
   border-radius: 2px;
   font-size: 12px;
   color: #A4A29B;
   display: inline-block;
   padding: 0 2px;
   margin: 14px 10px;
 }
 .post-list-wrapper .good{
   background-color: #80BD01;
   color: white;
 }
 .post-list-wrapper .top{
   background-color: #80BD01;
   color: white;
 }
  img{
    width: 30px;
    height: 30px;
    display: inline-block;
  }
</style>;