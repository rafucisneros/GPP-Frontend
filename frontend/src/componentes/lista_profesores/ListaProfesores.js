import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import DataTable from '../datatable/DataTable.js';
import { getTeachers, postSignUp, deleteUser, postUser, patchUser } from '../../servicios/servicioAdmin.js';
import { Alert } from '../alert/Alert.js';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const columns = [
    { title: 'Nombres', field: 'first_name', defaultSort : 'asc' },
    { title: 'Apellidos', field: 'last_name' },
    { title: 'Correo Electrónico', field: 'email' },
]

const ListaProfesores = (props) => {
    const [ data, setData ] = useState([]);
    const [ alertOpen, setAlertOpen] = useState(false)
    const [ errorMsg, setErrorMsg] = useState("")
    const [ alertSuccessOpen, setAlertSuccessOpen] = useState(false)
    const [ successMsg, setSuccessMsg] = useState("")
    const [ password, setPassword ] = useState("123456789")
    useEffect(() => {
      let fetchData = async () => {
        try {
          let response = await getTeachers();
          setData(response.data.professor)
        } catch {
          alert("Error cargando Profesores")
        }
      }
      fetchData()
    }, [])

    const handleAgregarProfesor = (profesor) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            profesor["password"] = password
            profesor["role"] = "Professor"
            let addingUser = await postSignUp(profesor)
            let newData = [...data]
            newData.push(addingUser.data)
            setData(newData)
            setSuccessMsg("Agregado Exitosamente")
            setAlertSuccessOpen(true)
            resolve()
          } catch (error) {
            let mensaje = "Ocurrio un error agregando al profesor"
            if(typeof(error.data.email) === "object"){
              if(error.data.email.includes("Enter a valid email address.")){
                mensaje += ": Ingrese un correo electrónico válido."
              }
            }
            setErrorMsg(mensaje)
            setAlertOpen(true)
            reject()
          }
        }, 1000);
      })
    }
      
    const handleBorrarProfesor = (profesor) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            let deletingUser = await deleteUser(profesor.id)
            let newData = [...data]
            let index = newData.indexOf(profesor)
            newData.splice(index, 1)
            setData(newData)
            setSuccessMsg("Eliminado Exitosamente")
            setAlertSuccessOpen(true)
            resolve();
          } catch {
            setErrorMsg("Error borrando el profesor")
            setAlertOpen(true)
            reject()
          }
        }, 1000);
      })
    }
      
    const handleModificarProfesor = (profesor) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            let newProfe = {...profesor}
            delete newProfe["groups"]
            let editingUser = await patchUser(profesor.id, newProfe)
            let newData = [...data]
            let index = newData.indexOf(profesor)
            newData.splice(index, 1, profesor)
            setData(newData)
            setSuccessMsg("Modificado Exitosamente")
            setAlertSuccessOpen(true)
            resolve();
          } catch {
            setErrorMsg("Error modificando el profesor")
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
            title="Lista de Profesores" 
            data={data} 
            columns={columns} 
            onRowAdd={handleAgregarProfesor}
            onRowDelete={handleBorrarProfesor}
            onRowUpdate={handleModificarProfesor}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={6} style={{display: "flex", alignItems: "center"}}>  
          <Typography>
              Utilice el siguiente campo para asignar una contraseña para nuevos profesores:
          </Typography>
        </Grid>        
        <Grid item xs={6} md={6} lg={6}>          
          <TextField
            id='password'
            name='password'
            type="text"
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

ListaProfesores.propTypes = {
    className: PropTypes.string,
    // estudiantes: PropTypes.array.isRequired
};

export default ListaProfesores;