import React from 'react'
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import asyncValidate from './asyncValidate';
import { change } from 'redux-form';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';


const validate = values => {
  const errors = {}
  const requiredFields = [
    
    
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







const renderTime = ({
  input,
  label,
  placeholder,
   defaultValue,
  meta: { touched, error },
  children,
  ...custom
}) => (
    <TimePicker
    format="24hr"
    hintText={label}
    errorText={touched && error}
    onChange={(event, time) => input.onChange(moment(time).format("HH:mm:ss"))}
  />
)
const renderDate = ({
  input,
  placeholder,
   defaultValue,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <DatePicker
  floatingLabelText={label}
  hintText={label}
  errorText={touched && error}
   onChange={(event, date) => input.onChange(moment(date).format('YYYY-MM-DD'))}
  />
)




class ScheduleTask extends React.Component{
  // componentDidMount () {
  //   this.props.dispatch(change('NewProcessForm', 'firms', this.props.firmNumber));
  // }
  // if your data can be updated
  componentWillMount () {
    console.log("task Id --- --- --- ",this.props.taskId);
    
    this.props.dispatch(change('ScheduleTask', 'taskId', this.props.taskId));
  }
  render(){ 
  const   { handleSubmit, pristine, reset, submitting} = this.props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="schDateFrom"
          component={renderDate}
          label="Date From"
        >
        </Field>
     </div>
      <div>
        <Field
          name="schTimeFrom"
          component={renderTime}
          label="Time From"         
        />
      </div>
      <div>
        <Field
          name="schDateTo"
          component={renderDate}
          label="Date To"
        >
        </Field>
     </div>
      <div>
        <Field
          name="schTimeTo"
          component={renderTime}
          label="Time To"         
        />
      </div>
     
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}
}

export default reduxForm({
  form: 'ScheduleTask', // a unique identifier for this form
  validate,
  asyncValidate
})(ScheduleTask)