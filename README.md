# demojQuery
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