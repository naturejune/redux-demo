import todoService from '../service/todo'

export const ADD_TODO = 'ADD_TODO'
export const SEARCH_TODO = 'SEARCH_TODO'
export const REQUEST_TODOS = 'REQUEST_TODOS'
export const RECEIVE_TODOS = 'RECEIVE_TODOS'

export const addTodo = text => ({
  type: ADD_TODO,
  text
})

export const searchTodo = text => ({
  type: SEARCH_TODO,
  text
})

export const requestTodos = () => ({
  type: REQUEST_TODOS
})

export const receiveTodos = (todos) => ({
  type: RECEIVE_TODOS,
  todos
})

export const fetchTodos = () => {
  return dispatch => {
    dispatch(requestTodos())
    return todoService.getTodos()
      .then(todos => {
        dispatch(receiveTodos(todos))
      })
  }
}