import { ADD_TODO, REQUEST_TODOS, RECEIVE_TODOS } from '../actions'

export const todos = (state = [], action) => {
  switch(action.type) {
    case ADD_TODO:
      return [
        ...state,
        action.text
      ]
    case RECEIVE_TODOS:
      return [
        ...state,
        ...action.todos
      ]
    default:
      return state
  }
}

export const isFetching = (state = false, action) => {
  switch(action.type) {
    case REQUEST_TODOS:
      return true
    case RECEIVE_TODOS:
      return false
    default:
      return state
  }
}