<script setup lang="ts">
import navigationBar from './component/navigationBar.vue';
</script>
<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <navigationBar></navigationBar>
  </div>
</template>

<style scoped>
/*
enter-active 定义进入过渡的结束状态
leave-active 定义离开过渡的结束状态
 */
.fade-transform-leave-active,
.fade-enter,
.fade-leave-to{
  visibility: hidden;
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active{
  transition: opacity 0.2s ease;
}
.fade-enter-to,
.fade-leave{
  visibility: visible;
  opacity: 1;
}
</style>
