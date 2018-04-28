var mongoose = require('mongoose');

// 问题的表结构
module.exports = new mongoose.Schema({
    // 用户名
    question: String,
    // 密码
    option: Object,
    // 注册时间
    answer: String
})
