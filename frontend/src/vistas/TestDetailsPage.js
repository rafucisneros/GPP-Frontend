import React, { Fragment } from 'react';

// assets
import '../assets/css/createTestPage.css';

// componentes
import RespuestaSeleccion from '../componentes/respuesta_seleccion/RespuestaSeleccion.js';
import SeleccionarAreaTema from '../componentes/seleccionar_tema/SeleccionarAreaTema.js';
import PonderacionDificultad from '../componentes/ponderacion_dificultad/PonderacionDificultad.js';
import ConfiguracionExamen from '../componentes/configuracion_examen/ConfiguracionExamen.js'

// contexts
import { useTipoPreguntaRespuesta } from '../context/createTestContext';
import { useGeneral } from '../context/generalContext';

// material
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default function CreateTestPage() {

  const { setContentMenu } = useGeneral();
  const { tituloRespuesta, tipoPregunta } = useTipoPreguntaRespuesta();

  const handleSeleccionarTipoPregunta = () => {
    if ( tipoPregunta === "seleccion_simple" ){
      return(
        <RespuestaSeleccion key={`${tipoPregunta}`} />
      )
    } else if ( tipoPregunta === "seleccion_multiple")  {
      return (
        <RespuestaSeleccion key={`${tipoPregunta}`} />
      )
    } else if ( tipoPregunta === "verdadero_falso" ) {
      return (
        <RespuestaSeleccion key={`${tipoPregunta}`} />
      )
    } else if ( tipoPregunta === "ordenamiento" ) {
      return (
        <RespuestaSeleccion key={`${tipoPregunta}`} />
      )
    } else {
      return(<div></div>)
    }
  }

  setContentMenu('test_details');

  return (
      <div>
        <div className="toolbar-icono"/>

        <Container maxWidth="lg" style={{paddingTop: '32px', paddingBottom: '32px'}}>
            <Grid container spacing={2}>

              { tipoPregunta !== 'configuracion' ?
                <Fragment>
                  <Grid item xs={12}>
                      <Paper className="paper-crear-test" style={{display : 'contents'}}>
                        <Box className="flex-box-titulo">
                          <Box style={{height : 'auto'}}>
                            <Typography variant="h6">
                              {tituloRespuesta}
                            </Typography>
                          </Box>
                          <Box >
                            <Button
                              style={{background:"#ff4949", color : "white"}}
                              type="submit"
                              variant="contained"
                              color="red"
                            >
                              Publicar Examen
                            </Button>
                          </Box>
                        </Box>
                      </Paper>
                  </Grid>

                  <Grid item lg={9} sm={9} xl={9} xs={9}>
                    <Paper className="paper-crear-test" style={{height : '100%'}}>
                      Enfoque
                      <SeleccionarAreaTema/>
                    </Paper>
                  </Grid>

                  <Grid item lg={3} sm={3} xl={3} xs={3}>
                    <Paper className="paper-crear-test" style={{height : '100%'}}>
                      Evaluación
                      <PonderacionDificultad/>
                    </Paper>
                  </Grid>

                    { handleSeleccionarTipoPregunta() }

                  <Grid item xs={12} md={12} lg={12}>
                    <Paper className="paper-crear-test">
                        <Box className="div-buttons-respuestas">
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{marginRight: '8px'}}
                          >
                            Crear Pregunta
                          </Button>
                          <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                          >
                            Eliminar Pregunta
                          </Button>
                        </Box>
                    </Paper>
                  </Grid> 
                </Fragment>
                :
                  <Grid item xs={12} md={12} lg={12}>
                    <ConfiguracionExamen/>
                  </Grid>
              }
            </Grid>
        </Container>
      </div>
  );
}