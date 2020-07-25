import React, {
    useEffect,
    useState,
    Fragment
 } from 'react';

import { ListaEstudiantes } from '../componentes/lista_estudiantes/ListaEstudiantesTeacherPage.js';

// material
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { getExamConfiguration, getExamSections, getExamComplete } from '../servicios/servicioDetalleExamen'
import { getExam } from '../servicios/servicioPresentarExamen'
import Loading from '../componentes/loading/Loading.js';
import { Divider } from '@material-ui/core';
import { useGeneral } from '../context/generalContext';


import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const Latex = require('react-latex');
let time = require("moment")

export default function TestDetailsPage(props){
    const examID = props.match.params.id;

    const { setContentMenu } = useGeneral();
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

    const [showPreguntas, setShowPreguntas] = useState(null)
    const handleChangeShowPreguntas = (index) => {
        let newShow = [...showPreguntas]
        newShow[index] = !newShow[index]
        setShowPreguntas(newShow);
    };
    setContentMenu(`home`);

    useEffect(() => {
        let fetchData = async () => {
            let { data: examComplete} = await getExamComplete(examID);
            let newExam = {
                Preguntas: examComplete.questions,
                ...examComplete.conf_ini,
                Secciones: examComplete.sections
            }
            setShowPreguntas(examComplete.questions.map(x => true))
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
                        <Accordion expanded={basicConfigExpanded} onChange={handleChangeBasicConfigExpanded}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography variant="h6" style={{fontWeight : 600}}>Configuración Básica</Typography>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>
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
                            </AccordionDetails>
                        </Accordion>
                        {/* Preguntas */}
                        <Accordion expanded={questionsExpanded} onChange={handleChangeQuestionsExpanded} style={{width: "100%"}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                            <Typography variant="h6" style={{fontWeight : 600}}>Preguntas</Typography>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>
                                <Grid container>
                                {
                                    exam.Preguntas.map( (pregunta, index) => {
                                        switch(pregunta.difficulty){
                                            case "1":
                                                pregunta.difficulty = "Baja"
                                                break
                                            case "2":
                                                pregunta.difficulty = "Baja-Media"
                                                break
                                            case "3":
                                                pregunta.difficulty = "Media"
                                                break
                                            case "4":
                                                pregunta.difficulty = "Alta"
                                                break
                                            case "5":
                                                pregunta.difficulty = "Muy Alta"
                                                break
                                        }
                                        return (
                                        <Fragment  key={index}>
                                             <Grid container>
                                                <Grid item xs={8} md={8} lg={8}>
                                                     <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                        {pregunta["content"]}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4} md={4} lg={4}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch 
                                                                checked={showPreguntas[index]} 
                                                                onChange={()=>{
                                                                    handleChangeShowPreguntas(index)
                                                                }} 
                                                                color="primary"
                                                            />
                                                        }
                                                        label="Mostrar Detalles"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={12} lg={12}>
                                                    <Divider style={{margin: "10px 0px", height: "2px"}}/> 
                                                </Grid>
                                             </Grid>
                                            <Collapse in={showPreguntas[index]}>
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
                                                            Área:
                                                        </Typography>                                                    
                                                    </Grid>
                                                    <Grid item xs={3} md={3} lg={3}>
                                                        {pregunta.topic.subarea.area.name}
                                                    </Grid>
                                                    <Grid item xs={3} md={3} lg={3}>
                                                        <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                            Ponderación:
                                                        </Typography>                                                    
                                                    </Grid>
                                                    <Grid item xs={3} md={3} lg={3}>
                                                        {pregunta.value}
                                                    </Grid>
                                                    <Grid item xs={3} md={3} lg={3}>
                                                        <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                            Subárea:
                                                        </Typography>                                                    
                                                    </Grid>
                                                    <Grid item xs={3} md={3} lg={3}>
                                                        {pregunta.topic.subarea.name}
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
                                                </Grid>
                                                <Grid container style={{marginTop: "15px"}}>
                                                    <Grid item xs={2} md={2} lg={2}></Grid>
                                                    <Grid item xs={3} md={3} lg={3}>
                                                        <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                            Enunciado:  
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={5} md={5} lg={5}>
                                                        {pregunta.latex ? 
                                                            <Latex displayMode={true}>{pregunta["content"]}</Latex>
                                                            : pregunta["content"]
                                                        }  
                                                    </Grid>
                                                    <Grid item xs={2} md={2} lg={2}></Grid>
                                                    {pregunta.q_type.name === "ordenamiento" &&
                                                    <Fragment>
                                                        <Grid item xs={2} md={2} lg={2}></Grid>
                                                        <Grid item xs={3} md={3} lg={3}>
                                                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                                Respuestas:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={7} md={7} lg={7}>                                                      
                                                            {pregunta.answers.sort((x,y) => x.option > y.option ? 1 : -1).map( (respuesta, index) => {
                                                                return (
                                                                    <div className="detalle-examen-respuesta" key={index}>
                                                                        {respuesta.content}
                                                                    </div>
                                                                )
                                                            })}
                                                        </Grid>
                                                    </Fragment>
                                                    }
                                                    {(pregunta.q_type.name === "selección múltiple" || pregunta.q_type.name === "selección simple") &&
                                                    <Fragment>
                                                        <Grid item xs={2} md={2} lg={2}></Grid>
                                                        <Grid item xs={3} md={3} lg={3}>
                                                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                                Respuestas:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={7} md={7} lg={7}>
                                                            <ul>                                                        
                                                            {pregunta.answers.map( (respuesta, index) => {
                                                                return (
                                                                    <li key={index}
                                                                        className="detalle-examen-respuesta" 
                                                                        style={{
                                                                            color: respuesta.option ===  1 ? "green" : "rgba(0,0,0,0.87)",
                                                                            fontWeight: respuesta.option ===  1 ? "bold" : "400",
                                                                        }}
                                                                    >
                                                                        <div style={{display: "flex", alignItems: "center"}}>
                                                                            {respuesta.content}
                                                                            {respuesta.option ===  1 && 
                                                                            (
                                                                                <Tooltip title="Respuesta Correcta" placement="right" arrow>
                                                                                    <CheckBoxIcon color="green"/>
                                                                                </Tooltip>
                                                                            )
                                                                            }
                                                                        </div>
                                                                    </li>
                                                                )
                                                            })}
                                                            </ul>
                                                        </Grid>
                                                    </Fragment>
                                                    }
                                                    {pregunta.q_type.name === "verdadero o falso" &&
                                                    <Fragment>
                                                        <Grid item xs={2} md={2} lg={2}></Grid>
                                                        <Grid item xs={3} md={3} lg={3}>
                                                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                                Respuestas:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={7} md={7} lg={7}>
                                                            <div 
                                                                className="detalle-examen-respuesta" 
                                                                style={{
                                                                    color: pregunta.option ===  1 ? "green" : "rgba(0,0,0,0.87)",
                                                                    fontWeight: pregunta.option ===  1 ? "bold" : "400",
                                                                    display: "flex",
                                                                    alignItems: "center"
                                                                }}
                                                            >
                                                                Verdadero
                                                                {pregunta.option ===  1 && 
                                                                (<Tooltip title="Respuesta Correcta" placement="right" arrow>
                                                                    <CheckBoxIcon color="green"/>
                                                                </Tooltip>)}
                                                            </div>
                                                            <div
                                                                style={{
                                                                    color: pregunta.option !==  1 ? "green" : "rgba(0,0,0,0.87)",
                                                                    fontWeight: pregunta.option !==  1 ? "bold" : "400",
                                                                    display: "flex",
                                                                    alignItems: "center"
                                                                }}
                                                            >
                                                                Falso
                                                                {pregunta.option !==  1 && 
                                                                (<Tooltip title="Respuesta Correcta" placement="right" arrow>
                                                                    <CheckBoxIcon color="green"/>
                                                                </Tooltip>)}
                                                            </div>
                                                        </Grid>
                                                    </Fragment>
                                                    }
                                                </Grid>
                                                <Grid container>
                                                    <Grid item xs={12} md={12} lg={12}>
                                                        <Divider style={{margin: "10px 0px", height: "2px"}}/> 
                                                    </Grid>
                                                </Grid>
                                            </Collapse>
                                        </Fragment>
                                        )
                                    })
                                }
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        {/* Lista Secciones */}
                        { !exam.open && (
                            <Accordion expanded={listSectionsExpanded} onChange={handleChangeListSectionsExpanded} style={{width: "100%"}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography variant="h6" style={{fontWeight : 600}}>Secciones</Typography>
                                </AccordionSummary>
                                <Divider />
                                <AccordionDetails>
                                    <Grid container>
                                        <Grid item lg={12} md={12} xl={12} xs={12}>
                                            <ListaEstudiantes 
                                            secciones={exam.Secciones}
                                            />
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
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