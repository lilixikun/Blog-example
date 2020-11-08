function useState(initialValue) {
    var _val = initialValue

    function setState(newVal) {
        _val = newVal
    }
    return [_val, setState]
}

var [foo, setFoo] = useState(0)
console.log(foo);
setFoo(1)
console.log(foo);

const MyReact = (function () {
    let _val
    return {
        render(Component) {
            const Comp = Component()
            Comp.render()
            return Comp
        },
        useState(initialValue) {
            // 每次刷新
            _val = _val || initialValue
            function setState(newVal) {
                _val = newVal
            }
            return [_val, setState]
        }
    }
})()


function Counter() {
    const [count, setCount] = MyReact.useState(0)
    return {
        click: () => setCount(count + 1),
        render: () => console.log('render:', { count })
    }
}
let App
App = MyReact.render(Counter) // render: { count: 0 }
App.click()
App = MyReact.render(Counter) // render: { count: 1 }

// export default useState