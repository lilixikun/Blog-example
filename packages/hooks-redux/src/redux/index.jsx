import React from 'react';
const { useReducer, useContext, createContext } = React;
//中间件
function middlewareLog(lastState, nextState, action, isDev) {
  if (isDev) {
    console.log('🐒', action.type);
    console.log('①', lastState);
    console.log('②', nextState);
  }
}
function reducerInAction(state, action) {
  if (typeof action.reducer === 'function') {
    return action.reducer(state);
  }
  return state;
}
export default function createStore(params) {
  const { isDev, middlewares, initialState } = {
    initialState: {},
    dispatch: undefined,
    middlewares: params.isDev ? [middlewareLog] : undefined,
    ...params,
  };
  //全局一个全局的状态管理机制
  const AppContext = createContext();
  const store = {
    _state: initialState,
    getState: () => {
      return store._state;
    },
    useContext: () => {
      return useContext(AppContext);
    },
  };
  const middlewareReducer = (lastState, action) => {
    console.log(Math.random(), action.type);
    //开发一个小lib 而不是业务相关
    // switch (action.type) {
    //   case 'addNum':
    //     return {
    //       ...lastState,
    //       age: lastState.age + 1,
    //     };
    // }
    let nextState = reducerInAction(lastState, action);
    for (let item of middlewares) {
      const newState = item(lastState, nextState, action, isDev);
      if (newState) {
        nextState = newState;
      }
    }
    //更新回状态
    store._state = nextState;
    return nextState;
  };
  const Provider = (props) => {
    const [state, dispatch] = useReducer(middlewareReducer, initialState);
    if (!store.dispatch) {
      // store.dispatch = dispatch;
      store.dispatch = async (action) => {
        if (typeof action === 'function') {
          await action(dispatch, store.getState());
          console.log('xxx');
        } else {
          dispatch(action);
        }
      };
    }
    // console.log('🍊', state);
    return <AppContext.Provider {...props} value={state} />;
  };
  return {
    Provider,
    store,
  };
}
