import React, {
    useEffect,
    useState,
    Fragment
 } from 'react';

// material
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getExamConfiguration } from '../servicios/servicioDetalleExamen'
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
    
    const [questionsExpanded, setQuestionsExpanded] = React.useState(true);
    const handleChangeQuestionsExpanded = () => {
        setQuestionsExpanded(!questionsExpanded);
    };

    const [listSectionsExpanded, setListSectionsExpanded] = React.useState(true);
    const handleChangeListSectionsExpanded = () => {
        setListSectionsExpanded(!listSectionsExpanded);
    };

    useEffect(() => {
        let fetchData = async () => {
            let { data: examConfig } = await getExamConfiguration({}, examID);
            let { data: examen } = await getExam({}, examID);
            let { data: Preguntas } = await getExamQuestions({}, examID);
            let newExam = {
                ...examen,
                Preguntas
            }
            setExam(newExam)
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
                        <ExpansionPanel expanded={listSectionsExpanded} onChange={handleChangeListSectionsExpanded}>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography>Lista de Secciones</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
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