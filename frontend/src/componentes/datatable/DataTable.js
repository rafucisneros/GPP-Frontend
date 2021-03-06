import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import { Redirect } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import { TablePagination } from '@material-ui/core';

const DataTable = ({ 
  title, columns, data, grouping, selection, exportButton, toolbar, useActions,
  showSelectAllCheckbox, actionsColumnIndex, onRowAdd, onRowUpdate, onRowDelete,
  isCalificacion, isEstadistica, isTeachersExamList, handleToggleExamEnabled,
  onRowClick, customExam
}) => {

  const [ redirectEstadistica, setRedirectEstadistica ] = useState(false);
  const [ redirectCalificaciones, setRedirectCalificaciones ] = useState(null);
  const [ idExam, setIdExam ] = useState(null);

  const handleRedirectEstadistica = (rowData) => {
    setRedirectEstadistica(`estadisticas/examen/${rowData.id}`);
  }

  const handleRedirectEditExam = (rowData) => {
    setRedirectEstadistica(`examen/${rowData.id}`);
  }

  const handleRedirectCalificaciones = (rowData) => setRedirectCalificaciones(rowData.id);

    return (
      <Fragment>
        { redirectEstadistica && <Redirect push to={redirectEstadistica}/> }
        { redirectCalificaciones && <Redirect push to={`examen/${redirectCalificaciones}/calificaciones`}/> }
        <MaterialTable
          style={{width: "100%"}}
          title={title}
          columns={columns}
          data={[...data]}
          onRowClick={onRowClick}
          options={{
            grouping: grouping,
            selection: selection,
            // exportButton: exportButton,
            toolbar: toolbar,
            showSelectAllCheckbox: showSelectAllCheckbox,
            actionsColumnIndex: actionsColumnIndex,
            headerStyle: {
              textAlign : 'center',
              backgroundColor: '#3f51b5',
              color: '#FFF'
            },
            rowStyle: rowData => ({ 
              backgroundColor: rowData.tableData.checked ? 'rgb(238, 238, 238)' : '',
            }),
          }}
          localization={{
            body: {
              addTooltip: 'Agregar',
              editRow : {
                cancelTooltip : 'Cancelar',
                saveTooltip : 'Guardar',
                deleteText: '??Est?? seguro que desea eliminar este registro?',
                deleteTooltip: 'Eliminar'
              }
            },
            header :{
              actions: 'Acciones',
            },
            grouping: {
              placeholder: 'Arrastre los encabezados aqu?? para agrupar por:'
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
              labelRowsSelect: 'Filas por P??gina',
              labelDisplayedRows: '{from}-{to} de {count}',
              firstAriaLabel : 'Primera P??gina',
              firstTooltip: 'Primera P??gina',
              previousTooltip: 'P??gina Anterior',
              nextTooltip: 'Siguiente P??gina',
              lastTooltip: '??ltima P??gina'
            }
          }}
          editable={ !customExam && {
            onRowAdd: onRowAdd,
            onRowUpdate: onRowUpdate,                   
            onRowDelete: onRowDelete
          }}
          actions={ useActions ? [
            rowData => ({
              icon: ()=>{
                return <Switch
                  checked={rowData.status}
                  name="enabled"
                  color="primary"
                />
              },
              // iconProps: rowdata,
              tooltip: 'Habilitar/Deshabilitar',
              onClick: handleToggleExamEnabled,
              hidden: !isTeachersExamList
            }),
            {
              icon: 'list_alt',
              tooltip: 'Calificaciones',
              // onClick: (event, rowData) => alert("You saved " + rowData.name),
              onClick: (event, rowData) => handleRedirectCalificaciones(rowData),
              hidden: !isCalificacion
            },
            {
              icon: 'bar_chart',
              tooltip: 'Estad??sticas',
              onClick: (event, rowData) => handleRedirectEstadistica(rowData),
              hidden: !isEstadistica
            },
            {
              icon: 'edit',
              tooltip: 'Editar Examen',
              onClick: (event, rowData) => handleRedirectEditExam(rowData),
              hidden: !customExam
            },
            // {
            //   icon: 'delete_forever',
            //   tooltip: 'Eliminar Examen',
            //   onClick: (event, rowData) => {alert("Borrar elemento")},
            //   hidden: !customExam
            // }
          ] : null}
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
  isTeachersExamList: PropTypes.bool,
  showSelectAllCheckbox: PropTypes.bool,
  useActions: PropTypes.bool,
  actionsColumnIndex: PropTypes.number,
  onRowAdd: PropTypes.func,
  onRowUpdate: PropTypes.func,
  onRowDelete: PropTypes.func,
  handleToggleExamEnabled: PropTypes.func,
};

DataTable.defaultProps = {
  isTeachersExamList: false,
  useActions: true, 
  grouping: true, 
  selection: true,
  exportButton: true,
  toolbar: true,
  showSelectAllCheckbox: true,
  actionsColumnIndex: -1,
}
export default DataTable;