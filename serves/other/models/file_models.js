/*
* file模块
* dest = 10
* */
var GLOBAL = require(global.theGlobalPath);
//加载相关的function文件
var FILE = require('../controllers/file_control.js');

module.exports = function(req, res, routes){
	//选择方法
	var file = new FILE(res);

	var folder = routes[4];
	var filename = routes[5];

	switch (routes[3]){
		case 'openImg'://打开图片
			try{
				file.open_img(folder, filename);
			}catch (e){
				res.writeHeader(404, {'Content-Type': 'text/plain'});
				res.end('找不到该链接');
			}
			break;
		case 'apk'://打开apk
			try{
				file.open_apk(folder, filename);
			}catch (e){
				res.writeHeader(404, {'Content-Type': 'text/plain'});
				res.end('找不到该链接');
			}
			break;
		case 'newestApk'://打开apk
			try{
				file.open_new_apk();
			}catch (e){
				res.writeHeader(404, {'Content-Type': 'text/plain'});
				res.end('找不到该链接');
			}
			break;
		case 'openBanner'://打开BANNERhtml
			try{
				file.open_banner_html(folder, filename);
			}catch (e){
				res.writeHeader(404, {'Content-Type': 'text/plain'});
				res.end('找不到该链接');
			}
			break;
		case 'openArticle'://打开文章html
			try{
				file.open_article_html(folder, filename);
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