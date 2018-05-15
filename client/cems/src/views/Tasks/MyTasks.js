import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllProcessUser,getVisibleTasks} from '../../reducers/task';
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
    console.log("In showDetails function...",task);
    
    this.props.changeSelectedTask(task)
    this.setState({showDetails:true})
  }
  hideDetails(){
    this.setState({showDetails:false})
  }
  componentDidMount() {
    console.log("userID from componentsdidmount getMyTask",this.props);
    
    this.props.getMyTasks(this.props.userId);
      this.props.getAllProcessUsers();
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
const mapDispatchToProps = dispatch => {
   
  return {
    getComments: (taskId) => dispatch({ type: "GET_TASK_COMMETS" ,payload:taskId}),
    getMyTasks: (userId) => dispatch({ type: "GET_MY_TASKS",payload:userId }),
    getAllProcessUsers:()=>dispatch({type:"GET_ALL_PROCESS_USERS"}),
    changeSelectedTask:(task)=>dispatch({type:"UPDATE_SELECTED_TASK",payload:task})

  };
  
};
export default connect(
  (state, ownProps) => ({tasks: getVisibleTasks(state.task.tasks, ownProps.filter)
  ,userId:state.login.username}),
  mapDispatchToProps
)(MyTasks)
