//数据库相关配置

exports.db = {
	cookieSecret	: 'Sanjay',
	db_name		: 'testDb',
	host			: '127.0.0.1',
	port			: '27017',
	maxConnLimit	: 100
};

//极光推送相关设置
exports.jpush = {
	key	:  '',
	server	: ''
};

//缓存相关设置
exports.redis = {
	host	: '127.0.0.1',
	port	: '6379'
};
//百度推送相关设置
exports.baidupush = {
	//下面这几个自己申请下百度推送把
	id	:  '',
	key	:  '',
	server	: ''
};
//邮箱相关设置
exports.email = {
	host		: 'smtp.qq.com',
	port		: '465',
	user		: '',
	pass		: ''
};

