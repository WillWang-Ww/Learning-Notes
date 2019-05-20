AJAX

**如何发请求：**

1.form表单：GET POST 必须刷新或新开页面，不好用

点一下 view source 看请求的各个部分

2.a标签：必须刷新或新开页面，不好用

3.img标签：只能以图片的形式展示，受限

4.link标签:只能以CSS或favicon形式展示

5.script：只能以脚本形式运行

如何升级体验，想怎么请求都行，想怎么展示都行

**AJAX : 异步的 JavaScript 和 XML**

起源于：微软的 IE5 引入 ActiveX对象

window.XMLHttpRequest

1.使用XMLHttpRequest发请求

2.服务器返回XML格式的字符串

3.JS解析XML，并更新局部页面

let request  = new XMLHttpRequest

request.open('GET','/xxx') //初始化,配置request。这里这个GET可以随意设定

request.send()

其属性readyState:揭示一个细节，响应可能不是一次返回的。是分次的。状态为4，则响应下载完毕。

request.onreadystatechange--看过程

XML可以进行操作处理（类似处理DOM） ---过时

**JSON ： 一门新的语言**

与JS的区别：

JS --- JSON

undefined --- 没有

null --- null

['a','b'] --- ["a","b"]

function(){} --- 没有

{name:'frank'} --- {"name":"frank"}

var a = {}

a.self = a --- 搞不定，JSON没有变量

{__proto__} --- 没有原型链

1.没有抄袭function和undefined

2.JSON的字符串首尾必须是双引号 "

"jarvis"

在服务器端是一个字符串，**响应的第四部分一定是字符串**。后台只能返回字符串给前端，只是恰巧字符串要符合JSON语法。

怎么知道字符串是怎么么内容呢？

let string = request.responseText

//把符合JSON语法的字符串转换成JS对象（或对应的值）

let object = window.JSON.parse(string) 

JSON.parse 是浏览器提供的

**同源策略**

点一下 Preserve log 

用表单向百度发GET是没问题的。（iframe可以，img可以.....）

用AJAX，请求可以成功，但是报错，没有response。（只有AJAX不行）

status状态码是0，初始值，不更新。 

**只有 域名+协议+端口 一模一样才允许发 AJAX 请求**

浏览器必须保证。

**CORS 可以告诉浏览器 不要阻止某网站访问** 

后台加一句 setHeader Access-Control-Allow-Origin , http://.....

加一个响应头就行，请求不用改。

CORS全称：Cross-Origin Resource Sharing 

let request = new XMLHttpRequest()

request.open('get','http://jack.com:8002/xxx')

request.send()

request.onreadystatechange = ()=>{
    
    if(request.readyState === 4){
        
        if(request.status >= 200 && request.status < 
        300){
        
            let string = request.reponseText

            let obj = window.JSON.parse(string)

            }
    
    }

}

**深入学习AJAX**
GET /XXX HTTP/1.1
HOST:jack.com:8002
Content-Type:

1.JS可以设置任意请求 header 吗--可以

设置第一部分： request.open('get','/xxx')

设置第二部分： request.setHeader('Content-Type','x-www-form-urllencoded')

设置第四部分： request.send('...')

2.JS 可以获取任意响应 Header 吗?

第一部分： request.status / request.statusText

第二部分： request.getResponseHeader() / request.getAllResponseHeader()

第四部分： request.reponseText

服务器端设置：

reponse.statusCode = 200

reponse.setHeader('Content-Type','...')

reponse.write(`..  ..`)

reponse.end()

**一点点TCP知识**
    HTTP底层是由TCP/IP协议构成的
    浏览器-DNS缓存-服务器-IP-三次握手
    响应：建立连接，传HTTP的四部分，单位为<包>，第一个数据就拿到了200/400什么的。

**封装AJAX jQuery.AJAX**
    传入有结构的参数 --- 直接传一个对象 取名options
    let url = options.url
    使用方代码自己不call，而是别人call，callback.使用方传一个参数过去，让别人call。

    //ES6解构赋值 ： let {method,body,successFn,failFn,headers} = options

**了解一下promise**
    确定函数形式的规范
    意义：1.以位置代替函数名，省的记名字了
    2.可以对同一个东西多次处理，多次.then就好了

    return new Promise(function(resolve,reject){

    })

    promise函数接收一个函数，返回一个带then的哈希，

    ```
window.jQuery = function(){}
window.$ = window.jQuery

window.jQuery.ajax = function({url, method, body, success, fail}){
  let request = new XMLHttpRequest()
  request.open(method, url) // 配置request
  request.onreadystatechange = ()=>{
    if(request.readyState === 4){
      if(request.status >= 200 && request.status < 300){
        success.call(undefined, request.responseText)
      }else if(request.status >= 400){
        fail.call(undefined, request)
      }
    }
  }
  request.send(body)
}
```