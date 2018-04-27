var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/runoob',function (err) {
  if(err){
      console.log('数据库连接失败');
  }else{
      console.log('数据库连接成功');
  }
});
var schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Tank = mongoose.model('Tank', schema);
Tank.find({'size': /big/i}).exec(function(err, data) {
  
  if (err) return handleError(err);
  console.log('data', data)
})
