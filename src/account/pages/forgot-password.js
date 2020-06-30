import React from 'react'
// import AppIcon from '../images/icon.png'
import  {Typography, Card, CardContent, TextField, makeStyles, CircularProgress}  from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
import { forgotPassword } from '../../redux/actions/userActions'
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

function ForgotPassword(){
  const classes = useStyles()
  const dispatch = useDispatch()
  const initialValues = {
      email: '',
  };

  const validationSchema = Yup.object().shape({
      email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
  });

  function onSubmit({email}, { setSubmitting }) {
      dispatch(forgotPassword(email))
          .then((payload) => {     
            alertService.success('Please check your email for password reset instructions', { keepAfterRouteChange: true }); 
            setSubmitting(false)           
          })
          .catch(error => {
            setSubmitting(false)
            alertService.error('An unexpected error occured', error)
              console.log(error)          
          })
  }

  return (
      <Card className = {classes.card}>
        <CardContent className = {classes.content}>
          <Typography
          className = {classes.textField}
          variant="h4"
           > Forgot Password
          </Typography>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ errors, touched, isSubmitting, values }) => (
                <Form>
                                  
                  <Field 
                  className={classes.textField} 
                  style={{ width: 430}} name="email" as={TextField} 
                  label="Email"
                  required
                  helperText={
                    errors.email && touched.email && (
                    <div className={classes.customError}>{errors.email}</div>
                  )}/>                        
                  <br/>
                  <br/>
                   <Button type="submit" disabled={isSubmitting} variant="contained" color="primary"  className={classes.button}>
                     Submit
                     {isSubmitting && (
                  <CircularProgress size={30} className={classes.progress} />
                      )}
                   </Button>
                   <Link to="/account/login" style={{textDecoration: 'none'}}><span style={{marginLeft: '15px', color:"red"}}>Cancel</span></Link>
                   <br />
                   <br/>          
                   <pre>{JSON.stringify(values, null, 2)}</pre>
              
              </Form>
          )}
      </Formik>
        </CardContent>
      </Card>
  )
}



export default ForgotPassword