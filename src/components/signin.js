import React, {useState} from 'react';
import axios from 'axios';
import {TextField, Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import validator from 'validator';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {NavLink} from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignIn = (props) => {
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
    helperText: {},
    error: {
      open: false,
      message: '',
    },
  });

  let history = useHistory();
  const handleSignIn = () => {
    let payload = {
      email: signInData.email,
      password: signInData.password,
    };
    axios
      .post('http://localhost:5000/login/signin', payload, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 200) {
          history.push('/Home');
        } else {
          let error = {...signInData.error};
          error.open = true;
          error.message = response.data.message;
          setSignInData({...signInData, error: error});
        }
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const {name, value} = event.target;
    let text = {...signInData.helperText};
    switch (name) {
      case 'email':
        if (!validator.isEmail(value)) {
          if (!text['email']) {
            text['email'] = 'Please enter valid email';
          }
        } else {
          delete text['email'];
        }
        setSignInData({...signInData, email: value, helperText: text});
        break;
      case 'password':
        if (!value.toString().trim().length) {
          // We can return string or jsx as the 'error' prop for the validated Component
          if (!text['password']) {
            text['password'] = 'Enter name';
          }
        } else {
          delete text['password'];
        }
        setSignInData({...signInData, password: value, helperText: text});
        break;
      default:
        break;
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    let error = {...signInData.error};
    error.open = false;
    error.message = '';
    setSignInData({...signInData, error: error});
  };

  return (
    <div>
      <div>Login</div>
      <div>
        <TextField
          label="Enter Email"
          style={{margin: 8}}
          placeholder="Enter Email"
          margin="normal"
          variant="outlined"
          size="small"
          value={signInData.email}
          required
          helperText={signInData.helperText['email']}
          onChange={handleChange}
          name="email"
        />
      </div>
      <div>
        <TextField
          label="Enter Password"
          style={{margin: 8}}
          placeholder="Enter Password"
          margin="normal"
          variant="outlined"
          size="small"
          value={signInData.password}
          required
          helperText={signInData.helperText['password']}
          onChange={handleChange}
          name="password"
        />
      </div>
      <div>
        <Checkbox inputProps={{'aria-label': 'uncontrolled-checkbox'}} />
        Remember me
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSignIn}
        disabled={
          !signInData.password ||
          !signInData.email ||
          Object.keys(signInData.helperText).length
        }
      >
        Sign In
      </Button>
      <div>
        Forgot <NavLink to="/SignIn">Password</NavLink>?
      </div>
      <div>
        Don't have account? <NavLink to="/">Create a new account</NavLink>
      </div>
      {signInData.error.open && (
        <Snackbar
          open={signInData.error.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {signInData.error.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default SignIn;
