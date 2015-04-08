todo Demo  
=================================== 
看完《learing  nodejs》，《Node.js开发指南》，《Node.js开发实战详解》，《Node.js入门经典》，《深入浅出Node.js》。
也参看了些项目，觉得真的有种看了且依旧写不好node.js的感觉。
思考了下，可能真的因为是习惯了java这类不是弱对象的语言的缘故。
所以一上来看了那么多本感觉都懵了，书本没介绍变量类型啊，各种if,switch之类的语法的。
重点是node经常用的是匿名函数写。这让我这类写惯了java的人很不习惯。

估计还有人会郁闷于export和module.export吧？
关于export和module.export这个问题，看到一篇介绍不错的：<br /> 1.[点击这里阅读该片文章](http://blog.csdn.net/sanjay_f/article/details/44871613)<br />  
 

而关于node.js的基本语法，有下面这篇不错的介绍文字，转载后调整了下，觉得有收获，就贴出来啦。<br /> 
2.[地址是 http://blog.csdn.net/sanjay_f/article/details/44888563](http://blog.csdn.net/sanjay_f/article/details/44888563)<br /> 

 
是的，看了那么多，终于有能力写点东东了。
所以就憋着写了这的todo demo项目，完全的后端，没有界面。 因为一开始就是打算只是做安卓的后台而已。
（没界面之类的，是因为我自己写安卓端来测试图片等上传功能的 -_-! ，原谅我新手，没学过那些jade，html之类的）。
只是DEMO.有很多bug，请各位大神轻拍。


### 入口app.js代码
  		var path = require('path');
  		var http = require('./index');
  		var serversPath = path.join(__dirname + '/config/servers.json');
  		var servers = require(serversPath);
  		var getBase = __dirname + '/';
  		//链接数据库
  		var mongoose = require('mongoose');
  		mongoose.connect('mongodb://127.0.0.1/TestDB');
  		mongoose.connection.on('open', function (err) {
  		if (err) {
  		  console.log('err=' + err);
  		} else {
  		  console.log('Connected to Mongoose ,result= success');
  		}
  		});
  		//启动服务器、包含处理图片请求的other模块和后台服务器模块
  		// 新添加的模块需要在config/serves.json哪里写下。
  		for (var i in servers) {
  		     http(getBase, servers[i]);
  		}

###
一些描述信息
----------------------------------- 
* **1.**	数据库是使用ORM的mongoose写的，安装可以参考这篇文章
[ MongoDB介绍及下载与安装]（http://www.cnblogs.com/mecity/archive/2011/06/11/2078527.html）
<br /> 

* **2.**	因为没有界面，所以只有MVC的 Model 和 Controllers.
  不知道我那样些对不对，欢迎在ISSUE那指出错误。或者改完通知下，谢谢。

* **3.** 服务器在serves里面，mian主要是处理些主要的业务逻辑 ，other目录主要负责图片的加载请求.
 图片的测试链接：http://127.0.0.1:8002/API/file/openImg/8bxswM/head_1428388737819.jpg
 在运行后，在游览器输入这个，就可以显示图片啦.

* **4.** 程序是在W7+webStrom下运行的。里面有一个插件GM在生成缩略图是会失败。
  位置在init/upload.js里面.例如在函数submit_img里面，就有的第57行



 ### 分割线
 -----------------------------------


**第一次写，好像写多了，先写到这,学了点markdown语法，写这readme真不容易**
<br>
**未完待续。。。**




