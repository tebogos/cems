import React, { Component } from 'react';
import { connect } from 'react-redux';
import { assignUser, getAllProcessUser, fetchTasks, getVisibleTasks, completTask } from '../../reducers/task';
import AssignUserFrom from './AssignUserForm';
import Moment from 'react-moment';
import ScheduleTask from '../../components/ScheduleTask/ScheduleTask';
import FormSelector from '../../components/FormSelector';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { postScheduleTaskForm, postAddNoteForm } from '../../lib/taskServices';
import { Values } from 'redux-form-website-template';
import AddTaskNote from '../../components/AddTaskNote/AddTaskNote';
import { bindActionCreators } from 'redux';
// import {
//     ListGroup,ListGroupItem,ListGroupItemHeading,
//     Row,
//     Col,
//     Button,Badge,
//     ButtonDropdown,
//     DropdownToggle,
//     DropdownMenu,
//     DropdownItem,
//     Card,
//     CardHeader,
//     CardFooter,
//     CardBody,
//     Collapse,
//     Form,
//     FormGroup,
//     FormText,
//     Label,
//     Input,
//     InputGroup,
//     InputGroupAddon,
//     InputGroupText,Tooltip
//   } from 'reactstrap';

import { Badge, Tooltip, ListGroup, ListGroupItem, ListGroupItemHeading, Col, Row } from 'reactstrap';
class TaskDetails extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: [false, false, false, false],

    };
    this.openAssignUser = this.openAssignUser.bind(this);
    this.closeAssignUser = this.closeAssignUser.bind(this);
  }




  componentDidMount() {
    this.props.getComments(this.props.selectedTask.id);
    // this.setState({      
    //   messageInitiated:true
    // });

  }
  openAssignUser() {
    this.setState({ assign: true })
  }
  closeAssignUser() {
    this.setState({ assign: false })
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

    console.log("Selected task this.props.selectedTask.comments ", this.props.selectedTask.comments);
    const submitTaskScheduleFrom = (values) => postScheduleTaskForm(values);
    const handleAddNote = (form) => postAddNoteForm(form, this.props.getComments);
    const description = this.props.selectedTask.name.split(" ")[0];
    const nextTaskId = this.props.nextTaskId ? this.prosps.nextTaskId : this.props.selectedTask.taskId
    return (
      <div className="animated fadeIn">
        <Row>

          <Col xs="12" sm="12">
            <Card>
              <CardHeader
                title="Task Details"
                subtitle={this.props.selectedTask.businessKey}
              />
              {/* <strong>Task Details</strong>
                <small></small> */}
              {/* </CardHeader>               */}
              <Card>
                <CardHeader
                  subtitle="DPMN 2 Diagram"
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardMedia

                  expandable={true}
                  overlay={<CardTitle title={this.props.selectedTask.name} />}
                >
                  <img src={"img/" + this.props.selectedTask.description + ".jpg"} alt="" />
                </CardMedia>

              </Card>
              <CardText>
                <i className="fa fa-arrow-left fa-lg mt-4" onClick={() => this.props.hideDetails()}></i>

                <Row>
                  <Col sm="2" >
                    <i className="icon-calendar icons font-2xl d-block mt-4" id="Tooltip-calenda"></i><Moment format="YYYY-MMM-DD">{new Date(this.props.selectedTask.created)}</Moment>
                    <Tooltip placement="right" isOpen={this.state.tooltipOpen[0]} target="Tooltip-calenda" toggle={() => { this.toggle(0) }}>
                      Date created
            </Tooltip>
                  </Col>
                  <Col sm="2" >
                    <i className="fa fa-bell-o fa-lg mt-4" id="Tooltip-bell" ></i><br /><Moment format="YYYY-MMM-DD">{new Date(this.props.selectedTask.due)}</Moment>
                    <Tooltip placement="right" isOpen={this.state.tooltipOpen[1]} target="Tooltip-bell" toggle={() => { this.toggle(1) }}>
                      Date due
            </Tooltip>
                  </Col>
                  <Col sm="2"  >
                    <i className="fa fa-tasks fa-lg mt-4" id="Tooltip-task"></i><br />{this.props.selectedTask.name}
                    <Tooltip placement="right" isOpen={this.state.tooltipOpen[2]} target="Tooltip-task" toggle={() => { this.toggle(2) }}>
                      Task Name
            </Tooltip>
                  </Col>
                  <Col sm="6"  >


                    {this.state.assign ? (<div><AssignUserFrom closeAssignUser={this.closeAssignUser} {...this.props} />

                    </div>) : (<div> <i className="fa fa-user-o fa-lg mt-4" id="Tooltip-user" onClick={this.openAssignUser}></i><br />{this.props.selectedTask.assignee ? this.props.selectedTask.assignee : "unassined"}
                    </div>)}

                  </Col>
                </Row>

                <br /><br /><br />
                <FormSelector taskName={this.props.selectedTask.name} taskId={this.props.selectedTask.id}
                  description={description} submitTaskScheduleFrom={submitTaskScheduleFrom}
                  selectedFirm={this.props.selectedFirm} userList={this.props.userList} assignee={this.props.selectedTask.assignee} />
                <Values form="ApproveTaskForm" />
                <br /><br />

                <br /><br /><br />
                <Row>
                  <ListGroup>
                    <ListGroupItemHeading>Task Comments</ListGroupItemHeading>
                    {this.props.selectedTask.comments ? this.props.selectedTask.comments.map(comment => {
                      return (<ListGroupItem key={comment.id} tag="button" action>{comment.message} &nbsp;&nbsp; <Badge className="float-right" pill>{<Moment format="DD MMMM YYYY">{comment.time}</Moment>}</Badge></ListGroupItem>)
                    }) : <h1>loading...</h1>
                    }


                  </ListGroup>
                </Row>
              </CardText>
            </Card>
          </Col>
        </Row>

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {

  return {
    getComments: (taskId) => dispatch({ type: "GET_TASK_COMMETS", payload: taskId }),
    getTasks: () => dispatch({ type: "GET_TASKS" })
  };

};
export default connect(
  (state, ownProps) => ({
    tasks: getVisibleTasks(state.task.tasks, ownProps.filter),
    userList: state.task.userList, selectedTask: state.task.selectedTask,
    selectedFirm:state.firm.selectedFirm
  }), mapDispatchToProps)(TaskDetails)
