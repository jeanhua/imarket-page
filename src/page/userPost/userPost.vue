<script setup lang="ts">

import {useRoute} from "vue-router";
import PostList from "../../components/postList.vue";
import HomeBtn from "../../components/homeBtn.vue";
import {ref} from "vue";
import {Request} from "../../script/request.ts";
import messageModal from "../../components/messageModal.vue";

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

const msgModalRef = ref<InstanceType<typeof messageModal>|null>();
</script>

<template>
 <div class="userPost">
   <div class="head">
     <home-btn class="homeBtn" />
     <div class="info"><img :src="avatar" alt="avatar" /></div>
     <div class="meta">
       <div class="nickname">{{nickname}}</div>
       <div class="username">@{{username}}</div>
     </div>
     <button @click="msgModalRef?.openModal()">✉️私信</button>
   </div>
   <post-list :Url="Url"></post-list>
   <message-modal ref="msgModalRef" :username="username.toString()" :nickname="nickname"></message-modal>
 </div>
</template>

<style scoped>
.userPost{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
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
.nickname{
  font-size: 1.3rem;
}
.username{
  font-size: 0.7rem;
  color: #999999;
}
.head button{
  padding: 2px;
  margin: 10px;
}

@media (prefers-color-scheme: dark) {
  .userPost {
    background-color: #121212;
  }
  .head {
    background-color: #1e1e1e;
    color: #ffffff;
  }
  .info img {
    border-color: #444;
  }
  .nickname {
    color: #ffffff;
  }
  .username {
    color: #aaaaaa;
  }
  .head button {
    background-color: #333;
    color: #ffffff;
    border: 1px solid #444;
  }
  .head button:hover {
    background-color: #444;
  }
}
</style>
