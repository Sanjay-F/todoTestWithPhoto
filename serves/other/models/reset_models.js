/*
* reset模块
* dest = 9
* */
var GLOBAL = require(global.theGlobalPath);
//加载相关的function文件
var RESET = require('../controllers/reset_control');

module.exports = function(req, res, routes){
	//选择方法
	var reset = new RESET(res);

	switch (routes[3]){
		case 'reset_password_mail'://9-1用户重置密码界面
			try{
				var email = req.param('email');
				var token = req.param('token');
				reset.reset_password_show(email,token);
			}catch (e){
				res.writeHeader(404, {'Content-Type': 'text/plain'});
				res.end('找不到该链接');
			}
			break;
		case 'reset_password'://9-2用户重置密码
			try{
				var email = req.param('email');
				var token = req.param('token');
				var password = req.param('password');
				var againpassword = req.param('againpassword');
				reset.reset_password(email,password,againpassword,token);
			}catch (e){
				res.writeHeader(404, {'Content-Type': 'text/plain'});
				res.end('找不到该链接');
			}
			break;
		default :
			res.writeHeader(404, {'Content-Type': 'text/plain'});
			res.end('找不到该链接');
	}
};