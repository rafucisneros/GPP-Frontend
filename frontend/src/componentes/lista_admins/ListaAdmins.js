import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import DataTable from '../datatable/DataTable.js';
import { getAdmins, deleteUser, postSignUp, putUser } from '../../servicios/servicioAdmin.js';
import { Alert } from '../alert/Alert.js';

const columns = [
    { title: 'Nombres', field: 'first_name', defaultSort : 'asc' },
    { title: 'Apellidos', field: 'last_name' },
    { title: 'Correo Electrónico', field: 'email' },
]

const ListaAdmins = (props) => {
    const [ data, setData ] = useState([]);

    const [ alertOpen, setAlertOpen] = useState(false)
    const [ errorMsg, setErrorMsg] = useState("")
 
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
            admin["password"] = "123456789"
            admin["role"] = "Admin"
            let addingUser = await postSignUp(admin)
            let newData = [...data]
            newData.push(admin)
            setData(newData)
            resolve();
          } catch {
            setErrorMsg("Error agregando el admin")
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
            debugger
            let editingUser = await putUser(admin.id, admin)
            let newData = [...data]
            let index = newData.indexOf(admin)
            newData.splice(index, 1, admin)
            setData(newData)
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
      <Fragment>
        <DataTable 
          title="Lista de Administradores" 
          data={data} 
          columns={columns} 
          onRowAdd={handleAgregarAdmin}
          onRowDelete={handleBorrarAdmin}
          onRowUpdate={handleModificarAdmin}
        />
        <Alert 
          open={alertOpen}
          setAlertError={setAlertOpen}
          errorMsg={errorMsg}
        />
      </Fragment>
    );
};

ListaAdmins.propTypes = {
    className: PropTypes.string,
    // estudiantes: PropTypes.array.isRequired
};

export default ListaAdmins;