/**
 * Created by Administrator on 2015/4/5 0005.
 */
var PlanBean = require('./Schema/Plan');
var Global = require(global.theGlobalPath);
//var mongodb=require('mongodb')
var actionResult = require(Global.path.PATH_PUSHVO_SYS_actionResult);
var shortId = require(Global.path.SHORT_ID);
var userModel = require('./user_model');

module.exports = function (token, callback) {

    var ts = new Date().getTime();
    //console.log("ts=" + ts + "  &" + typeof (ts));

    //添加用户的新的记录信息
    this.plan_add = function (title, desc, userId) {
        var plan = new PlanBean();
        plan.title = title;
        plan.desc = desc;
        plan.user_id = userId;
        plan.date = ts;
        var mUser = new userModel(token, callback);
        mUser.check_login(userId, token, function (err, state) {
            if (err) {
                console.log('check_login fail' + err);
                callback(actionResult(99));
            } else if (state) {

                console.log('start to save');
                plan.save(function (err, data) {
                    if (err) {
                        console.log('try to save  fail' + err);
                        callback(actionResult(99));
                    } else {
                        console.log(data);
                        callback(actionResult(0, data._id));
                    }
                });
            } else {
                console.log('no login yet');
                callback(actionResult(100));
            }
        });
    };

    //返回某个用户的所有记录
    this.plan_get = function (userId) {

        PlanBean.find({user_id: userId}, function (err, docs) {

            if (err) {
                callback(actionResult(99));
            } else {

                callback(actionResult(0, docs));
            }

        });
    };

    //删除某个用户的所有记录
    this.plan_delete = function (userId, planId) {


        var mUser = new userModel(token, callback);

        mUser.check_login(userId, token, function (err, isLogin) {
                if (err) {
                    callback(actionResult(99));
                } else if (isLogin) {
                    PlanBean.remove({_id: planId}, function (err) {
                        if (err) {
                            callback(actionResult(99));
                        } else {
                            console.log("succes delete plan");
                            callback(actionResult(0));
                        }
                    });
                } else {
                    callback(actionResult(99));
                }
            }
        );
    };


};

