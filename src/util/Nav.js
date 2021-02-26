import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { logoutUser, accountService, getById } from "../redux/actions/userActions";
import { Role } from "../util/role";
import { useDispatch } from "react-redux";
import { Badge } from "antd";
import "antd/dist/antd.css";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "20px",
  },
  title: {
    flexGrow: 1,
    marginRight: "40px",
  },
}));

function Nav({ history }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [userData, setuserData] = useState({})
  const id = userData.id

  const getUser = () => {
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  };

  useEffect(getUser, []);
  
  useEffect(() => {
    dispatch(getById(id))
    .then((res) => {
        setuserData(res.payload)
    })
 })

  // only show nav when logged in
  if (!user) return null;

  function logout() {
    dispatch(logoutUser());
  }

    
   
    
    
    
    // console.log(userData)

  return (
    <div className={classes.root}>
      <AppBar color="primary">
        <Toolbar>
          <Fragment>
            <Link to="/">
              <Tooltip title="Home">
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <HomeIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Link>

            <Link to="/profile">
              <Tooltip title="Account Profile">
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <AccountCircleIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Link>

            {user.role === Role.Admin && (
              <Fragment>
                <Link to="/admin">
                  <Tooltip title="Manager">
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu"
                    >
                      <SupervisorAccountIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </Link>
              </Fragment>
            )}
          </Fragment>

          <div className={classes.title}></div>
          { user.token &&
          <Fragment>
             
          <Link to="/product/add">
              <Tooltip title="Upload">
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <CloudUploadOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Link>
          
            <Link to="/user/cart">
              <Tooltip title="Cart">
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >  
                <Badge count = {userData.cart && userData.cart.length}>
                  <ShoppingCartOutlinedIcon fontSize="large" />
                  </Badge>  
                </IconButton>
              </Tooltip>
            </Link> 
            <div>
            <Button
              component={Link}
              to="/user/history"
              color="inherit"
            >
              History
            </Button>
            </div>        
          </Fragment>
}
          <Fragment>
            <Button
              component={Link}
              to="/account/login"
              color="inherit"
              onClick={logout}
            >
              Logout
            </Button>
          </Fragment>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export { Nav };
