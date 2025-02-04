<script setup lang="ts">
import postList from '../../components/postList.vue';
import {useRoute} from "vue-router";
import {Request} from "../../script/request.ts";
import {onMounted, ref} from "vue";
import HomeBtn from "../../components/homeBtn.vue";
const route = useRoute();
const id = route.params.id;
const Url = `/api/Post/CategorisedPosts?categoryId=${id}&`;
const Req = Request.getInstance();
const categoryName = ref('');
const description = ref('');
const getCategoryName = async () => {
  let response = await Req.Get<any>(`/api/Post/Categories/${id}`,false);
  categoryName.value = response?.category.name;
  description.value = response?.category.description;
}
onMounted(
  getCategoryName
)
</script>

<template>
 <div class="categoriesPost">
   <div class="head">
    <div class="title">
      <home-btn class="homeBtn" />
      <router-link to="/" style="color: black">iMarket•{{categoryName}}</router-link>
    </div>
    <div class="description">
     {{description}}
    </div>
   </div>
   <div class="content">
    <post-list :Url="Url" />
   </div>
 </div>
</template>

<style scoped>
.head{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  max-height: 120px;
  box-shadow:  0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius:  0 0 10px 10px;
  z-index: 1000;
}
.title{
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  font-family: "custom-font",serif;
}
.description{
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 3px;
}
.homeBtn{
  position: absolute;
  left: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
