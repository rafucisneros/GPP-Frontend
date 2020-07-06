import React, { useState } from 'react'

// material
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider, CardContent, Card, CardHeader } from '@material-ui/core';

import ListaProfesores from '../componentes/lista_profesores/ListaProfesores.js'
import ListaAdmins from '../componentes/lista_admins/ListaAdmins.js'
import ListaEstudiantes from '../componentes/lista_estudiantes/ListaEstudiantesAdminPage.js'

export default function HomePage(){
  // Profesores
  let [profesoresExpanded, setProfesoresExpanded] = useState(false)
  const handleProfesoresExpanded = () => {
    setProfesoresExpanded(!profesoresExpanded)
  }

  // Estudiantes
  let [estudiantesExpanded, setEstudiantesExpanded] = useState(false)
  const handleEstudiantesExpanded = () => {
    setEstudiantesExpanded(!estudiantesExpanded)
  }

  // Administradores
  let [administradoresExpanded, setAdministradoresExpanded] = useState(false)
  const handleAdministradoresExpanded = () => {
    setAdministradoresExpanded(!administradoresExpanded)
  }

  const addUser = () => {
    
  }

  return (
    <div>
      <div className="toolbar-icono"/>    
      <Card>
        <CardHeader
          subheader={`Aquí puedes agregar, borrar y/o modificar tanto estudiantes, como administradores y profesores.`}
          title="Administración"
        />
        <Divider />
        <CardContent style={{padding: "6px"}}>
          <Container style={{paddingTop: '12px', paddingBottom: '12px'}}>
            <Grid container spacing={2}>                               
              {/* Profesores */}
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
              <ExpansionPanel expanded={estudiantesExpanded} onChange={handleEstudiantesExpanded} style={{width: "100%"}}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Estudiantes</Typography>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails>
                  <ListaEstudiantes />
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel expanded={administradoresExpanded} onChange={handleAdministradoresExpanded} style={{width: "100%"}}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Administradores</Typography>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails>
                  <ListaAdmins />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </Container>
        </CardContent>
      </Card>
    </div>
  )
}
