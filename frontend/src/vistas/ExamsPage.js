import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';

// material
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DataTable from '../componentes/datatable/DataTable.js'
import { Card, CardContent } from '@material-ui/core';
import Loading from '../componentes/loading/Loading.js';

// context
import { useGeneral } from '../context/generalContext';
import { useUsuario } from '../context/usuarioContext';

// servicios
import { getExamsForTeacher, getResultsForStudent } from '../servicios/servicioGeneral';
import { createTest } from '../servicios/servicioCrearExamen.js';

import { Alert } from '../componentes/alert/Alert.js'
import { useHistory } from "react-router-dom"

const defaultStyle = {
    cellStyle: {
        textAlign : 'center'
    },
}

export default function ExamsPage(){

    const [ alertOpen, setAlertOpen] = useState(false)
    const [ errorMsg, setErrorMsg] = useState("")
    const [ columnas, setColumnas] = useState([])

    const { setContentMenu } = useGeneral();
    const { usuario } = useUsuario();
    const [examanes, setExamanes] = useState([]);
    const [loading, setLoading] = useState(true);
    setContentMenu(`home`);

    // GET requests y componentes de montaje
    useEffect(() => {
        const columns = usuario.groups.map(x => x.name).some(role => ["Professor"].includes(role)) ?
        // columnas para profesores 
        [
            { 
                title: 'ID', 
                field: 'id', 
                ...defaultStyle,
                // defaultSort : 'desc',
            },
            // { title: 'ID', field: 'id', hidden: true},
            { 
                title: 'Nombre', 
                field: 'name',
                ...defaultStyle
            },
            { 
                title: 'Fecha de Habilitación', 
                field: 'start_date', 
                render: rowData => {
                    return moment(rowData.start_date).format('DD/MM/YYYY hh:mm a');
                },
                ...defaultStyle
            },
            { 
                title: 'Fecha de Deshabilitación', 
                field: 'finish_date', 
                render: rowData => {
                    return moment(rowData.finish_date).format('DD/MM/YYYY hh:mm a');
                },
                ...defaultStyle
            },
            { 
                title: 'Duración', 
                field: 'duration', 
                render: rowData => {
                    let hora = parseInt(rowData.duration / 60);
                    if (hora >= 1) return `${hora} h ${rowData.duration % 60} min`
                    else return `${rowData.duration % 60} min`
                },
                ...defaultStyle
            },
            { 
                title: 'Estático o Dinámico', 
                field: 'static', 
                render: rowData => {
                    if (rowData.static) return 'Estático'
                    else return 'Dinámico'
                },
                ...defaultStyle
            },
            { 
                title: 'Público o Secciones', 
                field: 'open', 
                render: rowData => {
                    if (rowData.open) return 'Público'
                    else return 'Secciones'
                },
                ...defaultStyle
            }
        ]:
        // columnas para estudiantes
        [
            { 
                title: 'Nombre', 
                field: 'name',
                ...defaultStyle
            },
            { 
                title: 'Intentos realizados', 
                field: 'attempts',
                ...defaultStyle
            },
            { 
                title: 'Nota Obtenida', 
                field: 'score',
                ...defaultStyle
            },
            { 
                title: 'Aprobado', 
                field: 'approved',
                ...defaultStyle
            },
        ] 
        setColumnas(columns)
        if(usuario.groups.map(x => x.name).some(role => ["Professor"].includes(role))){
            getExamsForTeacher(usuario.id)
            .then( res => {
                if (res.data) {
                    setExamanes(res.data);
                    setLoading(false)
                }
            })
        } else {
            getResultsForStudent(usuario.id)
            .then( res => {
                if (res.data) {
                    let examenes = []
                    Object.keys(res.data).forEach( key => {
                        examenes.push({
                            ...res.data[key],
                            id: key,
                            approved: res.data[key].passed ? "Si" : "No"
                        })
                    })
                    setExamanes(examenes.map( x => {
                        return {
                            ...x,
                            score: x.score + "/" + x.total_value_exam,
                        }
                    }));
                    setLoading(false)
                }
            })
        }
    }, [usuario])

    let history = useHistory();
    const handleToggleExamEnabled = async (event, rowData) => {
        let request = {
            name: rowData["name"],
            start_date: rowData["start_date"],
            finish_date:rowData["finish_date"],
            duration: rowData["duration"],
            attempt: rowData["attempt"],
            description: rowData["description"],
            static: rowData["static"],
            email: usuario.email,
            status: !rowData["status"],
            open: rowData["open"],
            exam_id: rowData["id"]
        }
        try {
            let response = await createTest(request)
            let newData = [...examanes]
            let newRowData = {
                ...rowData,
                status: !rowData["status"]
            }
            let index = newData.indexOf(rowData)
            newData.splice(index, 1, newRowData)
            setExamanes(newData)

        } catch (error) {
            console.log(error)
            setErrorMsg("No se pudo guardar el examen. Intente nuevamente")
            setAlertOpen(true)
        }
    }

    const onRowClick = (event, rowData) => {
        if (usuario.groups.map(x => x.name).some(role => ["Professor"].includes(role))){
            history.push(`/detalles_examen/${rowData.id}`)
        } else {
            history.push(`/resumen_examen/${rowData.id}`)
        }
    }

    if(usuario.id && !loading){
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
                                {usuario.groups.map(x => x.name).some(role => ["Professor"].includes(role)) ? 
                                    <DataTable 
                                        title="Lista de Exámenes" 
                                        data={[...examanes]} 
                                        columns={columnas} 
                                        onRowAdd={()=>{}}
                                        onRowUpdate={()=>{}}
                                        isCalificacion={true}
                                        isEstadistica={true}
                                        selection={false}
                                        isTeachersExamList={true}
                                        handleToggleExamEnabled={handleToggleExamEnabled}
                                        onRowClick={onRowClick}
                                        customExam={true}
                                    /> :
                                    <DataTable 
                                        title="Lista de Exámenes" 
                                        data={[...examanes]} 
                                        columns={columnas} 
                                        selection={false}
                                        handleToggleExamEnabled={handleToggleExamEnabled}
                                        onRowClick={onRowClick}
                                        useActions={false}
                                    />
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
    } else {
        return <Loading />
    }    
}