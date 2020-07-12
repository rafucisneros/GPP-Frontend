import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useGeneral } from '../context/generalContext';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';

import { useUsuario } from '../context/usuarioContext';
import { Alert } from '../componentes/alert/Alert.js'
import { getExamsForTeacher, getExamsForStudent } from '../servicios/servicioGeneral.js'
import Loading from '../componentes/loading/Loading.js';
import { ExamCard } from '../componentes/exam_card/ExamCard.js';

let time = require("moment")

const sections = {
    "sections": [
      {
        "id": 29,
        "name": "Section 3",
        "exam": {
          "id": 1,
          "name": "Primer Examen de Testeate",
          "status": true,
          "start_date": "2020-02-20T21:00:26Z",
          "finish_date": "2020-02-20T23:00:38Z",
          "author": 1
        }
      },
      {
        "id": 29,
        "name": "Section 4",
        "exam": {
          "id": 1,
          "name": "Segundo Examen de Testeate",
          "status": true,
          "start_date": "2020-02-20T21:00:26Z",
          "finish_date": "2020-02-20T23:00:38Z",
          "author": 1
        }
      }
    ]
  }

export default function HomePage(){
  const { setContentMenu } = useGeneral();
  const [ activeExams, setActiveExams ] = useState(null);
  const [ finishedExams, setFinishedExams ] = useState(null);
  const [ openExams, setOpenExams ] = useState(null);
  const [ sectionExams, setSectionExams ] = useState(null);
  const { usuario } = useUsuario();
  setContentMenu('home');

  // Para el Alert
  const [ alertOpen, setAlertOpen] = useState(false)
  const [ errorMsg, setErrorMsg] = useState("")
  const [ alertSuccessOpen, setAlertSuccessOpen] = useState(false)
  const [ successMsg, setSuccessMsg] = useState("")

  useEffect(()=> {
    let fetchData = async () => {
      if(usuario.groups.find(x => x.name === "Professor")){
        try {
          let request = await getExamsForTeacher(usuario.id)
          let now = time()
          setActiveExams(request.data.filter( x => now.isBefore(time(x.finish_date))).slice(0,5))
          setFinishedExams(request.data.filter( x => !now.isBefore(time(x.finish_date))).slice(0,5))
        } catch {
          setErrorMsg("Ocurrio un error cargando los examenes")
          setAlertOpen(true)
        }
      } else if(usuario.groups.find(x => x.name === "Student")){
        try {
          let request = await getExamsForStudent(usuario.id)
          let now = time()
          setOpenExams(request.data.open.filter( x => now.isBefore(time(x.finish_date))).slice(0,5))
          setSectionExams(request.data.secciones.map(x => x.exam).filter( x => now.isBefore(time(x.finish_date))).slice(0,5))
        } catch {
          setErrorMsg("Ocurrio un error cargando los examenes")
          setAlertOpen(true)
        }
      }
    }
    fetchData()
  }, [usuario])

  return (
    <div>
      <main className="content-main-crear-test">
      <div className="toolbar-icono"/>
        <Container maxWidth="lg" style={{paddingTop: '32px', paddingBottom: '32px'}}>
          {usuario.groups.length > 0 ? (
            <Fragment>            
              {
                // Profesores
                usuario.groups.find(x => x.name === "Professor") && (
                <Fragment>
                  <Grid container spacing={2} direction="column">
                    <div>
                      <h1>Examenes Activos</h1>
                    </div>
                    <Grid container spacing={2} direction="row" justify="space-around">
                      {activeExams ? (activeExams.map((exam, index) => {
                        return (
                          <ExamCard 
                            key={index} 
                            title={exam.name}
                            id={exam.id}
                            type="Professor"
                          />
                        )                
                      })) :
                        <Loading/>
                      }
                    </Grid>
                  </Grid>
                  <br/>
                  <Grid container spacing={2} direction="column">
                    <div>
                      <h1>Examenes Culminados</h1>
                    </div>
                    <Grid container spacing={2} direction="row" justify="space-around">
                      {finishedExams ? (finishedExams.map((exam, index) => {
                        return (
                          <ExamCard 
                            key={index} 
                            title={exam.name}
                            id={exam.id}
                            type="Professor"
                          />
                        )                
                      })) :
                        <Loading/>
                      }
                    </Grid>
                  </Grid>
                </Fragment>
                )
              }
              {
                usuario.groups.find(x => x.name === "Student") && (
                <Fragment>
                  <Grid container spacing={2} direction="column">
                    <div>
                      <h1>Examenes Asignados</h1>
                    </div>
                    <Grid container spacing={2} direction="row" justify="space-around">
                      {sectionExams ? (sectionExams.map((exam, index) => {
                        return (
                          <ExamCard 
                            key={index} 
                            title={exam.name}
                            id={exam.id}
                            type="Student"
                          />
                        )                
                      })) :
                        <Loading/>
                      }
                    </Grid>
                  </Grid>
                  <br/>
                  <Grid container spacing={2} direction="column">
                    <div>
                      <h1>Examenes Libres</h1>
                    </div>
                    <Grid container spacing={2} direction="row" justify="space-around">
                      {openExams ? (openExams.map((exam, index) => {
                        return (
                          <ExamCard 
                            key={index} 
                            title={exam.name}
                            id={exam.id}
                            type="Student"
                          />
                        )                
                      })) :
                        <Loading/>
                      }
                    </Grid>
                  </Grid>
                </Fragment>
                )
              }
            </Fragment>
          ) : (
            <Loading/>
          )} 
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
        </Container>
      </main>
    </div>
  )
}