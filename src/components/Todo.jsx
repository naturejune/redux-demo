import React, { PropTypes } from 'react'
import './Todo.css'

const Todo = ({ todo }) => (
  <li className="Todo">{todo}</li>
)

Todo.propTypes = {
  todo: PropTypes.string.isRequired
}

export default Todo