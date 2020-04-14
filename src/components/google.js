import React from 'react';
import GoogleLogin from 'react-google-login';
import {GoogleLogout} from 'react-google-login';
import axios from 'axios';

const Google = () => {
  const responseGoogle = (response, accessToken, tokenId, googleId) => {
    console.log(response);
    let payload = {
        googleId: response.googleId,
        email: response.profileObj.email,
        name: response.profileObj.name
    }
    axios.post('http://localhost:5000/login/registration', {payload})
    .then(response => {
        console.log(response);
    }).catch(err => {
        console.log(err);
    })
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
      {/* <GoogleLogout
      clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
    >
    </GoogleLogout> */}
    </div>
  );
};

export default Google;
