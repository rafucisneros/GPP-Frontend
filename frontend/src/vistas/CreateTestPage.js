import React, { useState } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

// assets
import '../assets/css/createTestPage.css';

// componentes
import ListaTipoPregunta from '../componentes/lista_tipo_pregunta/ListaTipoPregunta.js';
import RespuestaSeleccion from '../componentes/respuesta_seleccion/RespuestaSeleccion.js'
import SeleccionarAreaTema from '../componentes/seleccionar_tema/SeleccionarAreaTema.js'
import ListaPreguntasExamen from '../componentes/lista_preguntas_examen/ListaPreguntasExamen.js'

// contexts
import {useTipoPreguntaRespuesta} from '../context/general_context';
import { maxHeight } from '@material-ui/system';

const drawerWidth = 240;

const useStyle = makeStyles(theme => ({
  appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      }),
  },
  appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
      }),
  },
  drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen}),
      // height: '60%',
      backgroundColor : '#fcfcfc',  
      maxHeight : 750

  },
  drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
      // [theme.breakpoints.up('sm')]: {
      // width: theme.spacing(9),
      // },
  },
}))

export default function CreateTestPage() {
  const classes = useStyle();

  const [bar, setBar] = useState(true);
  const {tituloRespuesta, tipoPregunta, handleOpcionExamen, itemSeleccionado, subMenuTipoPregunta, setSubMenuTipoPregunta, setItemSeleccionado} = useTipoPreguntaRespuesta();

  const handleBarOpen = () => {
    setBar(true);
  };

  const handleBarClose = () => {
    setSubMenuTipoPregunta();
    setBar(false);
  };

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

  return (
    <div style={{display : 'flex'}}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, bar && classes.appBarShift)}>
        <Toolbar style={{paddingRight : '24px'}}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleBarOpen}
            className = {!bar ? 'abrir-menu-crear-examen' : 'cerrar-menu-crear-examen'}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h2" variant="h6" color="inherit" noWrap style={{flexGrow: 1}}>
            <Box className="flex-box-titulo">
              GPI
            </Box>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !bar && classes.drawerPaperClose),
        }}
        open={bar}
      >
        <div className="toolbar-icono">
            Menú del Examen
            <IconButton onClick={handleBarClose}>
                <ChevronLeftIcon />
            </IconButton>
        </div>
        <Divider/>
        <ListaTipoPregunta/>
        <Divider/>
        <ListaPreguntasExamen/>
      </Drawer>
      <main className="content-main-crear-test">
        <div className="toolbar-icono"/>
        <Container maxWidth="lg" style={{paddingTop: '32px', paddingBottom: '32px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className="paper-crear-test" style={{display : 'contents'}}>
                      <Typography variant="h6" gutterBottom>
                        {tituloRespuesta}
                      </Typography>
                    </Paper>
                </Grid>

                <Grid item lg={6} sm={6} xl={6} xs={6}>
                  <Paper className="paper-crear-test" style={{height : '100%'}}>
                    Enfoque
                    <SeleccionarAreaTema/>
                  </Paper>
                </Grid>
                <Grid item lg={6} sm={6} xl={6} xs={6}>
                  <Paper className="paper-crear-test" style={{height : '100%'}}>
                    Evaluación
                    <Box style={{display: 'flex'}}>
                      <Box style={{float: 'left', width : '50%', paddingRight: '3px'}}>
                        <TextField
                          id={`dificultad`}
                          label="Number"
                          type="number"
                          margin="normal"
                          label="Dificultad"
                          required
                          variant="outlined"
                          fullWidth
                          // name={`dificultad`}
                          autoFocus
                          // onChange={(e) => handleCambiarRespuesta(e, index)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            inputProps: { 
                                max: 5, min: 0, step : 1
                          }}}
                        />
                      </Box>
                      <Box style={{float: 'rigth', width : '50%', paddingLeft: '3px'}}>
                        <TextField
                          id={`ponderacion`}
                          label="Number"
                          type="number"
                          margin="normal"
                          label="Ponderación"
                          required
                          variant="outlined"
                          fullWidth
                          // name={`ponderacion`}
                          autoFocus
                          // onChange={(e) => handleCambiarRespuesta(e, index)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            inputProps: { 
                                max: 100, min: 0, step : 0.25
                          }}}
                        />
                      </Box>
                    </Box>
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
                          Publicar Examen
                        </Button>
                      </Box>
                  </Paper>
                </Grid>
                
                {/* </form> */}
            </Grid>
        </Container>
      </main>
    </div>
  );
}