
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';

export const ExamCard = ({title, id, type}) => {
  return (
  <Card style={{maxWidth: "150px", wordBreak: "break-word", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
    <CardContent style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <AssignmentIcon style={{fontSize: "5.5rem"}}/>
      <Divider />
        {title}
    </CardContent>
    <CardActions style={{justifyContent: "center", flexDirection: "column"}}>
      { type !== "Professor" ? 
        <Link to={`/make_test/${id}`} className='link'>
          <Button size="small">Presentar  Examen</Button>
        </Link> :
        <Fragment>
          <Link to={`/exam/${id}/calificaciones`} className='link'>
            <Button size="small">Ver Calificaciones</Button>
          </Link>  
          <Link to={`/test_details/${id}`} className='link'>
            <Button size="small">Ver detalles</Button>
          </Link>  
        </Fragment>
      }
    </CardActions>
  </Card>
  )
}