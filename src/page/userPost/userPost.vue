<script setup lang="ts">

import {useRoute} from "vue-router";
import PostList from "../../components/postList.vue";
import HomeBtn from "../../components/homeBtn.vue";

const route = useRoute();
const username = route.params.username;
const Url = `/api/User/Posts?username=${username}&`;


</script>

<template>
 <div class="userPost">
   <div class="head"><home-btn class="homeBtn" />{{username}}的帖子</div>
   <post-list :Url="Url"></post-list>
 </div>
</template>

<style scoped>
.head{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100vw;
  border-radius: 0 0 20px 20px;
  background-color: white;
  font-size: 1.5rem;
}
.homeBtn{
  position: absolute;
  left: 20px;
}
</style>
