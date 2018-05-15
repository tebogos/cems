import React from 'react';
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker';


export const renderTextField = ({
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
  
 export const renderDisabledTextField = ({
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
  
  export const renderCheckbox = ({ input, label }) => (
    <Checkbox
      label={label}
      checked={input.value ? true : false}
      onCheck={input.onChange}
    />
  )
  
  export const renderRadioGroup = ({ input, ...rest }) => (
    <RadioButtonGroup
      {...input}
      {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  )
  
  
  
  export const renderSelectField = ({
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
  export const renderDate = ({
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
     onChange={(event,date) => input.onChange(moment(date).format('YYYY-MM-DD'))}
    />
  )
  