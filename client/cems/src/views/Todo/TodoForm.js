import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateCurrent, saveTodo} from '../../reducers/todo'

class TodoForm extends Component {
  

  render() {
    const handleInputChange = (evt) => {
      const val = evt.target.value
      this.props.updateCurrent(val)
    }
  
    const handleSubmit = (evt) => {
      evt.preventDefault()
      this.props.saveTodo(this.props.currentTodo)
    }
    const {currentTodo} = this.props
    return (
      <form onSubmit={handleSubmit}>
        <input type="text"
          onChange={handleInputChange}
          value={currentTodo}/>
      </form>
    )
  }
}

export default connect(
  (state) => ({currentTodo: state.todo.currentTodo}),
  {updateCurrent, saveTodo}
)(TodoForm)
