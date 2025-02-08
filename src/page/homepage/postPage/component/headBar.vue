<script setup lang="ts">
import { Request } from '../../../../script/request.ts';
import {onActivated, ref} from 'vue';
import {useRoute, useRouter} from "vue-router";

let Req = Request.getInstance();
const router = useRouter();
interface Categories {
  success: boolean,
  categories: [Category]
}
interface Category {
  id: number,
  name: string,
  description: string
}
const route = useRoute();
const categories = ref<Category[]>([]);
const getCategories = async () => {
  const res = await Req.Get<Categories>('/api/Post/Categories', false);
  categories.value = res.categories;
}
onActivated(()=>{
  if(route.fullPath==='/post'){
    getCategories();
  }
});
</script>

<template>
  <div class="headBar">
    <div class="title">iMarket校园集市</div>
    <div class="categories">
      <button
          class="category-button"
          v-for="item in categories"
          :key="item.id"
          :title="item.description"
          @click="router.push(`/categories/${item.id}`)"
          :style="{
          background: `linear-gradient(135deg, ${getRandomColor()}, ${getRandomColor()})`,
        }">
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.headBar {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 90px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.title{
  font-size: 1.5rem;
  font-weight: 600;
  color: #333333;
  font-family: "custom-font",serif;
}

.categories {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 70px;
  gap: 10px;
  padding: 0 20px;
  overflow: hidden;
  overflow-x: auto;;
  flex-wrap: nowrap;
  max-width: 100vw;
}

.category-button {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.category-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>

<script lang="ts">
// 随机生成颜色函数
const getRandomColor = () => {
  const colors = [
    '#FF6B6B', // 红色
    '#4ECDC4', // 青色
    '#FF9F43', // 橙色
    '#2E86DE', // 蓝色
    '#A55EEA', // 紫色
    '#45B649', // 绿色
    '#F368E0', // 粉色
    '#FFD700', // 金色
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
</script>
