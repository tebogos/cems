import React, {Component} from 'react';
import {connect} from 'react-redux';
import {assignUser,getAllProcessUser,fetchTasks, toggleTask, deleteTask, getVisibleTasks,completTask} from '../../reducers/task';
import AssignUserFrom from './AssignUserForm';
import Moment from 'react-moment';
 
import {
    ListGroup,ListGroupItem,ListGroupItemHeading,
    Row,
    Col,
    Button,Badge,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Collapse,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,Tooltip
  } from 'reactstrap';


  class TaskDetails extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        tooltipOpen: [false, false,false,false],
        assign:false
      };
      this.openAssignUser=this.openAssignUser.bind(this);
      this.closeAssignUser=this.closeAssignUser.bind(this);
    }
    openAssignUser(){
    this.setState({assign:true})
   }
   closeAssignUser(){
    this.setState({assign:false})
   }
    toggle(i) {
        const newArray = this.state.tooltipOpen.map((element, index) => {
          return (index === i ? !element : false);
        });
        this.setState({
          tooltipOpen: newArray
        });
      }
render() {
    console.log("Props from task details 1110000----0000111",this.props.selectedTask.due);
    const suggestions = [
      { label: 'Afghanistan' },
      { label: 'Aland Islands' },
      { label: 'Albania' },
      { label: 'Algeria' },
      { label: 'American Samoa' },
      { label: 'Andorra' },
      { label: 'Angola' },
      { label: 'South Africa' }
    ]
    return (
    <div className="animated fadeIn">
   <Row>
  
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Task Details</strong>
                <small> Form</small>
              </CardHeader>              
              <CardBody>
       <i className="fa fa-arrow-left fa-lg mt-4" onClick={()=>this.props.hideDetails()}></i>
                
                  <Row>
                  <Col sm="2" >
                <i className="icon-calendar icons font-2xl d-block mt-4" id="Tooltip-calenda"></i><Moment format="YYYY-MMM-DD">{new Date(this.props.selectedTask.created)}</Moment>
                <Tooltip placement="right" isOpen={this.state.tooltipOpen[0]} target="Tooltip-calenda" toggle={() => {this.toggle(0)}}>
             Date created
            </Tooltip>
              </Col>
              <Col sm="2" >
                <i className="fa fa-bell-o fa-lg mt-4"  id="Tooltip-bell" ></i><br/><Moment format="YYYY-MMM-DD">{new Date(this.props.selectedTask.due)}</Moment>
                <Tooltip placement="right" isOpen={this.state.tooltipOpen[1]} target="Tooltip-bell" toggle={() => {this.toggle(1)}}>
              Date due
            </Tooltip>
              </Col>
              <Col sm="2"  >
                <i className="fa fa-tasks fa-lg mt-4" id="Tooltip-task"></i><br/>{this.props.selectedTask.name}
                <Tooltip placement="right" isOpen={this.state.tooltipOpen[2]} target="Tooltip-task" toggle={() => {this.toggle(2)}}>
              Task Name
            </Tooltip>
              </Col>
              <Col sm="6"  >
              
                
               {this.state.assign?(<div><AssignUserFrom closeAssignUser={this.closeAssignUser} {...this.props} />
              
               </div>) :(<div> <i className="fa fa-user-o fa-lg mt-4" id="Tooltip-user" onClick={this.openAssignUser}></i><br/>{this.props.selectedTask.assignee ?this.props.selectedTask.assignee:"unassined"}
               </div>)}
            
              </Col>
                      </Row>
               <br/><br/><br/>
                <Row>
                <ListGroup>
                <ListGroupItemHeading>Task Comments</ListGroupItemHeading>
                  <ListGroupItem  tag="button" action>Cras justo odio<Badge className="float-right" pill>14 June 2018</Badge></ListGroupItem>
                  <ListGroupItem tag="button" action>Dapibus ac facilisis in<Badge className="float-right" pill>25 Sep 2018</Badge></ListGroupItem>
                  <ListGroupItem tag="button" action>Morbi leo risus<Badge className="float-right" pill>14 Aco 2018</Badge></ListGroupItem>
                  <ListGroupItem tag="button" action>Porta ac consectetur ac<Badge className="float-right" color="warning" pill>15 Nov 2018</Badge></ListGroupItem>
                  <ListGroupItem disabled tag="button" action>Note that the above distinction does not say whether the actual “business logic” is implemented locally or as a remote service. The Java Delegate invoked by an internal service task may either implement the business logic itself or it may call out to a web/rest service, send a message to another system and so forth. The same is true for an external worker. The worker can implement the business logic directly or again delegate to a remote system.<Badge className="float-right" pill>18 Dec 2018</Badge></ListGroupItem>
                </ListGroup>
                </Row>
              </CardBody>
            </Card>
          </Col>
          </Row>
         
              </div>
)
}
  }


export default connect(
  (state, ownProps) => ({tasks: getVisibleTasks(state.task.tasks, ownProps.filter),
    userList: state.task.userList,selectedTask:state.task.selectedTask}),
  {fetchTasks, toggleTask, deleteTask,completTask,getAllProcessUser,assignUser}
)(TaskDetails)
