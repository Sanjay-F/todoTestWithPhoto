var settings = require('../config/settings'),
	REDIS = require('./redis'),
	redis = new REDIS(),
	jpush = require('jpush-sdk');
var Global = require(global.theGlobalPath);

function push(userId, content, title, type, ios_data, android_data) {
	var key = settings.jpush.key,
		server = settings.jpush.server,
		client = jpush.buildClient(key,server);

	redis.hget(Global.REDIS.user_pushId, userId, function(error, pushId){
		if(pushId){
			client.push().setPlatform(jpush.ALL)
				.setAudience(jpush.registration_id(pushId))
				.setNotification(jpush.ios(title, 'happy', 0, false, ios_data) )
				.setMessage(content, title, type, android_data)
				.setOptions(null, 60)
				.send(function(err, res) {
					if (err) {
						console.error(err.message);
					}else{
						console.log('推送成功');
					}
				});
		}
	});
}

module.exports = function(){
	//新粉丝提醒
	this.push_follow = function(toUserId, fromUserId, newFansNum){
		var content = 'follow',
			title = '你有一位新粉丝',
			type = 'follow',
			extras = {
				type: 0,
				data: {
					fromUserId: fromUserId,
					newFansNum: newFansNum
				}
			};
		push(toUserId, content, title, type, extras, extras);
		try{
		}catch (e){
			return console.error(e);
		}
	};

	//评论信息提醒
	this.push_comment = function(toUserId, fromUserName, recordContent){
		var content = 'comment',
			title = fromUserName + '评论了你的“' + recordContent.substr(0,10) + '...”',
			type = 'comment',
			extras = {
				type: 1
			};
		try{
			push(toUserId, content, title, type, extras, extras);
		}catch (e){
			return console.error(e);
		}
	};

	//点赞信息提醒
	this.push_like = function(toUserId, fromUserName, recordContent){
		var content = 'like',
			title = fromUserName + '给你的“' + recordContent.substr(0,10) + '...”送了一朵小红花，为你加油~',
			type = 'like',
			extras = {
				'type': 2
			};
		try{
			push(toUserId, content, title, type, extras, extras);
		}catch (e){
			return console.error(e);
		}
	};

	//邀请抽屉提醒
	this.push_invite_message = function(toUserId, fromUserName, plan_title){
		var content = 'invite_message',
			title = fromUserName + '最近创建了' + plan_title + '尝试，正在走向伟大的道路上，邀请你来监督他。',
			type = 'invite_message',
			extras = {
				'type': 3
			};
		try{
			push(toUserId, content, title, type, extras, extras);
		}catch (e){
			return console.error(e);
		}
	};

	//接受抽屉提醒
	this.push_accept_message = function(toUserId, fromUserName){
		var content = 'accept_message',
			title = fromUserName + '接受了你的监督邀请。',
			type = 'accept_message',
			extras = {
				'type': 4
			};
		try{
			push(toUserId, content, title, type, extras, extras);
		}catch (e){
			return console.error(e);
		}
	};

	//监督提醒
	this.push_supervision = function(toUserId, user_info, supervision_info){
		var data = {
			'uId' : user_info.userId,
			'un' : user_info.nickName,
			'aId' : supervision_info.id
		};
		var content = 'supersivion',
			title = '有一位小伙伴急需拯救',
			type = 'supersivion',
			extras = {
				'type': 5,
				'data': data
			};
		try{
			push(toUserId, content, title, type, extras, extras);
		}catch (e){
			return console.error(e);
		}
	};

	//评论信息提醒
	this.push_reply_comment = function(toUserId, fromUserName){
		var content = 'reply_comment',
			title = fromUserName + '回复了你的评论',
			type = 'reply_comment',
			extras = {
				type: 8
			};
		try{
			push(toUserId, content, title, type, extras, extras);
		}catch (e){
			return console.error(e);
		}
	};
};