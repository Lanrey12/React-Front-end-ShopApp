import React, {useState, useEffect} from 'react'
// import AppIcon from '../images/icon.png'
import  {Typography, Card, CardContent, TextField, makeStyles, CircularProgress}  from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
import { validateResetToken, resetPassword } from '../../redux/actions/userActions'
import { useDispatch } from 'react-redux'
import queryString from 'query-string';
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

function ResetPassword({ history, props }) {

   const TokenStatus = {
    Validating: 'Validating',
    Valid: 'Valid',
    Invalid: 'Invalid'
   }
   
   const [token, setToken] = useState(null);
   const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

   const fetchToken = () => {

    const { token } = queryString.parse(window.location.search);

    // remove token from url to prevent http referer leakage
    history.replace(window.location.pathname);

    dispatch(validateResetToken(token))
        .then(() => {
            setToken(token);
            setTokenStatus(TokenStatus.Valid);
        })
        .catch(() => {
            setTokenStatus(TokenStatus.Invalid);
        });
   }
   useEffect(fetchToken, []);

   const classes = useStyles()
   const dispatch = useDispatch()

   function getForm(){
    const initialValues = {
        password: '',
        confirmPassword: ''
    };
  
    const validationSchema = Yup.object().shape({
        password: Yup.string()
        .min(6, "Password must be at least six characters")
        .required('Password is required'),
        confirmPassword: Yup.string()
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
                  .required('Confirm Password is required'),
    });
  
    function onSubmit({password, confirmPassword}, { setStatus, setSubmitting }) {
        setStatus();
        dispatch(resetPassword({ token, password, confirmPassword }))
            .then(() => {     
               alertService.success('Password reset successful, you can now login', { keepAfterRouteChange: true });             
                 history.push('/account/login');
            })
            .catch(error => {
                setSubmitting(false);
                console.log(error)
                alertService.error('An unexpected error occured', error)
                
            });
    }
  
    return (
        <Card className = {classes.card}>
          <CardContent className = {classes.content}>
            <Typography
            className = {classes.textField}
            variant="h4"> Reset Password
            </Typography>
  
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, values }) => (
                  <Form>            
                    <Field 
                    className={classes.textField}
                    style={{ width: 430}} 
                    name="password" as={TextField} 
                    label="Password" type="password"
                    required
                    helperText={
                      errors.password && touched.password && (
                      <div className={classes.customError}>{errors.password}</div>
                    )}/>  
                    <Field 
                    className={classes.textField}
                    style={{ width: 430}} 
                    name="confirmPassword" as={TextField} 
                    label="Confirm Password" type="password"
                    required
                    helperText={
                      errors.confirmPassword&& touched.confirmPassword && (
                      <div className={classes.customError}>{errors.password}</div>
                    )}/>             
                    <br/>
                    <br/>
                     <Button type="submit" disabled={isSubmitting} variant="contained" color="primary"  className={classes.button}>
                       Reset
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
   function getBody() {
    switch (tokenStatus) {
        case TokenStatus.Valid:
            return getForm();
        case TokenStatus.Invalid:
            return <div>Token validation failed, if the token has expired you can get a new one at the <Link to="forgot-password">forgot password</Link> page.</div>;
        case TokenStatus.Validating:
            return <div>Validating token...</div>;
        default:
                return tokenStatus
    }
}

return (
    <div>
        <div className="card-body">{getBody()}</div>
    </div>
)
 
}




export default ResetPassword