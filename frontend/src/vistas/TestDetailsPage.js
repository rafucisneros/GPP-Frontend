import React, {
    useEffect,
    useState,
    Fragment
 } from 'react';
import uuid from 'uuid/v1';

import ListaSecciones from '../componentes/lista_secciones/ListaSecciones.js';
import ListaEstudiantes from '../componentes/lista_estudiantes/ListaEstudiantes.js';
import { useCreateTestPage } from '../context/createTestPageContext';

// material
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getExamConfiguration, getExamSections } from '../servicios/servicioDetalleExamen'
import { getExam, getExamQuestions } from '../servicios/servicioPresentarExamen'
import Loading from '../componentes/loading/Loading.js';
import { Divider } from '@material-ui/core';

export default function TestDetailsPage(props){
    const examID = props.match.params.id;

    const [exam, setExam] = useState(null)
    
    const [basicConfigExpanded, setBasicConfigExpanded] = React.useState(true);
    const handleChangeBasicConfigExpanded = () => {
        setBasicConfigExpanded(!basicConfigExpanded);
    };
    
    const [questionsExpanded, setQuestionsExpanded] = React.useState(false);
    const handleChangeQuestionsExpanded = () => {
        setQuestionsExpanded(!questionsExpanded);
    };

    const [listSectionsExpanded, setListSectionsExpanded] = React.useState(false);
    const handleChangeListSectionsExpanded = () => {
        setListSectionsExpanded(!listSectionsExpanded);
    };

    useEffect(() => {
        let fetchData = async () => {
            let { data: examConfig } = await getExamConfiguration({}, examID);
            let { data: examen } = await getExam({}, examID);
            let {data} = await getExamQuestions({}, examID);
            let { questions: Preguntas } = data;
            let { data: Sections} = await getExamSections({}, examID);
            
            let newExam = {
                ...examen,
                Preguntas,
                Sections
            }
            setExam(newExam);
        }
        fetchData()
    }, [])

    // Secciones Andres
    const {  
        handleChangeStep,
        handleChangeComp,
        secciones,
        tipoConfiguracion
    } = useCreateTestPage();

    const handleAgregarEstudiante = (estudiante) => handleChangeComp(estudiante, 'estudiantes');

    const handleSeleccionarSeccion = (id) => {
        if (secciones.length > 0){
            for( let seccion of secciones){
                if(seccion.id === id) {
                    handleChangeComp(seccion, 'seccion_seleccionada');
                    break;
                }    
            }
        }
    }

    const handleAgregarSecciones = () => {
        let data = [...secciones];
        data.push({
            id: uuid(),
            estudiantes : []
        });
        handleChangeComp(data, 'secciones');
    }

    const handleEliminarSecciones = (index) => {
        let data = [...secciones];
        data.splice(index, 1);
        handleChangeComp(data, 'secciones');
    }
    // Fin Secciones Andres

    if(exam){

        return (
            <div>
                <div className="toolbar-icono"/>
                <Container maxWidth="lg" style={{paddingTop: '32px', paddingBottom: '32px'}}>
                    <Grid container spacing={2}>
                        {/* Configuración Basica */}
                        <ExpansionPanel expanded={basicConfigExpanded} onChange={handleChangeBasicConfigExpanded}>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography>Configuración Básica</Typography>
                            </ExpansionPanelSummary>
                            <Divider />
                            <ExpansionPanelDetails>
                                <Grid container>
                                    <Grid container spacing={2} direction={"row"}>
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography>
                                                Nombre: 
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography>
                                                {exam.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography>
                                                Fecha de Inicio:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography>
                                                {exam.start_date}
                                            </Typography>
                                        </Grid>
                                    </Grid> 
                                    <Grid container spacing={2} direction={"row"}>
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography>
                                                Tipo de examen:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography>
                                                {exam.static ? "Estático": "Dinámico"}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography>
                                                Fecha de Finalización:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography>
                                            {exam.finish_date}
                                            </Typography>
                                        </Grid>
                                    </Grid> 
                                    <Grid container spacing={2} direction={"row"}>
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography>
                                                Duración:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography>
                                                {exam.duration} minutos
                                            </Typography>
                                        </Grid>
                                    </Grid> 
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        {/* Preguntas */}
                        <ExpansionPanel expanded={questionsExpanded} onChange={handleChangeQuestionsExpanded}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Preguntas</Typography>
                            </ExpansionPanelSummary>
                            <Divider />
                            <ExpansionPanelDetails>
                                <Grid container>
                                {
                                    exam.Preguntas.map( pregunta => {
                                        return (
                                        <Fragment>
                                            <Grid container>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    Tipo de Pregunta:
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    {pregunta.type[0].toUpperCase() + pregunta.type.slice(1)}
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    Dificultad:
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    {pregunta.dificultad}
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    Area:
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    {pregunta.area}
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    Subarea:
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    {pregunta.subarea}
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    Ponderación:
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    {pregunta.ponderacion}
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                   
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    Enunciado:
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    {pregunta.content}
                                                </Grid>
                                                {pregunta.type != "verdadero o falso" &&
                                                <Fragment>
                                                    <Grid item xs={3} md={3} lg={3}>
                                                        Respuestas:
                                                    </Grid>
                                                    <Grid item xs={3} md={3} lg={3}>
                                                        {pregunta.answers.map( respuesta => {
                                                            return (
                                                                <div>
                                                                    {respuesta.content}
                                                                </div>
                                                            )
                                                        })}
                                                    </Grid>
                                                </Fragment>
                                                }
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={12} md={12} lg={12}>
                                                    <Divider /> 
                                                </Grid>
                                            </Grid>
                                        </Fragment>
                                        )
                                    })
                                }
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        {/* Lista Secciones */}
                        <ExpansionPanel expanded={listSectionsExpanded} onChange={handleChangeListSectionsExpanded} style={{width: "100%"}}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Secciones</Typography>
                            </ExpansionPanelSummary>
                            <Divider />
                            <ExpansionPanelDetails>
                                <Grid container>
                                <Grid container>
                                    <Grid item lg={4} md={4} xl={4} xs={12}>
                                        <ListaSecciones 
                                            handleAgregarSecciones = {handleAgregarSecciones}
                                            handleEliminarSecciones = {handleEliminarSecciones}
                                            handleSeleccionarSeccion = {handleSeleccionarSeccion}
                                        />
                                    </Grid>
                                    <Grid item lg={8} md={8} xl={8} xs={12}>
                                        <ListaEstudiantes 
                                            handleAgregarEstudiante = {handleAgregarEstudiante}
                                        />
                                    </Grid>
                                </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        {/*Estadisticas*/}
                    </Grid>
                </Container>
            </div>
        );
    } else {
        return (
          <Loading/>
        )
    }
}