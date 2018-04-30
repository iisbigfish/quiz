var mongoose = require('mongoose');

// 用户的表结构
module.exports = new mongoose.Schema({
    // 用户名
    nickname: String,
    // 邮箱
    email: String,
    // 密码
    password: String,
    // 注册时间
    update: { type: Date, default: Date.now }
})