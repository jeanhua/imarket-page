<script setup lang="ts">
import { ref } from "vue";

const index = ref(0);

const setIndex = (newIndex: number) => {
  index.value = newIndex;
};
</script>

<template>
  <div class="navigation">
    <router-link to="/post" active-class="active" @click="setIndex(0)">
      <div id="icon">
        <img src="../../../assets/icon/home/帖子.svg" alt="帖子" width="30px" height="30px" />
        帖子
      </div>
    </router-link>
    <router-link to="/search" active-class="active" @click="setIndex(1)">
      <div id="icon">
        <img src="../../../assets/icon/home/搜索.svg" alt="搜索" width="30px" height="30px" />
        搜索
      </div>
    </router-link>
    <router-link to="/about" active-class="active" @click="setIndex(2)">
      <div id="icon">
        <img src="../../../assets/icon/home/我的.svg" alt="我的" width="30px" height="30px" />
        我的
      </div>
    </router-link>
  </div>
</template>

<style scoped>
#icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "custom-font", serif;
  color: #1a1a1a;
}

.navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.active img {
  filter: brightness(0) saturate(100%) invert(50%) sepia(100%) saturate(1000%) hue-rotate(200deg);
}

.active #icon {
  color: #007bff;
  background-color: rgba(0, 123, 255, 0.1);
  border-radius: 10px;
  padding: 5px;
}
</style>
