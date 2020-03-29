import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';

// vistas
import LoginPage from './vistas/LoginPage.js';
import RegisterPage from './vistas/RegisterPage.js';
import MensajitoPage from './vistas/MensajitoPage.js';
import CreateTestPage from './vistas/CreateTestPage.js';
import HomePage from './vistas/HomePage.js';
import MakeTestPage from './vistas/MakeTestPage.js';

// proveedores
import {TipoPreguntaRespuestaProvider} from './context/general_context';

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
          path='/home'
          render={(props) => <HomePage {...props} />}
        />
        <Route
          path='/make_test/:id'
          render={(props) => <MakeTestPage {...props} />}
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
          render={(props) => 
            <TipoPreguntaRespuestaProvider>
              <CreateTestPage {...props} />
            </TipoPreguntaRespuestaProvider>
          }
        />
        <Redirect strict from="/" to="/home" />
      </Switch>
    </Router>
  );
}

export default App;
