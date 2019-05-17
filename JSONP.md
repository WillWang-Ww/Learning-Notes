浏览器安全基石：同源政策

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
简单适用。