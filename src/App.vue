<script setup lang="ts">
</script>

<template>
  <transition name="el-fade-in-linear">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" v-if="route.meta.keepAlive" :key="$route.fullPath" />
      </keep-alive>
      <component :is="Component" v-if="!route.meta.keepAlive" :key="$route.fullPath" />
    </router-view>
  </transition>
</template>

<style scoped>

</style>
