import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { Alert } from '../src/account/alert/alertCmp'
import { Nav } from '../src/util/Nav'
import { Role } from '../src/util/role'
//redux stuff
import { accountService } from '../src/redux/actions/userActions'
//themes
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
//
import { Admin } from '../src/account/pages/admin/index';
import  List  from '../src/account/pages/admin/users/list'
import login from '../src/account/pages/login'
import register from '../src/account/pages/register'
import { Home } from '../src/account/pages/home'
import forgotPassword from '../src/account/pages/forgot-password'
import resetPassword from '../src/account/pages/reset-password'
import  {VerifyEmail}  from '../src/account/pages/verify-email'
import AddEditConnect from '../src/account/pages/admin/users/addEdit';
import CreateConnect from '../src/account/pages/admin/users/createUser';
import { Update } from './account/pages/profile/update';
import { Details } from './account/pages/profile/details';
import { createBrowserHistory } from 'history';

import { PrivateRoute } from '../src/component/PrivateRoute'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#001d26',
      dark: '#008394',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff',
    },
  }
})

function App() {

  const { pathname } = useLocation();  
  const history = createBrowserHistory();

  useEffect(() => {
    if(accountService.userValue){
      history.push('/')
    }
  })

  return (
    <MuiThemeProvider theme={theme}>
    <div className="App">
     <Router history = {history}>
     <Nav />
      <div className = "container">
        <Alert/>
       <Switch>
         <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
         <Route exact path="/account/register" component={register} />
         <Route exact path="/account/verify-email" component={ VerifyEmail} />
         <Route exact path="/account/login" component={login} />
         <Route exact path="/account/forgot-password" component={forgotPassword} />
         <Route exact path="/account/reset-password" component={ resetPassword } />
         <PrivateRoute exact path="/admin" roles={[Role.Admin]} component={Admin} />
         <PrivateRoute exact path="/admin/users" roles={[Role.Admin]} component={ List } />
         <PrivateRoute exact path="/admin/add" roles={[Role.Admin]} component={ CreateConnect } />
         <PrivateRoute exact path="/admin/edit/:id" roles={[Role.Admin]} component={ AddEditConnect } />
         <PrivateRoute exact path="/profile" component={ Details } />
         <PrivateRoute exact path="/profile/update" component={ Update } />
         <PrivateRoute exact path="/" component={Home} />
         <Redirect from="*" to="/" />
       </Switch>
      </div>
     </Router>
    </div>
    </MuiThemeProvider>
   
  );
}

export default App;
