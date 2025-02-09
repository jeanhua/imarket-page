<script setup lang="ts">
import {ref, onActivated, onDeactivated} from "vue";
import { Request } from "../script/request.ts";
import {useRoute, useRouter} from "vue-router";
import {TimeConvert} from "../script/timeConvert.ts";
import scrollToTopicon from "../assets/icon/home/scrollToTop.svg"

interface Post {
  id: number;
  title: string; // 这里保留标题字段
  nickname: string;
  avatar: string;
  content: string;
  favoriteNums: number;
  likeNums: number;
  createdAt: string;
}
let scrollPosition = new Map<string,number>();
const scrollToTop = ()=>{
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

interface Posts {
  success: boolean;
  posts: Post[];
}

const router = useRouter();
const route = useRoute();
const index = ref(1);
const req = Request.getInstance();
const posts = ref<Post[]>([]);
const loading = ref(false);
const hasMore = ref(true);
const props = defineProps({Url:String});
const isAtTop = ref(true);

const getPosts = async () => {
  if (loading.value || !hasMore.value) return;
  loading.value = true;
  let response = await req.Get<Posts>(`${props.Url}page=${index.value}&pageSize=10`, false);
  if (response.success && response.posts.length > 0) {
    posts.value = [...posts.value, ...response.posts];
    index.value++;
  } else {
    hasMore.value = false;
  }
  loading.value = false;
};

let active = false;

const handleScroll = () => {
  if(!active)return;
  const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 100;
  isAtTop.value = document.documentElement.scrollTop < 350;
  if (bottomOfWindow && !loading.value && hasMore.value) {
    getPosts();
  }
};

onActivated(() => {
  window.addEventListener('scroll', handleScroll);
  let position = scrollPosition.get(route.fullPath)??0;
  window.scrollTo({
    top: position,
    behavior:"smooth"
  })
  if(route.fullPath==='/post' || route.fullPath.match(/categories/) || route.fullPath.match(/search\//)
      || route.fullPath.match(/userPost\//) || route.fullPath.match(/favorite/)){
    getPosts();
  }
  active = true;
});

onDeactivated(() => {
  window.removeEventListener('scroll', handleScroll);
  scrollPosition.set(route.fullPath,document.documentElement.scrollTop);
  active = false;
});
</script>

<template>
  <div class="post-body">
    <div v-for="post in posts" :key="post.id" @click="router.push('/post/'+post.id);" class="post">
      <div class="post-header">
        <div class="post-header-left">
          <img :src="post.avatar" alt="" width="30px" height="30px" />
          <div class="post-header-left-text">
            <div class="post-header-left-text-nickname">{{ post.nickname }}</div>
            <div class="post-header-left-text-time">{{ TimeConvert.Convert(post.createdAt) }}</div>
          </div>
        </div>
        <div class="post-header-right">
          <div class="post-header-right-favoriteNums">
            <img src="../assets/icon/home/收藏.svg" alt="收藏" width="20px" height="20px" /> {{ post.favoriteNums }}
          </div>
          <div class="post-header-right-likeNums">
            <img src="../assets/icon/home/点赞.svg" alt="点赞" width="20px" height="20px" /> {{ post.likeNums }}
          </div>
        </div>
      </div>
      <div class="post-title">{{ post.title }}</div>
      <div class="post-content">{{ post.content }}</div>
    </div>
    <div class="scrollToTopBtn" v-show="!isAtTop"><img :src="scrollToTopicon" alt="scroll" @click="scrollToTop()" /></div>
    <div v-if="loading" class="loading">加载中...</div>
    <div v-if="!hasMore" class="no-more">没有更多帖子了</div>
  </div>
</template>

<style scoped>
.post-content {
  position: relative;
  text-align: start;
  margin-top: 10px;
  margin-bottom: 10px;
}

.post-title {
  text-align: start;
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
}

.post-body {
  top:100px;
  max-width: 800px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
  margin-top: 100px;
}

.post {
  max-width: 85vw;
  width: 90%;
  margin: 15px 0;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  overflow: hidden;
  height: auto;
  max-height: 10rem;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
}
.post::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1rem; /* 遮罩高度 */
  background: linear-gradient(to bottom, rgba(245, 245, 245, 0), rgba(245, 245, 245, 1));
  pointer-events: none; /* 防止遮罩阻挡点击事件 */
}
.post:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.post-header-left {
  display: flex;
  align-items: center;
}

.post-header-left-text {
  margin-left: 10px;
}

.post-header-left-text-nickname {
  font-size: 16px;
  font-weight: bold;
}

.post-header-left-text-time {
  font-size: 12px;
  color: #999;
  text-align: start;
}

.post-header-right {
  display: flex;
  align-items: center;
}

.post-header-right-favoriteNums,
.post-header-right-likeNums {
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
}

.loading,
.no-more {
  text-align: center;
  margin-top: 20px;
}

.scrollToTopBtn img {
  position: fixed;
  right: 30px;
  bottom: 100px;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  background-color: white;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  filter: none;
}
.scrollToTopBtn img:focus {
  background-color: transparent;
}

.scrollToTopBtn img:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
  transform: translateY(-5px);
  filter: brightness(1.1);
}

</style>
