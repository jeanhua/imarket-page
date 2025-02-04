<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <div class="homeBtn" @click="router.push('/')">
    🏠
  </div>
</template>

<style scoped>
.homeBtn{
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
