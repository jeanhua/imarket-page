<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute} from 'vue-router';
import Content from './component/content.vue';
import { Request } from '../../script/request.ts';
import Comments from "./component/comments.vue";
import homeBtn from '../../components/homeBtn.vue';

const route = useRoute();
const req = Request.getInstance();
const post = ref<Post | null>(null);

// 定义 Post 接口
export interface Post {
  id: number;
  title: string;
  content: string;
  images: string[];
  status: number;
  categoryID: number;
  likeNums: number;
  favoriteNms: number;
  isLiked: boolean;
  isFavorite: boolean;
  createdAt: string;
  username: string;
  nickname: string;
  avatar: string;
}

export interface Posts {
  success: boolean;
  post: Post;
}

const notFound = ref(false);

// 获取帖子
const getPost = async (id: string) => {
  const response = await req.Get<Posts>('/api/Post/' + id, false,()=>{notFound.value=true});
  if (response.success) {
    post.value = response.post;
  } else {
    post.value = null;
  }
};
// 组件挂载时获取数据
onMounted(() => {
  if (route.params.id) {
    getPost(route.params.id.toString());
    GetUserName();
  }
});

const isLogin = ref(req.getIsLoggedIn());
const refresh = async ()=>{
  await req.check();
  isLogin.value = req.getIsLoggedIn();
}
const MyUsername = ref("");
const GetUserName = async ()=>{
  if(isLogin.value){
    let response = await req.Get<any>("/api/Account/Info",false);
    if(response.success){
      MyUsername.value = response?.account?.username;
    }
  }
}
</script>

<template>
  <div class="detail">
    <div class="head">
      <home-btn class="homeBtn" />
      <h3>帖子详情</h3>
    </div>
    <div v-if="!notFound">
      <div v-if="post!=null">
        <Content :post="post" :username="MyUsername" />
        <comments :postId="route.params.id.toString()" :isLogin="isLogin" :MyUsername="MyUsername" :refresh="refresh" />
      </div>
      <div class="loading" v-else>
        Loading...
      </div>
    </div>
    <div class="loading" v-else>
      😥帖子丢失了，可能是作者删除了~
      <br>
      <a href="/">点击返回主页</a>
    </div>
  </div>
</template>

<style scoped>
.detail {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 90vw;
  margin-top: 50px;
  overflow-y: visible;
}

.head {
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  background-color: #f5f5f5;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.loading{
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
  top: 40vh;
  font-size: 1.3rem;
}
.homeBtn{
  position: absolute;
  left: 20px;
  top: 19px;
}

@media (prefers-color-scheme: dark) {
  .detail {
    background-color: #121212;
    color: #ffffff;
  }
  .head {
    background-color: #1e1e1e;
    color: #ffffff;
  }
  .loading {
    color: #cccccc;
  }
  a {
    color: #bb86fc;
  }
}
</style>
