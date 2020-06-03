import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Loading from '../componentes/loading/Loading.js';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FormPregunta from '../componentes/form_pregunta/FormPregunta';
import { useGeneral } from '../context/generalContext';
import { useUsuario } from '../context/usuarioContext';
import ClockIcon from '@material-ui/icons/AccessTime';
import { 
  getExamQuestions, 
  getExam,
  saveExamAnswers 
} from '../servicios/servicioPresentarExamen.js';


import "../assets/css/makeTestPage.css";

// contexts
import {useMakeTest} from '../context/makeTestContext';

let time = require("moment")

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MakeTestPage(props){
  const examID = props.match.params.id;

  const { setContentMenu } = useGeneral();
  const { exam, setExam } = useMakeTest();
  const { usuario, setUsuario } = useUsuario();

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState("00:00");
  // Finish Exam Alert
  const [open, setOpen] = React.useState(false);
  const [timeoutAlert, setTimeoutAlert] = React.useState(false);

  const confirmFinishExam = async () => {
    try {
      await SaveExam()
      window.location = "/exam_finished/1"
    } catch {
      alert("No se pudo guardar el examen. Intente nuevamente")
    }
  };

  const cancelFinishExam = () => {
    setOpen(false);
  };
  
  const changeAnswer = (newAnswer) => {
    let nuevoExamen = {...exam}
    let pregunta = nuevoExamen["Preguntas"].find(x => x["id"] === preguntaActual)
    pregunta["respuesta"] = newAnswer
    setExam(nuevoExamen)
  }

  const changeQuestion = (idQuestion) => {
    setPreguntaActual(idQuestion)
  }

  // Finish Exam Button
  const finishExam = async () => {
    setOpen(true);
  }

  const SaveExam = async () => {
    let savingExam = {
      ...exam
    };
    let request = savingExam.Preguntas.map( pregunta => {
      let answers = [];
      switch(pregunta["type"]){
        case "ordenamiento":
          if(pregunta["respuesta"]){
            for(let i=1; i < pregunta["respuesta"].length + 1; i++){
              answers.push({
                content: pregunta["respuesta"][i-1]["content"],
                correct: i
              })
            }
          } 
          break;
        case "seleccion simple":
          if(pregunta["respuesta"]){
            answers = pregunta["answers"].map( x => {
              return {
                id: x["id"],
                content: x["content"],
                correct: 0
              }
            })
            answers.find(x => x["id"] == pregunta["respuesta"])["correct"] = 1
          } 
          break;
        case "seleccion multiple":
          if(pregunta["respuesta"]){
            answers = pregunta["answers"].map( x => {
              return {
                content: x["content"],
                correct: pregunta["respuesta"].includes(x["id"].toString()) ? 1 : 0
              }
            })
          } 
          break;
        case "verdadero o falso":
          if(pregunta["respuesta"]){
            answers = pregunta["answers"].map( x => {
              return {
                content: x["content"],
                correct: pregunta["respuesta"]
              }
            })
          }   
          break;
      }
      return {
        id: pregunta["id"],
        answers 
      }
    })
    let guardando = await saveExamAnswers(request, usuario["id"], examID)
  }

  const timer = (horaFin) => {
    let ahora = time()
    let fin = time(horaFin, "DD/MM/YYYY - HH:mmA").add(1,"minutes")
    let restanteMinutos = time.duration(fin.diff(ahora)).asMinutes()
    let restante = time([Math.floor(restanteMinutos / 60), restanteMinutos % 60], "HH:mm").format("HH:mm")
    setTiempoRestante(restante)
    if(restante === "00:00"){
      SaveExam();
      setTimeoutAlert(true);
    } 
  }

  const timeoutFinish = () => {
    window.location = "/exam_finished/1"
  }

  useEffect(() => {
    let runTimer = false;
    let fin;
    let intervalID;
    async function fetchExam(){
      // Obtenemos los detalles del examen
      let { data: examData } = await getExam({}, examID);
      // Obtenemos las preguntas del examen
      let { data: preguntas } = await getExamQuestions({}, examID);
      examData["Preguntas"] = preguntas;
      // Asignamos contador para saber cual es el orden de las preguntas
      let i = 1;
      examData["Preguntas"].forEach(x => {
        x["index"] = i++;
        if (x["type"] === "seleccion simple" || x["type"] === "verdadero o falso"){
          x["respuesta"] = ""; // Error input uncontrolled si qutas esto
        }
      })
      // Colocamos la primera pregunta como la actual
      setPreguntaActual(examData["Preguntas"][0]["id"])
      // Asignamos hora de inicio y fin del examen
      examData["fecha_inicio"] = time().format("DD/MM/YYYY - HH:mmA")
      examData["fecha_fin"] = time(examData["fecha_inicio"], "DD/MM/YYYY - HH:mmA").add(examData.duration, "minutes").format("DD/MM/YYYY - HH:mmA")
      fin = examData["fecha_fin"]
      setExam({
        ...examData,
        changeQuestion
      })
      runTimer = true;
      setContentMenu('make_test');
      // Iniciamos el cronometro
      let tiempoRestante = time([Math.floor(examData["duration"] / 60), examData["duration"] % 60], "HH:mm").format("HH:mm")
      setTiempoRestante(tiempoRestante)
    }
    fetchExam()

    intervalID = setInterval(()=>{
      if(runTimer){
        if(fin){
          timer(fin)
        }
      }
    }, 20000)

    // Limpiamos el timer
    return () => {
      window.clearInterval(intervalID)
    }
  }, [])

  if(exam){
    return (
      <div className="content-main-presentar-test">
        <div className="toolbar-icono"/>
        <Container maxWidth="lg" style={{paddingTop: '20px', paddingBottom: '32px'}}>
          <Grid container spacing={2} direction="row" justify="space-around">
            <h3>Hora de Inicio: {exam.fecha_inicio}</h3>
            <h3><ClockIcon style={{color: "black"}}/> {tiempoRestante}</h3>
            <h3>Hora de Fin: {exam.fecha_fin}</h3>
          </Grid>
        </Container>
        <FormPregunta 
          pregunta={exam.Preguntas.find(x => x["id"] == preguntaActual)} 
          changeAnswer={changeAnswer} 
          changeQuestion={changeQuestion}
          isLastQuestion={preguntaActual === exam["Preguntas"].length}
          isFirstQuestion={preguntaActual === 1}
          finishExam={finishExam}
        />
        {/* Finish Exam Alert */}
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Terminar Examen"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              ¿Seguro que desea terminar el examen?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelFinishExam} color="primary">
              No
            </Button>
            <Button onClick={confirmFinishExam} color="primary">
              Si
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={timeoutAlert}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Terminar Examen"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              ¿Seguro que desea terminar el examen?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={timeoutFinish} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  } else {
    return (
      <Loading/>
    )
  }
}