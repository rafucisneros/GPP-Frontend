import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
// import uuid from 'uuid/v1';
// import moment from 'moment';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import MaterialTable from "material-table";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#3f51b5',
            light: '#3f51b5',
            dark: '#3f51b5',
        }
    },
});

const ListaEstudiantes = props => {
    const { 
        className, 
        secciones, 
        seccionSeleccionada, 
        estudiantes, 
        handleAgregarEstudiante, 
        handleUpdateSecciones,
        ...rest 
    } = props;
    // const [ estudiantes, handleAgregarEstudiante ] = useState(res);
    // const [selectedUsers, setSelectedUsers] = useState([]);
    const [columns, setColumns] = useState([
        { title: 'Nombre', field: 'name' },
        { title: 'Correo Electrónico', field: 'email' },
    ]);
    const [data, setData] = useState([]);

    useEffect(() => {
        let identidad = (x) => x;
        setData([...estudiantes].map(identidad));
    }, [])

    useEffect(() => {
        let auxEstudiantes = [...data];
        if (seccionSeleccionada) {
            let finalData = auxEstudiantes.filter(value => {
                for( let estudiante of seccionSeleccionada.estudiantes ){
                    if(estudiante.email === value.email) {
                        estudiante.tableData.checked = true;
                        return estudiante;
                    }
                }
                value.tableData.checked = false;
                return value;
            })
            setData(finalData)
        } 
        
    }, [seccionSeleccionada])

    return (
        <Fragment>
            { seccionSeleccionada &&
                <MuiThemeProvider theme={theme}>
                    <MaterialTable
                        title="Lista de Estudiantes"
                        columns={columns}
                        data={[...data]}
                        options={{
                            grouping: true,
                            selection: true,
                            exportButton: true,
                            toolbar: true,
                            showSelectAllCheckbox: false,
                            actionsColumnIndex: -1,
                            rowStyle: rowData => ({ backgroundColor: rowData.tableData.checked ? 'rgb(238, 238, 238)' : '' }),
                            // selectionProps: rowData => ( console.log(rowData), ({
                            //     checked: rowData.tableData.checked,
                            //     color: 'secondary',
                            //     // disabled: rowData.tableData.checked
                            // }))
                        }}
                        localization={{
                            body: {
                                addTooltip: 'Agregar',
                                editRow : {
                                    cancelTooltip : 'Cancelar',
                                    saveTooltip : 'Guardar',
                                    deleteText: '¿Está seguro que desea eliminar este estudiante?',
                                    deleteTooltip: 'Eliminar'
                                }
                            },
                            header :{
                                actions: 'Acciones'
                            },
                            grouping: {
                                placeholder: 'Arrastre los encabezados aquí para agrupar por:'
                            },
                            toolbar: {
                                searchTooltip: 'Buscar',
                                searchPlaceholder : 'Buscar',
                                nRowsSelected: '{0} Fila(s) seleccionada(s)',
                                exportName: 'Exportar como CSV',
                                exportTitle: 'Exportar',
                                exportAriaLabel: 'Exportar'
                            },
                            pagination: {
                                labelRowsSelect: 'Filas por Página',
                                labelDisplayedRows: '{from}-{to} de {count}',
                                firstAriaLabel : 'Primera Página',
                                firstTooltip: 'Primera Página',
                                previousTooltip: 'Página Anterior',
                                nextTooltip: 'Siguiente Página',
                                lastTooltip: 'Última Página'
                            }
                        }}
                        onSelectionChange={(rows) => {
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    let nuevaSeccion = [...secciones];
                                    for( let seccion of nuevaSeccion){
                                        if (seccion.id === props.seccionSeleccionada.id) {
                                            seccion.estudiantes = rows;
                                            break;
                                        }    
                                    }
                                    resolve();
                                    handleUpdateSecciones(nuevaSeccion);

                                }, 600);
                            })
                        }}
                        actions={[
                            {
                                icon: 'delete',
                                tooltip: 'Eliminar Elemento',
                                onClick: (event, rowData) => window.confirm("¿Seguro que desea eliminar a " + rowData.name)
                                // disabled: rowData.birthYear < 2000
                            }
                        ]}
                        editable={{
                            onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    const auxData = [...estudiantes];
                                    auxData.push(newData);
                                    handleAgregarEstudiante(auxData);
                                    
                                }, 600);
                            }),
                            // onRowUpdate: (newData, oldData) =>
                            // new Promise((resolve) => {
                            //     setTimeout(() => {
                            //         if (oldData) {
                            //             setState(() => {
                            //             const auxData = [...prevState.auxData];
                            //             auxData[auxData.indexOf(oldData)] = newData;
                            //             return { ...prevState, auxData };
                            //             });
                            //         }
                            //         resolve();
                            //     }, 600);
                            // }),
                            onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    const auxData = [...estudiantes];
                                    const nuevaSeccion = [...secciones];

                                    auxData.splice(auxData.indexOf(oldData), 1);

                                    for( let seccion of nuevaSeccion ){
                                        if (seccion.id === props.seccionSeleccionada.id) {
                                            seccion.estudiantes.splice(seccion.estudiantes.indexOf(oldData), 1);
                                            break;
                                        }    
                                    }

                                    handleAgregarEstudiante(auxData);
                                    resolve();
                                    handleUpdateSecciones(nuevaSeccion);
                                    
                                }, 1000);
                            }),
                        }}
                    />
                </MuiThemeProvider>
            }
        </Fragment>
    );
};

ListaEstudiantes.propTypes = {
    className: PropTypes.string,
    // estudiantes: PropTypes.array.isRequired
};

export default ListaEstudiantes;