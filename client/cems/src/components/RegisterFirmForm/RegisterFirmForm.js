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
import {required,minLength,maxLength,email,code,phone} from '../../lib/formValidator';
import capitalize from 'capitalize';
import {renderTextField,renderSelectField,renderDate} from '../ReduxFormCustomComponents';











class RegisterFirmForm extends React.Component{
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
          name="name"
          component={renderTextField}
          label="Firm Name"
          validate={[required,minLength,maxLength]}
        >
        </Field>
     </div>
     <div>
        <Field
          name="tradingAs"
          component={renderTextField}
          label="Trading as"
          validate={[required,minLength,maxLength]}
        >
        </Field>
     </div>
     <div>
        <Field
          name="managingDirector"
          component={renderTextField}
          label="ManagingnDirector"
          validate={[required,minLength,maxLength]}
        >
        </Field>
     </div>
     <div>
        <Field
          name="ownershipType"
          component={renderSelectField}
          label="Ownership Type"
          validate={[required,minLength,maxLength]}
        >
         <MenuItem value="CC" primaryText="CC" />
          <MenuItem value="PTY (LTD)" primaryText="PTY (LTD)" />
          <MenuItem value="SOLE OWNER" primaryText="SOLE OWNER" />
          <MenuItem value="TRUST" primaryText="TRUST" />
          <MenuItem value="Examption" primaryText="Examption" />
        </Field>
     </div>
     <div>
        <Field
          name="vatNumber"
          component={renderTextField}
          label="Vat Number"
          validate={[required,minLength,maxLength]}
        >
        </Field>
     </div>
     <div>
        <Field
          name="tel"
          component={renderTextField}
          label="Telephone"
          validate={[phone]}
        >
        </Field>
     </div>
     <div>
        <Field
          name="mobile"
          component={renderTextField}
          label="Mobile"
          validate={[phone]}
        >
        </Field>
     </div>
     <div>
        <Field
          name="email"
          component={renderTextField}
          label="Email"
          validate={[email]}
        >
        </Field>
     </div>
     <div>
        <Field
          name="fax"
          component={renderTextField}
          label="Fax"
          validate={[phone]}
        >
        </Field>
     </div>
     <fieldset>
        <legend>Physical Address:</legend>
        <div>
            <Field
            name="street"
            component={renderTextField}
            label="Street"
            validate={[minLength,maxLength]}
            >
            </Field>
        </div>
        <div>
            <Field
            name="city"
            component={renderTextField}
            label="City"
            validate={[minLength,maxLength]}
            >
            </Field>
        </div>
        <div>
            <Field
            name="province"
            component={renderSelectField}
            label="Province"
            validate={[required,minLength,maxLength]}
            >
        
            <MenuItem value="Gauten" primaryText="Gauteng" />
            <MenuItem value="KwaZulu Natal" primaryText="KwaZulu Natal" />
            <MenuItem value="North Cape" primaryText="North Cape" />
            <MenuItem value="Eastern Cape" primaryText="Eastern Cape" />
            <MenuItem value="Western Cape" primaryText="Western Cape" />
            <MenuItem value="Limpopo"primaryText="Limpopo" />
            <MenuItem value="Free State" primaryText="Free State" />
            <MenuItem value="Mpumalanga" primaryText="Mpumalanga" />
            <MenuItem value="North West" primaryText="North West" />
            </Field>
        </div>
     </fieldset>
     <fieldset>
        <legend>Postal Address:</legend>
        <div>
            <Field
            name="street"
            component={renderTextField}
            label="Street"
            validate={[minLength,maxLength]}
            >
            </Field>
            <Field
            name="city"
            component={renderTextField}
            label="City"
            validate={[minLength,maxLength]}
            >
            </Field>
        </div>
        <div>
           
        </div>
        <div>
            <Field
            name="province"
            component={renderSelectField}
            label="Province"
            validate={[required,minLength,maxLength]}
            >
        
            <MenuItem value="Gauten" primaryText="Gauteng" />
            <MenuItem value="KwaZulu Natal" primaryText="KwaZulu Natal" />
            <MenuItem value="North Cape" primaryText="North Cape" />
            <MenuItem value="Eastern Cape" primaryText="Eastern Cape" />
            <MenuItem value="Western Cape" primaryText="Western Cape" />
            <MenuItem value="Limpopo"primaryText="Limpopo" />
            <MenuItem value="Free State" primaryText="Free State" />
            <MenuItem value="Mpumalanga" primaryText="Mpumalanga" />
            <MenuItem value="North West" primaryText="North West" />
            </Field>
        </div>
        <div>
            <Field
            name="code"
            component={renderTextField}
            label="Code"
            validate={[code]}
            >
            </Field>
        </div>
     </fieldset>
     <div>
            <Field
            name="councilFunds"
            component={renderSelectField}
            label="Council Funds"
           
            >       
            <MenuItem value="Sick Pay Fund" primaryText="Sick Pay Fund" />
            <MenuItem value="EIPF" primaryText="EIPF" />
            <MenuItem value="LCD" primaryText="LCD" />
            <MenuItem value="MIPF" primaryText="MIPF" />
            <MenuItem value="Tech Fund" primaryText="Tech Fund" />
            <MenuItem value="Tech Vat" primaryText="Tech Vat" />
            <MenuItem value="Dispute Levy" primaryText="Dispute Levy" />
            <MenuItem value="Volintary Leave Pay" primaryText="Volintary Leave Pay" />
            <MenuItem value="Admin Levy" primaryText="Admin Levy" />
            <MenuItem value="Board Levy" primaryText="Board Levy" />
            <MenuItem value="CBL Employee" primaryText="CBL Employee" />
            <MenuItem value="CBL Employe" primaryText="CBL Employe" />
            <MenuItem value="Not Used" primaryText="Not Used" />
            </Field>
        </div>
        <div>
            <Field
            name="councilFunds"
            component={renderSelectField}
            label="Council Funds"
           
            >      
            <MenuItem value="Exempted" primaryText="Exempted" />
            <MenuItem value="Never Registered" primaryText="Never Registered" />
            <MenuItem value="Registered" primaryText="Registered" />           
            </Field>
        </div>
        <div>
            <Field
            name="dateLiable"
            component={renderDate}
            label="Date Liable"
            >
            </Field>
        </div>
        <div>
            <Field
            name="dateLiable"
            component={renderDate}
            label="Date Liable"
            >
            </Field>
        </div>
        <div>
            <Field
            name="dateExemptionFrom"
            component={renderDate}
            label="Date Exempted From"
            >
            </Field>
        </div>
        <div>
            <Field
            name="dateExemptionTo"
            component={renderDate}
            label="Date Exempted To"
            >
            </Field>
        </div>
        <div>
            <Field
            name="exemptionReason"
            component={renderTextField}
            label="Exemption Reason"
            validate={[minLength,maxLength]}
            >
            </Field>
        </div>
        <div>
            <Field
            name="paymentFromDate"
            component={renderDate}
            label="Payment From Date"
            >
            </Field>
        </div>
        <div>
            <Field
            name="paymentToDate"
            component={renderDate}
            label="Payment To Date"
            >
            </Field>
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
  form: 'RegisterFirmForm' // a unique identifier for this form
})(RegisterFirmForm)