var path = require('path');
var http = require('./index');
var serversPath = path.join(__dirname + '/config/servers.json');
var servers = require(serversPath);
var getBase = __dirname + '/';
//链接数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/TestDB');
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log('err=' + err);
    } else {
        console.log('Connected to Mongoose ,result= success');
    }
});


//启动服务器、包含处理图片请求的other模块和后台服务器模块
// 新添加的模块需要在config/serves.json哪里写下。
for (var i in servers) {
 http(getBase, servers[i]);
}