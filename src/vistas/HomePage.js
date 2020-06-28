import React, { useState, useEffect } from 'react';
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

const sections = {
    "sections": [
      {
        "id": 30,
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
        "id": 31,
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
  const [ exams, setExams] = useState([]);

  setContentMenu('home');

  useEffect(()=> {
    setExams(sections["sections"])
  }, [])

  return (
    <div>
      <main className="content-main-crear-test">
      <div className="toolbar-icono"/>
        <Container maxWidth="lg" style={{paddingTop: '32px', paddingBottom: '32px'}}>
          <Grid container spacing={2} direction="column">
              <div>
                <h1>Mis Examenes</h1>
              </div>
              <Grid container spacing={2} direction="row" justify="space-around">
                {exams.map(exam => {
                  return (
                  <Card>
                    <CardContent>
                      <AssignmentIcon style={{fontSize: "5.5rem"}}/>
                      <Divider />
                        Examen 1
                    </CardContent>
                    <CardActions>
                      {
                        false ? // user == student
                        <Link to={`/make_test/${exam.id}`} className='link'>
                          <Button size="small">Presentar Exámen</Button>
                        </Link> :
                        <Link to={`/test_details/${exam.id}`} className='link'>
                          <Button size="small">Ver detalles</Button>
                        </Link> 
                      }
                    </CardActions>
                  </Card>
                  )                
                })}
              </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}