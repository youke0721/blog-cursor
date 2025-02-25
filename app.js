const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// 设置模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 设置布局
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// 中间件
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// 路由
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/posts'));

// 首页路由
app.get('/', (req, res) => {
  res.redirect('/posts');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
}); 