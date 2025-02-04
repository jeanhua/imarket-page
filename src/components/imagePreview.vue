<template>
  <div class="image-preview-container">
    <img
        :src="props.imageSrc"
        @click="isPreviewOpen = true"
        alt="点击预览"
        class="preview-image"
    />
    <div
        v-if="isPreviewOpen"
        class="lightbox"
        @click.self="isPreviewOpen = false"
    >
      <img :src="imageSrc" alt="预览图片" class="lightbox-image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
});

const isPreviewOpen = ref(false);
</script>

<style scoped>
.preview-image {
  cursor: pointer;
  max-width: 150px;
  max-height: 200px;
  margin: 5px;
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightbox-image {
  max-width: 90%;
  max-height: 90%;
  z-index: 1000;
}
</style>
