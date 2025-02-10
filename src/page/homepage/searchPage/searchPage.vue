<script setup lang="ts">

import HotRanking from "./component/hotRanking.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
const keywords = ref('')
const router = useRouter();
</script>

<template>
 <div class="searchPage">
   <div class="head">
    搜索
   </div>
   <div class="search">
     <input type="text" placeholder="搜索" v-model="keywords">
     <button @click="router.push('/search/'+keywords)">搜索</button>
   </div>
   <div class="hotRanking">
     <hot-ranking />
   </div>
 </div>
</template>

<style scoped>
.head{
  background-color: white;
  left: 0;
  top: 0;
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  position: fixed;
  border-radius: 5px;
}
.search{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
input{
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-left: 10px;
  margin-right: 10px;
}
@media screen and (max-width: 800px){
  input{
    width: 200px;
  }
}
@media screen and (min-width: 800px){
  input{
    width: 500px;
  }
}
button{
  width: 80px;
  height: 40px;
  background-color: #ccc;
}
.searchPage{
  margin-bottom: 100px;
}
</style>
