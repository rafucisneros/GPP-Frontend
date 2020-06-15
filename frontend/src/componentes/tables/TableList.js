import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const columns = [
    { title: 'Título', field: 'title', defaultSort : 'asc' },
    { title: 'Fecha de Inicio', field: 'init_date' },
    { title: 'Fecha de Fin', field: 'finish_date' },
    { title: 'Tipo de Examen', field: 'type' },
    { title: 'Restricciones', field: 'open' },
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

const TableList = (props) => {
    const [ data, setData ] = useState([]);

    return (
        <Fragment>
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
                    // onSelectionChange={(rows) => {
                    //     new Promise((resolve) => {
                    //         setTimeout(() => {
                    //             let nuevaSeccion = [...secciones];
                    //             for( let seccion of nuevaSeccion){
                    //                 if (seccion.id === seccionSeleccionada.id) {
                    //                     seccion.estudiantes = rows;
                    //                     break;
                    //                 }    
                    //             }
                    //             resolve();
                    //             handleChangeComp(nuevaSeccion, 'secciones');

                    //         }, 600);
                    //     })
                    // }}
                    actions={[
                        {
                            icon: 'delete',
                            tooltip: 'Eliminar Elemento',
                            onClick: (event, rowData) => window.confirm("¿Seguro que desea eliminar a " + rowData.name)
                            // disabled: rowData.birthYear < 2000
                        },
                        {
                            icon: 'edit',
                            tooltip: 'Eliminar Elemento',
                            onClick: (event, rowData) => window.confirm("¿Seguro que desea eliminar a " + rowData.name)
                            // disabled: rowData.birthYear < 2000
                        }
                    ]}
                />
            </MuiThemeProvider>
        </Fragment>
    );
};

TableList.propTypes = {
    className: PropTypes.string,
};

export default TableList;