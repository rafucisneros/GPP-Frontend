import React, { Fragment, useState, useEffect } from 'react';

// material
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DataTable from '../componentes/datatable/DataTable.js'
import { Card, CardContent } from '@material-ui/core';

// context
import { useGeneral } from '../context/generalContext';

const columns = [
    { title: 'Nombres', field: 'first_name', defaultSort : 'asc' },
    { title: 'Apellidos', field: 'last_name' },
    { title: 'Nota (100%)', field: 'score_pct' },
    { title: 'Puntaje (35 ptos)', field: 'score' },
]

export default function EditTestPage(){

    const { setContentMenu } = useGeneral();
    const [ calificaciones, setCalificaciones ] = useState([
        {
            "first_name": "Andrés Alejandro",
            "last_name": "Buelvas Vergara",
            "score_pct": "100%",
            "score": 35,
        },
        {
            "first_name": "Rafael",
            "last_name": "Cisneros",
            "score_pct": "0%",
            "score": 0,
        }
    ]);
    setContentMenu(`edit_test`);

    useEffect(() => {

    },[])

    return (
    <Fragment>
        <div className="toolbar-icono"/>
        <Container maxWidth={false} style={{paddingTop: '32px'}}>
            <Grid container spacing={3}>
                {/* <Card style={{width: "100%"}}> */}
                    <CardContent style={{width: "100%"}}>
                        <DataTable 
                            title="Calificaciones" 
                            data={[...calificaciones]} 
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