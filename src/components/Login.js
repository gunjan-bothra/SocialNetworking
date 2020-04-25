import React from 'react';
import {TextField, Button} from '@material-ui/core';
import SignIn from './signin';
import Google from './google';
import Signup from './Signup';
import {withStyles} from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';

const styles = (theme) => ({
  layout: {
    width: '20%',
    margin: '0 auto',
    padding: '20px',
  },
});

const Login = (props) => {
  const {classes} = props;
  return (
    <div className={classes.layout}>
      <h1>Social Networking</h1>
      <div>Sign up to see photos and videos from your friends</div>
      <Google></Google>
      <div>OR</div>
      <Signup></Signup>
      <div>
        Already have an account?<NavLink to="/SignIn">Sign in.</NavLink>
      </div>
    </div>
  );
};

export default withStyles(styles)(Login);
