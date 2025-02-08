<script setup lang="ts">
import info from './component/info.vue';
import menuSettings from './component/menuSettings.vue';
import Foot from "./component/foot.vue";
import {onActivated, ref} from "vue";
import {Request} from "../../../script/request.ts";
import {useRoute} from "vue-router";

const avatar = ref('');
const nickname = ref('');
const username = ref('');
const email = ref('');
const status = ref('');
const Req = Request.getInstance();
const route = useRoute();

const getInfo = async () => {
  const response = await Req.Get<any>('/api/Account/Info');
  if(response.success){
    avatar.value = response.account.avatar;
    nickname.value = response.account.nickname;
    username.value = response.account.username;
    email.value = response.account.email;
    if(response.account.status === 0){
      status.value = "未认证";
    }
    else if(response.account.status === 1){
      status.value = '已认证';
    }
    else if(response.account.status === 2){
      status.value = '被封禁';
    }
  }
}

onActivated(()=>{
  if(route.fullPath==='/about'){
    getInfo();
  }
})
</script>

<template>
  <div class="about">
    <info :avatar="avatar" :nickname="nickname" :email="email" :status="status" />
    <menu-settings :username="username"/>
    <foot />
  </div>
</template>

<style scoped>
.about{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
