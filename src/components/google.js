import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import {GoogleLogout} from 'react-google-login';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Google = (props) => {

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
  const responseGoogle = (response, accessToken, tokenId, googleId) => {
    console.log(response);
    let payload = {
        googleId: response.googleId,
        email: response.profileObj.email,
        name: response.profileObj.name
    }
    axios.post('http://localhost:5000/login/registration', payload, 
    {withCredentials: true}
    )
  .then(response => {
        console.log(response);
        if (response.data.status === 201) {
          history.push('/Home');
        } else {
          let error = {...signUpData.error};
          error.open= true;
          error.message = response.data.message;
          setSignUpData({...signUpData, error:error});
        }
    }).catch(err => {
        console.log(err);
    })
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    let error = {...signUpData.error};
    error.open= false;
    error.message = '';
    setSignUpData({...signUpData, error:error});
  };
  const logout = (response) => {
    console.log(response);
  };

  return (
    <div>
      <GoogleLogin
        clientId="539265119045-g5uhitfeuhg5evvr1uv31d5lsqo9nc1i.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
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

export default Google;
