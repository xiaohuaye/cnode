<template>
  <div class="pageination">
    <ul>
      <li>
        <button @click="getFirstPage()">&lt;&lt;</button>
        <button v-if="firstPage">...</button>
        <button v-for="(page,index) in Pagenumber" :key="index" @click="getIndex(index,page)"
        :class="{active:page===currentPage}">
          {{page}}
        </button>
        <button>...</button>
        <button @click="getNextPage()">下一页</button>
      </li>
    </ul>
  </div>
</template>;

<script>
export default {
  name: 'Pageination',
  data(){
    return {
      Pagenumber:[1,2,3,4,5],
      PagenumberInit:[1,2,3,4,5],
      currentPage:1,
      firstPage: false,
      currentIndex:0
    }
  },
  methods:{
    getIndex(index,page){
      if(this.Pagenumber[0] === this.PagenumberInit[0] && index <= 3){
        this.firstPage = false
        this.currentIndex = index
      // }else if(this.Pagenumber[0] === this.PagenumberInit[0] && index === 4){
      //   this.Pagenumber = [page-3,page-2,page-1,page,page+1]
      //   this.firstPage = true
      }else if(this.Pagenumber[0] !== this.PagenumberInit[0] && index !== 4 && index !== 0){
        this.firstPage = true
        this.currentIndex = index
      }else if(this.Pagenumber[0] !== this.PagenumberInit[0]  && index === 0){
        if(this.Pagenumber[0] === 2){
          this.firstPage = false
        }else{
          this.firstPage = true
        }
        this.Pagenumber = [page-1,page,page+1,page+2,page+3]
        this.currentIndex = 1
      }else{
        this.firstPage = true
        this.Pagenumber = [page-3,page-2,page-1,page,page+1]
        this.currentIndex = 3
      }
      this.currentPage = page
      this.$emit('sentPage',this.currentPage)
    },
    getFirstPage(){
      this.firstPage = false
      this.Pagenumber = this.PagenumberInit
      this.currentPage = 1
      this.currentIndex = 0
      this.$emit('sentPage',1)
    },
    getNextPage(){
      this.getIndex(this.currentIndex+1,this.currentPage+1)
    }
  },
  computed:{
    isCurrentPage(){
        if(this.currentPage === this.key+1){
          return true
        }else{
          return false
        }
    }
  }
}
</script>;

<style scoped>
.pageination{
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #E1E1E1;
}
  ul{
    padding: 10px;
  }
  li{
    display: flex;
  }
  button{
    background-color: white;
    border: 1px solid #E1E1E1;
    border-right: 0px;
    width: 33px;
    height: 33px;
    outline: none;
    color: #778087;
  }
  button:last-child{
    width: 50px;
  }
  button:first-child{
    border-radius: 5px 0px 0px 5px; 
  }
  button:last-child{
    border-right: 1px solid #E1E1E1;
    border-radius: 0px 5px 5px 0px;
  }
  .active{
    color: #80BD01;
  }
</style>;