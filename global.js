/**
 * Created by sanjay on 4/4/15.
 */


//常量相关配置
var DIRNAME = __dirname,
    path = require('path'),
    ROOT = path.join(DIRNAME,'.'),	//root路径
    INIT = path.join(DIRNAME,'./init/'),	//init路径
    CONFIG = path.join(DIRNAME,'./config/'),	//config路径
    BASE_URL = 'http://127.0.0.1';		//url路径

exports.listers= {
    //1、用户模块
    'user': {
        'signUp': 1,	//用户注册
        'login': 2,	//用户登陆
        'logout': 3,	//用户退出
        'resetPassword': 8	//用户重置密码发送邮件
    },
    //2、尝试模块
    'plan': {
        'getPlans': 1,	//获得所有尝试
        'savePlan': 2,	//添加尝试
        'searchPlan': 11,	//搜索尝试
        'deletePlan': 12	//删除尝试
    }
};


exports.path = {
    'ROOT_INIT': ROOT,									//root路径
    'PATH_INIT': INIT,									//init路径
    'PATH_CONFIG': CONFIG,								//config路径


    'API':'API',
    'PATH_CONTROLLERS': DIRNAME + '/serves/main/controllers/',			//models路径
    'PATH_MODELS': DIRNAME + '/serves/main/models/',	//function路径
    'PATH_PUSHVO_SYS_actionResult':DIRNAME+'/serves/main/pushvo/sys/actionResult',
    'PATH_ROUTES_ROUTE':DIRNAME+'/serves/main/routes/router',


    REDIS : require(INIT + 'redis'),					//加载：redis

    'PATH_LOG': '/home/ranran/.forever/',				//log路径
    'SAVE_PATH_LOG': '/mnt/app_log/',					//保存log路径
    'SHORT_ID': INIT + 'shortId',					//加载：
    'PATH_INIT_UPLOAD':INIT+'upload',
    'PATH_INIT_REDIS': INIT + 'redis'					//加载：redis

};

exports.IMG={
    'UPLOAD_IMAGE_HEAD' : 1,							//图片种类：用户头像
    'UPLOAD_IMAGE_PLAN' : 2 ,							//图片种类：用户尝试

    'UPLOAD_IMAGE_TMP_HEAD' : 90,																//默认上传头像缩略图大小
    'UPLOAD_IMAGE_PATH' : path.join(DIRNAME,'./upload/'),									//默认上传图片路径
    'UPLOAD_IMAGE_PATH_IMG' : path.join(DIRNAME,'./upload/images/'),									//默认上传图片路径
    'UPLOAD_IMAGE_TYPE' : {							//上传图片种类
        1 : 'head_',
        2 : 'plan_',
        3 : 'record_',
        4 : 'sys_',
        5 : 'back_',
        6 : 'page_',
        7 : 'default_page',
        8 : 'banner_',
        9 : 'plan_label_',
        10 : 'article_'
    },
    'UPLOAD_IMAGE' : ['.jpg','.png','.bmp','.jpeg']
};

exports.MODELS={
    'user_model':'user_model',
    'plan_model':'plan_model'

};


exports.REDIS={

    'user_info':'userArr',
    'plan_info':'planArr'
};