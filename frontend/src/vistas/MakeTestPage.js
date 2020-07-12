import React, { useState, useEffect } from 'react';

import Loading from '../componentes/loading/Loading.js';
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
import { Alert } from '../componentes/alert/Alert.js'
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Divider,
  Container,
  Button
} from '@material-ui/core';


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
  const { usuario } = useUsuario();

  const [preguntaActual, setPreguntaActual] = useState(1);
  const [tiempoRestante, setTiempoRestante] = useState("00:00:00");
  // Finish Exam Alert
  const [open, setOpen] = React.useState(false);
  const [timeoutAlert, setTimeoutAlert] = React.useState(false);

  const [ultimoGuardado, setUltimoGuardado] = useState("Nunca");

    // Para el Alert
    const [ alertOpen, setAlertOpen] = useState(false)
    const [ errorMsg, setErrorMsg] = useState("")
    const [ alertSuccessOpen, setAlertSuccessOpen] = useState(false)
    const [ successMsg, setSuccessMsg] = useState("")

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
    let pregunta = nuevoExamen["Preguntas"].find(x => x["index"] === preguntaActual)
    pregunta["respuesta"] = newAnswer
    setExam(nuevoExamen)
  }

  const changeQuestion = (idQuestion, exam) => {
    setPreguntaActual(idQuestion)
    SaveExam(exam)    
  }

  // Finish Exam Button
  const finishExam = async () => {
    setOpen(true);
  }

  const SaveExam = async (examCache) => {
    let savingExam;
    if(examCache){
      savingExam = {
        ...examCache
      };
    } else {
      savingExam = {
        ...exam
      };
    }
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
    let guardando = await saveExamAnswers(request, usuario["id"], savingExam.attempt)
    setUltimoGuardado(time().format("DD/MM/YYYY - hh:mm:ss A"))
  }

  const timer = (horaFin) => {
    let ahora = time()
    let fin = time(horaFin, "DD/MM/YYYY - hh:mm:ss A")
    let restanteSegundos = parseInt(time.duration(fin.diff(ahora)).asSeconds() % 60)
    let restanteMinutos = parseInt(time.duration(fin.diff(ahora)).asMinutes() % 60)
    let restanteHoras = parseInt(time.duration(fin.diff(ahora)).asHours())

    if(restanteSegundos < 10) restanteSegundos = "0" + restanteSegundos
    if(restanteMinutos < 10) restanteMinutos = "0" + restanteMinutos
    if(restanteHoras < 10) restanteHoras = "0" + restanteHoras

    let restante = `${restanteHoras}:${restanteMinutos}:${restanteSegundos}`
    setTiempoRestante(restante)
    if(restante === "00:00:00"){
      setTimeoutAlert(true);
    } 
  }

  const timeoutFinish = () => {
    window.location = "/exam_finished/" + examID
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
      examData["Preguntas"] = preguntas["questions"];
      // Asignamos contador para saber cual es el orden de las preguntas
      let i = 1;
      examData["Preguntas"].forEach(x => {
        x["index"] = i++;
        if (x["type"] === "seleccion simple" || x["type"] === "verdadero o falso"){
          x["respuesta"] = ""; // Error input uncontrolled si qutas esto
        }
      })
      // Colocamos la primera pregunta como la actual
      setPreguntaActual(examData["Preguntas"][0]["index"])
      // Asignamos hora de inicio y fin del examen
      examData["fecha_inicio"] = time().format("DD/MM/YYYY - hh:mm:ss A")
      examData["fecha_fin"] = time(examData["fecha_inicio"], "DD/MM/YYYY - hh:mm:ss A").add(examData.duration, "minutes").format("DD/MM/YYYY - hh:mm:ss A")
      fin = examData["fecha_fin"]
      setExam({
        ...examData,
        changeQuestion,
        attempt: preguntas["attempt"]
      })
      runTimer = true;
      setContentMenu('make_test');
      // Iniciamos el cronometro
      let tiempoRestante = `${Math.floor(examData["duration"] / 60)}:${examData["duration"] % 60}:00`
      setTiempoRestante(tiempoRestante)
      // SaveExam(exam) 
    }
    fetchExam()

    intervalID = setInterval(()=>{
      if(runTimer){
        if(fin){
          timer(fin)
        }
      }
    }, 500)

    // Limpiamos el timer
    return () => {
      window.clearInterval(intervalID)
    }
  }, [])

  if(exam){
    return (
      <div className="content-main-presentar-test">
        <div className="toolbar-icono"/>
        <Container maxWidth="lg" style={{paddingTop: '20px'}}>
          <Grid container spacing={2} direction="row" justify="space-around">
            <h3>Hora de Inicio: {exam.fecha_inicio}</h3>
            <h3 style={{display: "flex"}}><ClockIcon style={{color: "black"}}/> {tiempoRestante}</h3>
            <h3>Hora de Fin: {exam.fecha_fin}</h3>
          </Grid>
        </Container>
        <Container maxWidth="lg" style={{flex: "1", paddingTop: '32px', paddingBottom: '32px', width : '100%'}}>
            <Grid container spacing={2} style={{height: "100%"}}>
              <Card style={{width: '100%', display: "flex", flexDirection: "column"}}>
                <CardHeader
                  title={exam.name}
                />
                <Divider />
                <CardContent style={{flex: "1"}}>
                <FormPregunta 
                  pregunta={exam.Preguntas.find(x => x["index"] == preguntaActual)} 
                  changeAnswer={changeAnswer} 
                  changeQuestion={changeQuestion}
                  isLastQuestion={preguntaActual === exam["Preguntas"].length}
                  isFirstQuestion={preguntaActual === 1}
                  finishExam={finishExam}
                  ultimoGuardado={ultimoGuardado}
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
                      Se terminó el tiempo del examen.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={timeoutFinish} color="primary">
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
                <Alert 
                  open={alertOpen}
                  setAlert={setAlertOpen}
                  message={errorMsg}
                />
                <Alert 
                  open={alertSuccessOpen}
                  setAlert={setAlertSuccessOpen}
                  message={successMsg}
                  severity="success"
                />
                </CardContent>
              </Card>
            </Grid>
          </Container>        
      </div>
    )
  } else {
    return (
      <Loading/>
    )
  }
}