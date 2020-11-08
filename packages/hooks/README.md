# 帧
- 每个帧的开头包括样式计算、布局和绘制
- JavaScript 执行JavaScript引擎和页面渲染在同一个渲染线程,GUI 和 JavaScript 执行两者是互斥的

如果某个任何执行时间太长,浏览器会推迟渲染