import React, { useState } from 'react'

// material
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';

import ListaProfesores from '../componentes/lista_profesores/ListaProfesores.js'

export default function AdminPage(){
  let [profesoresExpanded, setProfesoresExpanded] = useState(true)
  const handleProfesoresExpanded = () => {
    setProfesoresExpanded(!profesoresExpanded)
  }

  let [profesores, setProfesores] = useState([])

  return (
    <div className="content-main-examen-terminado">
      <div className="toolbar-icono"/>
      <Container style={{paddingTop: '32px', paddingBottom: '32px'}}>
        <Grid container spacing={2}>                               
          <ExpansionPanel expanded={profesoresExpanded} onChange={handleProfesoresExpanded} style={{width: "100%"}}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Profesores</Typography>
            </ExpansionPanelSummary>
            <Divider />
            <ExpansionPanelDetails>
              <ListaProfesores />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Container>
    </div>
  )
}
