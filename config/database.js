const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.join(__dirname, '../db.json'));
const db = low(adapter);

// 设置默认数据结构
db.defaults({
  users: [],
  posts: [],
  userId: 0,
  postId: 0
}).write();

module.exports = db; 