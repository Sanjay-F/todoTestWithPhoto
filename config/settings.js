//数据库相关配置

exports.db = {
	cookieSecret	: 'Sanjay',
	db_name		: 'testDb',
	host			: '127.0.0.1',
	port			: '27017',
	maxConnLimit	: 100
};

//缓存相关设置
exports.redis = {
	host	: '127.0.0.1',
	port	: '6379'
};
//百度推送相关设置
exports.baidupush = {
	id	:  '4579019',
	key	:  'PnFupOThtRCDpS6KErvwFpwz',
	server	: 'uX7tf0oGGyd4bfKBDkKz2HSIaPdDWzcG'
};
//邮箱相关设置
exports.email = {
	host		: 'smtp.qq.com',
	port		: '465',
	user		: 'ranran@day30.cn',
	pass		: '7885117kobe'
};
