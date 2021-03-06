import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// contexts
import { useCreateTestPage } from '../../context/createTestPageContext';

const defaultStyle = {
    cellStyle: {
        textAlign : 'center'
    },
}

const columns = [
    { 
        title: 'Nombres', 
        field: 'first_name',
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

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#3f51b5',
            light: '#3f51b5',
            dark: '#3f51b5',
        }
    },
});

const ListaEstudiantes = (props) => {
    const { handleAgregarEstudiante } = props;
    const [ data, setData ] = useState([]);
    const { 
        handleChangeComp,
        seccionSeleccionada,
        secciones,
        estudiantes,
        missingEstudiantes
    } = useCreateTestPage();

    useEffect(() => {
        const aux = estudiantes.map( value => { return {...value} });
        setData(aux);
    }, [estudiantes])

    useEffect(() => {
        let auxEstudiantes = estudiantes.map( value => { return {...value} });
        if (seccionSeleccionada) {
            // for(let estudiante of auxEstudiantes){
            //     let encontrado = false;
            //     let count = 0;
            //     for(let seccion of secciones) {
            //         if(seccionSeleccionada.id === seccion.id){
            //             for( let estudianteSeleccionado of seccionSeleccionada.estudiantes) {
            //                 if(estudianteSeleccionado.email === estudiante.email) {
            //                     estudiante.tableData = {};
            //                     estudiante.tableData.checked = true;
            //                     finalData.push(estudiante);
            //                     encontrado = true;
            //                     break;
            //                 }
            //             }
            //         } else if (seccionSeleccionada.id !== seccion.id) {
            //             for( let estudianteNoSeleccionado of seccion.estudiantes) {
            //                 if(estudianteNoSeleccionado.email === estudiante.email) {
            //                     encontrado = true;
            //                     break;
            //                 }
            //             }
            //         } 
            //         count++;
            //         if (encontrado) {
            //             break;
            //         } else {
            //             if(count === lenSecciones){
            //                 estudiante.tableData = {};
            //                 estudiante.tableData.checked = false;
            //                 finalData.push(estudiante);
            //             }
            //         }
            //     }
            // }
            let finalData = [];            
            for( let estudianteSeleccionado of seccionSeleccionada.estudiantes) {
                // Checked missing emails
                if (missingEstudiantes[seccionSeleccionada.id] && missingEstudiantes[seccionSeleccionada.id].includes(estudianteSeleccionado.email)) {
                    let newStudent = { email : estudianteSeleccionado.email }
                    newStudent.tableData = {};
                    newStudent.tableData.checked = true;
                    finalData.push(newStudent);
                } else {
                    // Checked
                    for(let estudiante of auxEstudiantes){ 
                        if(estudianteSeleccionado.email === estudiante.email) {
                            estudiante.tableData = {};
                            estudiante.tableData.checked = true;
                            finalData.push(estudiante);
                            break;
                        }
                    }
                }
            }

            let lenSecciones = secciones.length;
            for(let estudiante of auxEstudiantes){
                let encontrado = false;
                let count = 0;
                for(let seccion of secciones) {
                    if(seccionSeleccionada.id === seccion.id){
                        for(let infoSection of finalData ){
                            if(infoSection.email === estudiante.email) {
                                encontrado = true;
                                break;
                            }
                        }
                    } else if (seccionSeleccionada.id !== seccion.id) {
                        for( let estudianteNoSeleccionado of seccion.estudiantes) {
                            if(estudianteNoSeleccionado.email === estudiante.email) {
                                encontrado = true;
                                break;
                            }
                        }
                    } 
                    count++;
                    if (encontrado) {
                        break;
                    } else {
                        if(count === lenSecciones){
                            estudiante.tableData = {};
                            estudiante.tableData.checked = false;
                            finalData.push(estudiante);
                        }
                    }
                }
            }
            
            for(let email of missingEstudiantes['ALL']){
                let encontrado = false;
                let count = 0;
                for(let seccion of secciones) {
                    if(seccionSeleccionada.id === seccion.id){
                        for(let infoSection of finalData ){
                            if(infoSection.email === email) {
                                encontrado = true;
                                break;
                            }
                        }
                    } else if (seccionSeleccionada.id !== seccion.id) {
                        for( let estudianteNoSeleccionado of seccion.estudiantes) {
                            if(estudianteNoSeleccionado.email === email) {
                                encontrado = true;
                                break;
                            }
                        }
                    } 
                    count++;
                    if (encontrado) {
                        break;
                    } else {
                        if(count === lenSecciones){
                            let studentInfo = { email : email };
                            studentInfo.tableData = {};
                            studentInfo.tableData.checked = false;
                            finalData.push(studentInfo);
                        }
                    }
                }
            }
            // for(let estudiante of auxEstudiantes){
            //     let encontrado = false;
            //     for(let infoSection of finalData ){
            //         if(infoSection.email === estudiante.email) {
            //             encontrado = true;
            //             break;
            //         }
            //     }
            //     if (!encontrado){
            //         estudiante.tableData = {};
            //         estudiante.tableData.checked = false;
            //         finalData.push(estudiante);
            //     }
            // }
            // props.handleLoading(false);
            setData(finalData);
        }
        
    }, [seccionSeleccionada, estudiantes])

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
                            // exportButton: true,
                            toolbar: true,
                            showSelectAllCheckbox: false,
                            actionsColumnIndex: -1,
                            headerStyle: {
                                textAlign : 'center',
                                backgroundColor: '#3f51b5',
                                color: '#FFF'
                            },
                            rowStyle: rowData => ({ backgroundColor: rowData.tableData.checked ? 'rgb(238, 238, 238)' : '' }),
                            // selectionProps: rowData => ( console.log(rowData), ({
                            //     checked: rowData.tableData.checked,
                            //     color: 'secondary',
                            //     // disabled: rowData.tableData.checked
                            // }))
                        }}
                        localization={{
                            body: {
                                addTooltip: 'Agregar Estudiante',
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
                                        if (seccion.id === seccionSeleccionada.id) {
                                            seccion.estudiantes = rows;
                                            break;
                                        }    
                                    }
                                    resolve();
                                    handleChangeComp(nuevaSeccion, 'secciones');

                                }, 600);
                            })
                        }}
                        actions={[
                            rowData => ({
                                icon: 'delete',
                                tooltip: 'Eliminar Elemento',
                                onClick: (event, rowData) => window.confirm("¿Seguroooo que desea eliminar a " + rowData.name),
                                hidden: !rowData.no_hidden
                            }),
                        ]}
                        editable={{
                            onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    const auxData = [...estudiantes];
                                    newData.no_hidden = false;
                                    auxData.push(newData);
                                    handleAgregarEstudiante(auxData);
                                }, 600);
                            }),
                            onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    const auxData = [...estudiantes];
                                    const nuevaSeccion = [...secciones];
                                    auxData.splice(auxData.indexOf(oldData), 1);

                                    for( let seccion of nuevaSeccion ){
                                        if (seccion.id === seccionSeleccionada.id) {
                                            seccion.estudiantes.splice(seccion.estudiantes.indexOf(oldData), 1);
                                            break;
                                        }    
                                    }

                                    handleAgregarEstudiante(auxData);
                                    resolve();
                                    handleChangeComp(nuevaSeccion, 'secciones');
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