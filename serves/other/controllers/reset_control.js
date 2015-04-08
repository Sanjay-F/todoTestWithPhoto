//加载相关文件
var GLOBAL = require(global.theGlobalPath),
	shortId = require(GLOBAL.PATH_INIT + 'shortId'),
	md5 = require('MD5'),
	redis = new GLOBAL.REDIS(),
	db = new GLOBAL.DB();

module.exports = function(res){

	var DATE = new Date,
		now = DATE.getTime();

	//用户重置密码界面
	this.reset_password_show = function(email,token){
		redis.get('reset_password', email, function(error, result){
			if(result != token){
				var errMsg =  '该链接已过期';
				res.send(errMsg);
			}else{
				res.render('reset/index', {'email': email,'token': token});
			}
		});
	};

	//用户重置密码
	this.reset_password = function(email,password,againpassword,token){
		redis.get('reset_password', email, function(error, result){
			if(result != token){
				return res.send('<script>alert("该链接已过期");window.location.href="http://ranran.la";</script>');
			}else{
				if(password != againpassword){
					res.render('reset/index', {'email': email,'token': token});
				}else{
					db.SqlAcquire(function(client){
						db.SqlUpdate(client,GLOBAL.DB_USER_INFO, {'password': md5(password)}, {'email': email}, function (error, result) {
							if(result){
								redis.del('reset_password', email);
								return res.send('<script>alert("修改成功");window.location.href="http://ranran.la";</script>');
							}else{
								res.render('reset/index', {'email': email,'token': token});
							}
						});
						db.SqlRelease(client);
					});
				}
			}
		});
	};
};