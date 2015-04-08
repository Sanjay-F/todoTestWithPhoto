/**
 * Created by sanjay on 4/3/15.
 */

var Global=require(global.theGlobalPath);
var listens=Global.listers;
var USER=require(Global.path.PATH_MODELS+Global.MODELS.user_model);

module.exports = function(cmd,req,writejson){
    //选择方法
    //var token = sql_anti.check_id(req.param('token') || '');
    var token=req.param('token')||'';
    var mUser = new USER(token,writejson);

    var email= req.param('email');
    var password=req.param('password');
    var userId=req.param('userId');

    switch (cmd){

        case listens.user.signUp:

            var headImage = '';
            if(req.files && req.files.image && req.files.image.size > 0){
                headImage = req.files.image;
                console.log("email="+email +" pasw="+password+" avatorSize="+req.files.image.size);
            }
            mUser.user_reg(email,password,headImage);
            break;

        case listens.user.login:
            mUser.user_login(email,password);
            break;

        case listens.user.logout:
            mUser.user_logout(userId);
    }
};