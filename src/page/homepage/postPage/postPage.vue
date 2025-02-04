<script setup lang="ts">
import headBar from './component/headBar.vue';
import postList from '../../../components/postList.vue';
</script>

<template>
<div>
  <head-bar></head-bar>
  <post-list Url="/api/Post/Posts?" />
</div>
</template>

<style scoped>

</style>
