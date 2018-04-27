var express = require('express');
var router = express.Router();
// console.log(express);
// console.log(router.get);
router.get('/register',function (req,res,next) {
    console.log('register');
    res.render('register.html')
    // next()
});
// 返回数据
module.exports = router;