import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import DataTable from '../datatable/DataTable.js';
import { getStudents, postSignUp, deleteUser, postUser, patchUser } from '../../servicios/servicioAdmin.js';
import { Alert } from '../alert/Alert.js';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

const defaultStyle = {
  cellStyle: {
      textAlign : 'center'
  },
}

const columns = [
    { 
      title: 'Nombres', 
      field: 'first_name', 
      defaultSort : 'asc',
      ...defaultStyle
    },
    { 
      title: 'Apellidos', 
      field: 'last_name',
      ...defaultStyle
    },
    { 
      title: 'Correo Electrónico', 
      field: 'email',
      ...defaultStyle
    },
]

const ListaEstudiantes = (props) => {
    const [ data, setData ] = useState([]);
    const [ alertOpen, setAlertOpen] = useState(false)
    const [ errorMsg, setErrorMsg] = useState("")
    const [ alertSuccessOpen, setAlertSuccessOpen] = useState(false)
    const [ successMsg, setSuccessMsg] = useState("")
    const [ password, setPassword ] = useState("123456789")
    const [ showPassword, setShowPassword ] = useState(false)

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    useEffect(() => {
      let fetchData = async () => {
        try {
          let response = await getStudents();
          setData(response.data.student)
        } catch {
          alert("Error Cargando Estudiantes")
        }
      }
      fetchData()
    }, [])

    const handleAgregarEstudiante = (estudiante) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            estudiante["password"] = password
            estudiante["role"] = "Student"
            let addingUser = await postSignUp(estudiante)
            let newData = [...data]
            newData.push(addingUser.data)
            setData(newData)
            setSuccessMsg("Agregado Exitosamente")
            setAlertSuccessOpen(true)            
            resolve();
          } catch (error) {
            debugger
            let mensaje = "Ocurrio un error agregando al estudiante"
            if(typeof(error.data.email) === "object"){
              mensaje += ": " + error.data.email[0]
            }  
            setErrorMsg(mensaje)
            setAlertOpen(true)
            reject()
          }
        }, 1000);
      })
    }
      
    const handleBorrarEstudiante = (Estudiante) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            let deletingUser = await deleteUser(Estudiante.id)
            let newData = [...data]
            let index = newData.indexOf(Estudiante)
            newData.splice(index, 1)
            setData(newData)
            setSuccessMsg("Eliminado Exitosamente")
            setAlertSuccessOpen(true)            
            resolve();
          } catch (error) {
            let mensaje = "Ocurrio un error modificando al estudiante"
            if(typeof(error.data.email) === "object"){
              mensaje += ": " + error.data.email[0]
            }
            if(typeof(error.data.password) === "object"){
              mensaje += ": " + error.data.password[0].replace("este campo", "la contraseña")
            }
            setErrorMsg(mensaje)
            setAlertOpen(true)
            reject()
          }
        }, 1000);
      })
    }
      
    const handleModificarEstudiante = (estudiante) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            let newEstudiante = {...estudiante}
            delete newEstudiante["groups"]
            let editingUser = await patchUser(estudiante.id, newEstudiante)
            let newData = [...data]
            let index = newData.indexOf(estudiante)
            newData.splice(index, 1, estudiante)
            setData(newData)
            setSuccessMsg("Modificado Exitosamente")
            setAlertSuccessOpen(true)
            resolve();
          } catch {
            setErrorMsg("Error modificando el estudiante")
            setAlertOpen(true)
            reject()
          }
        }, 1000);
      })
    }

    return (
      <Grid container>
        <Grid item xs={12} md={12} lg={12}>
          <DataTable 
            title="Lista de Estudiantes" 
            data={data} 
            columns={columns} 
            onRowAdd={handleAgregarEstudiante}
            // onRowDelete={handleBorrarEstudiante}
            onRowUpdate={handleModificarEstudiante}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={6} style={{display: "flex", alignItems: "center"}}>  
          <Typography>
              Utilice el siguiente campo para asignar una contraseña para nuevos estudiantes:
          </Typography>
        </Grid>        
        <Grid item xs={6} md={6} lg={6}>          
          <TextField
            id='password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            label="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            variant="outlined"
            fullWidth
            autoFocus
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: 
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>,
            }}
          />
        </Grid>
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
      </Grid>      
    );
};

ListaEstudiantes.propTypes = {
    className: PropTypes.string,
    // estudiantes: PropTypes.array.isRequired
};

export default ListaEstudiantes;