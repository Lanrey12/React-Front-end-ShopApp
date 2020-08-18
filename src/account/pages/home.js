import React from 'react';
import { accountService } from '../../redux/actions/userActions'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import  {makeStyles}  from '@material-ui/core'

const useStyles = makeStyles(() => ({
  
   button: {
     position: 'relative',
     marginLeft: 300
   }
   
   }));

function Home() {

    const classes = useStyles()
    const user = accountService.userValue;
    
    
    return (
        <div className="p-4">
            <div className="container" style={{  justifyContent:'center'}}>
                <div>
                <h1>Hi {user.firstName}!{user.email}</h1>
                <p>You're logged in with React & JWT!!</p>
                </div>           
                <div >
            <Button  
             component={Link}
              to="/products"
              type="submit" 
               variant="contained" 
               color="primary"  
               className={classes.button}
               >
                     Shop Here             
            </Button>
            </div>
            </div>     
        </div>
    );
}

export { Home };