import React, { useState } from 'react'

// material
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
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
              <Accordion expanded={profesoresExpanded} onChange={handleProfesoresExpanded} style={{width: "100%"}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Profesores</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <ListaProfesores />
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={estudiantesExpanded} onChange={handleEstudiantesExpanded} style={{width: "100%"}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Estudiantes</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <ListaEstudiantes />
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={administradoresExpanded} onChange={handleAdministradoresExpanded} style={{width: "100%"}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Administradores</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <ListaAdmins />
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Container>
        </CardContent>
      </Card>
    </div>
  )
}
