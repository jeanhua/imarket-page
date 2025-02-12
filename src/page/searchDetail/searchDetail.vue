<script setup lang="ts">
import postList from '../../components/postList.vue';
import {useRoute} from "vue-router";
import HomeBtn from "../../components/homeBtn.vue";
const route = useRoute();
const keyword = route.params.keyword;
const url = `/api/Search/Posts?keyWord=${encodeURIComponent(keyword.toString())}&`
</script>

<template>
 <div class="searchDetail">
   <div class="head">
     <home-btn class="homeBtn" />
     搜索结果
   </div>
   <post-list :Url="url"></post-list>
 </div>
</template>

<style scoped>
.head{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  border-radius:  0 0 15px 15px;
  background-color: white;
  z-index: 1000;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.homeBtn{
  position: absolute;
  left: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (prefers-color-scheme: dark) {
  .head {
    background-color: #1e1e1e;
    color: #ffffff;
  }
  .searchDetail {
    background-color: #121212;
    color: #ffffff;
  }
}
</style>
