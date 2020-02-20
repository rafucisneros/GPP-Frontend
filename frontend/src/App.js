import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';

import LoginPage from './containers/LoginPage.js';
import RegisterPage from './containers/RegisterPage.js';
import MensajitoPage from './containers/MensajitoPage.js';
import CreateTestPage from './containers/CreateTestPage.js';

const App = () => {
  
  return (
    <Router>
      <Switch>
        <Route
          exact
          path='/login'
          render={(props) => <LoginPage {...props} />}
        />
        <Route
          exact
          path='/register'
          render={(props) => <RegisterPage {...props} />}
        />
        <Route
          exact
          path='/mensajito'
          render={(props) => <MensajitoPage {...props} />}
        />
        <Route
          exact
          path='/create_test'
          render={(props) => <CreateTestPage {...props} />}
        />
        <Redirect strict from="/" to="/mensajito" />
      </Switch>
    </Router>
  );
}

export default App;
