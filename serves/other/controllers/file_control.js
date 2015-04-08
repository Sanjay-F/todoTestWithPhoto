//加载相关文件
var GLOBAL = require(global.theGlobalPath),
	upload = require(GLOBAL.path.PATH_INIT_UPLOAD),
	fs = require('fs');

module.exports = function(res){

	//打开图片
	this.open_img = function(folder, filename){
		var path = GLOBAL.IMG.UPLOAD_IMAGE_PATH + 'images/' + folder + '/' + filename;
		if(upload.read_file(path)){
			var fileStream = fs.createReadStream(path);
			fileStream.pipe(res);
			fileStream.on('end',function(){
				res.end();
			});
		}else{
			res.end();
		}
	};

	//打开apk
	this.open_apk = function(folder, filename){
		var path = GLOBAL.UPLOAD_APK_PATH + filename;
		if(upload.read_file(path)){
			var fileStream = fs.createReadStream(path);
			fileStream.pipe(res);
			fileStream.on('end',function(){
				res.end();
			});
		}else{
			res.end();
		}
	};

	//打开返回最新下载链接地址
	this.open_new_apk = function(){
		var other = require(GLOBAL.PATH_FUNCTION + 'other_function');
		other.get_latest_version(function(version){
			if(version){
				res.redirect(GLOBAL.DOWNLOAD_APK_QQ + version.versionName + ".apk");
			}else{
				res.end();
			}
		});
	};

	//打开发现BANNERhtml
	this.open_banner_html = function(museumId, file_name){
		if(!museumId || !file_name){
			res.end();
		}
		res.render(GLOBAL.UPLOAD_IMAGE_PATH + 'html/banner_' + museumId + '/' + file_name);
	};

	//打开发现文章html
	this.open_article_html = function(id, file_name){
		if(!id || !file_name){
			res.end();
		}
		res.render(GLOBAL.UPLOAD_IMAGE_PATH + 'html/article_' + id + '/' + file_name);
	};
};