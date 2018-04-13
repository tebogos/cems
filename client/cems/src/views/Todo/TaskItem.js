import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeSelectedTask,getAllProcessUser,fetchTodos, toggleTodo, deleteTodo, getVisibleTodos,completTodo} from '../../reducers/todo';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Badge
} from 'reactstrap';


class TaskItem extends React.Component{


 render() {
     return (
    <ListGroupItem  action className="justify-content-between">
        <button className="btn-icon list-items-space" onClick={() => this.props.deleteTodo(id)} >
        <i className='fa fa-trash-o trash-icon' aria-hidden="true"/>
        </button>
        <label className="fancy-checkbox list-items-space">
      <input type="checkbox"
        checked={false}
        onChange={() => this.props.completTodo(id)} />
        <i className="fa fa-square-o fa-lg  unchecked"></i>
      <i className="fa fa-check-square-o fa-lg checked-icon checked"></i>
      </label>
     <span className="list-items-space" > <a  onClick={()=>this.props.showDetails(
       {id:this.props.id,
        name:this.props.name,
        assignee:this.props.assignee,
        created:this.props.created,
        due:this.props.due,
        followUp:this.props.followUp,
        delegationState:this.props.delegationState,
        description:this.props.description,
        executionId:this.props.executionId,
        owner:this.props.owner,
        parentTaskId:this.props.parentTaskId,
        priority:this.props.priority,
        processDefinitionId:this.props.processDefinitionId,
        processInstanceId:this.props.processInstanceId,     
        taskDefinitionKey:this.props.taskDefinitionKey     
        }
     )}>{this.props.name}</a></span>
      </ListGroupItem>
  )
}
}
  export default connect(
    (state, ownProps) => ({tasks: getVisibleTodos(state.todo.todos, ownProps.filter)}),
    {fetchTodos, toggleTodo, deleteTodo,completTodo,getAllProcessUser,changeSelectedTask}
  )(TaskItem)