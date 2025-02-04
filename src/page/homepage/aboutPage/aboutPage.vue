<script setup lang="ts">
import info from './component/info.vue';
import menuSettings from './component/menuSettings.vue';
import Foot from "./component/foot.vue";
</script>

<template>
  <div class="about">
    <info />
    <menu-settings/>
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
