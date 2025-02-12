<script setup lang="ts">
import HomeBtn from "../../components/homeBtn.vue";
import PostList from "../../components/postList.vue";
const url = "/api/Post/GetFavorites?";
</script>

<template>
  <div class="userPost">
    <!-- 头部 -->
    <div class="head">
      <home-btn class="homeBtn" />
      <span>我的收藏 ⭐</span>
    </div>

    <!-- 收藏列表 -->
    <post-list :Url="url"></post-list>
  </div>
</template>

<style scoped>
.userPost {
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  overflow-y: scroll;
}

.head {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100vw;
  border-radius: 0 0 20px 20px;
  background-color: white;
  font-size: 1.5rem;
  position: fixed;
  top: 0;
  z-index: 10;
}

.homeBtn {
  position: absolute;
  left: 20px;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .head {
    background-color: #1e1e1e;
    color: #ffffff;
  }

  .userPost {
    background-color: #121212;
  }
}
</style>
