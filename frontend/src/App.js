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
import GraphicPage from './vistas/GraphicPage.js';

// componentes
// import NavBar from './componentes/layouts/NavBar.js';
import Layout from './componentes/layouts/Layout.js';
import Loading from './componentes/loading/Loading.js';

// proveedores
import { TipoPreguntaRespuestaProvider } from './context/createTestContext';
import { CreateTestPageProvider } from './context/createTestPageContext';
import { UsuarioProvider, useUsuario } from './context/usuarioContext.js';
import { GeneralProvider } from './context/generalContext.js';
import { MakeTestProvider } from './context/makeTestContext.js';

export default () => <UsuarioProvider>
  <App></App>
</UsuarioProvider>

const App = () => {

  const { cargandoUsuario } = useUsuario();

  const requireAuth = (Comp, props) => {
    if( !getToken() ){
      return (<Redirect to="/login" />);
    } else{
      if (cargandoUsuario){
        return (
          <Loading/>
        )
      } else {
        return (
          <div>
              <TipoPreguntaRespuestaProvider>
                <MakeTestProvider>
                  <CreateTestPageProvider>
                    <GeneralProvider>
                      <Layout > 
                        <Comp {...props}/>
                      </Layout>
                    </GeneralProvider>
                  </CreateTestPageProvider>
                </MakeTestProvider>
              </TipoPreguntaRespuestaProvider> 
          </div>
        )
      }
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
          render={(props) => requireAuth(MakeTestPage, props)}
        />
        <Route
          exact
          path='/create_test'
          render={(props) => requireAuth(CreateTestPage, props)}
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
        <Route
          exact
          path='/grafica'
          render={(props) => requireAuth(GraphicPage, props)}
        />
        <Redirect strict from="/" to="/login" />
      </Switch>
    </Router>
  );
}
