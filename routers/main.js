var express = require('express');
var router = express.Router();
// console.log(express);
// console.log(router.get);
router.get('/',function (req,res,next) {
    // console.log();
    res.render('index.html',{
        userInfo:req.userInfo
    })
    // next()
});
// 返回数据
module.exports = router;