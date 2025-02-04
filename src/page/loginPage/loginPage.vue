<script setup lang="ts">
import { ref } from "vue";
import { Request } from "../../script/request.ts";
import Modal from "../../components/modal.vue";

const modalRef = ref<InstanceType<typeof Modal> | null>(null);
const noticetext = ref("");
const formType = ref<"login" | "register" | "forget" |"_">("login");

// 表单数据
const email = ref("");
const username = ref("");
const password = ref("");
const emailForForget = ref("");

const Req = Request.getInstance();

const openModal = () => {
  modalRef.value?.openModal();
};
const title =ref('登陆');
// 邮箱格式验证
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// 登录功能
const login = async () => {
  if (!username.value || !password.value) {
    noticetext.value = "用户名或密码不能为空";
    openModal();
    return;
  }
  const response = await Req.login(username.value, password.value);
  if (!response) {
    noticetext.value = "登录失败，请检查用户名和密码";
    openModal();
  }
};

// 注册功能
const register = async () => {
  if (!email.value || !username.value || !password.value) {
    noticetext.value = "所有字段都必须填写";
    openModal();
    return;
  }
  if (!validateEmail(email.value)) {
    noticetext.value = "请输入有效的邮箱地址";
    openModal();
    return;
  }
  const response = await Req.register(email.value, username.value, password.value);
  if (response) {
    noticetext.value = "注册成功，请登录";
    formType.value = "login";
  } else {
    noticetext.value = "注册失败，请重试";
  }
  openModal();
};

// 忘记密码功能
const forgetPassword = async () => {
  if (!emailForForget.value) {
    noticetext.value = "请输入注册邮箱";
    openModal();
    return;
  }
  if (!validateEmail(emailForForget.value)) {
    noticetext.value = "请输入有效的邮箱地址";
    openModal();
    return;
  }
  const response = await Req.forgetPassword(emailForForget.value);
  if (response) {
    noticetext.value = "重置邮件已发送，请检查邮箱";
    formType.value = "login";
  } else {
    noticetext.value = "邮件发送失败，请检查邮箱";
  }
  openModal();
};

// 切换表单类型
const switchForm = (type: "login" | "register" | "forget" | "_") => {
  title.value = type === 'login' ? '登录' : type === 'register' ? '注册' : '重置密码';
  formType.value = "_";
  // 延迟0.3s
  setTimeout(() => {
    formType.value = type;
    // 清空表单数据
    email.value = "";
    username.value = "";
    password.value = "";
    emailForForget.value = "";
  },300);
};
</script>

<template>
  <div class="login-page">
    <div class="head">iMarket {{ title }}</div>
    <div class="content">
      <!-- 登录表单 -->
      <transition name="fade-transform" mode="out-in">
        <div class="form" v-if="formType === 'login'">
          <div class="input">
            <div class="form-item">
              <label for="username">用户名：</label>
              <input type="text" id="username" v-model="username">
            </div>
            <div class="form-item">
              <label for="password">密码：</label>
              <input type="password" id="password" v-model="password">
            </div>
          </div>
          <div class="option">
            <div class="register">
              <a @click.prevent="switchForm('register')">注册</a>
            </div>
            <div class="forget">
              <a @click.prevent="switchForm('forget')">忘记密码</a>
            </div>
          </div>
          <div class="form-item">
            <button @click="login">登录</button>
          </div>
        </div>
      </transition>

      <!-- 注册表单 -->
      <transition name="fade-transform" mode="out-in">
        <div class="form" v-if="formType === 'register'">
          <div class="input">
            <div class="form-item">
              <label for="email">邮箱：</label>
              <input type="email" id="email" v-model="email">
            </div>
            <div class="form-item">
              <label for="reg-username">用户名：</label>
              <input type="text" id="reg-username" v-model="username">
            </div>
            <div class="form-item">
              <label for="reg-password">密码：</label>
              <input type="password" id="reg-password" v-model="password">
            </div>
          </div>
          <div class="option">
            <div class="back-to-login">
              <a @click.prevent="switchForm('login')">返回登录</a>
            </div>
          </div>
          <div class="form-item">
            <button @click="register">注册</button>
          </div>
        </div>
      </transition>

      <!-- 忘记密码表单 -->
      <transition name="fade-transform" mode="out-in">
        <div class="form" v-if="formType === 'forget'">
          <div class="input">
            <div class="form-item">
              <label for="forget-email">注册邮箱：</label>
              <input type="email" id="forget-email" v-model="emailForForget">
            </div>
          </div>
          <div class="option">
            <div class="back-to-login">
              <a @click.prevent="switchForm('login')">返回登录</a>
            </div>
          </div>
          <div class="form-item">
            <button @click="forgetPassword">发送重置邮件</button>
          </div>
        </div>
      </transition>
    </div>

    <modal ref="modalRef">
      <h2>提示</h2>
      <p>{{ noticetext }}</p>
    </modal>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  width: 200px;
  height: 50px;
  top:150px;
  margin-bottom: 50px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-family: "custom-font", serif;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px #ccc;
}

.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

input {
  width: 200px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0 10px;
  font-size: 1.2rem;
}

.input {
  border: 1px solid darkorange;
  padding-top: 15px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  max-height: 600px;
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 0 10px #ccc;
}

.form-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.form-item label {
  width: 100px;
}

.form-item button {
  width: 200px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0 10px;
  font-size: 2rem;
  background-color: white;
  color: black;
  cursor: pointer;
  font-family: "custom-font", serif;
}

.form-item button:hover {
  background-color: #999;
}

.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
}

.register a {
  text-decoration: none;
  color: black;
  font-size: 1.2rem;
  font-family: "custom-font", serif;
}

.forget a {
  text-decoration: none;
  color: black;
  font-size: 1.2rem;
  font-family: "custom-font", serif;
}

.back-to-login a {
  color: #666;
  font-size: 1.2rem;
  font-family: "custom-font", serif;
}

.form-item input[type="email"] {
  width: 200px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0 10px;
  font-size: 1.2rem;
}

/*
enter-active 定义进入过渡的结束状态
leave-active 定义离开过渡的结束状态
 */
.fade-transform-leave-active,
.fade-enter,
.fade-leave-to{
  visibility: hidden;
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active{
  transition: opacity 0.2s ease;
}
.fade-enter-to,
.fade-leave{
  visibility: visible;
  opacity: 1;
}

</style>
