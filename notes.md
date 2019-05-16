# demojQuery
jQuery初识

obj.x() ===
obj['x']()

用jQuery做轮播

1.内容、样式、行为分离

原则：内容：HTML、样式：CSS、行为：JS

如果不分离？

用HTML控制样式：会使内容结构变复杂，拧巴，出现废话标签

用CSS控制内容：JS访问不到

用CSS控制行为：页面会变慢

用JS控制样式：标签 $div.show() $div.hide() 禁用，不可靠

2.轮播

轮播demo网站： idangero.us/swiper/demos

思路：一字排开图片，加在一个div里，加overflow：hidden

移动div，可以用margin-left/position relative/绝对定位/CSS3 transform（性能最好）

图片img宽高能确定的最好写好，防止重排浪费性能

currentTarget

直接封装 jQuery对象 .ep

触发click事件： trigger（'click'）

鼠标浮上去和离开： mouseennter / mouseleave

3.无缝轮播

思路：打碎整体，一个一个轮过去

4.DOM事件

网景公司Navigater ==> Firefox

微软 IE ==> Edge

谷歌 Chrome

W3C统一浏览器 DOM Level 1

DOM Level 1 1998年：汇总

DOM Level 2 ：2000年 将事件Events单独拿出来

目前用的“事件”，最普遍广泛的是 DOM LEVEL 2 中的。

DOM LEVEL 1：

function print(){
    console.log('hi')
}

<button onclick="print()">B</button>
onclick="要执行的代码"
//一旦用户点击，浏览器就eval（'要执行的代码'）

Javascript

X.onclick = print //类型为函数对象

//一旦用户点击，那么浏览器就执行：X.onclick。call（X,{}）

如果写成X。onclick = print() //undefined

所以，在button里，加call，在JS里，不加

DOM LEVEL 2：
xxx.addEventListener('click',function(){
    console.log(1)
})
//这里是个队列，先进去先触发，有很多EventListeners，一个个来。可以add一个进去排队，不影响前后。顺序也可以保证。队列的实质一般是数组。

xxx.onclick = function(){}
//这里onclick是属性，是唯一的，如果想绑定两个onclick就崩了。会覆盖。导致不敢轻易写onclick，很怕互相覆盖。    

出队：xxx.removeEventListener('click',f1)

什么是.one？
相当于在函数回调的最后一句加入xxx.remove...，执行一次就走。

 addEventListener
 默认第三个参数为undefined，先小后大，改成true则先大后小。

 爷爷-爸爸-儿子：捕获阶段 true

 儿子-爸爸-爷爷：冒泡阶段

 事件模型：捕获阶段+冒泡阶段

 一个div既有冒泡阶段又有捕获阶段，请问是哪个先执行？如果直接触发在本身上，不区分捕获还是冒泡，按照写的顺序发生。

 5.点击别处关闭浮层（DOM事件例子）

 e.stopPropagation 不告诉父母-->阻止冒泡 

 $(wrapper).on('click',false)

 6.继续做轮播

 document.addEventListener('visibilitychange',function(e){
     
     if(document.hidden){
     
         window.clearInterval(time)
     
     }else{

     }
 
 })

 append prepend

 offset?

轮播组建：swiper

1.
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>我的页面</title>
        <link rel="stylesheet" href="./style.css">
        <link rel="stylesheet" href="./print.css" media="print">
        <link rel="stylesheet" href="./mobile.css" media="(max-width: 500px)">
    <body>  
    </body>
</html>
3.圆角矩形：
以id为shape的div为例，可以利用 border-radius 这个属性进行修改。它是border-top-left-radius、border-top-right-radius、border-bottom-right-radius，和 border-bottom-left-radius的简写。
属性值为一个值时，表示一个圆的半径（其部分弧构成圆角）。两个值时，确定一个椭圆。
```
#shape{
   width: 100px;
   height: 100px;
   background: red;
   border-radius: 10px;
}
```
阴影：
元素的边框产生阴影：box-shadow
box-shadow适用于所有元素，初始值为none。
其值可以设置：x偏移量，y偏移量，阴影模糊面积，阴影扩散班级，阴影颜色，向内扩散还是向外扩散
下面举例一个向内的阴影：
```
#shape{
box-shadow:inset 10px 10px 5px 2px rgba(0, 0, 0, 0.2);
}
```
其中，inset表示阴影向内扩散，如果想要向外，则不加inset。10px 10px 两个10像素为X和Y方向的偏移量。5px为阴影模糊半径，2px为阴影扩散半径，rgba为颜色。
简单来说，可以控制内外、位置、形态、颜色等几个方面

文本阴影：text-shadow
text-shadow同样需要设置的是阴影的位置，形态，颜色等。
前两个长度单位参数为阴影位置，后面再有的长度单位为控制阴影形态，最后再加上颜色等
```
#shape{
  text-shadow: 5px 5px 1px black;
}
```

4.闭包，closure
如果一个函数使用了它范围外的变量，那么这个函数和这个变量组成的总和就是闭包。闭包是JavaScript语言函数作用域下的副产品，可以利用链式作用域达到一些想要的效果。‘
闭包的作用简单来说就是能够读取其他函数的内部变量，形象地来说，就是它记住了它所在的环境。

比如，我们需要得到某函数内的局部变量，由于变量作用域的关系，我们无法直接读取到函数内的变量，故需要使用闭包。
```
利用f2读取f1函数内变量 a 
function f1(){
    var a = 1
        function f2(){
            a +=1
            return a
        }
    return f2
}
函数f2和变量 a 就组成了一个闭包
```
由于我们不能直接在外部读取到a（从另一个角度说a其实被保护起来了），我们定义一个f2，还记得我们说过，f2在函数内部，可以读到它的父函数的变量，故可以获得a并进行操作和返回。这下，我们只要return f2，就可以在函数外部读到a了。这就是闭包及闭包的作用。但是由于闭包可以将变量保存在内存中，所以对内存消耗比较大，谨慎使用。

总结一下，一个函数使用了它范围外的变量，那么这个函数和这个变量组成的总和就叫闭包。它的来源是JS的变量作用域。其使用目的可以从其作用体现：闭包可以读取函数内部的变量，并且让这些变量的值始终保持在内存中，也可以拿来封装对象的私有属性和私有方法。

5.call、apply、bind都是绑定this的方法
1.call：call方法可以指定函数内部this的指向，this体现在其第一个参数。
```
fn.call(thisValue,arg1,arg2,...)
```
2.apply：改变this指向，然后再调用该函数。接收一个数组作为函数执行的参数。
```
fn.apply(thisValue,[arg1,arg2,...])
```
第一个参数就是this所要指向的那个对象。如果这个值设定为null或则undefined，那么就表示指向全局对象。后面是接收一个数组，成员为参数。
3.bind：将函数体内的 this 绑定到某个对象，然后返回一个新函数。
```
var d = new Date();
var print = d.getTime.bind(d);
print()
```
bind的参数就是所要绑定的this对象。如果第一个参数设定为null或则undefined，那么就表示指向全局对象。
总结一下，call、apply、bind都是用来改变this指向的，call和apply立即执行，bind只改变this指向。

6.

400 Bad Request：服务器不理解客户端的请求，未做任何处理。
401 Unauthorized：用户未提供身份验证凭据，或者没有通过身份验证。
403 Forbidden：用户通过了身份验证，但是不具有访问资源所需的权限。
404 Not Found：所请求的资源不存在，或不可用。
405 Method Not Allowed：用户已经通过身份验证，但是所用的 HTTP 方法不在他的权限之内。
410 Gone：所请求的资源已从这个地址转移，不再可用。
415 Unsupported Media Type：客户端要求的返回格式不支持。比如，API 只能返回 JSON 格式，但是客户端要求返回 XML 格式。
422 Unprocessable Entity ：客户端上传的附件无法处理，导致请求失败。
429 Too Many Requests：客户端的请求次数超过限额。
500 Internal Server Error：客户端请求有效，服务器处理时发生了意外。
503 Service Unavailable：服务器无法处理请求，一般用于网站维护状态。

7.
POST/path HTTP/1.1
Host:www.xxxxx.com
Accept:*/*
Content-Length:20
Content-Type:application/x-www-form-urlencoded

username=ff&password=123

8.
1.O(n*n)
    冒泡排序：
    从第0个元素到第n-1个元素遍历，若前面一个元素大于后面一个元素，则交换两个元素，这样可将整个序列中最大的元素冒泡到最后，然后再从第0个到第n-2遍历，如此往复，直到只剩一个元素。
2.O(n log2 n)
    堆排序：
    堆排序利用的是二叉树的思想，所谓堆就是一个完全二叉树，完全二叉树的意思就是，除了叶子节点，其它所有节点都有两个子节点，这样子的话，完全二叉树就可以用一个一块连续的内存空间（数组）来存储，而不需要指针操作了。堆排序分两个流程，首先是构建大顶堆，然后是从大顶堆中获取按逆序提取元素。
3.O(n + max)
    基数排序：
    以正整数为例，将所有待比较数值统一为同样的数位长度，数位较短的数前面补零。然后，从最低位开始，依次进行一次排序。这样从最低位（个位）排序一直到最高位排序完成以后，数列就变成一个有序序列。
    
9.
一个页面从输入URL到页面加载完成，过程中发生了什么？
1.DNS解析
在浏览器输入一个网址以后，先进行网址到地址的转换，即DNS解析。网址到地址的转换通过向服务器查询，查询顺序为，根域名服务器-com顶级域名服务器-**域名服务器。返回一个IP地址即解析完毕。这个过程中存在多个UDP和TCP请求。
为什么会同时存在UDP和TCP呢。首先区分一下二者，TCP是面向连接的协议，提供可靠数据传输。UDP是一直无连接的传输层协议，提供不可靠信息传输。二者主要的不同在于可靠传递方面，UDP不可靠但是速度快。区域传送时使用TCP，域名解析时使用UDP，因为很多DNS服务器配置时仅支持UDP查询包。
2.TCP连接
TCP是HTTP协议的传输层协议，建立连接需要进行三次握手：
1.主机向服务器发送请求。2.服务器接到请求后发送同意型号。3.主机接到同意信号后，发送确认信号。即建立TCP/IP连接。三次握手后浏览器就可以和服务器进行正式通信了。
3.HTTP请求
HTTP全称超文本传输协议（HyperText Transfer Protocol）客户机端和服务器端都将遵守这个协议。这部分主要发生在客户端。构建HTTP请求报文并发送到指定端口。HTTP协议80/8080，HTTPS协议443.
HTTP请求由请求行（request line）、请求头部（header）、空行和请求数据4个部分组成。
常用的请求方法为：GET\POST\PUT\DELETE\OPTIONS\HEAD
根据HTTP规范，GET用于信息获取，而且应该是安全的和幂等的。POST表示可能修改变服务器上的资源的请求。
服务器处理请求并返回HTTP报文。由状态码, 响应报头和响应报文组成。
状态码有：1**：指示信息、2**：成功、3**：重新定向、4**：客户端错误、5**：服务端错误。
4.浏览器解析渲染页面
浏览器接收到响应报文后，把其内部的HTML\CSS\JS等文件进行边解析边渲染。首先构建DOM树，然后解析CSS文件。
JS解析是由JS解析引擎完成的，是单线程运行。
5.断开连接-四次挥手
1.主机向服务器发送一个断开连接的请求。
2.服务器接到请求后发送确认收到请求信号。
3.服务器向主机发送断开通知。
4.主机接到断开通知后断开连接并返回一个确认信号。服务器收到确认信号后断开连接。

