![logo](./LOGO.png)

# iMarket前端页面（适配iMarket校园集市系统）
## 项目简介
本项目是基于 Vue.js、Vite 和 TypeScript 开发的校园发帖平台前端页面。它旨在为 imarket 校园集市系统提供一个现代化、响应式、类型安全的用户交互界面。通过本平台，学生可以轻松发布和浏览帖子，参与校园生活的各个方面，包括二手交易、活动宣传、学术交流等。
## 技术栈
- **Vue.js**: 前端框架，用于构建用户界面。
- **Vite**: 构建工具，提供快速的开发服务器和构建命令。
- **TypeScript**: JavaScript 的超集，为代码提供类型系统和编译时类型检查。
- **Vue Router**: Vue 的官方路由管理器，用于页面导航。
## 功能模块
- **用户认证**：支持用户登录、注册和注销。
- **帖子发布**：用户可以创建包含文本和图片的帖子。
- **帖子列表**：展示最新和热门帖子，支持分页和懒加载。
- **帖子详情**：查看帖子详情，参与评论、点赞和收藏。
- **搜索功能**：通过关键词搜索相关帖子。
- **个人中心**：管理个人信息、帖子、评论和收藏。
## 项目结构
```
imarket-page/
├─dist/                        # 打包输出目录，包含编译后的静态文件
│  └─assets/                   # 编译后的静态资源，如图片、样式表等
├─public/                      # 公共文件，不会被 Vite 处理，直接复制到输出目录
│  └─index.html                # 入口 HTML 文件
└─src/                         # 源代码目录
    ├─assets/                  # 静态资源目录
    │  ├─font/                 # 字体文件
    │  └─icon/                 # 图标资源
    │      ├─home/             # 首页相关的图标
    │      └─postDetail/       # 帖子详情页相关的图标
    ├─components/              # 公共组件目录，可复用的 Vue 组件
    ├─page/                    # 页面组件目录，包含各个路由页面
    │  ├─categoriesPage/       # 分类页面
    │  │  └─component/         # 分类页面的子组件
    │  ├─homepage/             # 首页
    │  │  ├─aboutPage/         # 关于页面
    │  │  │  └─component/      # 关于页面的子组件
    │  │  ├─component/         # 首页的子组件
    │  │  ├─postPage/          # 帖子列表页面
    │  │  │  └─component/      # 帖子列表页面的子组件
    │  │  └─searchPage/        # 搜索页面
    │  │      └─component/     # 搜索页面的子组件
    │  ├─loginPage/            # 登录页面
    │  ├─postDetail/           # 帖子详情页面
    │  │  └─component/         # 帖子详情页面的子组件
    │  └─searchDetail/         # 搜索详情页面
    └─script/                  # 脚本目录，包含 TypeScript 配置和其他脚本文件
```
## 安装与运行
1. 克隆项目到本地：
```bash
git clone https://github.com/jeanhua/imarket-page.git
```
2. 进入项目目录，安装依赖：
```bash
cd imarket-page
npm install
```
3. 启动开发服务器：
```bash
npm run dev
```
4. 访问项目：
在浏览器中输入：http://localhost:3000
## 打包与部署
```bash
npm run build
```
打包后的文件将位于 `dist/` 目录，可用于生产环境部署。
## 注意事项
- 确保后端接口与本项目前端代码兼容。
- 根据实际需求调整组件样式。
- 替换项目中的静态资源路径为实际资源。
## 许可证
本项目采用 MIT 许可证，请遵守相关协议。
## 联系方式
如有任何问题或建议，请通过以下方式联系：
- 邮箱：jeanhua_official@outlook.com
- GitHub：https://github.com/jeanhua/imarket-page
感谢您的使用和支持！
