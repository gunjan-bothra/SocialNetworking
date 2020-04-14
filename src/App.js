import React from 'react';
import logo from './logo.svg';
import './App.css';
import Facebook from './components/facebook';
import Google from './components/google';
// import FacebookLogin from 'react-facebook-login';

// import GoogleLogin from 'react-google-login';

// import Amplify from 'aws-amplify';
// import awsconfig from './aws-exports';
// import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
// import '@aws-amplify/ui/dist/style.css';

// Amplify.configure(awsconfig);

// const signUpConfig = {
//   header: 'My Customized Sign Up',
//   hideAllDefaults: true,
//   defaultCountryCode: '1',
//   signUpFields: [
//     {
//       label: 'My custom email label',
//       key: 'email',
//       required: true,
//       displayOrder: 1,
//       type: 'string'
//     }
//   ]
// };
function App() {
  return (
      <div className="App">
        <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>
        <Facebook></Facebook>
        <Google></Google>
      </div>
  );
}

// export default withAuthenticator(App, {signUpConfig});
export default App;
