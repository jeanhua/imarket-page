<script setup lang="ts">
import {Request} from "../../../script/request.ts";
import {onMounted, ref} from "vue";
import Modal from '../../../components/modal.vue';
import shareIcon from '../../../assets/icon/postDetail/分享.svg'
import imagePreview from "../../../components/imagePreview.vue";

import likeImg from '../../../assets/icon/postDetail/点赞.svg'
import likeImg1 from '../../../assets/icon/postDetail/点赞1.svg'
import favoriteImg from '../../../assets/icon/postDetail/收藏.svg'
import favoriteImg1 from '../../../assets/icon/postDetail/收藏1.svg'
import {useRouter} from "vue-router";

const router = useRouter();

const modalRef = ref<InstanceType<typeof Modal> | null>(null);
const openModal = () => {
  modalRef.value?.openModal();
};

const props = defineProps({
  post: Object({
    id:String,
    title: String,
    content: String,
    images: [],
    status: Number,
    categoryID: Number,
    likeNums: Number,
    favoriteNms: Number,
    isLiked: Boolean,
    isFavorite: Boolean,
    createdAt: String,
    username: String,
    nickname: String,
    avatar: String,
  }),
  username:String
});

interface Category{
  "success": false,
  "category": {
    "id": "",
    "name": "",
    "description": ""
  }
}

// 点赞收藏图片
const likeImgSrc = ref(likeImg);
const favoriteImgSrc = ref(favoriteImg);
const likeNums = ref(props.post.likeNums);
const favoriteNums = ref(props.post.favoriteNms);

const Req = Request.getInstance();
const categoryName = ref('');
const noticeText = ref('');
onMounted(
    async () => {
      let category = await Req.Get<Category>(`/api/Post/Categories/${props.post.categoryID}`, false);
      categoryName.value = category.category.name;
      if (props.post.isLiked) {
        likeImgSrc.value = likeImg1;
      } else {
        likeImgSrc.value = likeImg;
      }
      if (props.post.isFavorite) {
        favoriteImgSrc.value = favoriteImg1;
      } else {
        favoriteImgSrc.value = favoriteImg;
      }
    },
)

const share = () => {
  // 复制链接
  if(navigator.clipboard){
    navigator.clipboard?.writeText(window.location.href);
    noticeText.value = '复制成功，快去分享吧...'
  }
  else{
    noticeText.value = `您的浏览器不支持复制链接，请手动复制分享\n${window.location.href}`;
  }
  openModal();
}

const like = async () => {
  if (props.post.isLiked) {
    let response = await Req.Get<any>("/api/Post/Unlike?postId=" + props.post.id, true, () => {
      alert("文章不存在");
    });
    if (response.success) {
      props.post.isLiked = false;
      likeImgSrc.value = likeImg;
      likeNums.value--;
    }
  } else {
    let response = await Req.Get<any>("/api/Post/Like?postId=" + props.post.id, true, () => {
      alert("文章不存在");
    });
    if (response.success) {
      props.post.isLiked = true;
      likeImgSrc.value = likeImg1;
      likeNums.value++;
    }
  }
}

const favorite = async () => {
  if (props.post.isFavorite) {
    let response = await Req.Get<any>("/api/Post/UnFavorite?postId=" + props.post.id, true, () => {
      alert("文章不存在");
    });
    if (response.success) {
      props.post.isFavorite = false;
      favoriteImgSrc.value = favoriteImg;
      favoriteNums.value--;
    }
  } else {
    let response = await Req.Get<any>("/api/Post/Favorite?postId=" + props.post.id, true, () => {
      alert("文章不存在");
    });
    if (response.success) {
      props.post.isFavorite = true;
      favoriteImgSrc.value = favoriteImg1;
      favoriteNums.value++;
    }
  }
}
const safeContent = (content:string)=>{
  let escape = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  return escape.replace(/\n/g,"<br>");
}

const deletePost = async (postId:number)=>{
  if(!window.confirm("确定删除此贴？")){
    return;
  }
  let response = await Req.Get<any>(`/api/Post/Delete?postId=${postId}`);
  if(response.success){
    alert("删除成功！");
    window.history.back();
  }
  else {
    alert(`删除失败！${JSON.stringify(response)}`);
  }
}
</script>

<template>
  <div class="content">
    <div class="head">
      <div class="post-avatar">
        <img :src="post?.avatar" alt="用户头像" @click="router.push(`/userPost/${post?.username}`)" />
      </div>
      <div class="post-user">{{ post?.nickname }}</div>
    </div>
    <div class="body">
      <div class="post-title">{{ post?.title }}</div>
      <div class="post-content" v-html="safeContent(post?.content)"></div>
    </div>
    <div class="images">
      <image-preview v-for="image in post?.images" :image-src="image.url" />
    </div>
    <div class="foot">
      <div class="post-category">{{ categoryName }}</div>
      <div class="post-time">{{ post?.createdAt.replace('T', ' ') }}</div>
    </div>
    <div class="shareBar">
      <div class="like">
        <img :src="likeImgSrc" alt="点赞" width="30px" @click="like()" />
        {{ likeNums }}
      </div>
      <div class="favorite">
        <img :src="favoriteImgSrc" alt="收藏" width="30px" @click="favorite()" />
        {{ favoriteNums }}
      </div>
      <div class="share" @click="share()">
        <img :src="shareIcon" alt="分享" width="30px" />
      </div>
      <button class="delete" v-if="username===post?.username" @click="deletePost(post?.id)">删除帖子</button>
    </div>
    <Modal ref="modalRef">
      <h2>提示</h2>
      <p>{{noticeText}}</p>
    </Modal>
  </div>
</template>

<style scoped>
.content {
  position: relative;
  margin-top: 10px;
  max-width: 800px;
  min-width: 300px;
  top: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

@media screen and (min-width: 800px){
  .content{
    min-width: 800px;
  }
}

.head {
  display: flex;
  position: relative;
  top: 0;
  align-items: center;
  margin-bottom: 10px;
}

.body {
  text-align: left;
}

.post-title {
  font-weight: bold;
  font-size: 1.5rem;
}

.post-content {
  font-size: 1.1rem;
}

.post-time {
  font-size: 12px;
  color: #999;
}

.post-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.images{
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin-top: 10px;
}

.foot {
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: gray 1px solid;
  margin-top: 10px;
}

.post-category {
  font-size: 12px;
  color: #999;
  flex-wrap: nowrap;
}

.post-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.like {
  display: flex;
  align-items: center;
  margin-right: 30px;
}

.favorite {
  display: flex;
  align-items: center;
  margin-right: 30px;
}

.share {
  display: flex;
  align-items: center;
  margin-right: 30px;
}

.shareBar {
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.delete{
  padding: 5px;
}

@media (prefers-color-scheme: dark) {
  .content {
    background-color: #1e1e1e;
    color: #ffffff;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  }
  .post-title {
    color: #ffffff;
  }
  .post-content {
    color: #cccccc;
  }
  .post-time,
  .post-category {
    color: #aaaaaa;
  }
  .like img,
  .favorite img,
  .share img {
    filter: invert(1);
  }
  .delete {
    background-color: #333;
    color: #ffffff;
    border: 1px solid #444;
  }
  .delete:hover {
    background-color: #444;
  }
}
</style>
