import { createStore } from 'redux'
import { addTodo } from '../actions'
import { todos } from '../reducers'

const store = createStore(todos)

const render = () => {
  console.log(store.getState())
}

const unsubscribe = store.subscribe(render)

store.dispatch(addTodo('action'))
store.dispatch(addTodo('reducer'))
store.dispatch(addTodo('store'))

unsubscribe()
