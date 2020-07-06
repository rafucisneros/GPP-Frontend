import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Divider,
  Container
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { useUsuario } from '../context/usuarioContext.js'

export default function ProfilePage(){

  const [errores, setErrores] = useState({tituloError : false, duracionError : false, nroIntentosError: false, openExamError : false});
  const { usuario } = useUsuario();
  const [contraseñaNueva, setContraseñaNueva] = useState("");
  const [contraseñaNuevaConfirmar, setContraseñaNuevaConfirmar] = useState("");
  const [contraseñaActual, setContraseñaActual] = useState("");

  const handleCambiarNombre = () => {

  }

  const handleCambiarApellido = () => {

  }

  const handleCambiarEmail = () => {

  }

  const handleCambiarContraseñaNueva = (event) => {
    setContraseñaNueva(event.target.value)
  }
  
  const handleCambiarContraseñaNuevaConfirmar = (event) => {
    setContraseñaNuevaConfirmar(event.target.value)
  }

  const handleCambiarContraseñaActual = (event) => {
    setContraseñaActual(event.target.value)
  }

  return(
    <div>
      <div className="toolbar-icono"/>
      <Container maxWidth="lg" style={{paddingTop: '32px', paddingBottom: '32px', width : '100%'}}>
        <Grid container spacing={2}>
          <Card style={{width : '100%'}}>
            <form>
              <CardHeader
                subheader={`Aquí puedes modificar tu información personal.`}
                title="Perfil"
              />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={6} lg={6}>
                    <TextField
                      error={errores && errores.tituloError}
                      helperText={errores && errores.tituloError ? "El campo es requerido" : null}
                      id='nombre'
                      name='nombre'
                      type="text"
                      margin="normal"
                      label="Nombre"
                      required
                      value={usuario.first_name}
                      onChange={handleCambiarNombre}
                      variant="outlined"
                      fullWidth
                      autoFocus
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>                  
                  <Grid item xs={6} md={6} lg={6}>
                    <TextField
                      error={errores && errores.tituloError}
                      helperText={errores && errores.tituloError ? "El campo es requerido" : null}
                      id='apellido'
                      name='apellido'
                      type="text"
                      margin="normal"
                      label="Apellido"
                      required
                      value={usuario.last_name}
                      onChange={handleCambiarApellido}
                      variant="outlined"
                      fullWidth
                      autoFocus
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid> 
                  <Grid item xs={6} md={6} lg={6}>
                    <TextField
                      error={errores && errores.tituloError}
                      helperText={errores && errores.tituloError ? "El campo es requerido" : null}
                      id='email'
                      name='email'
                      type="text"
                      margin="normal"
                      label="Email"
                      required
                      value={usuario.email}
                      onChange={handleCambiarEmail}
                      variant="outlined"
                      fullWidth
                      autoFocus
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid> 
                </Grid>
              </CardContent>
              <Divider />
            </form>
          </Card>
          <Card style={{width : '100%'}}>
            <CardHeader
              subheader={`Aquí puedes modificar tu contraseña.`}
              title="Cambiar contraseña"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6} lg={6}>
                  <TextField
                    error={errores && errores.tituloError}
                    helperText={errores && errores.tituloError ? "El campo es requerido" : null}
                    id='contraseña_nueva'
                    name='contraseña_nueva'
                    type="text"
                    margin="normal"
                    label="Contraseña Nueva"
                    required
                    value={contraseñaNueva}
                    onChange={handleCambiarContraseñaNueva}
                    variant="outlined"
                    fullWidth
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid> 
                <Grid item xs={6} md={6} lg={6}>
                  <TextField
                    error={errores && errores.tituloError}
                    helperText={errores && errores.tituloError ? "El campo es requerido" : null}
                    id='contraseñaActual'
                    name='contraseñaActual'
                    type="text"
                    margin="normal"
                    label="Contraseña Actual"
                    required
                    value={contraseñaActual}
                    onChange={handleCambiarContraseñaActual}
                    variant="outlined"
                    fullWidth
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid> 
                <Grid item xs={6} md={6} lg={6}>
                  <TextField
                    error={errores && errores.tituloError}
                    helperText={errores && errores.tituloError ? "El campo es requerido" : null}
                    id='contraseñaNuevaConfirmacion'
                    name='contraseñaNuevaConfirmacion'
                    type="text"
                    margin="normal"
                    label="Confirmación Contraseña Nueva"
                    required
                    value={contraseñaNuevaConfirmar}
                    onChange={handleCambiarContraseñaNuevaConfirmar}
                    variant="outlined"
                    fullWidth
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid> 
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  )
}