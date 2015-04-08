/**
 * Created by Administrator on 2015/4/5 0005.
 */
var mongoose = require('mongoose');



var Schema = mongoose.Schema;


var Plan= new Schema({
    title: {type: String, required: true, trim: true},
    desc: {type: String , required: true, trim: true},
    user_id: {type: String , required: true, trim: true},
    date:{type: Number , required: true, trim: true},
    //用来标记plan的状态，-1为结束，1为开始终
    state:Number
});

module.exports = mongoose.model('plan', Plan);