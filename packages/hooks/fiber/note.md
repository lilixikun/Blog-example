# Fiber 是什么
Fiber 就是一个数据结构、它有很多属性
虚拟 dom 是对真实 dom 的一种简化 一些真实 dom 做不到的东西 虚拟dom 更做不到
就有了 Fiber 很多属性、 希望借由 fiber 上的这堆属性 来做一些比较厉害的事情

## Fiber 架构
在16 之前是所有的一把梭更新、节点过多会导致卡顿。为了弥补一些不足、设计了一些新的算法、
为了让这些算法跑起来、所以出现了 Fiber 这种数据结构
Fiber 数据结构 + 算法 = Fiber 架构

为什么标记 $$type 
为了防止不是React 的被攻击

React 应用从始至终 管理者最基本的三样东西
1. Root (整个应用的根  一个对象 不是 Fiber 同时有个属性指向 workInProgress)
2. current 树(树上的每一个节点都是 Fiber 保存的是上一次的状态 并且每个FIber节点 都对应这一个 jsx 节点)
3. workInProgress 树(树上的每一个节点Fiber 保存的是本次新的节点 并且每个Fiber 节点都对应一个 jsx 节点)

## 初次渲染的时候
没有 current 树,React 在一开始创建 Root 就会创建一个 uninitiaFiber (未初始化的FIber)
让 react 的 current 指向 uninitiaFiber
之后再去创建一个本次要用到的 workInProgress


## React 主要分两个阶段
1. render 阶段 指的是创建 fiber 过程
- 为每个节点创建新的 fiber(workInProgress) 可能是复用 生成一棵有新状态的 workInProgress 树
- 初次渲染的时候(或新创建了某个节点) 会将这个 fiber 创建真实的dom 实例,并且对当前节点的子节点进行插入 appendchild
- 如果不是初次渲染的话 就对比新旧的 fiber 状态 将产生了更新的fiber节点 最终通过链表的形式挂在到 RootFiber

2. commit 阶段 才是真正要操作页面的阶段
- 执行生命周期
- 会从 RootFiber 上获取到那条链表 根据链表上的标识 来操作页面


不管是初次渲染还是更新 都是从根往下遍历的


## setState 是同步还是异步
如果是正常情况下 也就是没有使用 Concurrent 组件情况下 是 同步更新的  但是不会立即获取到最新的state 的值  因为调用 setState 知识单纯的将你传入的 state 加入到 updateQueue 这条链表上  等这个点击事件结束之后 会调用一个回调函数,才会真正的更新 state 重新渲染

当前使用了 Concurrent 组件的时候,这种情况才是真正的异步更新模式
同样的没法立即获取最新状态 并且在执行react 更新和渲染过程中  使用了真正的异步方法(window.postmessage) 这个才是真正的异步


当使用了 flushSync 这个API的时候, react 的更新渲染完全是同步的 会立即触发更新 state 渲染的过程 这种情况可以获取到最新的 state

- flushSync
- window.addEventListener('click')
- setTimeout