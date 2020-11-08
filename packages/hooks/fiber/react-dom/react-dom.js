let isFirstRender = false
let HostRoot = 'HostRoot' // 表示 RootFiber类型
let ClassComponent = 'ClassComponent'  //表示类组件类型
let HostComponent = 'HostComponent' //表示原生dom 类型
let HostText = 'HostText' //表示文本类型
let FunctionCopmponent = 'FunctionCopmponent'

let NoWork = 'NoWork'  //表示没有任何工作
let Placement = 'Placement'  // 表示这个节点是新插入的
let Update = 'Update' // 表示这个节点有更新
let Deletio = 'Deletio'  // 表示当前节点要被删除
let PlacementAndUpdate = 'PlacementAndUpdate'  // 一般节点换位 更新

let nextUnitOfWork = null
let isWorking = false
let isCommitting = false

class FiberNode {
    constructor(tag, key, pendingProps) {
        this.tag = tag //当前fiber 类型
        this.key = key
        this.type = null  // div / h1 /Class 
        this.pendingProps = pendingProps //
        this.stateNode = null  // 当前fiber的实例
        this.child = null  // 当前fiber的子节点 每个fiber 有且只有一个节点指向 firstChild
        this.sibling = null  // 表示当前节点的兄弟节点 每个fiber有且只要一个属性指向隔壁的兄弟节点
        this.return = null // 指向父节点
        this.index = 0
        this.memoizedState = null  // 表示当前fiber的state
        this.memoizedProps = null // 表示当前fiber的props
        this.pendingProps = pendingProps // 表示新进来的 props
        this.effectTag = null // 表示当前节点要进行的何种更新
        this.firstEffect = null // 表示当前节点的有更新的第一个子节点
        this.lastEffect = null  // 表示当前节点有更新的最后一个子节点
        this.nextEffect = null   //  表示下一个要更新的子节点

        this.alternate = null  // 用来连接 currnt 和 workInProgress 的
        this.updateQueue = null  // 一条链表上面挂在新的fiber状态 state={name:xx} /state={name:22}
        // 还有别的属性

    }
}

function createFiber(tag, key, pendingProps) {
    return new FiberNode(tag, key, pendingProps)
}

function workLoop(nextUnitOfWork) {
    while (!!nextUnitOfWork) {
        nextUnitOfWork = performUnitOf(nextUnitOfWork)
    }
}

let eventsName = {
    onClick: 'click',
    onChange='change',
    onInput: 'inpu',
    // ...
}

function performUnitOf(workInProgress) {
    let next = beginWork(workInProgress)
    if (next === null) {
        next = completeUnitOfWork(workInProgress)
    }
    return next
}

function reconcileChildren(workInProgress, nextChildren) {
    if (isFirstRender && !!workInProgress.alternate) {
        workInProgress.child = reconcileChildFiber(workInProgress, nextChildren)
        workInProgress.child.effectTag = Placement
    } else {
        workInProgress.child = reconcileChildFiber(workInProgress, nextChildren)
    }
}

function reconcileSingleTextNode(returnFiber, text) {
    let fiber = createFiber(HostText, null, text)
    fiber.return = returnFiber
    return fiber
}

function reconcileSingleElement(returnFiber, element) {
    let type = element.type
    let flag = null
    if (element.$$typeof === Symbol.for('react.element')) {
        if (type === "function") {
            // 判断是不是 Class组件
            if (type.prototype && type.prototype.isReactComponent) {
                flag = ClassComponent
            }
        } else if (type === "string") {
            flag = HostComponent
        }
    }
    // 创建fiber
    let fiber = createFiber(flag, element.key, element.props)
    fiber.type = type
    fiber.return = returnFiber
    return fiber
}

function reconcileChildrenArray(workInProgress, nextChildren) {
    //  这个方法中 要通过 index 和key 值去尽可能的找到可以复用的dom 节点
    // 这个函数是react最最复杂的 diff 算法
    let nowWorkInProgress = null
    if (isFirstRender) {
        nextChildren.forEach((reactElement, index) => {
            if (index === 0) {
                if (typeof reactElement === 'string' || typeof reactElement === 'number') {
                    workInProgress.child = reconcileSingleTextNode(workInProgress, reactElement)
                } else {
                    workInProgress.child = reconcileSingleElement(workInProgress, reactElement)
                }
                nowWorkInProgress = workInProgress.child
            } else {
                if (typeof reactElement === 'string' || typeof reactElement === 'number') {
                    nowWorkInProgress.sibling = reconcileSingleTextNode(workInProgress, reactElement)
                } else {
                    nowWorkInProgress.child = reconcileSingleElement(workInProgress, reactElement)
                }
                nowWorkInProgress = nowWorkInProgress.sibling
            }
        })
        return workInProgress.child
    }
}

function reconcileChildFiber(workInProgress, nextChildren) {
    if (typeof nextChildren === "object" && nextChildren && nextChildren.$$typeof) {
        // 说明它是一个独生子 并且是react元素
        return reconcileSingleElement(workInProgress, nextChildren)
    }
    if (nextChildren instanceof Array) {
        return reconcileChildrenArray(workInProgress, nextChildren)
    }
    if (typeof nextChildren === "string" || typeof nextChildren === "number") {
        return reconcileSingleTextNode(workInProgress, nextChildren)
    }
}

function updateHostRoot(workInProgress) {
    let children = workInProgress.memoizedState.element
    return reconcileChildren(workInProgress, children)
}

let classcomponentUpdater = {
    enqueueState: null
}

function updateClassComponent(workInProgress) {
    let component = workInProgress.type
    let nextProps = workInProgress.pendingProps
    if (component.defaultProps) {
        nextProps = Object.assign({}, component.defaultProps, nextProps)
    }
    let shouldUpdate = null
    let instance = workInProgress.stateNode
    if (!instance) {
        // 没有实例 说明是初次渲染 或者是一个新创建的节点
        instance = new component(nextProps)
        workInProgress.memoizedState = instance.state
        workInProgress.stateNode = instance
        instance._reactInternalFiber = workInProgress
        instance.updater = classcomponentUpdater

        // 静态方法 用来代替 componentWillReceiveProps
        let getDerivedStateFormProps = component.getDerivedStateFormProps
        if (!!getDerivedStateFormProps) {
            let nextState = getDerivedStateFormProps(nextProps, workInProgress.memoizedState)
            if (!nextState === null || nextState === undefined) {
                if (typeof nextState === 'object' && !(nextState instanceof Array)) {
                    workInProgress.memoizedState = Object.assign({}, nextProps, nextState)
                }
            }
            instance.state = workInProgress.memoizedState
        }
        // 要处理生命周期 等等
        shouldUpdate = true
    } else {

    }

    let nextChild = instance.render()

    return reconcileChildren(workInProgress, nextChild)
}


function updateHostComponent(workInProgress) {
    let nextProps = workInProgress.pendingProps
    let nextChild = nextProps.children

    // 对于文本类型的节点 
    // 不一定每次都创建对应的fiber
    // 当这个节点有兄弟节点的时候会创建兄弟节点 为独生子的时候不会创建fiber 直接返回null
    if (typeof nextChild === 'string' || typeof nextChild === 'number') {
        return null
    }
    return reconcileChildren(workInProgress, nextChild)
}

function beginWork(workInProgress) {
    let tag = workInProgress.tag
    switch (tag) {
        case HostRoot:
            next = updateHostRoot(workInProgress)
            break;
        case ClassComponent:
            next = updateClassComponent(workInProgress)
        case HostComponent:
            next = updateHostComponent(workInProgress)
        case HostText:
            next = null
        default:
            next = null
    }
    let next = null
    return next
}


function completeWork(workInProgress) {
    // 1. 创建真实dom 实例
    let tag = workInProgress.tag
    let instance = workInProgress.stateNode
    if (tag === HostComponent) {
        if (!instance) {
            // 说明节点是初次挂载 也可能是新创建的节点
            let domElement = document.createElement(workInProgress.type)
            domElement._reactInternalInstance = workInProgress
            workInProgress.stateNode = domElement

            // 2. 对子节点进行插入
            let node = workInProgress.child
            wapper: while (!!node) {
                let tag = node.tag
                if (tag === HostComponent || tag === HostText) {
                    domElement.appendChild(node.stateNode)
                } else {
                    node.child.return = node
                    node = node.child
                    continue
                }

                if (node === workInProgress) break

                // 找父节点是否有兄弟节点
                while (node.sibling) {
                    if (node.return === null || node.return === workInProgress) {
                        // wapper 加名字可以直接结束两层 while 循环
                        break wapper
                    }
                    node = node.return
                }
                node.sibling.return = node.return
                node = node.sibling

                // 3. 把属性给它
                let props = workInProgress.pendingProps
                for (const propKey in props) {
                    let propVal = props[propKey]
                    if (propKey === "children") {
                        if (typeof propVal === 'string' || typeof propVal === 'number') {
                            domElement.textContent = propVal
                        }
                    } else if (propKey === 'style') {
                        for (const stylePropKey in propVal) {
                            if (!propVal.hasOwnProperty(stylePropKey)) continue
                            let styleValue = propVal[stylePropKey].trim()
                            if (stylePropKey === 'float') {
                                stylePropKey = 'cssFloat'
                            }
                            domElement.style[stylePropKey] = styleValue
                        }
                    } else if (eventsName.hasOwnProperty(propKey)) {
                        let event = props[propKey]
                        // react 所有写在JSX 模版上的事件都是合成事件
                        // 合成事件不会立即执行传进来的事件 而是先执行其他的事件 比如说事件源对象做一些处理合成
                        // 会把所有的事件都代理到根节点 好处全局就绑定一个事件就可以了 减少内存
                        document.addEventListener(eventsName[propKey], event, false)
                    } else {
                        domElement.setattribute(propKey, propVal)
                    }
                }
            }
        }
    } else if (tag === HostText) {
        let oldText = workInProgress.memoizedProps
        let newText = workInProgress.pendingProps
        if (!instance) {
            instance = document.createTextNode(newText)
            workInProgress.stateNode = instance
        } else {
            // 说明不是初次渲染
        }
    }
}

function completeUnitOfWork(workInProgress) {
    while (true) {
        let returnFiber = workInProgress.return
        let siblingFiber = workInProgress.sibling

        completeWork(workInProgress)


        let effectTag = workInProgress.effectTag
        // 判断是否有改变
        let hasChange = (effectTag === Update || effectTag || Deletio || effectTag === Placement || effectTag === PlacementAndUpdate)
        if (hasChange) {
            if (!!returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = workInProgress
            } else {
                returnFiber.firstEffect = workInProgress
            }
            returnFiber.lastEffect = workInProgress
        }



        if (!!siblingFiber) return siblingFiber
        if (!!returnFiber) {
            workInProgress = returnFiber
            continue
        }
    }
    return null
}

// 提交操作
function completeRoot(root, finishedWork) {
    root.finishedWork = null
    commitRoot(root, finishedWork)
}

function commitRoot(root, finishedWork) {
    isWorking = true
    isCommitting = true

    // 有三个while 循环
    // 第一个函数 用来执行 getSnapshotBeforeUpdate
    // 第二个函数 真正用来操作页面 将有更新的节点 该插入的插入 该更新的更新 该删除的删除
    // 第三个循环 执行剩余的生命周期


    let firstEffect = finishedWork.firstEffect
    let nextEffect = null

    nextEffect = firstEffect
    while (!!nextEffect) {
        let effectTag = nextEffect.effectTag
        if (effectTag.includes(Placement)) {
            // 说明新插入的节点
            // 1. 先找到一个能插进来的父节点
            // 2. 再找能往父节点插的节点
            let parentFiber = nextEffect.return
            let parent = null
            while (!!parentFiber) {
                let tag = parentFiber.tag
                if (tag === HostComponent || tag === HostRoot) {
                    break
                }
            }
            if (parentFiber.tag === HostComponent) {
                parent = parentFiber.stateNode
            } else if (parentFiber.tag === HostRoot) {
                parent = parentFiber.stateNode.container
            }

            if (isFirstRender) {
                let tag = nextEffect.tag
                if (tag === HostComponent || tag === HostText) {
                    parent.appendChild(nextEffect.stateNode)
                } else {
                    let child = nextEffect
                    while (true) {
                        let tag = child.tag
                        if (tag === HostComponent || tag === HostText) {
                            break
                        }
                        child = child.child
                    }
                    parent.appendChild(child.stateNode)
                }
            }

        } else if (effectTag === Update) {
            // 说明更新
        } else if (effectTag === Deletio) {
            // 说明该节点被删除
        } else if (effectTag === PlacementAndUpdate) {
            // 说明该节点换了位置 并且属性有更新
        }
    }

    isCommitting = false
    isWorking = false
}

function createWorkInProgress(current, pendingProps) {
    // 复用 current.alternate
    let workInProgress = current.alternate
    if (workInProgress) {
        workInProgress = createFiber(current.tag, pendingProps)
        workInProgress.type = current.type
        workInProgress.stateNode = current.stateNode
        // 要让这俩对象互相指向
        workInProgress.alternate = current
        current.alternate = workInProgress
    } else {
        workInProgress.pendingProps = pendingProps
        workInProgress.effectTag = NoWork
        workInProgress.firstEffect = null
        workInProgress.lastEffect = null
        workInProgress.nextEffect = null
    }

    // 要保证 current 和 current.alternate 上的 updateQueue 是同步的
    // 因为每次执行 setState 时候会创建的更新 把更新挂载到对应的 fiber 上
    // 每次创建(或)复用 workInProgress current.alternate 对象上拿的
    // 复用的这个 alternate updateQueue 上不一定有新的更新
    // 所以这里压迫判断 如果 current.alternate 上没有新的更新 就说明本轮更新
    // 找到的这个fiber 存在于 current

    if (!!workInProgress && !!workInProgress.updateQueue && !workInProgress.updateQueue.lastUpdate) {
        workInProgress.updateQueue = current.updateQueue
    }

    workInProgress.child = current.child
    workInProgress.memoizedState = current.memoizedState
    workInProgress.memoizedProps = current.memoizedProps
    workInProgress.sibling = current.sibling
    workInProgress.index = current.index
    return workInProgress
}

class ReactRoot {
    constructor(container) {
        this._internalRoot = this._createRoot(container)
    }
    _createRoot(container) {
        let uninitiaFiber = this._createUninitiaFiber(HostComponent, null, null)
        let root = {
            container: container,
            current: uninitiaFiber,
            finishedWork: null
        }
        uninitiaFiber.stateNode = root
        return root
    }

    _createUninitiaFiber(tag, key, pendingProps) {
        return createFiber(tag, key, pendingProps)
    }

    render(reactElement, callback) {
        let root = this._internalRoot
        let workInProgress = createWorkInProgress(this._internalRoot.current)
        // react 源码是把 reactElement 放到了current
        workInProgress.memoizedState = { element: reactElement }

        nextUnitOfWork = workInProgress
        workLoop(nextUnitOfWork)
        root.finishedWork = root.current.alternate
        if (!!root.finishedWork) {
            completeRoot(root, root.finishedWork)
        }
    }
}

const ReactDOM = {
    render(reactElement, container, callback) {
        isFirstRender = true
        let root = new ReactRoot(container)
        container._reactRootContainer = root

        isFirstRender = false

        root.render(reactElement, callback)
    }
}

export default ReactDOM

