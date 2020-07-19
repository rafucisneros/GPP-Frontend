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
import TestPreviewPage from './vistas/TestPreviewPage.js';

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

  const { usuario, cargandoUsuario } = useUsuario();

  const requireAuth = (Comp, props, rolesEnabled=null) => {
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
          // Permisologia 
          if(rolesEnabled){
            if(usuario.groups.length > 0 && !usuario.groups.map(x => x.name).some(role => rolesEnabled.includes(role))){
              console.log("Redirigiendo por permisos", usuario)
              return (<Redirect to="/home" />);
            } 
          }
          if(usuario.groups.length){
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
          } else {
            return (
              <div>
                <Loading/>
              </div>
            )
          }
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
          path='/presentar_examen/:id'
          render={(props) => requireAuth(MakeTestPage, props, ["Student"])}
        />
        <Route
          exact
          path='/crear_examen'
          render={(props) => requireAuth(CreateTestPage, props, ["Professor"])}
        />
        <Route
          exact
          path='/examen/:id'
          render={(props) => requireAuth(CreateTestPage, props, ["Professor"])}
        />
        <Route
          exact
          path='/examen/:id/calificaciones'
          render={(props) => requireAuth(CalificacionesPage, props, ["Professor"])}
        />
        <Route
          exact
          path='/examenes'
          render={(props) => requireAuth(ExamsPage, props, ["Professor", "Student"])}
        />
        <Route
          exact
          path='/admin'
          render={(props) => requireAuth(AdminPage, props, ["Admin"])}
        />
        <Route
          exact
          path='/perfil'
          render={(props) => requireAuth(ProfilePage, props)}
        />
        <Route
          path='/detalles_examen/:id'
          render={(props) => requireAuth(TestDetailsPage, props, ["Professor"])}
        />
        <Route
          path='/mantenimiento'
          render={(props) => <MantenimientoPage></MantenimientoPage>}
        />
        <Route
          exact
          path='/estadisticas/examen/:id'
          render={(props) => requireAuth(DashboardExamPage, props, ["Professor"])}
        />
        <Route
          path='/examen_terminado/:eid/estudiante/:sid'
          render={(props) => requireAuth(ExamFinishedPage, props, ["Student"])}
        />
        <Route
          path='/resumen_examen/:id'
          render={(props) => requireAuth(TestPreviewPage, props, ["Student"])}
        />
        <Redirect strict from="/" to="/login" />
      </Switch>
    </Router>
  );
}
