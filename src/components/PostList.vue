<template >
  <div class="PostList">
    <div class="loading" v-if="isloading">
      <!-- 数据未返回时显示 -->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-loading"></use>
      </svg>
    </div>
    <div class="post-list-wrapper" v-else>
      <ul>
        <li class="topbar">
          <span @click="changeData('all')" :class="{btnActive:(btnActive === 'all')}">全部</span>
          <span @click="changeData('good')" :class="{btnActive:(btnActive === 'good')}">精华</span>
          <span @click="changeData('share')" :class="{btnActive:(btnActive === 'share')}">分享</span>
          <span @click="changeData('ask')" :class="{btnActive:(btnActive === 'ask')}">问答</span>
        </li>
        <li class=".clearfix" v-for="(post,index) in posts" :key="index">
          <div>
            <img :src="post.author.avatar_url">
            <span v-text="post.reply_count" class="reply_count"></span>
            <span class="visit_count">/{{post.visit_count}}</span>
            <span :class="[{good:(post.good)},{top:(post.top)},share]">{{post | state}}</span>
            <router-link
              :to="{
              name:'artical', 
              params:{id:post.id,name:post.author.loginname}
              }"
            >
              <span class="title">{{post.title}}</span>
            </router-link>
          </div>
          <span class="last_reply_at">{{post.last_reply_at | dataset}}</span>
        </li>
      </ul>
    </div>
    <Pageination v-show="!isloading" @sentPage="changPage"/>
  </div>
</template>;

<script>
import Pageination from "./Pageination";
export default {
  name: "PostList",
  data() {
    return {
      isloading: true,
      posts: [],
      share: "share",
      getPage: 1,
      tab: "",
      btnActive: "all"
    };
  },
  methods: {
    getData() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: this.getPage,
            limit: 20,
            tab: this.tab
          }
        })
        .then(res => {
          this.isloading = false;
          this.posts = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    changPage(value) {
      this.isloading = true;
      this.getPage = value;
      this.getData();
    },
    changeData(value) {
      this.isloading = true;
      this.getPage = 1;
      this.$children[0].getFirstPage();
      if (value === "all") {
        this.tab = "";
        this.btnActive = "all";
      } else if (value === "good") {
        this.tab = "";
        this.btnActive = "good";
      } else if (value === "share") {
        this.tab = value;
        this.btnActive = "share";
      } else if (value === "ask") {
        this.tab = value;
        this.btnActive = "ask";
      }
      this.getData();
    }
  },
  beforeMount() {
    this.isloading = true;
    this.getData();
  },
  components: {
    Pageination
  }
};
</script>;

<style scoped>
.PostList {
  flex: 1;
}

.post-list-wrapper li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid #e1e1e1;
  /* line-height: 52px; */
  padding: 0 10px;
}
.post-list-wrapper li > div {
  display: flex;
  align-items: center;
}
.post-list-wrapper .reply_count {
  color: #9e78c0;
  margin-left: 5px;
  width: 30px;
  text-align: right;
}
.post-list-wrapper .topbar {
  display: flex;
  justify-content: flex-start;
  background-color: #f6f6f6;
  color: #80bd01;
  height: 46px;
}
.post-list-wrapper .topbar span {
  font-size: 15px;
  margin: 11px 15px;
  padding: 3px 5px;
  border-radius: 5px;
}
.post-list-wrapper .visit_count {
  font-size: 10px;
  color: #aeaeae;
  width: 30px;
}
.post-list-wrapper .last_reply_at {
  float: right;
  color: #aeaeae;
  font-size: 12px;
}
.post-list-wrapper .share {
  background-color: #e5e5e5;
  border-radius: 2px;
  font-size: 12px;
  color: #a4a29b;
  display: inline-block;
  padding: 0 2px;
  margin: 14px 10px;
}
.post-list-wrapper .good {
  background-color: #80bd01;
  color: white;
}
.post-list-wrapper .top {
  background-color: #80bd01;
  color: white;
}
img {
  width: 30px;
  height: 30px;
  display: inline-block;
}
.btnActive {
  background-color: #80bd01;
  color: white;
}
.title {
  width: 650px;
}
</style>;