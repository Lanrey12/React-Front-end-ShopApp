import React from 'react'
// import AppIcon from '../images/icon.png'
import  {Typography, Card, CardContent, TextField, makeStyles, CircularProgress}  from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MyCheckBox from '../../util/checkBox'
import { register } from '../../redux/actions/userActions'
import { useDispatch } from 'react-redux'
import { alertService } from '../alert/alertService'


const useStyles = makeStyles(() => ({
 card: {
  //position: 'relative',
  display: 'flex',
  maxWidth: 700,
  borderRadius: 5,
  margin: '10px auto 10px auto',
  boxShadow: '0 3px 5px 2px rgba(222, 225, 230)',
 },
 content:{
  padding: 25,
  objectFit: 'cover',
},
textField:{
  margin: '10px auto 10px auto',
  marginLeft: "50px",
  textAlign: 'center'
},
button: {
  position: 'relative',
  marginLeft: 300
},
customError:{
  color: 'red',
  fontSize: '0.8rem',
  marginTop: 10
},
progress:{
  position: 'absolute'
}

}));

function Register({ history, props }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const initialValues = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
  };

  const validationSchema = Yup.object().shape({

      firstName: Yup.string()
          .required('First Name is required'),
      lastName: Yup.string()
          .required('Last Name is required'),
      email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
      password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      acceptTerms: Yup.bool()
          .oneOf([true], 'Accept Terms & Conditions is required')
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
      setStatus();
      dispatch(register(fields))
          .then(() => {     
            alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
              
              history.push('/account/login');
          })
          .catch(error => {
              setSubmitting(false);
              alertService.error('An unexpected error occured', error)
              
          });
  }

  return (
      <Card className = {classes.card}>
        <CardContent className = {classes.content}>
          <Typography
          className = {classes.textField}
          variant="h4"> Create Account 
          </Typography>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ errors, touched, isSubmitting, values }) => (
                <Form>
                                 
                  <Field 
                  className={classes.textField} 
                  name="firstName" as={TextField} 
                  label="First Name"
                  required  
                  helperText={
                    errors.firstName && touched.firstName && (
                    <span className={classes.customError}>{errors.firstName}</span>
                  )}/>
                
                  <Field 
                  className={classes.textField}   
                  name="lastName" as={TextField} 
                  label="Last Name"
                  helperText={
                    errors.lastName && touched.lastName && (
                    <span className={classes.customError}>{errors.lastName}</span>
                  )}
                  required/>  
             
                  <Field 
                  className={classes.textField} 
                  style={{ width: 430}} name="email" as={TextField} 
                  label="Email"
                  required
                  helperText={
                    errors.email && touched.email && (
                    <span className={classes.customError}>{errors.email}</span>
                  )}/>          
            
                  <Field 
                  className={classes.textField} 
                  name="password" as={TextField} 
                  label="Password" type="password"
                  required
                  helperText={
                    errors.password && touched.password && (
                    <span className={classes.customError}>{errors.password}</span>
                  )}/>               
                 
                  <Field 
                  className={classes.textField} 
                  name="confirmPassword" as={TextField} 
                  label="Confirm Password" type="password" 
                  required
                  helperText={
                    errors.confirmPassword && touched.confirmPassword && (
                    <span className={classes.customError}>{errors.confirmPassword}</span>
                  )}/> 

                  <br/>
                  <br/>             
                  <MyCheckBox  
                  style={{marginLeft: '50px', padding: '10px'}} 
                  name="acceptTerms"  label="Accept Terms & Conditions"
                  required />
                  <span className={classes.customError}>
                  <ErrorMessage name="acceptTerms"/> 
                  </span>                          
                  <br/>
                  <br/>
                   <Button type="submit" disabled={isSubmitting} variant="contained" color="primary"  className={classes.button}>
                     Create
                     {isSubmitting && (
                  <CircularProgress size={30} className={classes.progress} />
                      )}
                   </Button>
                   <br />
                   <br/>
              <Typography className={classes.textField} variant="body1">
                Already have an account ? Login <Link to="/account/login" style={{ textDecoration: "none"}}>here</Link>
              </Typography>
          
                   <pre>{JSON.stringify(values, null, 2)}</pre>
              
              </Form>
          )}
      </Formik>
        </CardContent>
      </Card>
  )
}




export default Register