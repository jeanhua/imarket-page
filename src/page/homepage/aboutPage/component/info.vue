<script setup lang="ts">

defineProps({
  nickname:String,
  username:String,
  email:String,
  status:String,
  avatar:String
})

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
        <div class="status">
          {{status}}
        </div>
      </div>
    </div>
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
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}
.avatar img{
  width: 100%;
  height: 100%;
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
  color: gray;
}
</style>
