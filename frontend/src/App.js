import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import { getToken } from './helpers/auth.js'

// vistas
import LoginPage from './vistas/LoginPage.js';
import RegisterPage from './vistas/RegisterPage.js';
import MensajitoPage from './vistas/MensajitoPage.js';
import CreateTestPage from './vistas/CreateTestPage.js';
import ExamsPage from './vistas/ExamsPage';
import HomePage from './vistas/HomePage.js';
import MakeTestPage from './vistas/MakeTestPage.js';
import MantenimientoPage from './vistas/MantemientoPage.js';
import CalificacionesPage from './vistas/CalificacionesPage.js';
import TestDetailsPage from './vistas/TestDetailsPage.js';
import DashboardExamPage from './vistas/DashboardExamPage.js';
import ExamFinishedPage from './vistas/ExamFinishedPage.js';
import AdminPage from './vistas/AdminPage.js';
import NonResponsivePage from './vistas/NonResponsivePage.js';

// componentes
// import NavBar from './componentes/layouts/NavBar.js';
import { isMobile } from 'react-device-detect';
import Layout from './componentes/layouts/Layout.js';
import Loading from './componentes/loading/Loading.js';

// proveedores
import { TipoPreguntaRespuestaProvider } from './context/createTestContext';
import { CreateTestPageProvider } from './context/createTestPageContext';
import { UsuarioProvider, useUsuario } from './context/usuarioContext.js';
import { GeneralProvider } from './context/generalContext.js';
import { MakeTestProvider } from './context/makeTestContext.js';
import ProfilePage from './vistas/ProfilePage';

export default () => <UsuarioProvider>
  <App></App>
</UsuarioProvider>

const App = () => {

  const { cargandoUsuario } = useUsuario();

  const requireAuth = (Comp, props) => {
    if( !getToken() ){
      return (<Redirect to="/login" />);
    } else{
      if (isMobile){
        return(<NonResponsivePage/>)
      } else {
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
          path='/registro'
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
          path='/crear_examen'
          render={(props) => requireAuth(CreateTestPage, props)}
        />
        <Route
          exact
          path='/examen/:id'
          render={(props) => requireAuth(CreateTestPage, props)}
        />
        <Route
          exact
          path='/examen/:id/calificaciones'
          render={(props) => requireAuth(CalificacionesPage, props)}
        />
        <Route
          exact
          path='/examenes'
          render={(props) => requireAuth(ExamsPage, props)}
        />
        <Route
          exact
          path='/admin'
          render={(props) => requireAuth(AdminPage, props)}
        />
        <Route
          exact
          path='/perfil'
          render={(props) => requireAuth(ProfilePage, props)}
        />
        <Route
          path='/test_details/:id'
          render={(props) => requireAuth(TestDetailsPage, props)}
        />
        <Route
          path='/mantenimiento'
          render={(props) => <MantenimientoPage></MantenimientoPage>}
        />
        <Route
          exact
          path='/estadisticas/exam/:id'
          render={(props) => requireAuth(DashboardExamPage, props)}
        />
        <Route
          path='/exam_finished/:id'
          render={(props) => requireAuth(ExamFinishedPage, props)}
        />
        <Redirect strict from="/" to="/login" />
      </Switch>
    </Router>
  );
}
