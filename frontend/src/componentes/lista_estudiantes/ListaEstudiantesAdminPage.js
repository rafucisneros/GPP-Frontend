import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import DataTable from '../datatable/DataTable.js';
import { getStudents, postSignUp, deleteUser, postUser, putUser } from '../../servicios/servicioAdmin.js';
import { Alert } from '../alert/Alert.js';

const columns = [
    { title: 'Nombres', field: 'first_name', defaultSort : 'asc' },
    { title: 'Apellidos', field: 'last_name' },
    { title: 'Correo Electrónico', field: 'email' },
]

const ListaEstudiantes = (props) => {
    const [ data, setData ] = useState([]);
    const [ alertOpen, setAlertOpen] = useState(false)
    const [ errorMsg, setErrorMsg] = useState("")

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
            estudiante["password"] = "123456789"
            estudiante["role"] = "Student"
            let addingUser = await postSignUp(estudiante)
            let newData = [...data]
            newData.push(estudiante)
            setData(newData)
            resolve();
          } catch {
            setErrorMsg("Error agregando estudiante")
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
            resolve();
          } catch {
            setErrorMsg("Error borrando el estudiante")
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
            debugger
            let editingUser = await putUser(estudiante.id, estudiante)
            let newData = [...data]
            let index = newData.indexOf(estudiante)
            newData.splice(index, 1, estudiante)
            setData(newData)
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
      <Fragment>
        <DataTable 
          title="Lista de Estudiantes" 
          data={data} 
          columns={columns} 
          onRowAdd={handleAgregarEstudiante}
          onRowDelete={handleBorrarEstudiante}
          onRowUpdate={handleModificarEstudiante}
        />
        <Alert 
          open={alertOpen}
          setAlertError={setAlertOpen}
          errorMsg={errorMsg}
        />
      </Fragment>
      
    );
};

ListaEstudiantes.propTypes = {
    className: PropTypes.string,
    // estudiantes: PropTypes.array.isRequired
};

export default ListaEstudiantes;