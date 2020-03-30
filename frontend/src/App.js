import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import { getToken } from './helpers/auth.js'

// vistas
import LoginPage from './vistas/LoginPage.js';
import RegisterPage from './vistas/RegisterPage.js';
import MensajitoPage from './vistas/MensajitoPage.js';
import CreateTestPage from './vistas/CreateTestPage.js';
import HomePage from './vistas/HomePage.js';
import MakeTestPage from './vistas/MakeTestPage.js';
import MantenimientoPage from './vistas/MantemientoPage.js';

// componentes
import NavBar from './componentes/navbar/NavBar.js';

// proveedores
import { TipoPreguntaRespuestaProvider } from './context/createTestContext';
import { UsuarioProvider } from './context/usuarioContext.js';
import { GeneralProvider } from './context/generalContext.js';
import { MakeTestProvider } from './context/makeTestContext.js';

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
              <MakeTestProvider>
                <GeneralProvider>
                  <NavBar > 
                    <Comp {...props}/>
                  </NavBar>
                </GeneralProvider>
              </MakeTestProvider>
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
      return ( <Redirect to="/home" />);
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
          path='/home'
          render={(props) => requireAuth(HomePage, props)}
        />
        <Route
          exact
          path='/home'
          render={(props) => requireAuth(MensajitoPage, props)}
        />
        <Route
          path='/make_test/:id'
          render={(props) => requireAuth(MakeTestPage, props, MakeTestProvider)}
        />
        <Route
          exact
          path='/create_test'
          render={(props) => requireAuth(CreateTestPage, props, TipoPreguntaRespuestaProvider)}
        />
        <Route
          exact
          path='/create_classroom'
          render={(props) => <MantenimientoPage {...props} />}
        />
        <Route
          exact
          path='/perfil'
          render={(props) => <MantenimientoPage {...props} />}
        />
        <Redirect strict from="/" to="/login" />
      </Switch>
    </Router>
  );
}
