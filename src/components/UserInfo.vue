<template>
  <div class="userinfo">
    <div class="loading" v-if="isloading">
      <!-- 数据未返回时显示 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-loading"></use>
      </svg>
    </div>
    <div v-else class="user-ind">
      <ul class="ul-plate">
        <li>
          <router-link to="/">
            <span>主页</span>
          </router-link>
        </li>
        <li class="base">
          <div>
            <img :src="useinfo.avatar_url">
            <span>{{useinfo.loginname}}</span>
          </div>
          <div>{{useinfo.score}}积分</div>
          <div class="github">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-git"></use>
            </svg>
             @{{useinfo.githubUsername}}
          </div>
          <div class="data">注册时间{{useinfo.create_at | dataset}}</div>
        </li>
      </ul>
      <ul class="ul-plate">
        <li>
          <span>最近创建的话题</span>
        </li>
        <li v-for="(topic,index) in useinfo.recent_topics" :key="index">
          <img :src="topic.author.avatar_url">
          <router-link :to="{name:'artical',params:{
            id:topic.id,
            name:topic.author.loginname
          }}">
            <span class="title">{{topic.title}}</span>
          </router-link>
          <span class="data">最后回复{{topic.last_reply_at|dataset}}</span>
        </li>
      </ul>
      <ul class="ul-plate">
        <li>
          <span>最近参与的话题</span>
        </li>
        <li v-for="(topic,index) in useinfo.recent_replies" :key="index">
          <img :src="topic.author.avatar_url">
          <router-link :to="{name:'artical',params:{
            id:topic.id,
            name:topic.author.loginname
          }}">
            <span class="title">{{topic.title}}</span>
          </router-link>
          <span class="data">最近回复{{topic.last_reply_at | dataset}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>;

<script>
export default {
  name: "userinfo",
  data() {
    return {
      isloading: true,
      useinfo: []
    };
  },
  methods: {
    getDataUse() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.username}`)
        .then(res => {
          this.isloading = false;
          this.useinfo = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.isloading = true;
    this.getDataUse();
  }
};
</script>;

<style scoped>
.ul-plate {
  background-color: #ffffff;
  border-radius: 5px;
  margin-top: 20px;
}
.ul-plate li:first-child {
  background-color: #f6f6f6;
  line-height: 41px;
  border-radius: 5px;
}
.ul-plate img {
  width: 40px;
  height: 40px;
  margin: 10px;
  border-radius: 5px;
}
.ul-plate a {
  color:#0088CC;
}
.ul-plate span {
  margin-left: 8px;
  font-size: 16px;
}
.ul-plate li {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
}
.ul-plate .base {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 0 8px;
}
.ul-plate .base > div {
  display: flex;
  width: 100%;
  align-items: center;
  margin: 5px;
}
.ul-plate .data {
  font-size: 12px;
  color: #9d9d9d;
  text-align: right;
  flex: 1;
  margin-right: 20px;
}
.ul-plate .title {
  width: 590px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.github{
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #9F9F9F;
}
.github svg{
  margin-right: 10px;
}
</style>;