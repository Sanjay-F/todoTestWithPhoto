todo Demo  
=================================== 
���꡶learing  nodejs������Node.js����ָ�ϡ�����Node.js����ʵս��⡷����Node.js���ž��䡷��������ǳ��Node.js����
Ҳ�ο���Щ��Ŀ������������ֿ���������д����node.js�ĸо���˼�����£����������Ϊ��ϰ����java���಻������������Ե�Ե�ʡ�
����һ����������ô�౾�о������ˣ��鱾û���ܱ������Ͱ�������if,switch֮����﷨�ġ�
�ص���node�����õ�����������д������������д����java���˺ܲ�ϰ�ߡ����ƻ����˻�������export��module.export�ɣ�

����export��module.export������⣬����һƪ���ܲ���ģ�
1.[��������Ķ���Ƭ����](http://blog.csdn.net/sanjay_f/article/details/44871613)<br />  
 

������node.js�Ļ����﷨������ʹ�á���������ƪ����Ľ������֣�ת�غ��������һЩ���ݣ������ջ��Ķ࣬������������
2.[��ַ�� http://blog.csdn.net/sanjay_f/article/details/44888563](http://blog.csdn.net/sanjay_f/article/details/44888563)<br /> 

 
�ǵģ�������ô�࣬����������д�㶫���ˡ�
���Ծͱ���д�����todo demo��Ŀ����ȫ�ĺ�ˣ�û�н��档 ��Ϊһ��ʼ���Ǵ���ֻ������׿�ĺ�̨���ѡ�
����Ϊ�����Լ�д��׿��������ͼƬ���ϴ����ܵ� -_-! ��ԭ�������֣�ûѧ����Щjade��html֮��ģ���
ֻ��DEMO.�кܶ�bug�����λ�������ġ�


### ���app.js����
var path = require('path');
var http = require('./index');
var serversPath = path.join(__dirname + '/config/servers.json');
var servers = require(serversPath);
var getBase = __dirname + '/';

//�������ݿ�
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/TestDB');
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log('err=' + err);
    } else {
        console.log('Connected to Mongoose ,result= success');
    }
});


//��������������������ͼƬ�����otherģ��ͺ�̨������ģ��
// ����ӵ�ģ����Ҫ��config/serves.json����д�¡�
for (var i in servers) {
 http(getBase, servers[i]);
}


һЩ������Ϣ
----------------------------------- 
1.���ݿ���ʹ��ORM��mongooseд�ģ���װ���Բο���ƪ����
[ MongoDB���ܼ������밲װ]��http://www.cnblogs.com/mecity/archive/2011/06/11/2078527.html��
<br /> 

2.��Ϊû�н��棬����ֻ��MVC�� Model �� Controllers.
  ��֪��������Щ�Բ��ԣ���ӭ��ISSUE��ָ�����󡣻��߸���֪ͨ�£�лл��

3.��������serves���棬mian��Ҫ�Ǵ���Щ��Ҫ��ҵ���߼� ��otherĿ¼��Ҫ����ͼƬ�ļ�������.

 ͼƬ�Ĳ������ӣ�http://127.0.0.1:8002/API/file/openImg/8bxswM/head_1428388737819.jpg
 �����к�������������������Ϳ�����ʾͼƬ��.

4.��������W7+webStrom�����еġ�������һ�����GM����������ͼ�ǻ�ʧ�ܡ�
  λ����init/upload.js����.�����ں���submit_img���棬���еĵ�57��



��һ��д������д���ˣ���д���⡣
δ�����������




