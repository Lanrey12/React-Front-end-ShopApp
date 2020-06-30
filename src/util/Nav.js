import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser, accountService } from '../redux/actions/userActions'
import { Role } from '../util/role'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Tooltip } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: '20px'
  },
  title: {
    flexGrow: 1,
    marginRight: '40px'
  },
}));

function Nav({ history }) {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [user, setUser] = useState({});

  const getUser = () => {
    const subscription = accountService.user.subscribe(x => setUser(x));
    return subscription.unsubscribe;
  }

    useEffect(getUser, []);

    // only show nav when logged in
    if (!user) return null;

    function logout () {
      dispatch(logoutUser())
    }

  return (
    <div className={classes.root}>
      <AppBar color = "primary">
        <Toolbar>
            <Fragment>

            <Link to="/">
            <Tooltip title="Home">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeIcon  fontSize="large"/>
          </IconButton>
          </Tooltip>
          </Link>
          
          <Link to="/profile">
          <Tooltip title="Account Profile">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <AccountCircleIcon  fontSize="large"/>
          </IconButton>
          </Tooltip>
          </Link>
            
         { user.role === Role.Admin &&
          <Link to="/admin">
          <Tooltip title="Manager">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <SupervisorAccountIcon  fontSize="large"/>
          </IconButton>
          </Tooltip>
          </Link>
          }
            </Fragment>

          <div className={classes.title}>
              </div>
          <Fragment>               
              <Button  component ={Link} to= "/account/login"color="inherit" onClick={logout}>
                Logout
              </Button>
            </Fragment>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export { Nav }