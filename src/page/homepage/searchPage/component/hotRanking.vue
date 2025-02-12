<script setup lang="ts">
import {ref, onActivated} from 'vue';
import {Request} from "../../../../script/request.ts";
import {useRoute, useRouter} from "vue-router";

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
  likeCount?: number;
  favoriteCount?: number;
}

const likePosts = ref<Post[]>([]);
const favoritePosts = ref<Post[]>([]);
const Req = Request.getInstance();
const router = useRouter();
const route =useRoute();

const fetchHotRanking = async () => {
  try {
    const data = await Req.Get<any>('/api/Search/HotRanking',false);
    if (data.success) {
      likePosts.value = data.like;
      favoritePosts.value = data.favorite;
    } else {
      console.error('Failed to fetch hot ranking data');
    }
  } catch (error) {
    console.error('Error fetching hot ranking data:', error);
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

onActivated(() => {
  if(route.fullPath==='/search'){
    fetchHotRanking();
  }
});
</script>

<template>
  <div class="container">
    <!-- 最多点赞的帖子 -->
    <section class="section">
      <h2 class="section-title">本周最多点赞的帖子</h2>
      <div class="post-list">
        <div v-for="(post,index) in likePosts" :key="post.id" class="post-card" @click="router.push('/post/'+post.id);">
          <div class="score sl">{{index+1}}</div>
          <h3 class="post-title">{{ post.title.slice(0,8) }}...</h3>
          <p class="post-content">{{ post.content }}</p>
          <div class="post-meta">
            <span class="post-likes">👍 {{ post.likeCount }}</span>
            <span class="post-date">📅 {{ formatDate(post.createdAt) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 最多收藏的帖子 -->
    <section class="section">
      <h2 class="section-title">本周最多收藏的帖子</h2>
      <div class="post-list">
        <div v-for="(post,index) in favoritePosts" :key="post.id" class="post-card" @click="router.push('/post/'+post.id);">
          <div class="score sf">{{index+1}}</div>
          <h3 class="post-title">{{ post.title.slice(0,8) }}...</h3>
          <p class="post-content">{{ post.content }}</p>
          <div class="post-meta">
            <span class="post-favorites">❤️ {{ post.favoriteCount }}</span>
            <span class="post-date">📅 {{ formatDate(post.createdAt) }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 5px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.post-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.post-content {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  max-height: 5rem;
  overflow: hidden;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.post-likes, .post-favorites, .post-date {
  display: flex;
  align-items: center;
  gap: 5px;
}
.score{
  position: absolute;
  font-size: 2rem;
  width: 3rem;
  font-family: "Bauhaus 93",serif;
  border-radius: 50%;
  opacity: 90%;
}
.sl{
  color: cornsilk;
  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
}
.sf{
  color: brown;
  background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .container {
    background-color: #1a1a1a;
    color: #e0e0e0;
    border-radius: 20px;
    margin-top: 30px;
  }

  .section-title {
    color: #c0c0c0;
    border-bottom-color: #444;
  }

  .post-card {
    background-color: #2a2a2a;
    color: #e0e0e0;
  }

  .post-title {
    color: #c0c0c0;
  }

  .post-content {
    color: #aaa;
  }

  .post-meta {
    color: #777;
  }

  .score.sl {
    color: white;
    background-image: None;
  }

  .score.sf {
    color: white;
    background-image: None;
  }
}
</style>
