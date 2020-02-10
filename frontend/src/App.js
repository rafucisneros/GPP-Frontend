import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';

import LoginPage from './containers/LoginPage.js';

const App = () => {
  
  return (
    <Router>
      <Switch>
        <Route
          exact
          path='/login'
          render={(props) => <LoginPage {...props} />}
        />
        {/* <Route
          exact
          path='/register'
          render={(props) => <registerPage {...props} />}
        /> */}
        <Redirect strict from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
