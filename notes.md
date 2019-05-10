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