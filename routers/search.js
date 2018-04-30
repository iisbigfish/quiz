var express = require('express');
var router = express.Router();
router.get('/search',function (req,res,next) {
    console.log('search');
    res.render('search.html')
    // next()
});
// 返回数据
module.exports = router;
