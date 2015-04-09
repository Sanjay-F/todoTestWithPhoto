var redis = require('redis'),
    settings = require('../config/settings');

var redisIp = settings.redis.host;
var redisPort = settings.redis.port;

var redisClient = redis.createClient(redisPort, redisIp);

//一天的市场
var oneMonthSec=86400 * 30;
var oneDaySec=86400;
var oneHoursSec=3600;
var halfHoursSec=1800;
var oneMinSec=60;

redisClient.on("error", function (err) {
    console.log("redisClient Error = " + err);
    return false;
});

module.exports = function () {
    //执行keys函数
    this.keys = function (key, callback) {
        if (!key) {
            callback(error, []);
        }
        redisClient.keys(key, function (error, result) {
            callback(error, result);
        });
    };

    //普通保存默认时间为一天
    this.set = function (arr_name, name, data) {
        this.setWithTime(arr_name,name,data,oneDaySec);
    };

    this.setWithTime = function (arr_name, name, data,time) {
        var r_name = arr_name;
        if (name) {
            r_name = arr_name + '_' + name;
        }
        redisClient.set(r_name, data);
        redisClient.expire(r_name, time);
    };

    //保存一小时
    this.setHours = function (arr_name, name, data) {
        this.setWithTime(arr_name,name,data,oneHoursSec);
    };

    //保存一分钟
    this.setMinute = function (arr_name, name, data) {
        this.setWithTime(arr_name,name,data,oneMinSec);
    };

    //保存半小时
    this.setHalfHours = function (arr_name, name, data) {
        this.setWithTime(arr_name,name,data,halfHoursSec);
    };


    //保存一个月：如用户登录
    this.setMonth = function (arr_name, name, data) {
        this.setWithTime(arr_name,name,data,oneMonthSec);
    };

    //保存十分钟：用户评论
    this.setTenMin = function (arr_name, name, data) {
        this.setWithTime(arr_name,name,data,oneMinSec*10);
    };


    //获取缓存信息
    this.get = function (arr_name, name, callback) {
        var r_name = arr_name;
        if (name) {
            r_name = arr_name + '_' + name;
        }
        redisClient.get(r_name, function (error, result) {
            callback(error, result);
        });
    };

    //获取缓存信息
    this.getKeyValue = function (arr_name, name, callback) {
        var r_name = arr_name;
        if (name) {
            r_name = arr_name + '_' + name;
        }
        redisClient.get(r_name, function (error, result) {
            callback(error, result);
        });
    };


    //删除缓存
    this.del = function (arr_name, name) {
        var r_name = arr_name;
        if (name) {
            r_name = arr_name + '_' + name;
        }
        redisClient.del(r_name);
    };

    //添加到缓存集合
    this.sadd = function (arr_name, data) {
        redisClient.sadd(arr_name, data);
        redisClient.expire(arr_name, oneDaySec);
    };

    //判断缓存集合中是否存在该值，有返回1无返回0
    this.sismember = function (arr_name, key, callback) {
        redisClient.sismember(arr_name, key, function (error, result) {
            callback(error, result);
        });
    };

    //删除缓存集合中的key值
    this.smove = function (arr_name, key) {
        redisClient.smove(arr_name, key);
    };

    //添加到缓存Hash集合保存一个小时
    this.hsetHour = function (arr_name, name, data) {
        redisClient.hset(arr_name, name, data);
        redisClient.expire(arr_name, oneHoursSec);
    };

    //添加到缓存Hash集合
    this.hset = function (arr_name, name, data) {
        redisClient.hset(arr_name, name, data);
    };

    //获得缓存Hash单个集合数据
    this.hget = function (arr_name, name, callback) {
        redisClient.hget(arr_name, name, function (error, result) {
            callback(error, result);
        });
    };

    //获得缓存Hash集合数据
    this.hgetall = function (arr_name, callback) {
        redisClient.hgetall(arr_name, function (error, result) {
            callback(error, result);
        });
    };

    //添加到缓存Hash集合
    this.hdel = function (arr_name, name) {
        redisClient.hdel(arr_name, name);
    };
};