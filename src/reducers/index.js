import { ADD_TODO, SEARCH_TODO } from '../actions'

export const todos = (state = [], action) => {
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

export const search = (state = null, action) => {
  switch(action.type) {
    case SEARCH_TODO:
      return action.text
    default:
      return state
  }
}