/**
 * Created by Administrator on 2015/4/4 0004.
 */
var mongoose = require('mongoose');


var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var User = new Schema({

    email: {type: String, required: true, trim: true},
    pswd: {type: String, required: true, trim: true},
    token: String,
    date: {type: Number, required: true, trim: true},
    imageId: String,
    photoUrl:String

});

module.exports = mongoose.model('User', User);