import compose from './compose.js'

export default function applyMiddleware(...middlewares) {
    return function (oldCreateStore) {
        return function (reducer, initState) {
            const store = oldCreateStore(reducer, initState)
            const simpleStore = { getState: store.getState }
            const chain = middlewares.map((middleware) => middleware(simpleStore));
            store.dispatch = compose(...chain)(store.dispatch)
            return store
        }
    }
}