import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DataTable from '../datatable/DataTable.js';

const columns = [
    { title: 'Nombres', field: 'first_name', defaultSort : 'asc' },
    { title: 'Apellidos', field: 'last_name' },
    { title: 'Correo Electrónico', field: 'email' },
]

const ListaProfesores = (props) => {
    const [ data, setData ] = useState([{first_name: "Rafito", last_name: "Cisneros", email: "gmail"}]);

    useEffect(() => {

    }, [])

    const handleAgregarProfesor = (profesor) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          // Agregar en el servidor
          if(true){ // Se agrego correctamente en el servidor
            let newData = [...data]
            newData.push(profesor)
            setData(newData)
          } 
          resolve();
        }, 1000);
      })
    }
      

    const handleBorrarProfesor = (profesor) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          // Agregar en el servidor
          if(true){ // Se agrego correctamente en el servidor
            let newData = [...data]
            let index = newData.indexOf(profesor)
            newData.splice(index, 1)
            setData(newData)
          } 
          resolve();
        }, 1000);
      })
    }
      
    const handleModificarProfesor = (profesor) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          // Agregar en el servidor
          if(true){ // Se agrego correctamente en el servidor
            let newData = [...data]
            let index = newData.indexOf(profesor)
            newData.splice(index, 1, profesor)
            setData(newData)
          } 
          resolve();
        }, 1000);
      })
    }

    return (
      <DataTable 
        title="Lista de Profesores" 
        data={data} 
        columns={columns} 
        onRowAdd={handleAgregarProfesor}
        onRowDelete={handleBorrarProfesor}
        onRowUpdate={handleModificarProfesor}
      />
    );
};

ListaProfesores.propTypes = {
    className: PropTypes.string,
    // estudiantes: PropTypes.array.isRequired
};

export default ListaProfesores;