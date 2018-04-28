// 应用程序的启动入口文件
    // 加载express模块
    var express = require('express');
    var swig = require('swig');
    // 加载数据库模块
    var mongoose = require('mongoose');
    const session = require('client-sessions');
    mongoose.Promise = global.Promise;
    // 处理前端提交过来的数据
    var bodyParser = require('body-parser');
    //加载cookies模块
    var Cookies = require('cookies');
    // 创建app应用 => NodeJs
    var app = express().listen()._events.request;    
    
    // 设置静态文件托管
    // 当用户访问的URL以/public开始，那么直接返回对应__dirname + '/public'下的文件
    app.use('/public',express.static(__dirname + '/public') );
    // 创建应用模板
    // 第一个参数：模板引擎的名称，同事也是模板文件的后缀，第二个参数表示用于u解析处理模板内容的方法
    app.engine('html',swig.renderFile);
    // 设置模板文件存放的目录，第一个必须是views，第二个参数是目录
    app.set('views','./views');
    // 注册所使用的模板引擎，第一个参数必须是view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称一致
    app.set('view engine','html');
    // 在开发过程中，需要取消模板缓存
    swig.setDefaults({cache:false});
    
    //  bodyparse设置
    app.use( bodyParser.urlencoded({extended:true}));
    app.use(session({
        cookieName: 'session',
        secret: 'random_string_goes_here',
        duration: 30 * 60 * 1000,
        activeDuration: 5 * 60 * 1000,
    }));
    // Cookies设置
    // app.use( function (req,res,next) {
    //     // 创建一个cookies对象
    //     req.cookies = new Cookies(req,res);
    
    //     // 解析登录用户的cookies信息
    //     if(req.cookies.get('userInfo')){
    //         try{
    //             req.userInfo = JSON.parse(req.cookies.get('userInfo'))
    //         }catch(e){
    //             next();
    //         }
    //     }
    //     next();
    // });
    app.use(function (req, res, next) {
        console.log(req, res)
        // res.send(JSON.stringify(req))
        // res.end()
        console.log('Time: %d', Date.now());
        next();
      })
    // 根据不同功能划分模块
    app.use('/api',require('./routers/api'));
    app.get('/login',require('./routers/login'));
    app.get('/register',require('./routers/register'));
    app.use('/',require('./routers/main'));
    
    //监听http请求
    var port = 9999;
    var uri = 'http://localhost:' + port;
    // 第一个参数 连接的协议和地址
    mongoose.connect('mongodb://localhost:27017/quiz',function (err) {
        if(err){
            console.log('数据库连接失败');
        }else{
            console.log('数据库连接成功');
            app.listen(port);
            console.log('> Listening at ' + uri + '\n');
            // opn(uri)
        }
    });