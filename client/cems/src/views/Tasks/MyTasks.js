import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeSelectedTask,getAllProcessUser,fetchMyTasks, toggleTask, deleteTask, getVisibleTasks,completTask} from '../../reducers/task';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Badge
} from 'reactstrap';
import TaskItem from './TaskItem';
import TaskDetails from './TaskDetails';


class MyTasks extends Component {

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
    this.props.fetchMyTasks(this.props.userId);
      this.props.getAllProcessUser();
  }

  render() {
    console.log('MyTasks prop -->',this.props.tasks);
    
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
  (state, ownProps) => ({tasks: getVisibleTasks(state.task.tasks, ownProps.filter)
  ,userId:state.login.userId}),
  {fetchMyTasks, toggleTask, deleteTask,completTask,getAllProcessUser,changeSelectedTask}
)(MyTasks)
