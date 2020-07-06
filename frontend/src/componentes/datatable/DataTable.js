import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from "material-table";

const DataTable = ({ 
  title, columns, data, grouping, selection, exportButton, toolbar,
  showSelectAllCheckbox, actionsColumnIndex, onRowAdd, onRowUpdate, onRowDelete
}) => {
    return (
      <MaterialTable
        style={{width: "100%"}}
        title={title}
        columns={columns}
        data={[...data]}
        options={{
          grouping: grouping,
          selection: selection,
          exportButton: exportButton,
          toolbar: toolbar,
          showSelectAllCheckbox: showSelectAllCheckbox,
          actionsColumnIndex: actionsColumnIndex,
          rowStyle: rowData => ({ backgroundColor: rowData.tableData.checked ? 'rgb(238, 238, 238)' : '' }),
        }}
        localization={{
          body: {
            addTooltip: 'Agregar',
            editRow : {
              cancelTooltip : 'Cancelar',
              saveTooltip : 'Guardar',
              deleteText: '¿Está seguro que desea eliminar este registro?',
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
          }
        ]}
        editable={{
          onRowAdd: onRowAdd,
          onRowUpdate: onRowUpdate,                   
          onRowDelete: onRowDelete
        }}
      />
    );
};

DataTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array,
  grouping: PropTypes.bool,
  selection: PropTypes.bool,
  exportButton: PropTypes.bool,
  toolbar: PropTypes.bool,
  showSelectAllCheckbox: PropTypes.bool,
  actionsColumnIndex: PropTypes.number,
  onRowAdd: PropTypes.func,
  onRowUpdate: PropTypes.func,
  onRowDelete: PropTypes.func,
};

DataTable.defaultProps = {
  grouping: true, 
  selection: true,
  exportButton: true,
  toolbar: true,
  showSelectAllCheckbox: true,
  actionsColumnIndex: -1,
}
export default DataTable;