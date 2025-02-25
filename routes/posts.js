const express = require('express');
const router = express.Router();
const db = require('../config/database');
const moment = require('moment');

// 中间件：检查用户是否登录
const checkAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};

// 文章列表
router.get('/posts', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const posts = db.get('posts')
    .orderBy(['created_at'], ['desc'])
    .value();

  const start = (page - 1) * limit;
  const paginatedPosts = posts.slice(start, start + limit);
  const totalPages = Math.ceil(posts.length / limit);

  res.render('posts/list', {
    posts: paginatedPosts,
    currentPage: page,
    totalPages,
    moment,
    user: req.session.userId ? {
      id: req.session.userId,
      username: req.session.username
    } : null
  });
});

// 创建文章页面
router.get('/posts/create', checkAuth, (req, res) => {
  res.render('posts/create');
});

// 创建文章处理
router.post('/posts', checkAuth, (req, res) => {
  const { title, content } = req.body;
  const postId = db.get('postId').value() + 1;

  db.get('posts')
    .push({
      id: postId,
      title,
      content,
      user_id: req.session.userId,
      created_at: new Date().toISOString()
    })
    .write();

  db.set('postId', postId).write();
  res.redirect('/posts');
});

// 文章详情
router.get('/posts/:id', (req, res) => {
  const post = db.get('posts')
    .find({ id: parseInt(req.params.id) })
    .value();

  if (!post) {
    return res.status(404).send('文章未找到');
  }

  const author = db.get('users')
    .find({ id: post.user_id })
    .value();

  res.render('posts/view', {
    post: { ...post, username: author.username },
    moment,
    user: req.session.userId ? {
      id: req.session.userId,
      username: req.session.username
    } : null
  });
});

// 编辑文章页面
router.get('/posts/:id/edit', checkAuth, (req, res) => {
  const post = db.get('posts')
    .find({
      id: parseInt(req.params.id),
      user_id: req.session.userId
    })
    .value();

  if (!post) {
    return res.status(404).send('文章未找到');
  }

  res.render('posts/edit', { post });
});

// 更新文章
router.post('/posts/:id', checkAuth, (req, res) => {
  const { title, content } = req.body;
  
  db.get('posts')
    .find({
      id: parseInt(req.params.id),
      user_id: req.session.userId
    })
    .assign({ title, content })
    .write();

  res.redirect(`/posts/${req.params.id}`);
});

// 删除文章
router.post('/posts/:id/delete', checkAuth, (req, res) => {
  db.get('posts')
    .remove({
      id: parseInt(req.params.id),
      user_id: req.session.userId
    })
    .write();

  res.redirect('/posts');
});

module.exports = router; 