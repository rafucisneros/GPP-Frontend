import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';

import LoginPage from './containers/LoginPage.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render = () => {
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
    )
  }
}

export default App;
