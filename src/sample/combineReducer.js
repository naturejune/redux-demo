import { combineReducers, createStore } from 'redux'
import { addTodo, searchTodo } from '../actions'
import { todos, search } from '../reducers'

// const initState = { todos: [], search: null }
// const todoApp = (state = initState, action) => {
//   return {
//     todos: todos(state.todos, action),
//     search: search(state.search, action)
//   }
// }

const todoApp = combineReducers({
  todos,
  search
})

const store = createStore(todoApp)

const render = () => {
  console.log(store.getState())
}

const unsubscribe = store.subscribe(render)

store.dispatch(addTodo('action'))
store.dispatch(addTodo('reducer'))
store.dispatch(addTodo('store'))
store.dispatch(searchTodo('action'))

unsubscribe()
