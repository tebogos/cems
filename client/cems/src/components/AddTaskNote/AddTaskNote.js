import React from 'react'
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import asyncValidate from './asyncValidate';
import { change } from 'redux-form';
import moment from 'moment';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {postAddNoteForm} from '../../lib/taskServices';


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

class AddTaskNote extends React.Component{
  // componentDidMount () {
  //   this.props.dispatch(change('NewProcessForm', 'firms', this.props.firmNumber));
  // }
  // if your data can be updated
  componentWillMount () {
    // if (nextProps) {
      // this.props.destroy();
      // if(nextProps.taskId)
        this.props.dispatch(change('AddTaskNote', 'taskId', this.props.taskId));
        //  }
  }
  render(){ 
  const   { handleSubmit, pristine, reset, submitting} = this.props;
  const handleAddNote=(note)=>postAddNoteForm(note);
  return (
    <form onSubmit={handleSubmit}>
    
   <div>
        <Field
          name="note"
          component={renderTextField}
          label="Add note"
        />
        <button type="submit" disabled={pristine || submitting}  style={{border: 0,background: 'none'}}>
        <i className="fa fa-plus fa-lg mt-4"  id="add-note" ></i>
        </button>
      </div>
      
      <div>
        
       
      </div>
    </form>
  )
}
}

export default reduxForm({
  form: 'AddTaskNote', // a unique identifier for this form
  validate,
  asyncValidate
})(AddTaskNote)