import React, { useState, useEffect, Fragment } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Divider,
  Container,
  Button,
  Typography,
  Slide
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { 
  getExam,
} from '../servicios/servicioPresentarExamen.js';

import { 
  getExamResultsbyStydent,
} from '../servicios/servicioDetalleExamen.js';
import { useUsuario } from '../context/usuarioContext';
import Loading from '../componentes/loading/Loading.js';
import { useHistory } from "react-router-dom"

let time = require("moment")

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TestPreviewPage(props){
  const examID = props.match.params.id;
  const [ exam, setExam] = useState(null)
  const { usuario } = useUsuario();
  const [open, setOpen] = React.useState(false);
  let history = useHistory();

  useEffect(() => {
    let fetchData = async () => {
      let { data: examData } = await getExam({}, examID);
      let { data: examResults } = await getExamResultsbyStydent(examID, usuario.id);
      examData["start_date"] = time(examData["start_date"]).format("DD/MM/YYYY - hh:mm:ss A")
      examData["finish_date"] = time(examData["finish_date"]).format("DD/MM/YYYY - hh:mm:ss A")
      setExam({
        ...examData,
        ...examResults
      })
    }
    if(usuario.id){
      fetchData()
    }
  }, [usuario])

  const presentarExamen = () => {
    history.push("/presentar_examen/" + examID)
  }
  return (
    <div>
      <div className="toolbar-icono"/>
      { exam ? (
        <Container maxWidth="lg" style={{paddingTop: '32px', paddingBottom: '32px', width : '100%'}}>
          <Grid container spacing={2}>
            <Card style={{width : '100%'}}>
              <CardHeader
                subheader={`Aquí encontrarás informacion referente al examen seleccionado.`}
                title="Detalles del Examen"
              />
              <Divider />
              <CardContent>
                <Grid container spacing={2} style={{margin: "8px 0px"}}>
                  <Grid container spacing={2} direction={"row"}>
                    <Grid item xs={3} md={3} lg={3}>
                      <Typography variant="subtitle1" style={{fontWeight : 600}}>
                        Nombre:
                      </Typography>
                    </Grid>  
                    <Grid item xs={9} md={9} lg={9}>
                      {exam.name}
                    </Grid>   
                  </Grid>
                  <Grid container spacing={2} direction={"row"}>
                    <Grid item xs={3} md={3} lg={3}>
                      <Typography variant="subtitle1" style={{fontWeight : 600}}>
                        Habilitado a partir de:
                      </Typography>
                    </Grid>  
                    <Grid item xs={3} md={3} lg={3}>
                      {exam.start_date}
                    </Grid>  
                    <Grid item xs={3} md={3} lg={3}>
                      <Typography variant="subtitle1" style={{fontWeight : 600}}>
                        Habilitado hasta:
                      </Typography>
                    </Grid>  
                    <Grid item xs={3} md={3} lg={3}>
                      {exam.finish_date}
                    </Grid>  
                  </Grid>
                  <Grid container spacing={2} direction={"row"}>
                    <Grid item xs={3} md={3} lg={3}>
                      <Typography variant="subtitle1" style={{fontWeight : 600}}>
                        Intentos Permitidos:
                      </Typography>
                    </Grid>  
                    <Grid item xs={3} md={3} lg={3}>
                      {exam.attempt ? exam.attempt : "Sin Límite"}
                    </Grid>  
                    <Grid item xs={3} md={3} lg={3}>
                      <Typography variant="subtitle1" style={{fontWeight : 600}}>
                        Duración:
                      </Typography>
                    </Grid>  
                    <Grid item xs={3} md={3} lg={3}>
                      {exam.duration} minutos
                    </Grid>  
                  </Grid>
                  <Grid container spacing={2} direction={"row"}>
                    <Grid item xs={3} md={3} lg={3}>
                      <Typography variant="subtitle1" style={{fontWeight : 600}}>
                        Cantidad de preguntas:
                      </Typography>
                    </Grid>  
                    <Grid item xs={3} md={3} lg={3}>
                      {exam.question_quantity}
                    </Grid>  
                    <Grid item xs={3} md={3} lg={3}>
                    </Grid>  
                    <Grid item xs={3} md={3} lg={3}>
                    </Grid>  
                  </Grid>
                </Grid>
                <Divider style={{width: "100%"}}/>
                  { exam.presented ? (      
                    <Fragment>                   
                      <Grid container spacing={2} style={{margin: "8px 0px"}}>
                        <Grid container spacing={2} direction={"row"}>
                          <Grid item xs={3} md={3} lg={3}>
                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                              Resultados Obtenidos:
                            </Typography>
                          </Grid>  
                          <Grid item xs={3} md={3} lg={3}>
                            {exam.passed ? (
                                <Typography style={{color: "green"}}>Aprobado</Typography>
                              ): (
                                <Typography style={{color: "red"}}>Reprobado</Typography>
                              )
                            }
                          </Grid>  
                          <Grid item xs={3} md={3} lg={3}>
                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                              Nota (último intento realizado):
                            </Typography>
                          </Grid>  
                          <Grid item xs={3} md={3} lg={3}>
                            {exam.score} / {exam.total_score_exam}
                          </Grid>  
                        </Grid>
                        <Grid container spacing={2} direction={"row"}>
                          <Grid item xs={3} md={3} lg={3}>
                            <Typography variant="subtitle1" style={{fontWeight : 600}}>
                              Intentos realizados:
                            </Typography>
                          </Grid>  
                          <Grid item xs={3} md={3} lg={3}>
                            {exam.attempts} intento(s)
                          </Grid> 
                        </Grid>
                      </Grid>
                        {
                          time(exam.finish_date, "DD/MM/YYYY - hh:mm:ss A").isAfter() && 
                          exam.attempts < exam.attempt && (
                            <Fragment>
                              <Divider style={{width: "100%", marginBottom: "5px"}}/>
                              <Grid container spacing={2} direction={"row"} style={{margin: "8px 0px", justifyContent: "center"}}>
                                <Button 
                                  onClick={() => setOpen(true)} 
                                  color="primary"
                                  variant="contained">
                                    Presentar Examen
                                  </Button>
                              </Grid>
                            </Fragment>
                          )
                        }
                      </Fragment>             
                    ) : (
                      <Fragment>
                        {
                          time(exam.finish_date, "DD/MM/YYYY - hh:mm:ss A").isAfter() && (
                          <Grid container spacing={2} style={{margin: "8px 0px", paddingTop: "20px"}}>
                            <Grid container spacing={2} direction={"row"}  style={{justifyContent: "center"}}>
                              <Button 
                                onClick={() => setOpen(true)} 
                                color="primary"
                                variant="contained"
                              >
                                Presentar Examen
                              </Button>
                            </Grid>
                          </Grid>
                          )
                        }
                      </Fragment>
                    )
                  }
              </CardContent>
            </Card>
          </Grid>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Presentar Examen"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                ¿Seguro que desea realizar el examen? (Se perderán resultados obtenidos previamente en este examen)
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                No
              </Button>
              <Button onClick={presentarExamen} color="primary">
                Si
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      ) : <Loading />}
    </div>
  )
}