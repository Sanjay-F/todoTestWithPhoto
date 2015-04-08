//路由处理——返回模块及方法数字
module.exports = function (dest) {
    var routes = dest.split('/');
    var GLOBAL=require(global.theGlobalPath);
    var listens=GLOBAL.listers;
    if (routes.size < 2 || routes[1] != GLOBAL.path.API) {
        return false;
    }
    var return_data = [];//返回数据
    var control = routes[2];
    var method = routes[3];

    if (listens[control] && listens[control][method]) {
        return_data = [GLOBAL.path.PATH_CONTROLLERS+ control + '_controller', listens[control][method]];
    }
    if (return_data.length > 0) {
        return return_data;
    }
    return false;
};