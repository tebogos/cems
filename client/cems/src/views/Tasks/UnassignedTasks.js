import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeSelectedTask,getAllProcessUser,fetchTasks, toggleTask, deleteTask, getVisibleTasks,completTask} from '../../reducers/task';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Badge
} from 'reactstrap';
import TaskItem from './TaskItem';
import TaskDetails from './TaskDetails';


class UnassignedTasks extends Component {

  constructor(props) {
    super(props);

    this.state = {      
      showDetails:false
    };
    this.showDetails=this.showDetails.bind(this);
    this.hideDetails=this.hideDetails.bind(this);
  }
  showDetails(task){
    this.props.changeSelectedTask(task)
    this.setState({showDetails:true})
  }
  hideDetails(){
    this.setState({showDetails:false})
  }
  componentDidMount() {
    this.props.fetchTasks();
      this.props.getAllProcessUser();
  }

  render() {
    console.log('UnassignedTasks prop -->',this.props.tasks);
    
    return (
      <div className="Task-List">
      {
        this.state.showDetails?<TaskDetails  hideDetails={this.hideDetails}/>:
      ( <ListGroup>                  
          {this.props.tasks.map(task =>
            <TaskItem key={task.id}
           
            showDetails={this.showDetails}
              toggleTask={this.props.toggleTask}
              deleteTask={this.props.deleteTask}
              changeSelectedTask={this.props.changeSelectedTask}
              {...task} />)
              }
       </ListGroup>)
      }
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({tasks: getVisibleTasks(state.task.tasks, ownProps.filter)}),
  {fetchTasks, toggleTask, deleteTask,completTask,getAllProcessUser,changeSelectedTask}
)(UnassignedTasks)
