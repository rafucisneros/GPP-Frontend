import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
// import uuid from 'uuid/v1';
// import moment from 'moment';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import MaterialTable from "material-table";
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

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
    const { className, secciones, seccionSeleccionada, estudiantes, handleAgregarEstudiante, ...rest } = props;
    // const [ estudiantes, handleAgregarEstudiante ] = useState(res);
    // const [selectedUsers, setSelectedUsers] = useState([]);
    const [columns, setColumns] = useState([
        { title: 'Nombre', field: 'name' },
        { title: 'Correo Electrónico', field: 'email' },
    ]);

    return (
        <Fragment>
            { seccionSeleccionada &&
                <MuiThemeProvider theme={theme}>
                    <MaterialTable
                        title="Lista de Estudiantes"
                        columns={columns}
                        data={estudiantes}
                        options={{
                            grouping: true,
                            selection: true,
                            exportButton: true,
                            toolbar: true,
                            showSelectAllCheckbox: false,
                            actionsColumnIndex: -1,
                            rowStyle: rowData => ({ backgroundColor: rowData.tableData.checked ? 'rgb(238, 238, 238)' : '' }),
                            // selectionProps: rowData => ({
                            //     checked: rowData.name === 'Andrés Buelvas',
                            //     color: 'primary'
                            // })
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
                        // onSelectionChange={(rows) => alert('You selected ' + rows.length + ' rows')}
                        actions={[
                            // {
                            //     icon: 'save',
                            //     tooltip: 'Save User',
                            //     onClick: (event, rowData) => alert("You saved " + rowData.name)
                            // },
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
                                    const data = [...estudiantes];
                                    data.push(newData);
                                    handleAgregarEstudiante(data);
                                    
                                }, 1000);
                            }),
                            // onRowUpdate: (newData, oldData) =>
                            // new Promise((resolve) => {
                            //     setTimeout(() => {
                            //         if (oldData) {
                            //             setState(() => {
                            //             const data = [...prevState.data];
                            //             data[data.indexOf(oldData)] = newData;
                            //             return { ...prevState, data };
                            //             });
                            //         }
                            //         resolve();
                            //     }, 600);
                            // }),
                            onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    const data = [...estudiantes];
                                    data.splice(data.indexOf(oldData), 1);
                                    handleAgregarEstudiante(data);
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
    estudiantes: PropTypes.array.isRequired
};

export default ListaEstudiantes;