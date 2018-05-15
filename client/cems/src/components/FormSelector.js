import React from 'react';
import ScheduleTask from './ScheduleTask/ScheduleTask';
import NewProcessForm from '../components/NewProcessForm/NewProcessForm';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AssignTaskForm from '../components/AssignTaskForm/AssignTaskForm';
import FirmVisitForm from './FirmVisitForm/FirmVisitForm';
import{ postTask} from '../lib/taskServices';
import ApproveTaskForm from './ApproveTaskForm/ApproveTaskForm';

export default  class FormSelector extends React.Component{




    render(){
        const submitTaskScheduleFrom =()=>1;
        const submitTaskAssignment=(form)=>{
         const formVar={
            taskId:form.taskId, 
            variables:{
                firstAssignee:{value:form.firstAssignee,type:"String"}              
              }
            }
            postTask(formVar);
        }
        const submitFirmVisit=(form)=>{
            const formVar={
               taskId:form.taskId, 
               variables:{
                  assignee:{value:form.assignee,type:"String"},
                  kilometers:{value:form.kilometers,type:"String"},
                  taskType:{value:form.taskType,type:"String"}           
                 }
               }
               postTask(formVar);
           }
           const submitApproveTaskForm=(form)=>{
            const formVar={
               taskId:form.taskId, 
               variables:{
                  approver:{value:form.approver,type:"String"},
                  tasksApproved:{value:form.tasksApproved,type:"Boolean"},
                  taskType:{value:form.taskType,type:"String"}           
                 }
               }
               postTask(formVar);
           }
        return (
            <div>
              {this.props.description==="Schedule"?<ScheduleTask           
             taskId={this.props.taskId} 
             onSubmit={this.props.submitTaskScheduleFrom} /> :this.props.description==="Approve"?
             <ApproveTaskForm  taskId={this.props.taskId } approver={this.props.assignee}
                 taskType={this.props.description} 
                     onSubmit={submitApproveTaskForm} />:this.props.description==="Assign"?
                <AssignTaskForm  taskId={this.props.taskId } userList={this.props.userList}
                    onSubmit={submitTaskAssignment} />:this.props.description==="Perform"?
                <FirmVisitForm  taskId={this.props.taskId } assignee={this.props.assignee}
                taskType={this.props.description} 
                    onSubmit={submitFirmVisit} />:<br/>      
               }   
               
            </div>
        )
    }
}

