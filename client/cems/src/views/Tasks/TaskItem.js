import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeSelectedTask,getAllProcessUser,fetchTasks, toggleTask, deleteTask, getVisibleTasks,completTask} from '../../reducers/task';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Badge
} from 'reactstrap';


class TaskItem extends React.Component{


 render() {
     return (
    <ListGroupItem  action className="justify-content-between">
        <button className="btn-icon list-items-space" onClick={() => this.props.deleteTask(id)} >
        <i className='fa fa-trash-o trash-icon' aria-hidden="true"/>
        </button>
        <label className="fancy-checkbox list-items-space">
      <input type="checkbox"
        checked={false}
        onChange={() => this.props.completTask(id)} />
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
        taskDefinitionKey:this.props.taskDefinitionKey,
        businessKey:this.props.businessKey,
        comments:[]
        }
     )}>{this.props.name}</a></span>
      </ListGroupItem>
  )
}
}
  export default connect(
    (state, ownProps) => ({tasks: getVisibleTasks(state.task.tasks, ownProps.filter)}),
    {fetchTasks, toggleTask, deleteTask,completTask,getAllProcessUser,changeSelectedTask}
  )(TaskItem)