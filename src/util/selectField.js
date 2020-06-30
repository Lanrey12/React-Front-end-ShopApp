import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
    formControl: {
      margin: '10px',
      minWidth: 120,
    },
}))

function FormikSelect (props) { 

const classes = useStyles()

    return (
<FormControl className={classes.formControl}>
    <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
<Select>
  <MenuItem value = {props.value}></MenuItem>
  <MenuItem>Mrs</MenuItem>
  <MenuItem>Miss</MenuItem>
</Select>
</FormControl>
    )
}

export default FormikSelect
