var uuid = require('uuid'),
	md5 = require('MD5');
module.exports = function(){
    var ran_str = randomString(6);
    return ran_str;
};

function randomString(len) {
    len = len || 62;
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function getShortId(){
    var id = uuid.v1();
    var DATE = new Date,
        now = DATE.getTime();

    var base64 = [
        "a", "b", "c", "d", "e", "f", "g", "h",
        "i", "j", "k", "l", "m", "n", "o", "p",
        "q", "r", "s", "t", "u", "v", "w", "x",
        "y", "z", "0", "1", "2", "3", "4", "5",
        "6", "7", "8", "9", "A", "B", "C", "D",
        "E", "F", "G", "H", "I", "J", "K", "L",
        "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z"
    ];
    var hex = md5(id + now);
    var hexLen = hex.length;
    var subHexLen = hexLen / 8;
    var output = [];
    for(var i = 0;i < subHexLen;i++){
        var subHex = hex.substr(i*8,8);
        var int = 0x3FFFFFFF & (1 * ('0x' + subHex));
        var out = '';
        for(var j = 0;j < 6;j++){
            var val = 0x0000003D & int;
            console.error(int);
            out += base64[val];
            int = int >> 5;
        }
        output.push(out);
    }
    var num = Math.floor(Math.random() * output.length + 1)-1;
    return output[0];
};