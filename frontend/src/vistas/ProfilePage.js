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
import { useGeneral } from '../context/generalContext'
import { patchUser } from '../servicios/servicioAdmin.js'
import { postUserPassword } from '../servicios/servicioUsuario.js'
import { Alert } from '../componentes/alert/Alert.js'

export default function ProfilePage(){

  const [errores, setErrores] = useState({tituloError : false, duracionError : false, nroIntentosError: false, openExamError : false});
  const { usuario, setUsuario } = useUsuario();
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

  const { setContentMenu } = useGeneral();
  setContentMenu('perfil');

  const changeProfile = async () => {
    try{
      let newUser = {...usuario}
      newUser["first_name"] =  nombre
      newUser["last_name"] = apellido
      newUser["email"] = email 
      delete newUser["groups"]
      let modificandoPerfil = await patchUser(usuario.id, newUser)
      setSuccessMsg("Modificado Exitosamente")
      setAlertSuccessOpen(true)
      newUser = {...usuario}
      newUser["first_name"] =  nombre
      newUser["last_name"] = apellido
      newUser["email"] = email 
      setUsuario(newUser)

    } catch (error) {
      let mensaje = "Ocurrio un error modificando el perfil"
      if(typeof(error.data.email) === "object"){
        if(error.data.email.includes("Enter a valid email address.")){
          mensaje += ": Ingrese un correo electrónico válido."
        }
      }
      setErrorMsg(mensaje)
      setAlertOpen(true)
    }
  }
 
  const changePassword = async () => {
    try{
      if(!contraseñaNuevaConfirmar || !contraseñaNueva || !contraseñaActual){
        setErrorMsg("Por favor complete todos los campos")
        setAlertOpen(true)
        return
      }
      if(contraseñaNuevaConfirmar !== contraseñaNueva){
        setErrorMsg("Las contraseñas no coinciden")
        setAlertOpen(true)
        return
      }
      let req = {
        email: usuario.email,
        password: contraseñaActual,
        new_password: contraseñaNueva
      }
      let modificandoContraseña = await postUserPassword(req)
      setSuccessMsg("Modificado Exitosamente")
      setAlertSuccessOpen(true)
    } catch {
      setErrorMsg("Ocurrio un error modificando el perfil")
      setAlertOpen(true)
    }
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
        <Grid container spacing={3} >
          <Grid item xs={12} md={12} lg={12}>
            <Card style={{width : '100%'}}>
              <form>
                <CardHeader
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
                        onChange={(event) => setNombre(event.target.value)}
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
                        onChange={(event) => setApellido(event.target.value)}
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
                        onChange={(event) => setEmail(event.target.value)}
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
          </Grid> 
          <Grid item xs={12} md={12} lg={12}>
            <Card style={{width : '100%'}}>
              <CardHeader
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
                      type="password"
                      margin="normal"
                      label="Contraseña Nueva"
                      required
                      value={contraseñaNueva}
                      onChange={(event) => setContraseñaNueva(event.target.value)}
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
                      type="password"
                      margin="normal"
                      label="Contraseña Actual"
                      required
                      value={contraseñaActual}
                      onChange={(event) => setContraseñaActual(event.target.value)}
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
                      type="password"
                      margin="normal"
                      label="Confirmación Contraseña Nueva"
                      required
                      value={contraseñaNuevaConfirmar}
                      onChange={(event) => setContraseñaNuevaConfirmar(event.target.value)}
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