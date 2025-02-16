<script setup lang="ts">
import {Request} from "../../script/request.ts";
import {ref, onMounted, onBeforeUnmount} from "vue";
import {TimeConvert} from "../../script/timeConvert.ts";
import scrollToTopicon from "../../assets/icon/home/scrollToTop.svg";

const Req = Request.getInstance();
interface message{
  "senderUserName": string,
  "senderNickname": string,
  "receiverUserName": string,
  "receiverNickname": string,
  "id": number,
  "senderId": number,
  "receiverId": number,
  "content": string,
  "createdAt": string
}
const message_received = ref<message[]>([]);
const message_send = ref<message[]>([]);

const isAtTop = ref(true);
const scrollToTop = ()=>{
  window.scrollTo(
      {
        top:0,
        behavior:"smooth"
      }
  )
}

const show_received = ref(true);
const page_received = ref(1);
const page_send = ref(1);

const selectedMessages = ref<number[]>([]); // 存储选中的消息ID
const selectAll = ref(false); // 全选状态

const isLoading = ref(false);
const hasMore = ref(true);
const selectEnable = ref(false);
const getReceivedMessage = async (page: number) => {
  let response = await Req.Get(`/api/Message/List?isSender=false&page=${page}&pageSize=10`);
  if (response.success) {
    message_received.value.push(...response.messages);
    page_received.value++;
  }
  if(response.messages.length==0){
    hasMore.value = false;
  }
  isLoading.value = false;
};

const getSendMessage = async (page: number) => {
  let response = await Req.Get(`/api/Message/List?isSender=true&page=${page}&pageSize=10`);
  if (response.success) {
    message_send.value.push(...response.messages);
    page_send.value++;
  }
  if(response.messages.length==0){
    hasMore.value = false;
  }
  isLoading.value = false;
};

const changeMenu = ()=>{
  if(page_send.value==1){
    hasMore.value = true;
    getSendMessage(page_send.value);
  }
}

// 滚动监听
const onScroll = () => {
  const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 100;
  isAtTop.value = document.documentElement.scrollTop < 350;
  if (bottomOfWindow) {
    if (isLoading.value || !hasMore.value) return;
    isLoading.value = true;
    if (show_received.value) {
      getReceivedMessage(page_received.value);
    } else {
      getSendMessage(page_send.value);
    }
  }
};

const toggleSelectAll = () => {
  if (selectAll.value) {
    // 全选，选中所有消息的ID
    if(show_received.value) {
      selectedMessages.value = [...message_received.value.map((msg) => msg.id)];
    }else{
      selectedMessages.value = [...message_send.value.map((msg) => msg.id)];
    }
  } else {
    selectedMessages.value = []; // 取消全选
  }
};

const deleteSelectedMessages = async () => {
  if (selectedMessages.value.length === 0) {
    alert("请选择要删除的消息！");
    return;
  }
  if(!window.confirm(`确定删除选中的 ${selectedMessages.value.length} 条消息吗？注意：删除对双方都有效。`))return;
  let response = await Req.Post(`/api/Message/Delete`,selectedMessages.value);
  if(!response.success){
    alert(`消息${selectedMessages.value}删除失败！`);
  }
  window.location.reload();
};

onMounted(() => {
  // 初始加载
  getReceivedMessage(page_received.value);
  // 绑定滚动事件
  window.addEventListener('scroll', onScroll);
});

onBeforeUnmount(() => {
  // 组件卸载时移除滚动事件监听
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <div class="messagePage">
    <div class="header">
      <h1>我的消息</h1>
    </div>

    <div class="contentList">
      <div class="head-bar">
        <div :class="{ active: show_received }" @click="selectedMessages=show_received?selectedMessages:[];show_received=true;hasMore=true;">
          收件箱
        </div>
        <div :class="{ active: !show_received }" @click="selectedMessages=show_received?[]:selectedMessages;show_received=false;changeMenu();">
          发件箱
        </div>
      </div>

      <!-- 全选框 -->
      <div class="select-all" v-if="selectEnable">
        <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" /> 全选
        <button @click="deleteSelectedMessages">删除选中消息</button>
        <button @click="selectEnable=false;selectedMessages=[]">取消选择</button>
      </div>
      <div v-else class="selectEnableBtn">
        <button @click="selectEnable=true">选择</button>
      </div>

      <!-- 收到的消息 -->
      <div v-if="show_received" class="message-list">
        <div v-for="message in message_received" :key="message.id" class="message-item receive">
          <input type="checkbox" v-model="selectedMessages" :value="message.id" v-if="selectEnable" />
          <div class="avatar">
            <span class="icon">📩</span>
          </div>
          <div class="content">
            <div class="meta">
              <span class="nickname">{{ message.senderNickname }}</span>
              <span class="relation">@{{ message.senderUserName }}</span>
              <span class="time">{{ TimeConvert.Convert(message.createdAt) }}</span>
            </div>
            <p class="message-text">{{ message.content }}</p>
          </div>
        </div>
      </div>

      <!-- 发送的消息 -->
      <div v-if="!show_received" class="message-list">
        <div v-for="message in message_send" :key="message.id" class="message-item send">
          <input type="checkbox" v-model="selectedMessages" :value="message.id" v-if="selectEnable" />
          <div class="avatar">
            <span class="icon">📤</span>
          </div>
          <div class="content">
            <div class="meta">
              <span class="nickname">给 {{ message.receiverNickname }}</span>
              <span class="relation">@{{ message.receiverUserName }}</span>
              <span class="time">{{ TimeConvert.Convert(message.createdAt) }}</span>
            </div>
            <p class="message-text">{{ message.content }}</p>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="loading">加载中...</div>
      <div v-if="!hasMore" class="loading">没有更多消息了</div>
      <div class="scrollToTopBtn" v-show="!isAtTop"><img :src="scrollToTopicon" alt="scroll" @click="scrollToTop()" /></div>
    </div>
  </div>
</template>


<style scoped>
.messagePage {
  padding: 20px;
  background: #f8f9fa;
  overflow-y: auto;
  min-height: 90vh;
}
@media screen and (min-width: 800px){
  .messagePage{
    width: 800px;
  }
}
@media screen and (max-width: 800px){
  .messagePage{
    width: 90vw;
  }
}
.select-all {
  margin: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.select-all input {
  margin-right: 10px;
}

.select-all button {
  background: #ff5722;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}
.message-list input{
  position: relative;
}
.select-all button:hover {
  background: #e64a19;
}
.contentList{
  width: 100%;
  margin-bottom: 50px;
}
.header {
  text-align: center;
  padding: 2rem 0;
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.header h1 {
  color: white;
  font-size: 2.2rem;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.head-bar {
  display: flex;
  gap: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.head-bar div {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
  color: #666;
  background: #f0f0f0;
}

.head-bar div.active {
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(76,175,80,0.3);
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message-item {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  transition: transform 0.2s ease;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05);
}

.message-item:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.avatar {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e8f5e9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.receive .avatar {
  background: #e8f5e9;
  color: #4CAF50;
}

.send .avatar {
  background: #e3f2fd;
  color: #2196F3;
}

.content {
  flex: 1;
}

.meta {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin-bottom: 0.8rem;
}

.nickname {
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
}

.relation {
  color: #666;
  font-size: 0.9rem;
}

.time {
  color: #999;
  font-size: 0.85rem;
  margin-left: auto;
}

.message-text {
  margin: 0;
  color: #444;
  line-height: 1.6;
  font-size: 1rem;
  background: #f8f9fa;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #eee;
  text-align: start;
}

.loading {
  text-align: center;
  padding: 1rem;
  color: #666;
  font-size: 0.9rem;
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

.selectEnableBtn{
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: start;
}

.selectEnableBtn button{
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

@media (prefers-color-scheme: dark) {
  .messagePage {
    background: #121212;
  }
  .header {
    background-image: linear-gradient(120deg, #4b6cb7 0%, #182848 100%);
  }
  .header h1 {
    color: #ffffff;
  }
  .head-bar {
    background: #1e1e1e;
  }
  .head-bar div {
    background: #2a2a2a;
    color: #ccc;
  }
  .head-bar div.active {
    background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  }
  .message-item {
    background: #1e1e1e;
    box-shadow: 0 3px 6px rgba(255, 255, 255, 0.05);
  }
  .message-item:hover {
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
  }
  .receive .avatar {
    background: #1b5e20;
  }
  .send .avatar {
    background: #1565c0;
  }
  .nickname {
    color: #ffffff;
  }
  .relation {
    color: #cccccc;
  }
  .time {
    color: #aaaaaa;
  }
  .message-text {
    background: #1e1e1e;
    color: #ffffff;
    border: 1px solid #333333;
  }
  .loading {
    color: #cccccc;
  }
  .scrollToTopBtn img {
    background-color: #1e1e1e;
    filter: brightness(0.8);
  }
  .scrollToTopBtn img:hover {
    filter: brightness(1.2);
  }
  .select-all button {
    background: #ff5722;
  }
  .selectEnableBtn button {
    background: #4CAF50;
  }
}
</style>
