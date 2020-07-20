import React, { Fragment, useState, useEffect } from 'react';

// material
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DataTable from '../componentes/datatable/DataTable.js'
import { Card, CardContent } from '@material-ui/core';
import Loading from '../componentes/loading/Loading.js';

// context
import { useGeneral } from '../context/generalContext';
import { Alert } from '../componentes/alert/Alert.js'

import { getResultsForExam } from '../servicios/servicioGeneral.js'

const columns = [
    { title: 'Alumno', field: 'name', defaultSort : 'asc' },
    { title: 'Correo', field: 'email', defaultSort : 'asc' },
    { title: 'Sección', field: 'section', defaultSort : 'asc' },
    { title: 'Puntaje Obtenido', field: 'score' },
    { title: 'Aprobado', field: 'approved' },
    { title: 'Intentos realizados', field: 'attempts' },
]

export default function EditTestPage(props){
    const examID = props.match.params.id;

    // Para el Alert
    const [ alertOpen, setAlertOpen] = useState(false)
    const [ errorMsg, setErrorMsg] = useState("")

    const { setContentMenu } = useGeneral();
    const [ calificaciones, setCalificaciones ] = useState(null);
    setContentMenu(`edit_test`);

    useEffect(() => {
        let fetchData = async () => {
            try {
                let response = await getResultsForExam(examID)
                let calificaciones = response.data.students.map( x => {
                    return {
                        ...x, 
                        score: x.score + "/" + response.data.total_score,
                        approved: x.passed ? "Si" : "No",
                        section: x.section.split(" ")[1]
                    }
                })
                setCalificaciones(calificaciones)
            } catch (error) {
                console.log(error)
                setErrorMsg("Ocurrio un error cargando las calificaciones")
                setAlertOpen(true)
            }
        }
        fetchData()
    },[])

    return (
    <Fragment>
        <div className="toolbar-icono"/>
        <Container maxWidth={false} style={{paddingTop: '32px'}}>
            <Grid container spacing={3}>
                {/* <Card style={{width: "100%"}}> */}
                    <CardContent style={{width: "100%"}}>
                        {calificaciones ?
                            <DataTable 
                                title="Calificaciones" 
                                data={[...calificaciones]} 
                                columns={columns} 
                                onRowAdd={()=>{}}
                                onRowDelete={()=>{}}
                                onRowUpdate={()=>{}}
                                customExam={true}
                            /> : <Loading/>
                        }
                    </CardContent>
                {/* </Card> */}
            </Grid>
        </Container>
        <Alert 
            open={alertOpen}
            setAlert={setAlertOpen}
            message={errorMsg}
        />
    </Fragment>
    );
}