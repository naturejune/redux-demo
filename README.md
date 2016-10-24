# Redux

# 管理应用的状态(sync/async更新)

* 服务器数据
* 缓存数据
* 本地生成数据
* UI状态

# 基本原则

* 单一数据源(调试、保存应用状态、undo/redo)
* 状态只读，只能通过触发action变换状态(action描述事件)
* 通过reducer(pure function)定义状态变换

# 核心概念

* Actions
* Reducers
* Store

## Actions

* 应用中的数据通过action传递到store
* action是store的唯一数据源
* action是纯js对象, 由type及其他自定义结构组成，其中type通常为string

> Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using store.dispatch().

```js
// action type
const ADD_TODO = 'ADD_TODO'

// action
{
  type: ADD_TODO,
  text: 'This is an action'
}

// action creator
const addTodo = text => ({
  type: ADD_TODO,
  text
})

// dispatch action
store.dispatch(addTodo('This is an action'))
```

## Reducers

定义应用状态如何变化

reducer必须是pure function.

> Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.*


```js
(previousState, action) => nextState
```

```js
const initState = {
  todos: []
}

const todoApp(state = initState, action) => {
  switch(action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          action.text
        ]
      }
    default:
      return state
  }
}
  ```

## Store

关联Actions及Reducers，职责包括：

- 保存应用状态
- 获取状态接口getState()
- 更新状态接口dispatch(action)
- 注册状态更新处理方法subscribe(listener)
- 取消注册状态更新处理方法，调用subscribe(listener)的返回方法

```js
  import { createStore } from 'redux';

  const ADD_TODO = 'ADD_TODO';

  /**
   + addTodo action creator
   */
  const addTodo = text => ({
    type: ADD_TODO,
    text
  })

  /**
   - todoApp reducer
   */
  const todoApp = (state = [], action) => {
    switch(action.type) {
      case ADD_TODO:
        return [
          ...state,
          action.text
        ]
      default:
        return state
    }
  }


  const store = createStore(todoApp)

  const render = () => ({
    console.log(store.getState())
  })

  const unsubscribe = store.subscribe(render)

  store.dispatch(addTodo('action'))
  store.dispatch(addTodo('reducer'))
  store.dispatch(addTodo('store'))

  unsubscribe()
  ```

# 高级用法

  - Async Actions
  - Middleware
  - combineReducers

## Async Actions

基于[redux-thunk](https://github.com/gaearon/redux-thunk) middleware实现异步action

```js
// redux-thunk
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

```js
// async action
const fetchTodos = () => {
  return dispatch => {
    dispatch(requestTodos())
    return todoService.getAll()
      .then(todos => {
        dispatch(receiveTodos(todos))
      })
  }
}
}
```

## [Middleware](http://redux.js.org/docs/advanced/Middleware.html)

[applyMiddleware.js](https://github.com/reactjs/redux/blob/master/src/applyMiddleware.js)

```js
({ dispatch, getState }) => next => action
```

```js
const logger = store => next => action => {
  console.log('dispatch', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
```

## [combineReducers](https://github.com/reactjs/redux/blob/master/src/combineReducers.js)

```js
const todos = (state = [], action) => {
  return state
}

const search = (state = null, action) => {
  return state
}

combineReducers({
  todos,
  search
})
```

# 实践

## Action组织

- 定义action type常量
- action按照业务划分到不同文件
- makeActionCreator

```js
  function makeActionCreator(type, ...argNames) {
    return function(...args) {
      let action = { type }
      argNames.forEach((arg, index) => {
        action[argNames[index]] = args[index]
      })
      return action
    }
  }

  const ADD_TODO = 'ADD_TODO'

  export const addTodo = makeActionCreator(ADD_TODO, 'text')
```

- [Flux Standard Action](https://github.com/acdlite/flux-standard-action)
- [redux-actions](https://github.com/acdlite/redux-actions)

异步action

- [middleware](http://redux.js.org/docs/recipes/ReducingBoilerplate.html)
- [redux-promise](https://github.com/acdlite/redux-promise)
- [redux-saga](http://yelouafi.github.io/redux-saga/)

## State结构设计

- 状态类型

  + 业务数据 (server数据）
  + 应用数据 (配置信息、应用运行状态)
  + UI数据()

  ```js
  {
    domainData1 : {},
    domainData2 : {},
    appState1 : {},
    appState2 : {},
    ui : {
      uiState1 : {},
      uiState2 : {},
    }
  }
  ```

- [normalizr](https://github.com/paularmstrong/normalizr)

## [Redux DevTools](https://github.com/gaearon/redux-devtools)

## [React + Redux](https://github.com/reactjs/react-redux)
