/**
 * Created by Administrator on 2015/4/8 0008.
 */
var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    multiparty = require('connect-multiparty'),
    methodOverride = require('method-override'),
    cluster = require('cluster'),
    numCPUs = require('os').cpus().length,
    path = require('path');


var save_log = true;
var DEFAULT_HOST = '192.168.1.110';
var DEFAULT_PORT = 8001;


//返回这个函数
module.exports = function(app, opts) {
    return new Http(app, opts);
};


var Http = function(getBase, opts) {
    opts = opts || {};

    var exp = express();
    this.port = opts.port ||DEFAULT_PORT  ;

    exp.set('port', this.port);
    // parse application/x-www-form-urlencoded
    exp.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
    exp.use(bodyParser.json());

    //exp.use(bodyParser());
    exp.use(multiparty());
    exp.use(methodOverride());
    exp.use(express.static(path.join(getBase, 'views/resources')));
    exp.use(express.static(getBase));

    //设计一个全局的global文件的位置的属性
    //其余的全局属性在global.js里面的找
    global.theGlobalPath = getBase + '/global';



    //加载入口方法
    var routesPath = path.join(getBase,opts.path);
    var routePath = path.join(routesPath);
    var server_index = require(routePath);
    //use this to initial the app by the specific index.js
    server_index(exp);

    if (cluster.isMaster) {


        for (var i = 0; i < numCPUs / 2; i++) {
            cluster.fork();
        }
        cluster.on('listening', function (worker, address) {
        });

    } else if (cluster.isWorker) {
        http.createServer(exp).listen(this.port, function () {
            console.log(' server listening on  port=' + exp.get('port'));
        });
    }
};


