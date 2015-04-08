/**
 * Created by Administrator on 2015/4/5 0005.
 */
//var USER = require(GLOBAL.PATH_FUNCTION+'user_functions.js');


var Global=require(global.theGlobalPath);
var listens=Global.listers;
var Plan=require(Global.path.PATH_MODELS+Global.MODELS.plan_model);

module.exports = function(cmd,req,writejson){
    //选择方法

    var token=req.param('token')||'';
    var mPlan = new Plan(token,writejson);

    var title=req.param('title');
    var desc=req.param('desc');
    var userId=req.param('userId');

    switch (cmd){
        case listens.plan.savePlan:
            console.log('title='+title+" & desc="+desc+" &userId="+userId);
            mPlan.plan_add(title,desc,userId);
            break;

        case listens.plan.getPlans:
            console.log("userId="+userId);
            mPlan.plan_get(userId);

            break;
        case listens.plan.deletePlan:
            var planId=req.param('planId');
            console.log("delete plan--id="+planId);
            mPlan.plan_delete(userId,planId);
    }
};