<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <router-view name="main" key="main"></router-view>
      <router-view name="sildebar"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'
export default {
  name: 'App',
  components:{
    Header,
    PostList
  },
}
</script>

<style>
  *{ padding: 0; margin: 0; }
  * { box-sizing: border-box; } 
  *::after { padding: 0; margin: 0; } 
  *::after { box-sizing: border-box; } 
  *::before { box-sizing: border-box; } 
  *::before { padding: 0; margin: 0; } 
  a { text-decoration: none; }
  li { list-style: none; }
  .clearfix::after{
    display: block;
    clear: both;
    content: '';
  }
  .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
  body{
    background-color: #E1E1E1;
  }
  .main{
     margin: 15px 64px;
     display: flex;
     justify-content: space-between;
  }
  .loading {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading .icon {
  width: 50px;
  height: 50px;
  animation: 1s rotate infinite linear;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
