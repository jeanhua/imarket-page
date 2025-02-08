<script setup lang="ts">
import {Request} from "../../../script/request.ts";
import {onActivated, onDeactivated, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

interface Post {
  id: number;
  title: string;
  content: string;
  images: string[];
  status: number;
  categoryID: string;
  likeNums: number;
  favoriteNms: number;
  isLiked: false;
  isFavorite: false;
  createdAt: string;
  username: string;
  nickname: string;
  avatar: string;
}

const favorite = ref<Post[]>([]);
const loading = ref(false);
const hasMore = ref(true);
const Req = Request.getInstance();

// 获取收藏的帖子
const currentPage = ref(1);  // 记录当前页码
const getFavorite = async () => {
  if (loading.value) return;
  loading.value = true;
  let response = await Req.Get<any>(`/api/Post/GetFavorites?page=${currentPage.value}&pageSize=10`);
  if (response.success) {
    for (let p in response.favorite) {
      let post = response.favorite[p];
      let result = await Req.Get<any>(`/api/Post/${post.postId}`);
      favorite.value.push(result.post);
    }
    if (response.favorite.length > 0) {
      currentPage.value += 1;
    }
    if (response.favorite.length < 10) {
      hasMore.value = false;
    }
  }
  loading.value = false;
};


let active = false;
const isAtTop = ref(true);

const handleScroll = () => {
  if (!active || loading.value || !hasMore.value) return;
  const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 100;
  isAtTop.value = document.documentElement.scrollTop < 350;
  if (bottomOfWindow) {
    getFavorite();
  }
};

onActivated(() => {
  if (!active) {
    window.addEventListener("scroll", handleScroll);  // 添加监听
    active = true;
  }
  if (route.fullPath.match(/favorite/)) {
    getFavorite();  // 加载数据
  }
});

onDeactivated(() => {
  console.log("退出收藏页面");
  window.removeEventListener("scroll", handleScroll);
  active = false;
});
</script>

<template>
  <div class="postList">
    <div v-for="post in favorite" :key="post.id" class="postItem" @click="router.push('/post/'+post.id)">
      <div class="postInfo">
        <h3 class="postTitle">{{ post.title }}</h3>
        <p class="postContent">{{ post.content?.slice(0, 100) }}...</p>
        <div class="postStats">
          <span>👍{{ post.likeNums }} </span>
          <span>⭐{{ post.favoriteNms }} </span>
        </div>
      </div>
    </div>
    <!-- 加载动画 -->
    <div v-if="loading" class="loading">
      <span>加载中...</span>
    </div>
    <!-- 无更多数据 -->
    <div v-if="!hasMore && !loading" class="noMore">
      <span>没有更多收藏了！</span>
    </div>
  </div>
</template>

<style scoped>
.postList {
  min-width: 300px;
  max-width: 800px;
  margin-top: 100px;
  padding: 0 20px;
}

.postItem {
  background-color: #f9f9f9;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.postItem:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.postTitle {
  font-size: 1.2rem;
  font-weight: bold;
}

.postContent {
  color: #666;
  font-size: 0.9rem;
  margin: 10px 0;
}

.postStats {
  font-size: 0.8rem;
  color: #888;
  display: flex;
  justify-content: right;
}

.loading,
.noMore {
  text-align: center;
  margin: 20px 0;
  color: #888;
}

.loading span {
  font-size: 1.2rem;
}

.noMore span {
  font-size: 1rem;
}
</style>
