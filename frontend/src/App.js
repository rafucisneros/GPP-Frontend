import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';

// vistas
import LoginPage from './vistas/LoginPage.js';
import RegisterPage from './vistas/RegisterPage.js';
import MensajitoPage from './vistas/MensajitoPage.js';
import CreateTestPage from './vistas/CreateTestPage.js';

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
        <Redirect strict from="/" to="/mensajito" />
      </Switch>
    </Router>
  );
}

export default App;
