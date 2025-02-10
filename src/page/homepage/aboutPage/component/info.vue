<script setup lang="ts">
import {ref} from "vue";
import Modal from "../../../../components/modal.vue";
defineProps({
  nickname:String,
  username:String,
  email:String,
  status:String,
  avatar:String
});
const modalRef = ref<InstanceType<typeof Modal> | null>(null);
const openModal = () => {
  modalRef.value?.openModal();
};
</script>

<template>
  <div class="info">
    <div class="head">
      <div class="avatar">
        <img :src="avatar" alt="avatar" />
      </div>
      <div class="name">
        <div class="nickname">
          {{nickname}}
        </div>
        <div class="username">
          {{username}}
        </div>
        <div class="email">
          {{email}}
        </div>
        <div class="status" :style="status==='已认证'?'color:green;':'color:red;'">
          {{status}}<div class="help" @click="openModal()">❓</div>
        </div>
      </div>
    </div>
    <Modal ref="modalRef">
      <h2>提示</h2>
      <p>认证用户可以进行发帖、评论、点赞、收藏、上传图片等功能，而未认证用户啥也干不了，只能干看😘</p>
    </Modal>
  </div>
</template>

<style scoped>
.info{
  top:50px;
  max-width: 800px;
  min-width: 350px;
  max-height: 300px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  padding: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.info:hover{
  box-shadow: 0 0 20px dimgrey;;
}
.head{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.avatar{
  width: 80px;
  height: 80px;
  margin: 10px;
}
.avatar img{
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.name{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.nickname{
  font-size: 20px;
  font-weight: bold;
  margin: 3px;
}
.username{
  font-size: 16px;
  color: gray;
}
.email{
  font-size: 16px;
  color: gray;
}
.status{
  font-size: 16px;
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>
