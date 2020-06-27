import React, { Fragment, useState, useEffect } from 'react';

// material
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DataTable from '../componentes/datatable/DataTable.js'
import { Card, CardContent } from '@material-ui/core';

// context
import { useGeneral } from '../context/generalContext';

const columns = [
    { title: 'Nombre', field: 'name', defaultSort : 'asc' },
    { title: 'Fecha Inicio', field: 'start_date' },
    { title: 'Fecha Fin', field: 'finish_date' },
    { title: 'Duracion', field: 'duration' },
]

export default function EditTestPage(){

    const { setContentMenu } = useGeneral();
    // const [examanes, setExamanes] = useState([]);
    const [examanes, setExamanes] = useState([
        {
            "id": 1,
            "name": "Primer examen",
            "status": true,
            "start_date": "2020-02-20T21:00:26Z",
            "finish_date": "2020-02-20T23:00:38Z",
            "author": 1,
            "duration": 166,
            "attempt": null,
            "static": true
        }
    ]);
    setContentMenu(`edit_test`);

    useEffect(() => {

    },[])

    return (
    <Fragment>
        <div className="toolbar-icono"/>
        <Container maxWidth={false} style={{paddingTop: '32px'}}>
            <Grid container spacing={3} >
                <Box style={{display: 'flex', marginBottom : '12px', paddingLeft : '12px', paddingRight : '12px', width : '100%'}}>
                    <Grid item style={{display: 'flex', alignSelf: 'center'}}>
                        <Typography variant="h6">
                            Examenes Creados
                        </Typography>
                    </Grid>
                </Box>
            </Grid>
            <Grid container spacing={3}>
                {/* <Card style={{width: "100%"}}> */}
                    <CardContent style={{width: "100%"}}>
                        <DataTable 
                            title="Lista de Examenes Creados" 
                            data={[...examanes]} 
                            columns={columns} 
                            onRowAdd={()=>{}}
                            onRowDelete={()=>{}}
                            onRowUpdate={()=>{}}
                        />
                    </CardContent>
                {/* </Card> */}
            </Grid>
        </Container>
    </Fragment>
    );
}