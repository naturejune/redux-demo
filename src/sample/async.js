import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { addTodo, fetchTodos } from '../actions'
import { isFetching, todos } from '../reducers/async'

const todoApp = combineReducers({
  isFetching,
  todos
})

const store = createStore(
  todoApp,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
)

const render = () => {
  console.log(store.getState())
}

store.subscribe(render)
store.dispatch(fetchTodos())
  .then(() => {
    store.dispatch(addTodo('action'))
    store.dispatch(addTodo('reducer'))
    store.dispatch(addTodo('store'))
  })
