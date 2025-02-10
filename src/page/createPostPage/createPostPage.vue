<script setup lang="ts">
import { Request } from "../../script/request.ts";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {ImageUtil} from "../../script/imageUtil.ts";

interface Post {
  title: string;
  content: string;
  categoryId: number;
  images: string[];
}

interface Category {
  id: number;
  name: string;
  description: string;
}

const Req = Request.getInstance();
const postRef = ref<Post>({
  title: "",
  content: "",
  categoryId: 0,
  images: []
});
const imageRef = ref<string[]>([]);
const categoryRef = ref<Category[]>([]);
const router = useRouter();

// 获取分类
const getCategory = async () => {
  const response = await Req.Get("/api/Post/Categories", false);
  if (response.success) {
    categoryRef.value = response.categories;
  } else {
    alert(`获取分类失败！${JSON.stringify(response)}`);
  }
};

// 上传图片
const uploadImage = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input?.files?.[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      let base64 = await ImageUtil.compressAndAddWatermark(file,"iMarket校园集市");
      try{
        let response = await Req.Post<any>("/api/Image/UploadImage",{
          base64:base64.split(',')[1]
        });
        if(response.success){
          imageRef.value.push(response.path)
        }else {
          alert(`上传失败！${JSON.stringify(response)}`);
        }
      }
      catch (e){
        alert(`上传失败！${e}`);
      }
    };
    reader.readAsArrayBuffer(file);
  }
};

// 删除图片
const deleteImage = (index: number) => {
  imageRef.value.splice(index, 1);
};

// 创建帖子
const createPost = async () => {
  if (!postRef.value.title || !postRef.value.content || postRef.value.categoryId === 0) {
    alert("请填写所有必填项！");
    return;
  }
  postRef.value.images = imageRef.value;
  const response = await Req.Post("/api/Post/Create", postRef.value);
  if (response.success) {
    alert("发帖成功！");
    router.push('/');
  } else {
    alert(`发帖失败！${JSON.stringify(response)}`);
  }
};

// 页面初始化时获取分类
getCategory();
</script>

<template>
  <div class="createPostPage">
    <div class="head">发表帖子</div>
    <div class="edit">
      <!-- 标题输入 -->
      <div class="title">
        <label>标题</label>
        <input v-model="postRef.title" placeholder="请输入帖子标题" />
      </div>

      <!-- 正文输入 -->
      <div class="content">
        <label>正文</label>
        <textarea v-model="postRef.content" placeholder="请输入帖子内容，请勿发布刷帖，营销广告，违法违规，含二维码和其他违反法律和公序良俗的内容"></textarea>
      </div>

      <!-- 分类选择 -->
      <div class="category">
        <label>分类</label>
        <select v-model="postRef.categoryId">
          <option value="0" disabled>请选择分类</option>
          <option v-for="category in categoryRef" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- 图片上传 -->
      <div class="image">
        <label for="fileUpload" class="upload-btn">
          <i class="upload-icon">&#43;</i> 上传图片
        </label>
        <input type="file" id="fileUpload" @change="uploadImage" accept="image/*" />
        <div class="image-preview">
          <div v-for="(image, index) in imageRef" :key="index" class="image-item">
            <img :src="image" alt="Uploaded image" />
            <button class="delete-btn" @click="deleteImage(index)">删除</button>
          </div>
        </div>
      </div>

      <!-- 提交按钮 -->
      <div class="submit">
        <button @click="createPost">发布帖子</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.createPostPage {
  padding: 30px;
  max-width: 800px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: start;
  margin-top: 80px;
}
@media screen and (max-width: 800px){
  .createPostPage{
    min-width: 300px;
  }
}
@media screen and (min-width: 800px){
  .createPostPage{
    width: 800px;
  }
}
.head {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.edit {
  display: flex;
  flex-direction: column;
}

.title, .content, .category, .image {
  margin-bottom: 20px;
}

label {
  font-size: 16px;
  color: #555;
  margin-bottom: 5px;
}

input, textarea, select {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 16px;
  box-sizing: border-box;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #4CAF50;
}

textarea {
  height: 150px;
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  color: white;
  background-color: saddlebrown;
  padding: 2px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  box-sizing: border-box;
}

.upload-btn i {
  margin-right: 10px;
  font-size: 18px;
}

input[type="file"] {
  display: none;
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-item {
  position: relative;
}

.image-item img {
  max-width: 120px;
  max-height: 120px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.delete-btn {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(255, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 5px;
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: rgba(255, 0, 0, 0.8);
}

.submit {
  text-align: center;
}

button {
  padding: 12px 24px;
  margin-top: 10px;
  cursor: pointer;
  background-image: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}
</style>
