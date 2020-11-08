const MyReact = (function () {
    // 将状态和依赖数组保存到外层的闭包中
    let _val, _deps
    return {
        render(Component) {
            const Copm = Component()
            Copm.render()
            return Copm
        },
        useEffect(callback, depArray) {
            const hasNoDeps = !depArray
            const hasChangedDeps = _deps ? !depArray.every((el, i) => el === _deps[i]) : true
            if (hasNoDeps || hasChangedDeps) {
                callback()
                _deps = depArray
            }
        },
        useState(initialValue) {
            _val = _val || initialValue
            function setState(newval) {
                _val = newval
            }
            return [_val, setState]
        }
    }
})()

function Counter() {
    const [count, setCount] = MyReact.useState(0)
    MyReact.useEffect(() => {
        console.log('effect', count);
    }, [count])

    return {
        click: () => setCount(count + 1),
        noop: () => setCount(count),
        render: () => console.log('render', { count })
    }
}

let App
App = MyReact.render(Counter)

App.click()
App = MyReact.render(Counter)

App.noop()
App = MyReact.render(Counter)

App.click()
App = MyReact.render(Counter)