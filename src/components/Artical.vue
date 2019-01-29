<template>
  <div class="artical">
    <div class="loading" v-if="isloading">
      <!-- 数据未返回时显示 -->
      <img src="../assets/loading.gif">
    </div>
    <div v-else>
      <div class="topic_header">
        <div class="topic_title">{{posts.title}}</div>
        <div>
          <ul class="base">
            <li><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon"></use>
              </svg>发布于{{posts.create_at | dataset}}</li>
            <li><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon"></use>
              </svg>作者{{posts.author.loginname}}</li>
            <li><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon"></use>
              </svg>{{posts.visit_count}}次浏览</li>
            <li><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon"></use>
              </svg>最后一次回复是{{posts.last_reply_at | dataset}}</li>
            <li><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon"></use>
              </svg>来自{{posts | state}}</li>
          </ul>
        </div>
      </div>
      <div v-html="posts.content" class="topic_content"></div>
      <div id="reply">
        <ul>
          <li class="replay_length">
            <span>{{posts.replies.length}} 回复</span>
          </li>
          <li v-for="(replay,index) in posts.replies" :key="index">
            <router-link
              :to="{name:'userinfo',params:{
              username : replay.author.loginname
            }}"
            >
              <img :src="replay.author.avatar_url">
              <span class="autherName">{{replay.author.loginname}}</span>
            </router-link>
            <span>{{index + 1}}楼</span>
            <span>{{replay.create_at | dataset}}回复</span>
            <span class="zan clearfix">
              <span v-if="replay.ups.length>0">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zan"></use>
              </svg>
              {{replay.ups.length}}
              </span>
              <span v-else></span>
            </span>
            <p v-html="replay.content"></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>;

<script>
export default {
  name: "Artical",
  data() {
    return {
      isloading: false,
      posts: {}
    };
  },
  methods: {
    getArticalData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          this.isloading = false;
          this.posts = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  watch:{
    '$route'(to,from){
      this.isloading = true;
      this.getArticalData()
    }
  },
  beforeMount() {
    this.isloading = true;
    this.getArticalData();
  }
};
</script>;

<style >

.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 12px;
  margin-top: 10px;
}
.artical {
  width: 73%;
}
.article:not(:first-child) {
  margin-right: 340px;
  margin-top: 15px;
}

#reply,
.topic_header {
  background-color: #fff;
}

#reply {
  margin-top: 15px;
}

#reply img {
  margin-right: 5px;
  width: 30px;
  height: 30px;
  position: relative;
  bottom: -9px;
  border-radius: 5px;
}
#reply .autherName {
  font-weight: bold;
  color: #b18266;
}
#reply p {
  margin: 0 27px;
  position: relative;
  bottom: 9px;
  font-size: 14px;
}
#reply li:not(:first-child) {
  padding: 10px;
  border-top: 1px solid #e5e5e5;
}
#reply a,
#reply span {
  font-size: 13px;
  color: #666;
  text-decoration: none;
  margin-right: 5px;
}
.replySec {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 10px;
}

.loading {
  text-align: center;
  padding-top: 300px;
}
.replay_length {
  background-color: #f6f6f6;
  line-height: 42px;
}
.replay_length > span {
  margin-left: 10px;
}
.replyUp a:nth-of-type(2) {
  margin-left: 0px;
  display: inline-block;
}

.topic_header {
  padding: 10px;
}

.topic_title {
  font-size: 20px;
  font-weight: bold;
  padding-top: 8px;
}

.topic_content {
  border-top: 1px solid #e5e5e5;
  padding: 10px 10px;
  border-radius: 0 0 3px 3px;
  background-color: #fff;
}
.topic_content p{
  margin: 10px 10px;
}
.markdown-text img {
  width: 92% !important;
}
.zan>span{
  float: right;
}
.base{
  display: flex;
}
.base>li{
  font-size: 12px;
  color: #9D9D9D;
}
@import url("../assets/markdown-github.css");
</style>;