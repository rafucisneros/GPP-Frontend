import React, { useState, useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Carousel from '../componentes/carousel/carousel.js';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

import FormPregunta from '../componentes/form_pregunta/FormPregunta'
const drawerWidth = 240;

const examenPrueba = {
  Nombre: "Examen de Prueba",
  fecha_inicio: Date.now(),
  fecha_fin: Date.now() + (60 * 60 * 1000),
  duracion: 60,
  Preguntas: [
    {
      _id: 1,
      pregunta: "Cualquier Vaina 1",
      tipo: "seleccion_simple",
      opciones: [
        1,2,3,4
      ],
      respuesta: null
    },
    {
      _id: 2,
      pregunta: "Cualquier Vaina 2",
      tipo: "seleccion_multiple",
      opciones: [
        5,6,7,8
      ],
      respuesta: []
    },
    {
      _id: 3,
      pregunta: "Cualquier Vaina 3",
      tipo: "verdadero_falso",
      respuesta: null
    },
    {
      _id: 4,
      pregunta: "Cualquier Vaina 4",
      tipo: "ordenamiento",
      opciones: [
        1,2,3,4
      ],
      respuesta: []
    },
  ]
}


const useStyle = makeStyles(theme => ({
  appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      }),
  },
  appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
      }),
  },
  drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
      }),
  },
  drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
      },
  },
}))

export default function MakeTestPage(){
  const classes = useStyle();

  const [bar, setBar] = useState(true);
  const [exam, setExam] = useState(null);
  const [preguntaActual, setPreguntaActual] = useState(1);

  useEffect(()=> {
    setExam(examenPrueba)
  })

  const handleBarOpen = () => {
    setBar(true);
  };

  const handleBarClose = () => {
    setBar(false);
  };

  const nextQuestion = (question) => {
    let nuevoExamen = exam
    let pregunta = nuevoExamen.find(x => x["_id"] === question["Pregunta_Actual"])
    pregunta["respuesta"] = question["respuesta"]
    setExam(nuevoExamen)
    setPreguntaActual(preguntaActual + 1)
  }

  const previousQuestion = (question) => {
    let nuevoExamen = exam
    let pregunta = nuevoExamen.find(x => x["_id"] === question["Pregunta_Actual"])
    pregunta["respuesta"] = question["respuesta"]    
    setExam(nuevoExamen)
    setPreguntaActual(preguntaActual - 1)
  }

  const changeQuestion = (question, idQuestion) => {
    let nuevoExamen = exam
    let pregunta = nuevoExamen["Preguntas"].find(x => x["_id"] === question["_id"])
    pregunta["respuesta"] = question["respuesta"]
    setExam(nuevoExamen)
    setPreguntaActual(idQuestion)
  }
  if(exam){
    return (
      <div style={{display : 'flex'}}>
        <AppBar position="absolute" className={clsx(classes.appBar, bar && classes.appBarShift)}>
          <Toolbar style={{paddingRight : '24px'}}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleBarOpen}
              className = {!bar ? 'abrir-menu-crear-examen' : 'cerrar-menu-crear-examen'}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap style={{flexGrow: 1}}>
              <Box className="flex-box-titulo">
                Presentando Examen: {exam.Nombre}
              </Box>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !bar && classes.drawerPaperClose),
          }}
          open={bar}
        >
          <div className="toolbar-icono">
            Resumen de Preguntas
            <IconButton onClick={handleBarClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckIcon style={{color: "green"}}/>
              </ListItemIcon>
              <ListItemText primary="Respondida" style={{color: 'green' }} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CloseIcon style={{color: "red"}}/>
              </ListItemIcon>
              <ListItemText primary="No Respondida" style={{color: 'red' }} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {exam.Preguntas.map( (pregunta, index) => {
              return (              
                <ListItem key={index}>
                  <ListItemIcon>
                    {["ordenamiento", "seleccion_multiple"].includes(pregunta.tipo) ?
                      (pregunta.respuesta.length ? 
                        <CheckIcon style={{color: "green"}}/> : 
                        <CloseIcon style={{color: "red"}}/>) : 
                      (pregunta.respuesta ? 
                        <CheckIcon style={{color: "green"}}/> : 
                        <CloseIcon style={{color: "red"}}/>)
                    }
                  </ListItemIcon>
                  <ListItemText 
                    primary={`Pregunta ${pregunta._id}`} 
                    style={{
                      color: ["ordenamiento", "seleccion_multiple"].includes(pregunta.tipo) ?
                        (pregunta.respuesta.length ? "green" : "red") : 
                        (pregunta.respuesta ? "green" : "red")
                    }} 
                  />
                </ListItem>
              )
            })}
          </List>
        </Drawer>
        <main className="content-main-crear-test">
        <div className="toolbar-icono"/>
          <Container maxWidth="lg" style={{paddingTop: '20px', paddingBottom: '32px'}}>
            <Grid container spacing={2} direction="row" justify="space-around">
              <h3>Hora de Inicio: {exam.fecha_inicio}</h3>
              <h3>Hora de Fin: {exam.fecha_fin}</h3>
            </Grid>
          </Container>
          <FormPregunta 
            pregunta={exam.Preguntas.find(x => x["_id"] == preguntaActual)} 
            // pregunta={exam.Preguntas.find(x => x["_id"] == exam.Pregunta_Actual)} 
            changeQuestion={changeQuestion}
            lastQuestion={preguntaActual === exam["Preguntas"].length}
            firstQuestion={preguntaActual === 1}
          />
        </main>
      </div>
    )
  } else {
    return (
      <div><h1>Cargando...</h1></div>
    )
  }
}