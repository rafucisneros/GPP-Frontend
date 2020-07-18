import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import { Redirect } from 'react-router-dom';

const DataTable = ({ 
  title, columns, data, grouping, selection, exportButton, toolbar,
  showSelectAllCheckbox, actionsColumnIndex, onRowAdd, onRowUpdate, onRowDelete,
  isCalificacion, isEstadistica, customExam
}) => {

  const [ redirectEstadistica, setRedirectEstadistica ] = useState(false);
  const [ redirectCalificaciones, setRedirectCalificaciones ] = useState(null);
  const [ idExam, setIdExam ] = useState(null);

  const handleRedirectEstadistica = (rowData) => {
    setRedirectEstadistica(`estadisticas/exam/${rowData.id}`);
  }

  const handleRedirectEditExam = (rowData) => {
    setRedirectEstadistica(`examen/${rowData.id}`);
  }

  const handleRedirectCalificaciones = () => setRedirectCalificaciones(true);

    return (
      <Fragment>
        { redirectEstadistica && <Redirect push to={redirectEstadistica}/> }
        { redirectCalificaciones && <Redirect push to={"examen/1/calificaciones"}/> }
        <MaterialTable
          style={{width: "100%"}}
          title={title}
          columns={columns}
          data={[...data]}
          options={{
            grouping: grouping,
            selection: selection,
            // exportButton: exportButton,
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
          editable={ !customExam && {
            onRowAdd: onRowAdd,
            onRowUpdate: onRowUpdate,                   
            onRowDelete: onRowDelete
          }}
          actions={[
            {
              icon: 'list_alt',
              tooltip: 'Calificaciones',
              // onClick: (event, rowData) => alert("You saved " + rowData.name),
              onClick: (event, rowData) => handleRedirectCalificaciones(),
              hidden: !isCalificacion
            },
            {
              icon: 'bar_chart',
              tooltip: 'Estadísticas',
              onClick: (event, rowData) => handleRedirectEstadistica(rowData),
              hidden: !isEstadistica
            },
            {
              icon: 'edit',
              tooltip: 'Editar Examen',
              onClick: (event, rowData) => handleRedirectEditExam(rowData),
              hidden: !customExam
            },
            {
              icon: 'delete_forever',
              tooltip: 'Eliminar Examen',
              onClick: (event, rowData) => {alert("Borrar elemento")},
              hidden: !customExam
            }
          ]}
        />
      </Fragment>
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