<script setup lang="ts">
import {Request} from "../../../../script/request.ts";
import {useRouter} from "vue-router";

const Req = Request.getInstance();
const router = useRouter();
const logout = ()=>{
  if(window.confirm("确定退出登陆？")){
    Req.logout();
    window.location.href="/";
  }
}
defineProps({username:String})
</script>

<template>
 <div class="menu">
   <div class="items" @click="router.push('/create')">✍️发表帖子</div>
   <div class="items" @click="router.push('/editInfo')">👤我的资料</div>
   <div class="items" @click="router.push(`/userPost/${username}`)">✉️我的帖子</div>
   <div class="items" @click="router.push('/favorite')">⭐我的收藏</div>
   <div class="items" @click="router.push('/message')">🎯我的消息</div>
   <div class="items redtext" @click="logout();">退出登陆</div>
 </div>
</template>

<style scoped>
.menu{
  margin-top: 100px;
  background-color: white;
  border-radius: 15px;
  max-width: 800px;
  min-width: 350px;
  overflow: hidden;
}
.items{
  background-color: white;
  box-shadow: dimgrey 1px 1px 1px 1px;
  border-radius: 10px;
  margin: 10px;
  height: 50px;
  text-align: start;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  padding-left: 10px;
  position: relative;
}
.items:hover{
  background-color: whitesmoke;
}
.items::after{
  content: ">";
  position: absolute;
  right: 10px;
}
.redtext{
  color: red;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .menu {
    background-color: #2c2c2c;
    border-radius: 15px;
  }

  .items {
    background-color: #333;
    box-shadow: none;
    color: #e0e0e0;
    border-radius: 10px;
  }

  .items:hover {
    background-color: #424242;
  }

  .items::after {
    color: #666;
  }

  .redtext {
    color: #ff6b6b;
  }
}

</style>
