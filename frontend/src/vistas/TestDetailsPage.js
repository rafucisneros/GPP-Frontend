import React, {
    useEffect,
    useState,
    Fragment
} from 'react';

// componentes
import { ListaEstudiantes } from '../componentes/lista_estudiantes/ListaEstudiantesTeacherPage.js';

// material
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import Box from '@material-ui/core/Box';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import Loading from '../componentes/loading/Loading.js';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// context
import { useGeneral } from '../context/generalContext';

// servicios
import { getExamConfiguration, getExamSections, getExamComplete } from '../servicios/servicioDetalleExamen'
import { getExam } from '../servicios/servicioPresentarExamen'

// constantes
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
        console.log(index)
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
            setShowPreguntas(examComplete.questions.map(x => false))
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
                                    <Grid container spacing={2} >
                                        <Grid item xs={6} md={6} lg={6} style={{display : 'flex', alignItems : 'center'}}>
                                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                Nombre: 
                                            </Typography>
                                            <span style={{paddingLeft : '8px'}}>
                                                {exam.name}
                                            </span>
                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6} style={{display : 'flex', alignItems : 'center'}}>
                                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                Fecha de Habilitación: 
                                            </Typography>
                                            <span style={{paddingLeft : '8px'}}>
                                                {time(exam.start_date).format("DD/MM/YYYY - hh:mm:ss A")}
                                            </span>
                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6} style={{display : 'flex', alignItems : 'center'}}>
                                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                Tipo de Examen
                                            </Typography>
                                            <span style={{paddingLeft : '8px'}}>
                                                {exam.static ? "Estático": "Dinámico"}  
                                            </span>
                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6} style={{display : 'flex', alignItems : 'center'}}>
                                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                Fecha de Deshabilitación:
                                            </Typography>
                                            <span style={{paddingLeft : '8px'}}>
                                                {time(exam.finish_date).format("DD/MM/YYYY - hh:mm:ss A")}  
                                            </span>
                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6} style={{display : 'flex', alignItems : 'center'}}>
                                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                Duración:
                                            </Typography>
                                            <span style={{paddingLeft : '8px'}}>
                                                {exam.duration} minutos  
                                            </span>
                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6} style={{display : 'flex', alignItems : 'center'}}>
                                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                Intentos Permitidos:
                                            </Typography>
                                            <span style={{paddingLeft : '8px'}}>
                                                {exam.attempt ? exam.attempt : "Sin Límite"}  
                                            </span>
                                        </Grid>
                                    </Grid> 
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        {/* Preguntas */}
                        <Accordion expanded={questionsExpanded} onChange={handleChangeQuestionsExpanded} style={{width: "100%"}}>
                            <AccordionSummary
                                expandIcon={<ExpandLessIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                            <Typography variant="h6" style={{fontWeight : 600}}>Preguntas</Typography>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails style={{padding : '0px 0px 0px'}}>
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
                                        <Fragment key={index}>
                                            <Box style={{cursor : 'pointer', width : '100%'}} onClick={()=>{handleChangeShowPreguntas(index)}}>
                                                <Grid container style={{display : 'flex', padding: '0px 16px', margin: "10px 0px"}} >
                                                    <Grid item style={{flexGrow: 1, alignSelf : 'center'}} > 
                                                        <Box style={{display : 'flex'}}>
                                                            <LabelOutlinedIcon/>  
                                                            <Typography variant="subtitle1" style={{fontWeight : 600, paddingLeft : '8px'}}>
                                                                {pregunta["content"]}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item style={{}}>
                                                        <IconButton
                                                            edge='end'
                                                            onClick={()=>{handleChangeShowPreguntas(index)}}
                                                        >
                                                            {showPreguntas[index] ? <ExpandLess /> : <ExpandMore />}
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                            { ((index + 1 !== showPreguntas.length) || (index + 1 === showPreguntas.length && showPreguntas[index])) &&
                                                <Grid container >
                                                    <Divider style={{width : '100%'}}/> 
                                                </Grid>
                                            }
                                            <Collapse in={showPreguntas[index]} style={{width : '100%'}}>
                                                <Grid container style={{padding: '8px 16px'}}>
                                                    <Grid item xs={2} md={2} lg={2} style={{display : 'flex'}}/>
                                                    <Grid item xs={4} md={4} lg={4} style={{display : 'flex', alignItems : 'center'}}>
                                                        <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                            Tipo de Pregunta: 
                                                        </Typography>
                                                        <span style={{paddingLeft : '8px'}}>
                                                            {pregunta.q_type.name[0].toUpperCase() + pregunta.q_type.name.slice(1)}
                                                        </span>
                                                    </Grid>
                                                    <Grid item xs={2} md={2} lg={2} style={{display : 'flex'}}/>
                                                    <Grid item xs={4} md={4} lg={4} style={{display : 'flex', alignItems : 'center'}}>
                                                        <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                            Área:
                                                        </Typography>
                                                        <span style={{paddingLeft : '8px'}}>
                                                            {pregunta.topic.subarea.area.name}
                                                        </span>
                                                    </Grid>
                                                    <Grid item xs={2} md={2} lg={2} style={{display : 'flex'}}/>
                                                    <Grid item xs={4} md={4} lg={4} style={{display : 'flex', alignItems : 'center'}}>
                                                        <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                            Ponderación:
                                                        </Typography>
                                                        <span style={{paddingLeft : '8px'}}>
                                                            {pregunta.value}
                                                        </span>
                                                    </Grid>
                                                    <Grid item xs={2} md={2} lg={2} style={{display : 'flex'}}/>
                                                    <Grid item xs={4} md={4} lg={4} style={{display : 'flex', alignItems : 'center'}}>
                                                        <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                            Subárea:
                                                        </Typography>
                                                        <span style={{paddingLeft : '8px'}}>
                                                            {pregunta.topic.subarea.name}
                                                        </span>
                                                    </Grid>
                                                    <Grid item xs={2} md={2} lg={2} style={{display : 'flex'}}/>
                                                    <Grid item xs={4} md={4} lg={4} style={{display : 'flex', alignItems : 'center'}}>
                                                        <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                            Dificultad:
                                                        </Typography>
                                                        <span style={{paddingLeft : '8px'}}>
                                                            {pregunta.difficulty}
                                                        </span>
                                                    </Grid>
                                                    <Grid item xs={2} md={2} lg={2} style={{display : 'flex'}}/>
                                                    <Grid item xs={4} md={4} lg={4} style={{display : 'flex', alignItems : 'center'}}>
                                                        <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                            Tema:
                                                        </Typography>
                                                        <span style={{paddingLeft : '8px'}}>
                                                            {pregunta.topic.name}
                                                        </span>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{marginTop: "4px", marginBottom : '6px'}}>
                                                    <Grid item xs={12} md={12} lg={12} style={{textAlign : 'center'}}>
                                                        <Grid >
                                                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                                Enunciado:  
                                                            </Typography>
                                                        </Grid>
                                                        <Grid >
                                                            {pregunta.latex ? 
                                                                <Latex >{pregunta["content"]}</Latex>
                                                                : pregunta["content"]
                                                            }  
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={12} lg={12} style={{textAlign : 'center', paddingTop : '7px'}}>
                                                        <Typography variant="subtitle1" style={{fontWeight : 600}}>
                                                            Respuestas:
                                                        </Typography>
                                                        {pregunta.q_type.name === "ordenamiento" &&
                                                            <Fragment>
                                                                <Grid item xs={12} md={12} lg={12} style={{justifyContent : 'center', display : 'flex'}}>                                                      
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
                                                                <Grid item xs={12} md={12} lg={12} style={{justifyContent : 'center', display : 'flex'}}>
                                                                    <ul style={{margin : '3px'}}>                                                        
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
                                                                                            <CheckCircleOutlineIcon style = {{'marginLeft': '6px'}} color="green"/>
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
                                                                <Grid item xs={12} md={12} lg={12} style={{ flexDirection: 'column', display: 'flex', alignItems: 'center'}}>
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
                                                                            <CheckCircleOutlineIcon style = {{'marginLeft': '6px'}} color="green"/>
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
                                                                            <CheckCircleOutlineIcon style = {{'marginLeft': '6px'}} color="green"/>
                                                                        </Tooltip>)}
                                                                    </div>
                                                                </Grid>
                                                            </Fragment>
                                                        }
                                                    </Grid>
                                                    
                                                </Grid>
                                                { (index + 1 !== showPreguntas.length) && 
                                                    <Grid container>
                                                        <Grid item xs={12} md={12} lg={12}>
                                                            <Divider/> 
                                                        </Grid>
                                                    </Grid>
                                                }
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