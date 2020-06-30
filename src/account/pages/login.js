import React from 'react'
// import AppIcon from '../images/icon.png'
import  {Typography, Card, CardContent, TextField, makeStyles, CircularProgress}  from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../redux/actions/userActions'
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

function Login({ history, props }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const initialValues = {
      email: '',
      password: '',
  };

  const validationSchema = Yup.object().shape({
      email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
      password: Yup.string().required('Password is required'),
  });

  function onSubmit({email, password}, { setStatus, setSubmitting }) {
      setStatus();
      dispatch(loginUser(email, password))
          .then((user) => {     
            alertService.success('Logged In');             
               history.push('/');
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
          variant="h4"
           > Login
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
                    <span className={classes.customError}>{errors.email}</span>
                  )}/>          
            
                  <Field 
                  className={classes.textField}
                  style={{ width: 430}} 
                  name="password" as={TextField} 
                  label="Password" type="password"
                  required
                  helperText={
                    errors.password && touched.password && (
                    <span className={classes.customError}>{errors.password}</span>
                  )}/>               
                  <br/>
                  <br/>
                   <Button type="submit" disabled={isSubmitting} variant="contained" color="primary"  className={classes.button}>
                     Login
                     {isSubmitting && (
                  <CircularProgress size={30} className={classes.progress} />
                      )}
                   </Button>
                   <br />
                   <br/>
              <Typography className={classes.textField} variant="body1">
                Don't have an account ? Register <Link to="/account/register" style= {{ textDecoration: 'none'}} >here</Link>
                <Link to="/account/forgot-password" style={{textDecoration: 'none'}}><span style={{marginLeft: '15px', fontSize:'12px', color:"red"}}>Forgot password</span></Link>
              </Typography>
          
                   <pre>{JSON.stringify(values, null, 2)}</pre>
              
              </Form>
          )}
      </Formik>
        </CardContent>
      </Card>
  )
}




export default Login