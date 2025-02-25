const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/database');

// 登录页面
router.get('/login', (req, res) => {
  res.render('auth/login', { error: null });
});

// 登录处理
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.get('users')
    .find({ username })
    .value();

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.render('auth/login', { error: '用户名或密码错误' });
  }

  req.session.userId = user.id;
  req.session.username = user.username;
  res.redirect('/');
});

// 注册页面
router.get('/register', (req, res) => {
  res.render('auth/register', { error: null });
});

// 注册处理
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  const exists = db.get('users')
    .find({ username })
    .value();

  if (exists) {
    return res.render('auth/register', { error: '用户名已存在' });
  }

  const userId = db.get('userId').value() + 1;
  
  db.get('users')
    .push({
      id: userId,
      username,
      password: bcrypt.hashSync(password, 10),
      created_at: new Date().toISOString()
    })
    .write();

  db.set('userId', userId).write();
  
  res.redirect('/login');
});

// 注销
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router; 