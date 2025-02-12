<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <slot></slot>
      <button @click="closeModal">关闭</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref(false);

const openModal = () => {
  isVisible.value = true;
};

const closeModal = () => {
  isVisible.value = false;
};

defineExpose({
  openModal,
  closeModal,
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .modal-overlay {
    background-color: rgba(31, 31, 31, 0.75);
  }

  .modal-content {
    background-color: #1e1e1e;
    color: #e0e0e0;
  }

  .modal-content button {
    background-color: #333;
    color: #e0e0e0;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .modal-content button:hover {
    background-color: #555;
  }
}

</style>
