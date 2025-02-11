<script setup lang="ts">
import {Request} from "../../../script/request.ts";
import {onMounted, ref} from "vue";
import {TimeConvert} from "../../../script/timeConvert.ts";
import {useRouter} from "vue-router";

const props = defineProps({
  postId: String,
  isLogin: Boolean,
  MyUsername: String,
  refresh: {type: Function, required: true}
});

const router = useRouter();
const req = Request.getInstance();

const comments = ref<_Comment[]>();

interface _Comments {
  success: boolean;
  comments: _Comment[];
}

interface _Comment {
  id: number;
  nickname: string;
  username: string;
  userAvatar: string;
  content: string;
  isLike: boolean;
  likeNum: number;
  createdAt: string;
}

const isLoading = ref(false);
const error = ref<string | null>(null);

const getComments = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    let response = await req.Get<_Comments>(`/api/Comments/${props.postId}`, false);
    if (response.success) {
      response.comments.sort((a, b) => b.likeNum - a.likeNum);
      comments.value = response.comments;
    } else {
      error.value = "Failed to load comments";
    }
  } catch (err) {
    error.value = "An error occurred while fetching comments";
  } finally {
    isLoading.value = false;
  }
};

// 评论点赞
const likeComment = async (commentId: number) => {
  try {
    const comment = comments.value?.find(c => c.id === commentId);
    if (!comment) return;
    const endpoint = comment.isLike ? "/api/Comments/Unlike" : "/api/Comments/Like";
    const response = await req.Get<any>(`${endpoint}?commentId=${commentId}`);
    if (response.success) {
      comment.isLike = !comment.isLike;
      comment.likeNum += comment.isLike ? 1 : -1;
    }
  } catch (err) {
    alert("操作失败，请稍后再试😥");
  }
};

const newComment = ref("");
const reply = ref("");
const replyToId = ref<number | null>(null);
const textarea = ref<any>(null);

const submitComment = async () => {
  if (!newComment.value.trim()) return;
  if (newComment.value.length > 1000) {
    alert("评论太多了，装不下了😥");
    return;
  }

  let content = newComment.value;

  if (replyToId.value) {
    const repliedComment = comments.value?.find(c => c.id === replyToId.value);
    if (repliedComment) {
      const repliedContent = repliedComment.content.split('\n\n').slice(-1)[0].trim(); // 取最后一部分作为原文
      content = `> @${repliedComment.nickname}：${repliedContent}\n\n${content}`;
    }
  }

  try {
    const response = await req.Post<any>(`/api/Comments/Create`, {
      postId: Number(props.postId),
      content: content,
    });
    if (response.success) {
      newComment.value = "";
      reply.value = "";
      replyToId.value = null;
      await getComments();
    }
  } catch (err) {
    alert("评论失败，请稍后再试😥");
  }
};

const deleteComments = async (id: number) => {
  const isConfirmed = window.confirm("确定要删除这条评论吗？");
  if (!isConfirmed) return;
  let response = await req.Get<any>(`/api/Comments/Delete?commentId=${id}`);
  if (response.success) {
    await getComments();
    reply.value = "";
    replyToId.value = null;
  } else {
    alert("删除评论失败,请稍后再试");
  }
};

// 回复内容
const replyToComment = (comment: _Comment) => {
  reply.value = comment.nickname; // 设置回复目标的昵称
  replyToId.value = comment.id;   // 设置被回复评论的 ID
  newComment.value = `@${comment.nickname} `;  // 在评论框中加入引用的昵称
};

onMounted(() => {
  getComments();
});

const safeContent = (content: string): string => {
  const escapeHtml = (str: string): string => {
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
  };

  return escapeHtml(content);
};


</script>

<template>
  <div class="comments">
    <div class="head">评论</div>
    <div v-if="isLoading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div class="commentItem" v-for="comment in comments" :key="comment.id">
        <div class="avatar">
          <img :src="comment.userAvatar" alt="头像" @click="router.push(`/userPost/${comment.username}`)"/>
          <div class="nickName">
            <u>{{ comment.nickname }}</u>
            <span style="margin-left: 1.5rem">{{ TimeConvert.Convert(comment.createdAt) }}</span>
          </div>
        </div>
        <div class="content">
          <template v-for="(line, index) in comment.content.split('\n\n')">
            <!-- 如果是引用行（以 > 开头） -->
            <blockquote v-if="line.startsWith('>')" class="quote" :key="`quote-${index}`">
              回复评论 {{ safeContent(line.slice(1).trim()) }}
            </blockquote>
            <!-- 否则是普通评论内容 -->
            <p v-else class="comment" :key="`text-${index}`">
              {{ safeContent(line.trim()) }}
            </p>
          </template>
        </div>
        <div class="commentItemBtn">
          <button @click="likeComment(comment.id)"
                  :style="`background-image: ${comment.isLike ? 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%);' : 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);'}`">
            {{ comment.isLike ? '👎' : '👍' }}{{ comment.likeNum }}
          </button>
          <button v-if="MyUsername === comment.username" @click="deleteComments(comment.id)">删除评论</button>
          <button @click="replyToComment(comment)">回复</button>
        </div>
      </div>
      <div v-if="comments?.length === 0">
        暂时没有人评论
      </div>
    </div>
    <div v-if="isLogin" class="commentForm">
      <div class="reply" v-if="reply">
        <div class="closeReply" @click="reply = '';replyToId = null;">❌</div>
        <div>回复 {{ reply }}</div>
      </div>
      <textarea v-model="newComment" ref="textarea" placeholder="写下你的评论..."></textarea>
      <br>
      <button @click="submitComment">提交评论</button>
    </div>
    <div v-else>
      请<a @click="props.refresh()"> 登录 </a>后评论
    </div>
  </div>
</template>

<style scoped>
.comments {
  position: relative;
  margin-top: 30px;
  margin-bottom: 50px;
  max-width: 800px;
  min-width: 300px;
  top: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  align-items: start;
}

.head {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.commentItem {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 20px;
  border: lightblue solid 1px;
  padding: 10px;
  border-radius: 10px;
}

.commentItemBtn {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: right;
  width: 100%;
}

.commentItemBtn button {
  padding: 5px;
  margin-right: 10px;
}

.commentItemBtn button:focus {
  outline: none;
}

.content {
  padding-left: 3rem;
  text-align: start;
  margin: 10px;
}

.avatar img {
  width: 2.3rem;
  border-radius: 50%;
}

.avatar {
  display: flex;
  flex-direction: row;
  color: #999999;
  align-items: center;
}

.nickName {
  display: flex;
  font-size: 1rem;
  text-align: center;
  justify-content: space-around;
  margin-left: 10px;
}

.error {
  color: red;
}

.commentForm {
  margin-top: 20px;
}

.commentForm textarea {
  position: relative;
  height: 100px;
  width: 90%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.commentForm button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.commentForm button:hover {
  background-color: #0056b3;
}

.commentForm button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.closeReply {
  border-radius: 50%;
  background-color: wheat;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 1.5rem;
}

.reply {
  display: flex;
  align-items: center;
  padding: 10px;
}

/* 整体容器样式 */
.quote-container {
  border-left: 4px solid #007bff; /* 左侧蓝色竖线 */
  padding-left: 16px; /* 左侧内边距 */
  margin: 16px 0; /* 上下外边距 */
}

/* 引用部分样式 */
.quote {
  font-style: italic; /* 斜体 */
  color: #555; /* 灰色文字 */
  margin: 0 0 8px 0; /* 下边距 */
  padding: 8px 12px; /* 内边距 */
  background-color: #f9f9f9; /* 浅灰色背景 */
  border-radius: 4px; /* 圆角 */
}

/* 评论部分样式 */
.comment {
  color: #333; /* 深灰色文字 */
  margin: 0; /* 去掉默认外边距 */
  padding: 8px 12px; /* 内边距 */
  background-color: #f0f8ff; /* 浅蓝色背景 */
  border-radius: 4px; /* 圆角 */
}


</style>
