  <center>

  ![logo](./LOGO.png)

  # iMarket 校园集市前端  

  <div align="center">
    <img src="https://img.shields.io/github/created-at/jeanhua/imarket-page?color=00CC99&style=flat-square" alt="创建时间">
    <img src="https://img.shields.io/badge/Vue-3.5.13-4FC08D?logo=vue.js&logoColor=white&style=flat-square" alt="Vue版本">
    <img src="https://img.shields.io/badge/Vite-6.0.5-646CFF?logo=vite&logoColor=white&style=flat-square" alt="Vite">
    <img src="https://img.shields.io/github/license/jeanhua/imarket-page?color=blue&style=flat-square" alt="许可证">
  </div>


  </center>

---

  ## 🌟 项目亮点

  🎨 **响应式设计** · ⚡ **毫秒级热更新** · 🔒 **JWT自动续期**  
  📱 **PWA支持** · 📊 **可视化数据统计**

<div align="center">
  <a href="https://imarket.jeanhua.cn/"><img src="https://img.shields.io/badge/🚀_在线体验-00B4D8?style=for-the-badge" alt="在线体验"></a>
  <a href = "https://github.com/jeanhua/imarket-backend"><img src="https://img.shields.io/badge/💻_后端仓库-6E5494?style=for-the-badge" alt="后端仓库"></a>
</div>

---

  ## 🛠️ 技术全景图

  <table>
    <tr>
      <td width="33%">
        <div align="center">
          <img src="https://vuejs.org/logo.svg" width="60" alt="Vue3">
          <br><strong>Vue 3</strong>
          <br>组合式API + 响应式系统
        </div>
      </td>
      <td width="33%">
        <div align="center">
          <img src="https://vitejs.dev/logo.svg" width="60" alt="Vite">
          <br><strong>Vite 6</strong>
          <br>极速开发体验
        </div>
      </td>
      <td width="33%">
        <div align="center">
          <img src="https://www.typescriptlang.org/icons/icon-96x96.png" width="60" alt="TypeScript">
          <br><strong>TypeScript 5</strong>
          <br>强类型代码规范
        </div>
      </td>
    </tr>
  </table>


---

  ## 🎯 核心功能体系

  <details>
  <summary><strong>✨ 交互体验</strong></summary>
  • **内容创作** ✍️  
    📝 安全的界面显示 · 🖼️ 多图上传

  • **社交互动** 💬  
    ❤️ 点赞动画 · ⭐ 收藏管理 · 🔄 分享到社交平台 · 🔔 消息通知 

  </details>

---

  ## 🚀 快速启动指南

  ```bash
  # 克隆仓库
  git clone https://github.com/jeanhua/imarket-page.git
  
  # 安装依赖
  npm install
  
  # 启动开发模式
  npm run dev
  ```

---

  ## 🗂️ 项目结构解析

  ```tree
  src/
  ├── assets/                  # 静态资源库
  │   └── icon/                # SVG图标
  ├── components/              # 通用组件
  ├── page/                    # 页面
  └── script/                  # 脚本
      └── utils/               # 通用工具库
  ```

---

  ## 📦 生产部署方案

  ```bash
  # 构建生产版本
  npm run build
  
  # 部署到Nginx服务器
  server {
      listen 80;
      server_name imarket.jeanhua.cn;
      
      location / {
          root   /var/www/imarket;
          index  index.html;
          try_files $uri $uri/ /index.html;
      }
  }
  ```

---

  ## 🤝 贡献者公约

  我们欢迎以下类型的贡献：  
  🔍 **BUG排查** · 🎨 **UI优化** · 📚 **文档完善**  
  🌍 **国际化** · 🧪 **单元测试** · 🚀 **性能优化**

  **协作流程**：
  1. 创建特性分支 `git checkout -b feature/awesome-feature`
  2. 提交原子化commit `git commit -m 'feat: 新增炫酷功能'`
  3. 推送至远程仓库 `git push origin feature/awesome-feature`
  4. 创建Pull Request并关联issue

---

  ## 📮 联系我们

  <table>
    <tr>
      <td width="50%">
        <div align="center">
          <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" width="30">
          <br>
          <strong>技术支持</strong>
          <br>
          <a href="mailto:jeanhua_official@outlook.com">jeanhua_official@outlook.com</a>
        </div>
      </td>
      <td width="50%">
        <div align="center">
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30">
          <br>
          <strong>项目看板</strong>
          <br>
          <a href="https://github.com/jeanhua/imarket-page/pulse">GitHub Insights</a>
        </div>
      </td>
    </tr>
  </table>


---

  <div align="center">
    📜 基于 MIT 协议开源 · Copyright © Since 2025 JeanHua
  </div>
