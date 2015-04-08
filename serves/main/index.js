/**
 * Created by sanjay on 4/3/15.
 */

var domain = require('domain'),
    logger = require('morgan'),
    //schedule = require("../../init/schedule"),
    url = require('url'),
    GLOBAL=require(global.theGlobalPath);
    ActionResult = require(GLOBAL.path.PATH_PUSHVO_SYS_actionResult);
var route = require(GLOBAL.path.PATH_ROUTES_ROUTE);

var save_log = true;//是否开启保存大量日志信息

var d = domain.create();

module.exports = function(app){
    app.use(logger('dev'));
    app.all('*',function(req, res){

        console.log(" params0="+req.params[0]);
        //filter the request for the favicon.ico
        if(req.params[0]=="/favicon.ico"){
            res.end("false;");
            return;
        }
        //
        //if(req.params[0] != '/RRAPI/upload/open_img'){
        //    console.log('Routes is: ' + req.params[0]);
        //    console.log('Post is: ' + JSON.stringify(req.body));
        //}
        var pathname = url.parse(req.url).pathname;
        var controlPath = route(pathname);
        if(controlPath){
            var DATE = new Date();
            var specifControl = require(controlPath[0]);


            d.run(function(){

                specifControl(controlPath[1],req,function(result){

                    var send_result = JSON.stringify(result);

                    console.log('Back time is: '+DATE.toLocaleString());

                    if(save_log){
                        console.log('Back data is: ' + send_result);
                    }
                    res.send(send_result);
                });
            });
            d.on('error', function (err) {
                console.error('Error_time_is: '+DATE.toLocaleString());
                console.error(err);
                res.send(new ActionResult(99));
            });
        }else{
            console.log('请求出错');
            res.send('请求出错');
        }
    });
};