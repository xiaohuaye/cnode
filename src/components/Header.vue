<template>
  <div class="header">
    <router-link to="/">
      <img src="../assets/cnodejs_light.svg">
    </router-link>
  </div>
</template>;

<script>
export default {
name: 'Header'
}
</script>;

<style scoped>
  .header{
    background: #444444;
    height: 50px;
    padding: 10px 64px;
  }
  img{
    height: 30px;
  }
</style>;