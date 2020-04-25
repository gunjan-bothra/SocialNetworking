import React from 'react';
import logo from './logo.svg';
import './App.css';
// import Facebook from './components/facebook';
import Google from './components/google';
import Signup from './components/Signup';
import Login from './components/Login';
import SignIn from './components/signin';
// import {useRoutes} from 'hookrouter';
import Home from './pages/Home';
// import {Route, Link, BrowserRouter as Router, Switch} from 'react-router-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

const routes = {
  '/': () => <Login />,
  '/Home': () => <Home />,
  '/SignIn': () => <SignIn />,
};

function App() {
  return (
    <Router history={Router.browserHistory}>
    <div className="App">
    
      <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/Home" component={Home} />
            <Route path="/SignIn" component={SignIn} />
            {/* <Route component={NoPageFound} /> */}
          </Switch>
          </div>
    </Router>
    

  );
}

export default App;
