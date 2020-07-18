import React, { useEffect, useState } from "react"
import Loading from '../componentes/loading/Loading.js';
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
import "../assets/css/ExamFinishedPage.css"
import { 
  getExamResultsbyStydent,
} from '../servicios/servicioDetalleExamen.js';

import { useHistory } from "react-router-dom"
import { useGeneral } from '../context/generalContext';
import {useMakeTest} from '../context/makeTestContext';

export default function ExamFinishedPage(props){
  const examID = props.match.params.eid;
  const studentID = props.match.params.sid;
  const [ examResults, setExamResults] = useState(null)
  let history = useHistory();
  const { setContentMenu } = useGeneral();

  const { exam, setExam } = useMakeTest();
  setContentMenu(`home`);

  useEffect( () => {
    setExam(null)
    let fetchData= async () => {
      let { data: resultados } = await getExamResultsbyStydent(examID, studentID);
      setExamResults({
        ...resultados
      })
    }
    fetchData()
  }, []) 

  return (
    <div className="content-main-examen-terminado">
      <div className="toolbar-icono"/>
      { examResults ? (
        <Container maxWidth="lg" style={{paddingTop: '32px', paddingBottom: '32px', width : '100%'}}>
          <Grid container spacing={2}>
            <Card style={{width : '100%'}}>
              <CardHeader
                title="Examen finalizado exitosamente"
              />
              <Divider />
              <CardContent>
                <Grid container spacing={2} style={{margin: "8px 0px"}}>
                  <Grid container spacing={2} direction={"row"}>
                    <Grid item xs={3} md={3} lg={3}>
                      <Typography>Nota obtenida:</Typography>
                    </Grid>  
                    <Grid item xs={9} md={9} lg={9}>
                      {examResults.score} / {examResults.total_score_exam}
                    </Grid>   
                  </Grid>
                </Grid>
                <Grid container spacing={2} direction={"row"} style={{margin: "8px 0px", justifyContent: "center"}}>
                  <Button 
                    onClick={() => history.push('/home')} 
                    color="primary"
                    variant="contained">
                      Volver a la página principal
                    </Button>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Container>
        ) : (
          <Loading/>
        )
      }
    </div>
  )
}