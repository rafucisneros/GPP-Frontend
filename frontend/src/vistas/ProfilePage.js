import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Divider,
  Container,
  Button
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { useUsuario } from '../context/usuarioContext.js'
import { patchUser } from '../servicios/servicioAdmin.js'
import { Alert } from '../componentes/alert/Alert.js'

export default function ProfilePage(){

  const [errores, setErrores] = useState({tituloError : false, duracionError : false, nroIntentosError: false, openExamError : false});
  const { usuario } = useUsuario();
  const [contraseñaNueva, setContraseñaNueva] = useState("");
  const [contraseñaNuevaConfirmar, setContraseñaNuevaConfirmar] = useState("");
  const [contraseñaActual, setContraseñaActual] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");

  // Para el Alert
  const [ alertOpen, setAlertOpen] = useState(false)
  const [ errorMsg, setErrorMsg] = useState("")
  const [ alertSuccessOpen, setAlertSuccessOpen] = useState(false)
  const [ successMsg, setSuccessMsg] = useState("")

  const handleCambiarNombre = (event) => {
    setNombre(event.target.value)
  }

  const handleCambiarApellido = (event) => {
    setApellido(event.target.value)
  }
  
  const handleCambiarEmail = (event) => {
    setEmail(event.target.value)
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

  const changeProfile = async () => {
    try{
      debugger
      let newUser = {...usuario}
      newUser["first_name"] =  nombre
      newUser["last_name"] = apellido
      newUser["email"] = email 
      let modificandoPerfil = await patchUser(usuario.id, newUser)
      setSuccessMsg("Modificado Exitosamente")
      setAlertSuccessOpen(true)
    } catch {
      setErrorMsg("Ocurrio un error modificando el perfil")
      setAlertOpen(true)
    }
  }
 
  const changePassword = async () => {

  }

  useEffect(() => {
    setNombre(usuario.first_name)
    setApellido(usuario.last_name)
    setEmail(usuario.email)
  }, [usuario])

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
                      value={nombre}
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
                      value={apellido}
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
                      value={email}
                      onChange={handleCambiarEmail}
                      variant="outlined"
                      fullWidth
                      autoFocus
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid> 
                  <Grid item xs={6} md={6} lg={6}>
                    <Grid
                      container
                      direction="row"
                      justify="flex-end"
                      alignItems="flex-end"
                      style={{height: "100%"}}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={changeProfile}
                      >
                        Cambiar Perfil
                      </Button> 
                    </Grid>
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
                <Grid item xs={6} md={6} lg={6}>
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-end"
                    style={{height: "100%"}}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={changePassword}
                    >
                      Cambiar contraseña
                    </Button> 
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Container>
      <Alert 
          open={alertOpen}
          setAlert={setAlertOpen}
          message={errorMsg}
        />
      <Alert 
          open={alertSuccessOpen}
          setAlert={setAlertSuccessOpen}
          message={successMsg}
          severity="success"
        />
    </div>
  )
}