import React, {
    useEffect,
    useState,
    Fragment
 } from 'react';
import uuid from 'uuid/v1';

import { ListaEstudiantes } from '../componentes/lista_estudiantes/ListaEstudiantesTeacherPage.js';

// material
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getExamConfiguration, getExamSections, getExamComplete } from '../servicios/servicioDetalleExamen'
import { getExam } from '../servicios/servicioPresentarExamen'
import Loading from '../componentes/loading/Loading.js';
import { Divider } from '@material-ui/core';

const Latex = require('react-latex');
let time = require("moment")

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
            let { data: examComplete} = await getExamComplete(examID);
            let newExam = {
                Preguntas: examComplete.questions,
                ...examComplete.conf_ini,
                Secciones: examComplete.sections
            }
            setExam(newExam);
        }
        fetchData()
    }, [])

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
                            <Typography variant="h6" style={{fontWeight : 600}}>Configuración Básica</Typography>
                            </ExpansionPanelSummary>
                            <Divider />
                            <ExpansionPanelDetails>
                                <Grid container>
                                    <Grid container spacing={2} direction={"row"}>
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                Nombre: 
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                            {exam.name}
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                Fecha de Habilitación:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                            {time(exam.start_date).format("DD/MM/YYYY - hh:mm:ss A")}
                                        </Grid>
                                    </Grid> 
                                    <Grid container spacing={2} direction={"row"}>
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                Tipo de examen:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                            {exam.static ? "Estático": "Dinámico"}
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                Fecha de Deshabilitación:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                            {time(exam.finish_date).format("DD/MM/YYYY - hh:mm:ss A")}
                                        </Grid>
                                    </Grid> 
                                    <Grid container spacing={2} direction={"row"}>
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                Duración:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                            {exam.duration} minutos
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                Intentos Permitidos:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                            {exam.attempt ? exam.attempt : "Sin Límite"}
                                        </Grid>
                                    </Grid> 
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        {/* Preguntas */}
                        <ExpansionPanel expanded={questionsExpanded} onChange={handleChangeQuestionsExpanded} style={{width: "100%"}}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                            <Typography variant="h6" style={{fontWeight : 600}}>Preguntas</Typography>
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
                                                    <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                        Tipo de Pregunta:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    {pregunta.q_type.name[0].toUpperCase() + pregunta.q_type.name.slice(1)}
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                        Dificultad:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    {pregunta.difficulty}
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                        Tema:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    {pregunta.topic.name}
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                        Area:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    {pregunta.topic.subarea.area.name}
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                        Subarea:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    {pregunta.topic.subarea.name}
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                        Ponderación:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    {pregunta.value}
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{marginTop: "15px"}}>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                        Enunciado:  
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3} md={3} lg={3}>
                                                    {pregunta.latex ? 
                                                        <Latex displayMode={true}>{pregunta["content"]}</Latex>
                                                        : pregunta["content"]
                                                    }  
                                                </Grid>
                                                {pregunta.q_type.name != "verdadero o falso" &&
                                                <Fragment>
                                                    <Grid item xs={3} md={3} lg={3}>
                                                        <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                            Respuestas:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={3} md={3} lg={3}>
                                                        {pregunta.answers.map( respuesta => {
                                                            return (
                                                                <div>
                                                                    -) {respuesta.content}
                                                                </div>
                                                            )
                                                        })}
                                                    </Grid>
                                                </Fragment>
                                                }
                                                {pregunta.q_type.name === "verdadero o falso" &&
                                                <Fragment>
                                                    <Grid item xs={3} md={3} lg={3}>
                                                        <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                            Respuestas:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={3} md={3} lg={3}>
                                                        <div 
                                                            style={{border: pregunta.option ===  1 ? "1px solid green" : "none"}}
                                                        >
                                                            Verdadero
                                                        </div>
                                                        <div
                                                            style={{border: pregunta.option !==  1 ? "1px solid green" : "none"}}
                                                        >
                                                            Falso
                                                        </div>
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
                        { !exam.open && (
                            <ExpansionPanel expanded={listSectionsExpanded} onChange={handleChangeListSectionsExpanded} style={{width: "100%"}}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography variant="h6" style={{fontWeight : 600}}>Secciones</Typography>
                                </ExpansionPanelSummary>
                                <Divider />
                                <ExpansionPanelDetails>
                                    <Grid container>
                                        <Grid item lg={12} md={12} xl={12} xs={12}>
                                            <ListaEstudiantes 
                                            secciones={exam.Secciones}
                                            />
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )
                        }
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