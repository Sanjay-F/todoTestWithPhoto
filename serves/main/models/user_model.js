/**
 * Created by Administrator on 2015/4/4 0004.
 */

var UserBean = require('./Schema/User');
var Global = require(global.theGlobalPath);
var upload=require(Global.path.PATH_INIT_UPLOAD);

var actionResult = require(Global.path.PATH_PUSHVO_SYS_actionResult);
var shortId = require(Global.path.SHORT_ID);

module.exports = function (token, callback) {


    this.user_reg = function (email, password,headImage) {

        var user = new UserBean();
        user.email = email;
        user.pswd = password;
        user.date=new Date().getTime();

        UserBean.find({email: email}, function (err, docs) {
            if (err) {
                console.log("find error " + err);
                callback(actionResult(99));
            } else if (docs.length) {
                //已经有该账号
                console.log("save error ,exist=" + docs);
                callback(actionResult(112));
            } else {
                user.imageId=shortId();
                //先保存图片，只有在图片保存好之后，才允许注册；
                if(headImage != ''){
                   var  image_path = upload.submit_img(headImage,Global.IMG.UPLOAD_IMAGE_HEAD,user.imageId) || '';
                    if(!image_path){
                        return callback(actionResult(114,''));
                    }
                    user.photoUrl=image_path;
                }
                //注册新用户
                user.token = shortId();
                user.save(function (err, data) {
                    if (err) {
                        console.log("save error=" + err);
                        callback(actionResult(99));
                    } else {
                        console.log("save success="+data);
                        callback(actionResult(0, user));
                    }
                });
            }
        });
    };


    this.user_login = function (email, password) {

        UserBean.find({email: email, pswd: password}, function (err, docs) {
                if (err) {
                    callback(actionResult(99));
                } else if (!docs.length) {
                    callback(actionResult(115));
                } else {
                    if (!docs[0].token.length) {
                     //退出登录过。生成新的token

                        var newToken= shortId();
                        UserBean.update({email:email,pswd:password},{token:newToken},function (err, data) {
                            if (err) {
                                console.error("update new token error=" + err);
                                callback(actionResult(99));
                            } else {
                                console.log('update new token success '+data);
                                callback(actionResult(0, newToken));
                            }});
                    } else {
                        console.error(" user has the token ");
                        callback(actionResult(0, docs[0].token));
                    }
                }
            }
        )
    };


    this.check_login = function (userId, token, callback) {

        UserBean.find({_id: userId, token: token}, function (err, docs) {
            console.log("find finish");
            if (err) {
                callback(err, false);
            } else if (docs.length) {
                callback(null, true);
            } else {
                callback(null, false);
            }

        });
    };


    this.user_logout = function (userId) {

        console.log("check login");
        this.check_login(userId, token, function (err, isLogin) {
            console.log("check finish");
            if (err) {
                callback(actionResult(99));
            } else if (isLogin) {
                UserBean.update({token: token, _id: userId}, {token: ''}, function (err) {
                    if (err) {
                        console.log('user logout fail ,msg=' + err);
                        callback(actionResult(99));
                    } else {
                        console.log('user logout success');
                        callback(actionResult(0));
                    }
                });
            } else {
                console.log("user no login before");
                callback(actionResult(0));
            }

        });
    }
};