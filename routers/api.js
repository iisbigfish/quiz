let express = require('express');
let router = express.Router();

// 引入model模块，定义一个对象，通过操作对象的方式去操作数据库
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let User = require('../Models/User');
let Question = require('../Models/Question');

// 统一返回格式
let responseData;

router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    };
    next();
});


// 用户注册
// 注册逻辑
// 数据验证
router.post('/user/register', function (req, res) {
    console.log(req.body);
    let nickname = req.body.nickname;
    let email = req.body.email;
    let password = req.body.password;
    // 判断用户名是否为空
    if (email == '') {
        responseData.code = 2;
        responseData.message = '邮箱不能为空';
        res.json(responseData);
        return;
    }
    // 判断密码是否为空
    if (password == '') {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    // 判断用户名是否已经注册
    User.findOne({
        email: email
    }, function (err, doc) {
        if (doc) {
            responseData.code = 3;
            responseData.message = '邮箱已经被注册了';
            res.json(responseData);
            return;
        }
        // 保存用户注册的信息到数据中
        let user = new User({
            email: email,
            password: password,
            nickname: nickname
        });
        user.save();
        responseData.code = 4;
        responseData.message = '注册成功';
        res.json(responseData);
        return;
    });


});


// 用户登录
router.post('/user/login', function (req, res) {
    console.log(req.body, '/user/login');
    let password = req.body.password;
    let username = req.body.username
    if (password == '' || username == '') {
        responseData.code = 2;
        responseData.message = '用户名或密码不能为空';
        res.json(responseData);
        return
    }
    // 判断用户名是否已经注册
    User.findOne({
        nickname: username,
        password: password
    }, function (err, doc) {
        if (doc) {
            console.log(doc, 'doc')
            responseData.code = 4;
            responseData.message = '登录成功';
            responseData.userInfo = {
                _id: doc._id,
                username: doc.nickname
            };
            req.session.userInfo = username
            res.json(responseData);
            return
        }
        responseData.code = 2;
        responseData.message = '用户名或密码错误';
        res.json(responseData);
        return
    });
});
// 用户搜索
router.post('/search', function (req, res) {
    let keyword = req.body.keyword
    Question.find().where('question').equals(new RegExp(keyword), 'i').exec((err, data) => {
        if (data.length) {
            responseData.code = 4;
            responseData.message = true;
            responseData.data = data;
            res.json(responseData);
        } else {
            responseData.code = 0;
            responseData.message = '暂无记录';
            responseData.data = data;
            res.json(responseData);
        }
        return
    })
})
// 用户插入问题
router.post('/insert', function (req, res) {
    let quest = req.body.questions
    let qm = quest.split('\n')
        .map(it => it.split('||'))
        .map((element, index) => {
            let m = new Question({
                question: element[0],
                answer: element[2],
                option: element[1].split(',')
            })
            return m
        })

    Question.insertMany(qm, (err, data) => {
        if (err) {
            console.log(err)
            responseData.code = 0;
            responseData.message = '插入失败，请重试';
            res.json(responseData);
        } else {
            responseData.code = 0;
            responseData.message = '插入成功';
            res.json(responseData);
        }
    })
})

// 返回数据
module.exports = router;