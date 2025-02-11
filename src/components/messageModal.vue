<script setup lang="ts">


import {ref} from "vue";
import {Request} from "../script/request.ts";

const showModal = ref(false);
const Req = Request.getInstance();
const openModal = ()=>{
  showModal.value = true;
}
defineExpose({openModal});
defineProps({nickname:{type:String,required:true},username:{type:String,required:true}});

const message = ref("");
const sendMessage= async (To:string,Message:string)=>{
  if(To===""||To===null||Message===""||Message===null){
    return;
  }
  let response = await Req.Post("/api/Message/Send",{
    "username": To,
    "content": Message
  });
  if(response.success){
    alert("发送成功！");
    message.value = "";
  }
  else {
    alert(`发送失败！${JSON.stringify(response)}`);
  }
  showModal.value = false;
}
</script>

<template>
  <div v-if="showModal" class="message-modal" @click.stop="showModal=false">
    <div class="modal" @click.stop>
      <div class="head">私信</div>
      <div class="meta">
        <div class="nickname">To: {{nickname}}</div>
        <div class="username">@{{username}}</div>
      </div>
      <div class="content">
        <textarea v-model="message" placeholder="善语结善缘，恶语伤人心。" />
      </div>
      <button @click="sendMessage(username,message)">发送</button>
    </div>
  </div>
</template>

<style scoped>
.message-modal{
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.modal{
  padding: 10px;
  background-color: whitesmoke;
  border-radius: 20px;
}
textarea{
  min-height: 100px;
  min-width: 300px;
  border-radius: 5px;
}
.head{
  font-size: 1.3rem;
}
.meta{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.nickname{
  font-size: 1.2rem;
  padding: 1px;
  margin: 1px;
}
.username{
  color: #999999;
  font-size: 0.8rem;
}
button{
  background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
}
</style>
