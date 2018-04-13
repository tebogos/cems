import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeSelectedTask,getAllProcessUser,fetchTodos, toggleTodo, deleteTodo, getVisibleTodos,completTodo} from '../../reducers/todo';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Badge
} from 'reactstrap';
import TaskItem from './TaskItem';
import TodoDetails from './TodoDetails';


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
    this.props.fetchTodos();
      this.props.getAllProcessUser();
  }

  render() {
    console.log('MyTasks prop -->',this.props.todos);
    
    return (
      <div className="Todo-List">
      {
        this.state.showDetails?<TodoDetails  hideDetails={this.hideDetails}/>:
      ( <ListGroup>                  
          {this.props.tasks.map(task =>
            <TaskItem key={task.id}
           
            showDetails={this.showDetails}
              toggleTodo={this.props.toggleTodo}
              deleteTodo={this.props.deleteTodo}
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
  (state, ownProps) => ({tasks: getVisibleTodos(state.todo.todos, ownProps.filter)}),
  {fetchTodos, toggleTodo, deleteTodo,completTodo,getAllProcessUser,changeSelectedTask}
)(MyTasks)
