<script setup lang="ts">

import {useRoute} from "vue-router";
import PostList from "../../components/postList.vue";
import HomeBtn from "../../components/homeBtn.vue";
import {ref} from "vue";
import {Request} from "../../script/request.ts";

const route = useRoute();
const username = route.params.username;
const Req = Request.getInstance();
const Url = `/api/User/Posts?username=${username}&`;
const nickname = ref("");
const avatar = ref("/images/defaultAvatar.svg");
const getInfo= async ()=>{
  let response = await Req.Get<any>(`/api/User/Info?username=${username}`);
  if(response.success){
    nickname.value = response.nickname;
    avatar.value = response.avatar;
  }
}
getInfo();
</script>

<template>
 <div class="userPost">
   <div class="head">
     <home-btn class="homeBtn" />
     <div class="info"><img :src="avatar" alt="avatar" /></div>
     {{nickname}}的帖子
   </div>
   <post-list :Url="Url"></post-list>
 </div>
</template>

<style scoped>
.userPost{
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
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
.info img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: #999999 solid 1px;
  margin: 10px;
}
</style>
