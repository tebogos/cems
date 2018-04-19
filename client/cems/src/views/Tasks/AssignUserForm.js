import React from 'react';
import {connect} from 'react-redux';
import {assignUser,getAllProcessUser} from '../../../src/reducers/task';
import 'react-select/dist/react-select.css';
import styled from 'styled-components';
import ReactSelect from "react-select";
// import MultiSelect from './MultiSelect';


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

  class AssignUserFrom extends React.Component{
     
  constructor(props){
     super(props);
    
     this.state={selectedOption:""};
     this.handleChange=this.handleChange.bind(this);
  }
   
  handleChange(selectedOption){
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }

 render(){
    //  const userList=[{userId:"demo",name:"Demo"},{userId:"peter",name:"Peter"}];
   const Info=styled.i`
   
   `
    const AssignClose=styled.div`
    border:solid;
   border-color:black;
    `
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    console.log("selectedOption value 0000---00000",value);
    let gUser={};
    const options= this.props.userList.map(user=>{
      gUser=user
     return { value:user.userId,label:user.name}
   });
   const SelectM = ({ className, children }) => (
    <ReactSelect
    name="form-field-name"
    value={value}
    onChange={this.handleChange}
    options={options}
    className={className}
    
    />
  )
  const ReactSelectInput = styled(SelectM)`
margin-top:15px;

`
    
     return  (
    <div>
        {/* <Col sm={{ size: 10 }}> */}
         <Row > 
          <Col sm="2" sm={{ size: 5 }}>           

     <ReactSelectInput
    name="form-field-name"
    value={value}
    onChange={this.handleChange}
    options={options}
    
    />
       
        </Col>
         <Col sm="4">
        
            <a href="#" className="" onClick={()=>this.props.assignUser(
              {userId:value,taskId:this.props.selectedTask.id,
              processInstanceId:this.props.selectedTask.processInstanceId})}>
                <Info className="fa fa-check fa-lg mt-4  assignmentForm" ></Info>
              </a> &nbsp;
              <Info className="fa fa-close fa-lg mt-4" onClick={this.props.closeAssignUser}></Info>
        
         </Col> 
         
       </Row> 
        
  </div>
)}
}
export default connect(
  (state) => ({userList: state.task.userList,selectedTask:state.task.selectedTask},{assignUser,getAllProcessUser})
)(AssignUserFrom)
