// 建立默认题库
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var User = require('./Models/User');
var Question = require('./Models/question');
var fs = require('fs')

mongoose.connect('mongodb://localhost:27017/quiz',function (err) {
  if(err){
      console.log('数据库连接失败');
  }else{
      console.log('数据库连接成功');
  }
});

var fir = new User({username: 'admin', password: 'admin'})

fir.save(err => {
  if (err) console.log(err)
  console.log('success')
})
// 读取问题列表
let quest = fs.readFileSync('./question.txt', {encoding: 'utf-8'})

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
  } else {
    console.log('saved')
  }
})