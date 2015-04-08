//该出全部使用同步方法，返回用return，方便使用
var fs = require('fs'),
    path = require('path'),
    gm = require('gm'),
    moment = require('moment'),
    imageMagick = gm.subClass({imageMagick: true}),
    GLOBAL = require(global.theGlobalPath);

//上传图片
exports.submit_img = function (image_data, img_type, userId) {
    if (!image_data) {
        return false;
    }
//	if(image_data.size){限制图片上传大小
//		if(image_data.size > GLOBAL.UPLOAD_IMAGE_LIMIT){
//		return false;
//	}
    var type = path.extname(image_data.path);
    if (GLOBAL.IMG.UPLOAD_IMAGE.indexOf(type) < 0) {
        return false;//开启图片格式判断
    }

    if (GLOBAL.IMG.UPLOAD_IMAGE_TYPE[img_type]) {
        var image_type = GLOBAL.IMG.UPLOAD_IMAGE_TYPE[img_type];
    } else {
        return false;//没有这种图片种类
    }

    var DATE = new Date,
        now = parseInt(DATE.getTime() / 1000),
        num = parseInt(Math.random() * 1000),
        name = image_type + now + num + type;
    console.log("submint-imagePath=" + image_data.path);
    var img = read_file(image_data.path);

    if (img) {

        var img_path = GLOBAL.IMG.UPLOAD_IMAGE_PATH_IMG + userId + '\\';

        //先把图片从临时文件夹挪到我们制定的位置
        fs.exists(img_path, function (exists) {
            if (exists) {
                fs.writeFile(img_path + name, img);//保存图片
            } else {
                fs.mkdir(img_path, function () {
                    fs.writeFile(img_path + name, img);//保存图片
                });
            }
        });


        //挪到制定位置后，就建立他的缩略图
        if (image_type == 'head_') {
            var thumbName = img_path + 'tmp_' + name;
            console.log("thumb path=" + thumbName);
            //GM在W7的环境下会生成失败，请在Ubuntu之列的环境下使用。
            gm(img_path + name).thumb(90, 90,thumbName,
                function (err) {
                    if (err) {
                        console.error('头像缩略图生成失败,你用的是window操作系统吗？  \n ERR:' + err);
                        console.error(image_data.path);
                        console.error(err);
                    }
                });
        } else if (image_type == 'default_page') {
            if (type != '.jpg') {
                return false;
            }
            name = image_type + type;
        }


        if (image_type == 'head_') {
            return 'tmp_' + name;
            //在W7下用下面这句，避免GM生成不了thumb导致加载不了图片
            //return  name;
        } else {
            fs.unlink(image_data.path);
            return name;
        }
    }
    return false;
};

//上传apk
exports.submit_apk = function (apk_data, versionName) {
    if (!apk_data || !versionName) {
        return false;
    }
    var type = path.extname(apk_data.path);
    if (type != '.apk') {//不是apk返回错误
        return false;
    }
    var apk = read_file(apk_data.path);
    if (apk) {
        var apk_path = GLOBAL.UPLOAD_APK_PATH;
        fs.exists(apk_path, function (exists) {
            if (exists) {
                fs.writeFile(apk_path + versionName + type, apk);//保存apk
            } else {
                fs.mkdir(apk_path, function () {
                    fs.writeFile(apk_path + versionName + type, apk);//保存apk
                });
            }
        });
        return apk_data.size;
    }
    return false;
};

//上传图片html
exports.submit_html = function (html_data, banner_name, html_name) {
    if (!html_data || !banner_name || !html_name) {
        return false;
    }
    var html_path = GLOBAL.UPLOAD_IMAGE_PATH + 'html/' + banner_name + '/';
    fs.exists(html_path, function (exists) {
        if (exists) {
            fs.writeFile(html_path + html_name + '.ejs', html_data);//保存apk
        } else {
            fs.mkdir(html_path, function () {
                fs.writeFile(html_path + html_name + '.ejs', html_data);//保存apk
            });
        }
    });
    return html_name;
};

//上传文件
exports.submit_html_file = function (file_data, file_dir) {
    if (!file_data || !file_dir) {
        return false;
    }
    var type = path.extname(file_data.path);
    var DATE = new Date,
        now = moment(parseInt(DATE.getTime())).format('YYYYMMDD'),
        num = parseInt(Math.random() * 1000),
        name = now + '_' + num + type;
    var file = read_file(file_data.path);
    if (file) {
        var file_path = GLOBAL.UPLOAD_FILE_PATH + now + '/';
        fs.exists(file_path, function (exists) {
            if (exists) {
                fs.writeFile(file_path + name, file);//保存文件
            } else {
                fs.mkdir(file_path, function () {
                    fs.writeFile(file_path + name, file);//保存文件
                });
            }
        });
        return now + '/' + name;
    }
    return false;
};

//读取文件，不存在返回false（同步）
exports.read_file = read_file;
function read_file(path) {
    if (fs.existsSync(path)) {
        var file = fs.readFileSync(path);
        return file;
    } else {
        return false;
    }
}

//写入文件，失败返回false（同步）
exports.write_file = write_file;
function write_file(path, file) {
    if (fs.existsSync(path)) {
        fs.writeFile(path, file);
        return true;
    } else {
        return false;
    }
}

//删除图片
exports.delete_img = function (userId, img_name) {
    var img_path = GLOBAL.UPLOAD_IMAGE_PATH + 'images/' + userId + '/' + img_name;
    if (read_file(img_path)) {
        fs.unlink(img_path);
    }
};

//删除apk
exports.delete_apk = function (versionName) {
    var apk_path = GLOBAL.UPLOAD_FILE_PATH + versionName + '.apk';
    if (read_file(apk_path)) {
        fs.unlink(apk_path);
    }
};

//删除html
exports.delete_html = function (banner_name, html_name) {
    var html_path = GLOBAL.UPLOAD_IMAGE_PATH + 'html/' + banner_name + '/' + html_name + '.ejs';
    if (read_file(html_path)) {
        fs.unlink(html_path);
    }
};

//删除用户文件夹
exports.delete_user = function (userId) {
    var user_path = GLOBAL.UPLOAD_IMAGE_PATH + 'images/' + userId;
    fs.readdir(user_path, function (error, file_arr) {
        if (file_arr) {
            for (var i = 0; i < file_arr.length; i++) {
                fs.unlink(user_path + '/' + file_arr[i]);
            }
            fs.rmdir(user_path, function (error) {
            });
        }
    });
};

//遍历文件夹所有文件（type为后缀名）
exports.read_dir = function (path, type) {
    var fileList = [];
    if (!fs.existsSync(path)) {
        return fileList;
    }
    function walk(path) {
        var dirList = fs.readdirSync(path);
        dirList.forEach(function (item) {
            if (fs.statSync(path + '/' + item).isDirectory()) {
                walk(path + '/' + item);
            } else {
                var file_type = item.split('.');
                if (type) {
                    if (file_type[1] == type) {
                        fileList.push(path + '/' + item);
                    }
                } else {
                    fileList.push(path + '/' + item);
                }
            }
        });
    }

    walk(path);
    return fileList;
};

//遍历文件夹所有文件夹及文件
exports.read_dir_all = function (path) {
    var fileList = [],
        folderList = [],
        walk = function (path, fileList, folderList) {
            files = fs.readdirSync(path);
            files.forEach(function (item) {
                var tmpPath = path + '/' + item,
                    stats = fs.statSync(tmpPath);

                if (stats.isDirectory()) {
                    walk(tmpPath, fileList, folderList);
                    folderList.push(tmpPath);
                } else {
                    fileList.push(tmpPath);
                }
            });
        };
    walk(path, fileList, folderList);
    return {
        'files': fileList,
        'folders': folderList
    }
};