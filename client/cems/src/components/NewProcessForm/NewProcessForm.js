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

const validate = values => {
  const errors = {}
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'favoriteColor',
    'notes'
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

const renderDisabledTextField = ({
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
    {...custom}
    
    
   
  />
)

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
)

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
)



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


const menuItems=(difinitions)=> {
  console.log("Difinitions in Person",difinitions);
  
  return difinitions.map((difinition) => (
    <MenuItem
      key={difinition.value}
      insetChildren={true}
      value={difinition.value}
      primaryText={difinition.name}
    />
  ));
}
class NewProcessForm extends React.Component{
  // componentDidMount () {
  //   this.props.dispatch(change('NewProcessForm', 'firms', this.props.firmNumber));
  // }
  // if your data can be updated
  componentWillReceiveProps (nextProps) {
    if (nextProps) {
      // this.props.destroy();
      if(nextProps.firmFound)
        this.props.dispatch(change('NewProcessForm', 'firms', nextProps.firmNumber));
      else
      this.props.dispatch(change('NewProcessForm', 'firms', ""));
    }
  }
  render(){ 
  const   { handleSubmit, pristine, reset, submitting ,definitions,firmNumber} = this.props
  return (
    <form onSubmit={handleSubmit}>
    {/* <div>
      <Field
        name="firms"
        component={renderDisabledTextField}
        label="Firms"
        />
    </div> */}
    <div>
        <Field
          name="processId"
          component={renderSelectField}
          label="Process processId"
        >
               {menuItems(definitions.definitions)}     
        </Field>
     </div>
      <div>
        <Field
          name="requestorName"
          component={renderTextField}
          label="Requestor Name"
          id="processRequestorName"
        />
      </div>
      <div>
        <Field name="requestorContact" id="processrequestorContact" component={renderTextField} label="Requestor Contact" />
      </div>
      <div>
        <Field name="requetorId" id="processrequetorId" component={renderTextField} label="Requetor Id" />
      </div>
      <div>
        {/* <Field name="sex" component={renderRadioGroup}>
          <RadioButton value="male" label="male" />
          <RadioButton value="female" label="female" />
        </Field> */}
      </div>
      <div>
        <Field
          name="workType"
          component={renderSelectField}
          label="Work Type"
        >
          <MenuItem value="Complaint" primaryText="Complaint" />
          <MenuItem value="Dispute Verification" primaryText="Dispute Verification" />
          <MenuItem value="Routine Inspection" primaryText="Routine Inspection" />
          <MenuItem value="De-registration" primaryText="De-registration" />
          <MenuItem value="Examption" primaryText="Examption" />
        </Field>
      </div>
      <div>
        <Field
          name="zone"
          component={renderSelectField}
          label="Zone"
        >
          <MenuItem value="GT1" primaryText="GT 1" />
          <MenuItem value="GT3" primaryText="GT 3" />
          <MenuItem value="Cape" primaryText="Cape" />
          <MenuItem value="Midland" primaryText="Midland" />
          <MenuItem value="GTM" primaryText="GTM" />
          <MenuItem value="GT6" primaryText="GT 6" />
          <MenuItem value="Voluntary" primaryText="Voluntary" />
          <MenuItem value="GT7" primaryText="GT 7" />          
        </Field>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Field
          name="region"
          component={renderSelectField}
          label="Region"
        >
        <MenuItem value="Gauteng" primaryText="Gauteng" />
          <MenuItem value="Tshwane" primaryText="Tshwane" />
          <MenuItem value="Midland" primaryText="Midland" />
          <MenuItem value="Cape" primaryText="Cape" />
          <MenuItem value="Kwa-Zulu Natal" primaryText="Kwa-Zulu Natal" />
          <MenuItem value="Freestate & Northern Cape" primaryText="Freestate & Northern Cape" />
          
        </Field>
      </div>
      <div>
        
      </div>
      {/* <div>
        <Field name="employed" component={renderCheckbox} label="Employed" />
      </div> */}
      <div>
        <Field
          name="notes"
          component={renderTextField}
          label="Notes"
          multiLine={true}
          rows={2}
          id="processNotes"
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
  form: 'NewProcessForm', // a unique identifier for this form
  validate,
  asyncValidate
})(NewProcessForm)