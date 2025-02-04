<script setup lang="ts">

</script>

<template>
 <div class="menu">
   <div class="items">👤我的资料</div>
   <div class="items">✉️我的帖子</div>
   <div class="items">⭐我的收藏</div>
   <div class="items">🎯我的消息</div>
   <div class="items redtext">退出登陆</div>
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
  font-family: "custom-font", serif;
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
</style>
