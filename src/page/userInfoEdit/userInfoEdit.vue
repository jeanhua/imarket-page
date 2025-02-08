<script setup lang="ts">
import { Request } from "../../script/request.ts";
import { ref, onMounted } from "vue";
import {useRouter} from "vue-router";

const Req = Request.getInstance();
const router = useRouter();
const nickname = ref("");
const avatar = ref("/images/defaultAvatar.svg");
const username = ref("");
const email = ref("");
const status = ref(0);

const getInfo = async () => {
  let response = await Req.Get<any>("/api/Account/Info", false);
  if (response.success) {
    nickname.value = response.account.nickname;
    avatar.value = response.account.avatar;
    username.value = response.account.username;
    email.value = response.account.email;
    status.value = response.account.status;
  } else {
    alert(`获取用户信息失败, ${JSON.stringify(response)}`);
  }
};

// 邮箱格式验证
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const commitChange = async () => {
  if(nickname.value.length>15){
    alert("昵称不能超过15位");
    return;
  }
  if(!validateEmail(email.value)){
    alert("请输入合法的邮箱地址！");
    return;
  }
  let response = await Req.Post<any>("/api/Account/Edit", {
    "nickname": nickname.value,
    "avatar": avatar.value,
    "email": email.value,
  }, true);
  if (response.success) {
    alert("保存成功");
    getInfo();
  }else {
    alert(`保存失败！${JSON.stringify(response)}`);
  }
};

onMounted(() => {
  getInfo();
});
</script>

<template>
  <div class="body">
    <div class="profile-container">
      <div class="header"><div class="return" style="margin-right: 10px;cursor: default;" @click="router.push('/about')">🔙</div>编辑信息</div>
      <div class="profile-info">
        <div class="avatar">
          <img :src="avatar" alt="avatar" />
        </div>
        <div class="user-details">
          <div class="username">用户名：{{ username }}</div>
          <div class="nickname">
            <label for="nickname">昵称</label>
            <input id="nickname" v-model="nickname" placeholder="输入昵称" />
          </div>
          <div class="email">
            <label for="email">邮箱</label>
            <input id="email" v-model="email" placeholder="输入邮箱" />
          </div>
        </div>
      </div>
      <div class="btn-container">
        <button @click="commitChange">保存</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body{
  position: absolute;
  left: 0;
  top:0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 300px;
}

.header {
  display: flex;
  flex-direction: row;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ddd;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  width: 100%;
  text-align: left;
  font-size: 16px;
}

.user-details .username {
  margin-bottom: 12px;
  font-weight: 600;
  text-align: center;
}

.user-details .nickname,
.user-details .email {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  color: #666;
  font-size: 14px;
}

input {
  position: relative;
  max-width: 300px;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  margin-bottom: 10px;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.btn-container {
  text-align: center;
}

button {
  padding: 12px 24px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  background-color: #003c82;
}
</style>
