import React, {useState} from 'react';
import axios from 'axios';
import {TextField, Button} from '@material-ui/core';
import validator from 'validator';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (theme) => ({
  layout: {
    width: '20%',
    margin: '0 auto',
    padding: '20px',
  },
});

const Signup = (props) => {
  const [signUpData, setSignUpData] = useState({
    email: '',
    name: '',
    password: '',
    helperText: {},
    error: {
      open: false,
      message: '',
    },
  });

  let history = useHistory();

  const handleSignUp = (props) => {
    let payload = {
      email: signUpData.email,
      name: signUpData.name,
      password: signUpData.password,
    };
    axios
      .post('http://localhost:5000/login/registration', payload, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 201) {
          history.push('/Home');
        } else {
          let error = {...signUpData.error};
          error.open = true;
          error.message = response.data.message;
          setSignUpData({...signUpData, error: error});
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
    let text = {...signUpData.helperText};
    switch (name) {
      case 'email':
        if (!validator.isEmail(value)) {
          if (!text['email']) {
            text['email'] = 'Please enter valid email';
          }
        } else {
          delete text['email'];
        }
        setSignUpData({...signUpData, email: value, helperText: text});
        break;
      case 'name':
        if (!value.toString().trim().length) {
          // We can return string or jsx as the 'error' prop for the validated Component
          if (!text['name']) {
            text['name'] = 'Enter name';
          }
        } else {
          delete text['name'];
        }
        setSignUpData({...signUpData, name: value, helperText: text});
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
        setSignUpData({...signUpData, password: value, helperText: text});
        break;
      default:
        break;
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    let error = {...signUpData.error};
    error.open = false;
    error.message = '';
    setSignUpData({...signUpData, error: error});
  };

  const {classes} = props;
  return (
    <div>
      <div>
        <TextField
          label="Enter Email"
          style={{margin: 8}}
          placeholder="Enter Email"
          margin="normal"
          variant="outlined"
          size="small"
          value={signUpData.email}
          required
          helperText={signUpData.helperText['email']}
          onChange={handleChange}
          name="email"
        />
      </div>
      <div>
        <TextField
          label="Enter Full Name"
          style={{margin: 8}}
          placeholder="Enter Full Name"
          margin="normal"
          variant="outlined"
          size="small"
          value={signUpData.name}
          required
          helperText={signUpData.helperText['name']}
          onChange={handleChange}
          name="name"
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
          value={signUpData.password}
          required
          helperText={signUpData.helperText['password']}
          onChange={handleChange}
          name="password"
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSignUp}
        disabled={
          !signUpData.name ||
          !signUpData.password ||
          !signUpData.email ||
          Object.keys(signUpData.helperText).length
        }
      >
        Sign Up
      </Button>
      {signUpData.error.open && (
        <Snackbar
          open={signUpData.error.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {signUpData.error.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default withRouter(withStyles(styles)(Signup));
