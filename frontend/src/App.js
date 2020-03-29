import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import { getToken } from './helpers/auth.js'

// vistas
import LoginPage from './vistas/LoginPage.js';
import RegisterPage from './vistas/RegisterPage.js';
import MensajitoPage from './vistas/MensajitoPage.js';
import CreateTestPage from './vistas/CreateTestPage.js';

// componentes
import NavBar from './componentes/navbar/NavBar.js';

// proveedores
import {TipoPreguntaRespuestaProvider} from './context/general_context';
import {UsuarioProvider} from './context/usuarioContext.js';

export default () => <UsuarioProvider>
  <App></App>
</UsuarioProvider>

const App = () => {

  const requireAuth = (Comp, props) => {
    console.log(Comp)
    if( !getToken() ){
      return (<Redirect to="/login" />);
    } else{
      return (
        <div>
          <TipoPreguntaRespuestaProvider>
            <NavBar > 
              <Comp {...props}/>
            </NavBar>
          </TipoPreguntaRespuestaProvider>
        </div>
      )
    }
  }

  const forzarLogin = (Comp, props) => {
    if( !getToken() ){
      return (
      <div>
          <Comp {...props} />
      </div>);
    } else{
      return ( <Redirect to="/create_test" />);
    }
  }
  
  return (
    <Router>
      <Switch>
        <Route
          exact
          path='/login'
          render={(props) => forzarLogin(LoginPage, props)}
        />
        <Route
          exact
          path='/register'
          render={(props) => forzarLogin(RegisterPage, props)}
        />
        <Route
          exact
          path='/mensajito'
          render={(props) => forzarLogin(MensajitoPage, props)}
        />
        <Route
          exact
          path='/create_test'
          render={(props) => requireAuth(CreateTestPage, props)}
        />
        <Redirect strict from="/" to="/login" />
      </Switch>
    </Router>
  );
}
