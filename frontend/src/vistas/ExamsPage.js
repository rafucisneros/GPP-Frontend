import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';

// material
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DataTable from '../componentes/datatable/DataTable.js'
import { Card, CardContent } from '@material-ui/core';

// context
import { useGeneral } from '../context/generalContext';

// servicios
import { getExams } from '../servicios/servicioGeneral';

const columns = [
    { title: 'ID', field: 'id'},
    // { title: 'ID', field: 'id', hidden: true},
    { title: 'Nombre', field: 'name', defaultSort : 'asc' },
    { title: 'Fecha Inicio', field: 'start_date', render: rowData => {
        return moment(rowData.start_date).format('DD/MM/YYYY hh:mm a');
    } },
    { title: 'Fecha Fin', field: 'finish_date', render: rowData => {
        return moment(rowData.finish_date).format('DD/MM/YYYY hh:mm a');
    } },
    { title: 'Duracion', field: 'duration', render: rowData => {
        let hora = parseInt(rowData.duration / 60);
        if (hora >= 1) return `${hora} h ${rowData.duration % 60} min`
        else return `${rowData.duration % 60} min`
    }  },
    { title: 'Estático o Dinámico', field: 'static', render: rowData => {
        if (rowData.static) return 'Dinámico'
        else return 'Estático'
    } },
    { title: 'Público o Secciones', field: 'open', render: rowData => {
        if (rowData.open) return 'Público'
        else return 'Secciones'
    }  }
]

export default function ExamsPage(){

    const { setContentMenu } = useGeneral();
    // const [examanes, setExamanes] = useState([]);
    const [examanes, setExamanes] = useState([]);
    setContentMenu(`edit_test`);

    // GET requests y componentes de montaje
    useEffect(() => {
        getExams()
        .then( res => {
            if (res.data) {
                console.log(res)
                setExamanes(res.data.results);
            }
        })
    }, [])

    return (
    <Fragment>
        <div className="toolbar-icono"/>
        <Container maxWidth={false} style={{paddingTop: '32px'}}>
            {/* <Grid container spacing={3} >
                <Box style={{display: 'flex', marginBottom : '12px', paddingLeft : '12px', paddingRight : '12px', width : '100%'}}>
                    <Grid item style={{display: 'flex', alignSelf: 'center'}}>
                        <Typography variant="h6">
                            Lista de Examenes
                        </Typography>
                    </Grid>
                </Box>
            </Grid> */}
            <Grid container spacing={3}>
                {/* <Card style={{width: "100%"}}> */}
                    <CardContent style={{width: "100%"}}>
                        <DataTable 
                            title="Lista de Examenes" 
                            data={[...examanes]} 
                            columns={columns} 
                            onRowAdd={()=>{}}
                            onRowDelete={()=>{}}
                            onRowUpdate={()=>{}}
                            isCalificacion={true}
                            isEstadistica={true}
                            selection={false}
                            customExam={true}
                        />
                    </CardContent>
                {/* </Card> */}
            </Grid>
        </Container>
    </Fragment>
    );
}