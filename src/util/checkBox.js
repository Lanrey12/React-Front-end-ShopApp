import React from 'react';
import { Checkbox, FormControlLabel, } from '@material-ui/core';
import { useField } from 'formik'



export default function MyCheckBox (props) {
  const [ field ] = useField({
    name: props.name,
    type: 'checkbox', 
  })
  return (
    <FormControlLabel required={props.required} control={<Checkbox {...field} {...props}/>} label={props.label}/>
  );
}