import React, { PropTypes } from 'react'
import './AddTodo.css'

const AddTodo = ({ addTodo }) => (
  <button className="AddTodo" onClick={() => addTodo(new Date().toLocaleString())}>
    add
  </button>
)

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default AddTodo