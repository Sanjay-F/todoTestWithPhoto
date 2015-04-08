var GLOBAL = require(global.theGlobalPath),
	//redis = new GLOBAL.REDIS(),
	url = require('url');

/***
 *
 * this model is user to show the photo!
 * @param app
 */

module.exports = function(app){
	app.all('*',function(req, res){

		var token = req.param('token'),
			pathname = url.parse(req.url).pathname,
			routes = pathname.split('/');//解析路由

		console.log(" params0="+req.params[0]);
		//filter the request for the favicon.ico
		if(req.params[0]=="/favicon.ico"){
			res.end("false;");
			return;
		}

		try{
			if(routes[1] != 'API'){
				throw 'port=8002 ,route='+pathname;
			}
			var func = require("./models/"+routes[2]+"_models");
			func(req, res, routes);
		}catch (e){
			console.log(e);
			res.writeHeader(404, {'Content-Type': 'text/plain'});
			res.end('no such link');
		}
	});
};