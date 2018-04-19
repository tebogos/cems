import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateCurrent, saveTask} from '../../reducers/task'

class TaskForm extends Component {
  

  render() {
    const handleInputChange = (evt) => {
      const val = evt.target.value
      this.props.updateCurrent(val)
    }
  
    const handleSubmit = (evt) => {
      evt.preventDefault()
      this.props.saveTask(this.props.currentTask)
    }
    const {currentTask} = this.props
    return (
      <form onSubmit={handleSubmit}>
        <input type="text"
          onChange={handleInputChange}
          value={currentTask}/>
      </form>
    )
  }
}

export default connect(
  (state) => ({currentTask: state.task.currentTask}),
  {updateCurrent, saveTask}
)(TaskForm)
