import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FormPregunta from '../componentes/form_pregunta/FormPregunta'
import { useGeneral } from '../context/generalContext';
import ClockIcon from '@material-ui/icons/AccessTime';

// contexts
import {useMakeTest} from '../context/makeTestContext';

let time = require("moment")
const drawerWidth = 240;

const examenPrueba = {
  Nombre: "Examen de Prueba",
  fecha_inicio: time().format("DD/MM/YYYY - HH:mmA"),
  duracion: 2,
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
  const [preguntaActual, setPreguntaActual] = useState(1);
  const [tiempoRestante, setTiempoRestante] = useState("00:00");
  
  const changeAnswer = (newAnswer) => {
    let nuevoExamen = {...exam}
    let pregunta = nuevoExamen["Preguntas"].find(x => x["_id"] === preguntaActual)
    pregunta["respuesta"] = newAnswer
    setExam(nuevoExamen)
  }

  const changeQuestion = (idQuestion) => {
    setPreguntaActual(idQuestion)
  }

  const finishExam = () => {
    alert("Termino Examen")
  }

  const timer = () => {
    let ahora = time()
    let fin = time(examenPrueba.fecha_fin, "DD/MM/YYYY - HH:mmA").add(1,"minutes")
    let restanteMinutos = time.duration(fin.diff(ahora)).asMinutes()
    let restante = time([Math.floor(restanteMinutos / 60), restanteMinutos % 60], "HH:mm").format("HH:mm")
    setTiempoRestante(restante)
    if(restante === "00:00"){
      finishExam()
    } 
  }
  setContentMenu('make_test');

  useEffect(()=> {
    examenPrueba.fecha_fin = time(examenPrueba.fecha_inicio, "DD/MM/YYYY - HH:mmA").add(examenPrueba.duracion, "minutes").format("DD/MM/YYYY - HH:mmA")
    setExam({
      ...examenPrueba,
      changeQuestion
    })

    let intervalID = setInterval(()=>{
      timer()
    }, 60000)

    timer()

    // Limpiamos el timer
    return () => {
      window.clearInterval(intervalID)
    }
  }, [])

  if(exam){
    return (
      <div >
        <main className="content-main-crear-test">
        <div className="toolbar-icono"/>
          <Container maxWidth="lg" style={{paddingTop: '20px', paddingBottom: '32px'}}>
            <Grid container spacing={2} direction="row" justify="space-around">
              <h3>Hora de Inicio: {exam.fecha_inicio}</h3>
              <h3><ClockIcon style={{color: "black"}}/> {tiempoRestante}</h3>
              <h3>Hora de Fin: {exam.fecha_fin}</h3>
            </Grid>
          </Container>
          <FormPregunta 
            pregunta={exam.Preguntas.find(x => x["_id"] == preguntaActual)} 
            // pregunta={exam.Preguntas.find(x => x["_id"] == exam.Pregunta_Actual)}
            changeAnswer={changeAnswer} 
            changeQuestion={changeQuestion}
            isLastQuestion={preguntaActual === exam["Preguntas"].length}
            isFirstQuestion={preguntaActual === 1}
            finishExam={finishExam}
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