#JSONP笔记#

##浏览器安全基石：同源政策##

协议相同，域名相同，端口相同

目的 保证用户信息安全

cookie：是服务器写入浏览器的一小段信息，只有同源的网页才能共享。

通过设置document.domain共享cookie

完全不同源的网站父子通信：

1.片段识别符

2.window.name 容量很大，但是性能有影响

3.window.postMessage 跨文档通信API

规避AJAX限制：

1.JSONP

简单适用。添加<script>元素向服务器请求JSON数据。

2.WebSocket

origin字段判断

3.CORS

##JSONP##

数据库：能长久存数据的地方

1.最著名的数据库：MySQL 

2.文件系统是一种数据库

amount = fs.readFilesSync('./db','utf8') //把值存在文件里，
读取文件

string = string.replace('&&&amount&&&',amount) //用占位符替代具体金额

//点付款后发送POST请求-用form action

writeFilesSync 写入数据

response.write('')

response.end()

from表单一旦提交，就会刷新页面
怎么办

把form 的 target 定到 iframe

更好的方法：

###img发请求法：###

不用form，按钮被点击时，利用可以发请求的标签：比如img，发送请
求，利用onload和onerror判断是否发送成功

页面刷新：window.location.reload()

###script发请求法：SRJ(server rendered javascript)###

把  script  append  到body里

script.onload script.onerror

content-type:application/javascript

无刷新局部更新页面的方法。牛逼。

##请求另一个网站的script##

script不受域名限制，任何网站都可以使用另一个网站的JS。

**重要操作用POST,GET不安全**

两个网站互相访问（可互相访问接口）

从一个网页的前端操作另一个网站的服务器-通过SRJ

方案缺点：后端的代码涉及了太多的前端代码，对分离不利。耦合。

##解耦##
后端是不是可以直接调个函数xxx？不去了解细节？

-JS定义，window.xxx //前端代码
-xxx.call(undefined,'success')//后端代码

-前端代码：http...../pay?callbackName=xxx
-后端代码：$(query.callbackName).call(undefined,'success')

**AJAX是受域名限制的，JSONP不受域名限制**

$(query.callbackName).call(undefined,{
    "success":true,
    "left":${newAmount}
})

JSON + Padding = JSONP

##JSONP完整过程##

请求方：一个网站的前端 frank.com （浏览器）

响应方：另一个网站的后端（服务器）

1.请求方创建script，src指向响应方。同时传一个查询参数 ？callbackName=xxx

2.响应方根据查询参数callbackName，构造形如1.xxx.call(undefined,'你要的数据') 2.xxx（'你要的数据'）

3.浏览器接收到响应，就会执行yyy.call(undefined,'你要的数据')

4.那么请求方就知道了他要的数据

这就时JSONP

约定：
-1.calbackName -> 一般叫callback
-2.yyy -> 随机数

