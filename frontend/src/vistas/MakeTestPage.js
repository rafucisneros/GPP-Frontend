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
import { useGeneral } from '../context/generalContext';

// contexts
import {useMakeTest} from '../context/makeTestContext';

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

export default function MakeTestPage(){
  const { setContentMenu } = useGeneral();
  const { exam, setExam } = useMakeTest();

  const [bar, setBar] = useState(true);
  const [exam, setExam] = useState(null);
  const [preguntaActual, setPreguntaActual] = useState(4);

  setContentMenu('make_test');

  useEffect(()=> {
    setExam(examenPrueba)
  })

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
      <div >
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