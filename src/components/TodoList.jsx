import React, { PropTypes } from 'react'
import Todo from './Todo'
import './TodoList.css'

const TodoList = ({ todos }) => (
  <ul className="TodoList">
    {todos.map((todo, index) => <Todo key={index} todo={todo} />)}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired
}

export default TodoList