var express = require('express');
var router = express.Router();
// console.log(express);
// console.log(router.get);
router.get('/login',function (req,res,next) {
    console.log('login');
    res.render('login.html')
    // next()
});
// 返回数据
module.exports = router;