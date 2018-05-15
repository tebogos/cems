import React from 'react'
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import MaterialUIAutocomplete from '../../views/Tasks/MaterialUIAutocomplete';
import { change } from 'redux-form';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import {required,minLength,maxLength} from '../../lib/formValidator';






const renderTextField = ({
  input,
  label,
  id,
  name,  
  meta: { touched, error },
  ...custom
}) => (
  <TextField
  id={id}
  name={name}
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    
  />
)



const menuItems=(users)=> {
  console.log("Difinitions in Person",users);
  
  
}
class FirmVisitForm extends React.Component{
  // componentDidMount () {
  //   this.props.dispatch(change('NewProcessForm', 'firms', this.props.firmNumber));
  // }
  // if your data can be updated
  componentWillReceiveProps (nextProps) {
      // this.props.destroy();
      if(nextProps){
        this.props.dispatch(change('FirmVisitForm', 'taskId', nextProps.taskId));
        this.props.dispatch(change('FirmVisitForm', 'assignee', nextProps.assignee));
        // this.props.dispatch(change('FirmVisitForm', 'firmNumber', nextProps.selectedFirm.firmNumber));
        this.props.dispatch(change('FirmVisitForm', 'taskType', nextProps.taskType));
    
    }
      else
      {
      this.props.dispatch(change('FirmVisitForm', 'taskId', this.props.taskId));
      this.props.dispatch(change('FirmVisitForm', 'assignee', this.props.assignee));
        this.props.dispatch(change('FirmVisitForm', 'taskType', this.props.taskType));
      }
  }
  render(){ 
    console.log("props ........",this.props);
    
  const   { handleSubmit, pristine, reset, submitting ,userList,firmNumber} = this.props
  return (
    <form onSubmit={handleSubmit}>
   
    <div>
        <Field
          name="kilometer"
          component={renderTextField}
          label="Trip Kilometers"
          validate={[required,minLength,maxLength]}
        >
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
  form: 'FirmVisitForm' // a unique identifier for this form
})(FirmVisitForm)