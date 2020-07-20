
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export const ExamCard = ({title, id, type}) => {
  return (
  <Card style={{marginTop: "10px", width: "180px", wordBreak: "break-word", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
    <CardContent style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <AssignmentIcon style={{fontSize: "5.5rem"}}/>
        <div style={{height: "67px", textOverflow: "ellipsis", overflow: "hidden"}}>
          <Typography className="cardTitle">
            {title}
          </Typography>
        </div>
    </CardContent>
    <Divider />
    <CardActions style={{justifyContent: "center", flexDirection: "column"}}>
      { type !== "Professor" ? 
        <Link style={{width: "100%", margin: 0}} to={`/resumen_examen/${id}`} className='link'>
          <Button 
            size="small" 
            color="primary"
            variant="contained"
            style={{marginBottom: "2px", width: "100%"}}
          >
            Ir a Examen
          </Button>
        </Link> :
        <Fragment>
          <Link style={{width: "100%", margin: 0}} to={`/examen/${id}/calificaciones`} className='link'>
            <Button 
              size="small" 
              color="primary"
              variant="contained"
              style={{marginBottom: "2px", width: "100%"}}
            >
              Ver Calificaciones
            </Button>
          </Link>  
          <Link style={{width: "100%", margin: 0}} to={`/detalles_examen/${id}`} className='link'>
            <Button 
              size="small" 
              variant="contained"
              color="primary"
              style={{marginBottom: "2px", width: "100%", background: "#6a3df3", color: "white"}}
            >
              Ver detalles
            </Button>
          </Link>  
        </Fragment>
      }
    </CardActions>
  </Card>
  )
}