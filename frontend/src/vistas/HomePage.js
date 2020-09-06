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
import { Carousel } from '../componentes/carousel/carousel.js';
import { ExamCard } from '../componentes/exam_card/ExamCard.js';

let time = require("moment")

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
          setActiveExams(request.data.filter( x => now.isBefore(time(x.finish_date))).slice(0,20))
          setFinishedExams(request.data.filter( x => !now.isBefore(time(x.finish_date))).slice(0,20))
        } catch (error) {
          console.log(error)
          setErrorMsg("Ocurrio un error cargando los examenes")
          setAlertOpen(true)
        }
      } else if(usuario.groups.find(x => x.name === "Student")){
        try {
          let request = await getExamsForStudent(usuario.id)
          let now = time()
          if(request.data.open){
            setOpenExams(request.data.open.filter( x => now.isBefore(time(x.finish_date))))
          } else {
            setOpenExams([])
          }
          if(request.data.secciones){
            setSectionExams(request.data.secciones.map(x => x.exam).filter( x => now.isBefore(time(x.finish_date))))
          } else {
            setSectionExams([])
          }
        } catch (error) {
          console.log(error)
          setErrorMsg("Ocurrio un error cargando los examenes")
          setAlertOpen(true)
        }
      }
    }
    fetchData()
  }, [usuario])

  return (
    <div >
      <div className="toolbar-icono"/>
        <Container maxWidth="lg" style={{paddingTop: '32px', paddingBottom: '32px'}}>
          {usuario.groups.length > 0 ? (
            <Fragment>            
              {
                // Profesores
                usuario.groups.find(x => x.name === "Professor") && (
                <Fragment>
                  <Grid container spacing={2} direction="column">
                  {/* <Grid container spacing={2} direction="column" style={{width: activeExams && activeExams.length < 6  ? "80%" : "80%"}}> */}
                    <div>
                      <h1>Exámenes Activos</h1>
                    </div>                    
                    <Grid container direction="row" style={{justifyContent: activeExams && activeExams.length < 6 ? "space-around" : "center"}}>
                      {activeExams ? (
                        activeExams.length < 6 ? (activeExams.map((exam, index) => {
                          return (
                            <ExamCard 
                              key={index} 
                              title={exam.name}
                              id={exam.id}
                              type="Professor"
                            />
                          )                
                        }))
                        : <Carousel items={activeExams} type="Professor"/>                      
                      ):
                        <Loading/>
                      }
                    </Grid>
                  </Grid>
                  <br/>
                  <Grid container spacing={2} direction="column">
                    <div>
                      <h1>Exámenes Culminados</h1>
                    </div>
                    <Grid container direction="row" style={{justifyContent: finishedExams && finishedExams.length < 6 ? "space-around" : "center"}}>
                      {finishedExams ? (
                        finishedExams.length < 6 ? (finishedExams.map((exam, index) => {
                          return (
                            <ExamCard 
                              key={index} 
                              title={exam.name}
                              id={exam.id}
                              type="Professor"
                            />
                          )                
                        }))
                        : <Carousel items={finishedExams} type="Professor"/>                      
                      ):
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
                      <h1>Exámenes Asignados</h1>
                    </div>
                    <Grid container direction="row" style={{justifyContent: sectionExams && sectionExams.length < 5 ? "space-around" : "center"}}>
                      {sectionExams ? (
                        sectionExams.length < 5 ? (sectionExams.map((exam, index) => {
                          return (
                            <ExamCard 
                              key={index} 
                              title={exam.name}
                              id={exam.id}
                              type="Student"
                            />
                          )                
                        }))
                        : <Carousel items={sectionExams} type="Student"/>                      
                      ):
                        <Loading/>
                      }
                    </Grid>
                  </Grid>
                  <br/>
                  <Grid container spacing={2} direction="column">
                    <div>
                      <h1>Exámenes Libres</h1>
                    </div>
                    <Grid container direction="row" style={{justifyContent: openExams && openExams.length < 5 ? "space-around" : "center"}}>
                      {openExams ? (
                        openExams.length < 5 ? (openExams.map((exam, index) => {
                          return (
                            <ExamCard 
                              key={index} 
                              title={exam.name}
                              id={exam.id}
                              type="Student"
                            />
                          )                
                        }))
                        : <Carousel items={openExams} type="Student"/>                      
                      ):
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
    </div>
  )
}