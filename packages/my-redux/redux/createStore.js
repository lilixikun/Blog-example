
export default function createStore(reducer, initState, rewriteCreateStoreFunc) {

    if (rewriteCreateStoreFunc) {
        const newCreateStore = rewriteCreateStoreFunc(createStore)
        return newCreateStore(reducer, initState)
    }

    let state = initState
    let listenters = []

    function getState() {
        return state
    }

    function subscribe(listenter) {
        listenters.push(listenter)
    }

    function dispatch(action) {
        state = reducer(state, action)
        listenters.forEach(fun => fun(state))
    }

    // 处理第一次初始化返回默认state
    dispatch({ type: Symbol() })


    function replaceReducer(nextReducer) {
        reducer = nextReducer
        dispatch({ type: Symbol() })
    }

    return {
        getState,
        subscribe,
        dispatch,
        replaceReducer
    }
}

