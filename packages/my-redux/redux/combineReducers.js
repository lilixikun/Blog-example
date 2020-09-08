export default function combineReducers(reducers) {
    const reducerKeys = Object.keys(reducers)
    const nextState = {}
    let hasChange = false

    return function combinaction(state = {}, action) {
        for (let i = 0; i < reducerKeys.length; i++) {
            const key = reducerKeys[i]
            const reducer = reducers[key]
            if (typeof reducer === "function") {
                // 现有的值
                const previousStateForkey = state[key]
                // 执行分支的reducer
                const nextStateForKey = reducer(previousStateForkey, action)
                hasChange = previousStateForkey !== nextStateForKey
                // 执行完再合并到 大 state里面
                nextState[key] = nextStateForKey
            }
        }
        return hasChange ? nextState : state
    }
}