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



const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
)



const menuItems=(users)=> {
  console.log("Difinitions in Person",users);
  
  return users.map((user) => (
    <MenuItem
      key={user.userId}
      insetChildren={true}
      value={user.userId}
      primaryText={user.name}
    />
  ));
}
class AssignTaskForm extends React.Component{
  // componentDidMount () {
  //   this.props.dispatch(change('NewProcessForm', 'firms', this.props.firmNumber));
  // }
  // if your data can be updated
  componentWillReceiveProps (nextProps) {
    if (nextProps) {
      // this.props.destroy();
      if(nextProps.firmFound)
        this.props.dispatch(change('AssignTaskForm', 'taskId', nextProps.taskId));
      else
      this.props.dispatch(change('AssignTaskForm', 'taskId', this.props.taskId));
    }
  }
  render(){ 
  const   { handleSubmit, pristine, reset, submitting ,userList,firmNumber} = this.props
  return (
    <form onSubmit={handleSubmit}>
   
    <div>
        <Field
          name="firstAssignee"
          component={renderSelectField}
          label="Assign User"
        >
               {menuItems(userList)}     
        </Field>
     </div>
          <div>
        
      </div>
    
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Assign
        </button>      
      </div>
    </form>
  )
}
}

export default reduxForm({
  form: 'AssignTaskForm', // a unique identifier for this form
  validate,
  asyncValidate
})(AssignTaskForm)