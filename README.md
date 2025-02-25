# Express 博客系统

一个使用 Node.js + Express + EJS + Lowdb 构建的轻量级博客系统。适合 Node.js 初学者学习和参考。

## 🚀 功能特点

- 👤 用户系统
  - 注册/登录/注销
  - 密码使用 bcryptjs 加密存储
  - 使用 express-session 管理会话
- 📝 文章管理
  - 发布/编辑/删除文章
  - 分页显示文章列表
  - 按时间排序
- 🎨 界面设计
  - 响应式布局
  - 现代简约风格
  - 用户友好的交互体验

## 🛠️ 技术栈

- **Node.js**: v16.0.0 或更高
- **Express**: Web 应用框架
- **EJS**: 模板引擎
- **Lowdb**: JSON 文件数据库
- **Express-session**: 会话管理
- **Bcryptjs**: 密码加密
- **Moment.js**: 时间格式化

## 📦 安装和运行

1. **克隆项目**
   ```bash
   git clone https://github.com/youke0721/blog-cursor.git
   cd blog-cursor
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动服务器**
   ```bash
   # 开发模式（支持热重载）
   npm run dev

   # 生产模式
   npm start
   ```

4. **访问应用**
   - 打开浏览器访问 http://localhost:3000
   - 首次使用请先注册账号

## 📁 项目结构
blog-system/
├── config/ # 配置文件
│ └── database.js # 数据库配置
├── routes/ # 路由处理
│ ├── auth.js # 用户认证路由
│ └── posts.js # 文章管理路由
├── views/ # 视图模板
│ ├── layouts/ # 布局模板
│ ├── auth/ # 用户认证页面
│ └── posts/ # 文章相关页面
├── public/ # 静态资源
│ └── css/ # 样式文件
├── app.js # 应用入口
└── init-db.js # 数据库初始化


## 💡 主要功能说明

### 用户功能
- 注册：用户名和密码验证
- 登录：Session 保持登录状态
- 注销：清除会话信息

### 文章管理
- 创建：登录用户可发布文章
- 编辑：作者可编辑自己的文章
- 删除：作者可删除自己的文章
- 查看：所有用户可查看文章

## ⚙️ 配置说明

数据库配置 (config/database.js):
javascript
const db = low(adapter);
db.defaults({
users: [],
posts: [],
userId: 0,
postId: 0
}).write()
服务器配置 (app.js):
javascript
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';


## 🔍 常见问题

1. **Q: 数据存储在哪里？**
   A: 数据存储在项目根目录的 db.json 文件中

2. **Q: 如何备份数据？**
   A: 复制 db.json 文件即可

3. **Q: 支持多用户同时使用吗？**
   A: 支持，使用 express-session 管理用户会话

## 📝 开发建议

1. 本项目适合学习用途
2. 生产环境建议使用更稳定的数据库
3. 可以根据需要扩展更多功能

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT

## 🔜 待开发功能

- [ ] 评论功能
- [ ] 文章分类
- [ ] 用户头像
- [ ] 文章搜索
- [ ] 富文本编辑器

---

如果觉得这个项目对你有帮助，欢迎 Star ⭐️

