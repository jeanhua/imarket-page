<script setup lang="ts">
import { Request } from "../../script/request.ts";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {ImageUtil} from "../../script/imageUtil.ts";

const Req = Request.getInstance();
const router = useRouter();
const nickname = ref("");
const avatar = ref("/images/defaultAvatar.svg");
const username = ref("");
const email = ref("");
const status = ref(0);

// 获取用户信息
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

// 提交修改
const commitChange = async () => {
  if (nickname.value.length > 15) {
    alert("昵称不能超过15位");
    return;
  }
  if (!validateEmail(email.value)) {
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
  } else {
    alert(`保存失败！${JSON.stringify(response)}`);
  }
};

// 头像设置菜单的控制
const openMenu = ref(false);

// 使用 QQ 头像
const useQQavatar = () => {
  let qq = prompt("请输入QQ号：");
  if (qq != null && qq !== "") {
    avatar.value = `https://q1.qlogo.cn/g?b=qq&nk=${qq}&src_uin=www.jlwz.cn&s=0`;
    openMenu.value = false;
  }
};

// 上传头像
const uploadImage = (event: Event) => {
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
          avatar.value = response.path;
        }else {
          alert(`上传失败！${JSON.stringify(response)}`);
        }
      }
      catch (e){
        alert(`上传失败！${e}`);
      }
      openMenu.value = false;
    };
    reader.readAsArrayBuffer(file);
  }
};

onMounted(() => {
  getInfo();
});
</script>

<template>
  <div class="body">
    <div class="profile-container">
      <div class="header">
        <div class="return" style="margin-right: 10px;cursor: default;" @click="router.push('/about')">🔙</div>编辑信息
      </div>
      <div class="profile-info">
        <div class="avatar" @click="openMenu = true">
          <img :src="avatar" alt="avatar" @click.stop="openMenu=true" />
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

    <!-- 头像设置菜单 -->
    <div v-if="openMenu" class="menu-container">
      <div class="menuBk" @click.stop="openMenu=false"></div>
      <div class="menu">
        <!-- 上传图片 -->
        <input type="file" accept="image/*" @change="uploadImage" />
        <button @click="avatar='/images/defaultAvatar.svg';openMenu=false">恢复默认</button>
        <button @click="useQQavatar()">使用QQ头像</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  position: absolute;
  left: 0;
  top: 0;
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
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
}
button:active {
  background-color: #003c82;
}
.menu-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menuBk {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #999999;
  opacity: 0.7;
}
.menu {
  background-color: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 50px;
  border-radius: 20px;
}
.menu button {
  margin: 10px;
}

@media (prefers-color-scheme: dark) {
  .body {
    background-color: #121212;
  }
  .profile-container {
    background-color: #1e1e1e;
    color: #ffffff;
    box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
  }
  .header {
    color: #ffffff;
  }
  .user-details .username {
    color: #ffffff;
  }
  label {
    color: #aaaaaa;
  }
  input {
    background-color: #333;
    color: #ffffff;
    border-color: #444;
  }
  input:focus {
    border-color: #bb86fc;
  }
  button {
    background-image: linear-gradient(120deg, #4b6cb7 0%, #182848 100%);
  }
  button:hover {
    background-image: linear-gradient(120deg, #6a82fb 0%, #fc5c7d 100%);
  }
  button:active {
    background-color: #003c82;
  }
  .menuBk {
    background-color: #121212;
  }
  .menu {
    background-color: #1e1e1e;
    color: #ffffff;
  }
  .menu button {
    background-color: #333;
    color: #ffffff;
    border: 1px solid #444;
  }
  .menu button:hover {
    background-color: #444;
  }
}
</style>
