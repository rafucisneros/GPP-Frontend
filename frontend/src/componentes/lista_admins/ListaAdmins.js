import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import DataTable from '../datatable/DataTable.js';
import { getAdmins, deleteUser, postSignUp, patchUser } from '../../servicios/servicioAdmin.js';
import { Alert } from '../alert/Alert.js';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const columns = [
    { title: 'Nombres', field: 'first_name', defaultSort : 'asc' },
    { title: 'Apellidos', field: 'last_name' },
    { title: 'Correo Electrónico', field: 'email' },
]

const ListaAdmins = (props) => {
    const [ data, setData ] = useState([]);
    let [ password, setPassword ] = useState("123456789")

    const [ alertOpen, setAlertOpen] = useState(false)
    const [ errorMsg, setErrorMsg] = useState("")
    const [ alertSuccessOpen, setAlertSuccessOpen] = useState(false)
    const [ successMsg, setSuccessMsg] = useState("")
 
    useEffect(() => {
      let fetchData = async () => {
        try {
          let response = await getAdmins();
          setData(response.data.admin)
        } catch {
          setErrorMsg("Error cargando administradores")
          setAlertOpen(true)
        }
      }
      fetchData()
    }, [])

    const handleAgregarAdmin = (admin) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            admin["password"] = password
            admin["role"] = "Admin"
            let addingUser = await postSignUp(admin)
            let newData = [...data]
            newData.push(addingUser.data)
            setData(newData)
            setSuccessMsg("Agregado Exitosamente")
            setAlertSuccessOpen(true)
            resolve();
          } catch (error) {
            let mensaje = "Ocurrio un agregando al administrador"
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
      
    const handleBorrarAdmin = (admin) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            let deletingUser = await deleteUser(admin.id)
            let newData = [...data]
            let index = newData.indexOf(admin)
            newData.splice(index, 1)
            setData(newData)
            setSuccessMsg("Eliminado Exitosamente")
            setAlertSuccessOpen(true)
            resolve();
          } catch {
            setErrorMsg("Error borrando el admin")
            setAlertOpen(true)
            reject()
          }
        }, 1000);
      })
    }
      
    const handleModificarAdmin = (admin) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            let newAdmin = {...admin}
            delete newAdmin["groups"]
            let editingUser = await patchUser(admin.id, newAdmin)
            let newData = [...data]
            let index = newData.indexOf(admin)
            newData.splice(index, 1, admin)
            setData(newData)
            setSuccessMsg("Modificado Exitosamente")
            setAlertSuccessOpen(true)
            resolve();
          } catch {
            setErrorMsg("Error modificando el admin")
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
            title="Lista de Administradores" 
            data={data} 
            columns={columns} 
            onRowAdd={handleAgregarAdmin}
            onRowDelete={handleBorrarAdmin}
            onRowUpdate={handleModificarAdmin}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={6} style={{display: "flex", alignItems: "center"}}>  
          <Typography>
              Utilice el siguiente campo para asignar una contraseña para nuevos administradores:
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

ListaAdmins.propTypes = {
    className: PropTypes.string,
    // estudiantes: PropTypes.array.isRequired
};

export default ListaAdmins;