import React from 'react'
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import asyncValidate from './asyncValidate';
import MaterialUIAutocomplete from '../../views/Tasks/MaterialUIAutocomplete';
import { change } from 'redux-form';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';


const validate = values => {
  const errors = {}
  const requiredFields = [
   "firstAssignee"
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}





const renderCheckbox = ({ input, label }) => (
    <Checkbox
      label={label}
      checked={input.value ? true : false}
      onCheck={input.onChange}
    />
  )

class ApproveTaskForm extends React.Component{
  // componentDidMount () {
  //   this.props.dispatch(change('NewProcessForm', 'firms', this.props.firmNumber));
  // }
  // if your data can be updated
  componentWillReceiveProps (nextProps) {
      // this.props.destroy();
      if(nextProps){
        this.props.dispatch(change('ApproveTaskForm', 'taskId', nextProps.taskId));
        this.props.dispatch(change('ApproveTaskForm', 'approver', nextProps.approver));
        // this.props.dispatch(change('FirmVisitForm', 'firmNumber', nextProps.selectedFirm.firmNumber));
        this.props.dispatch(change('ApproveTaskForm', 'taskType', nextProps.taskType));
    
    }
      else
      {
      this.props.dispatch(change('ApproveTaskForm', 'taskId', this.props.taskId));
      this.props.dispatch(change('ApproveTaskForm', 'approver', this.props.approver));
        this.props.dispatch(change('ApproveTaskForm', 'taskType', this.props.taskType));
      }
  }
  render(){ 
    console.log("props ........",this.props);
    
  const   { handleSubmit, pristine, reset, submitting ,userList,firmNumber} = this.props
  return (
    <form onSubmit={handleSubmit}>
   
    <div>
        <Field
          name="tasksApproved"
          component={renderCheckbox}
          label="Approve Task"
        >
        </Field>
     </div>
          <div>
        
      </div>
    
      <div>
        <button type="submit" disabled={pristine || submitting||this.props.approver===null}>
          Assign
        </button>      
      </div>
    </form>
  )
}
}

export default reduxForm({
  form: 'ApproveTaskForm', // a unique identifier for this form
  validate,
  asyncValidate
})(ApproveTaskForm)