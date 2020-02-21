import React, {useState, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import CheckIcon from '@material-ui/icons/Check';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Switch from '@material-ui/core/Switch';

//assets
import '../assets/css/createTestPage.css';

// components
import TextArea from '../components/text_area/TextArea.js'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
}));

export default function CreateTestPage() {
  const classes = useStyles();

  const [bar, setBar] = useState(true);
  const [respuestas, setRespuestas] = useState([]);
  const [tituloRespuesta, setTituloRespuesta] = useState("Selección Simple");
  const [tipoPregunta, setTipoPregunta] = useState("seleccion_simple");

  const handleBarOpen = () => {
    setBar(true);
  };

  const handleBarClose = () => {
    setBar(false);
  };

  const handleAgregarRespuesta = () => {
      let campo = [...respuestas];
      campo.push({
        respuesta : '',
      });
      setRespuestas(campo);
  }

  const handleEliminarRespuesta = (index) => {
    let campos = [...respuestas];
    campos.splice(index, 1);
    setRespuestas(campos);
  }

  const menuDeOpciones = (
    <div>
      <ListItem button onClick={() => handleCambiarTipoPregunta("seleccion_simple")}>
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>
        <ListItemText primary="Selección Simple" />
      </ListItem>
      <ListItem button onClick={() => handleCambiarTipoPregunta("seleccion_multiple")}>
        <ListItemIcon>
          <DoneAllIcon />
        </ListItemIcon>
        <ListItemText primary="Selección Múltiple" />
      </ListItem>
      <ListItem button onClick={() => handleCambiarTipoPregunta("verdadero_falso")}>
        <ListItemIcon>
          <ThumbsUpDownIcon />
        </ListItemIcon>
        <ListItemText primary="Verdadero / Falso" />
      </ListItem>
      <ListItem button onClick={() => handleCambiarTipoPregunta("ordenamiento")}>
        <ListItemIcon>
          <FormatListNumberedIcon />
        </ListItemIcon>
        <ListItemText primary="Ordenamiento" />
      </ListItem>
      <ListItem button>
      </ListItem>
    </div>
  );

  const handleCambiarTipoPregunta = (tipo) => {
    if (tipo === "seleccion_simple") setTituloRespuesta("Selección Simple");
    else if (tipo === "seleccion_multiple") setTituloRespuesta("Selección Múltiple");
    else if (tipo === "verdadero_falso") setTituloRespuesta("Verdadero y Falso");
    else if (tipo === "ordenamiento") setTituloRespuesta("Ordenamiento");
    setTipoPregunta(tipo)
  }

  const handleCambiarRespuesta = (e, index) => {
      let valores = [...respuestas];
      let name = e.target.name;
      let value = e.target.value;
      valores[index][name] = value;
      setRespuestas(valores);
  }

  const handleSeleccionarTipoPregunta = () => {
    if ( tipoPregunta === "seleccion_simple" ){
      return (
        <Fragment>
          <TextArea/>
          <Grid item xs={12} md={12} lg={12}>
              <Paper className="paper-crear-test section-paper-crear-test ultima-seccion">
                  <Box id="titulo-respuesta" className="flex-box-titulo">
                      <Box >
                          <span className = "respuestas-subtitulo">
                              Respuestas
                          </span>
                      </Box>
                      <Box >
                          <IconButton className="boton-agregar-respuestas" onClick={handleAgregarRespuesta}>
                              <AddIcon className="agregar-respuestas"/>
                          </IconButton>
                      </Box>
                  </Box>
                  {respuestas.map( (respuesta, index) => {
                      return (
                        <Box key={`${respuesta}-${index}`} className="flex-box-respuestas">
                        <Box >
                            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={respuesta.respuesta}
                            id={`respuesta${index}`}
                            label="Escribe una respuesta"
                            name={`respuesta`}
                            autoFocus
                            onChange={(e) => handleCambiarRespuesta(e, index)}
                        />
                        </Box>
                        <Box >
                          {/* <Switch checked={true} onChange={handleChange('checkedA')} value="checkedA" /> */}
                          <Switch checked={true} value="checkedA" color="primary"/>
                        </Box>
                        <Box >
                            <IconButton className="boton-borrar-respuestas" onClick={ () => handleEliminarRespuesta(index)}>
                                <CloseIcon className="borrar-respuestas"/>
                            </IconButton>
                        </Box>
                    </Box>
                      )
                    })
                  }

              </Paper>
          </Grid>
        </Fragment> 
      )
    } else if ( tipoPregunta === "seleccion_multiple")  {
      return (
        <Fragment>
          <TextArea/>
        </Fragment> 
      )
    } else if ( tipoPregunta === "verdadero_falso" ) {
      return (
        <Fragment>
          <TextArea/>
        </Fragment>
      )
    } else if ( tipoPregunta === "ordenamiento" ) {
      return (
        <Fragment>
          <TextArea/>
        </Fragment>
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
          <Typography component="h1" variant="h6" color="inherit" noWrap style={{flexGrow: 1}}>
            <Box className="flex-box-titulo">
              <ControlPointIcon style={{marginRight : '8px'}}/>
              Agregar Pregunta
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
            Tipo de Pregunta
            <IconButton onClick={handleBarClose}>
                <ChevronLeftIcon />
            </IconButton>
        </div>
        <Divider />
        <List>
            {menuDeOpciones}
        </List>
      </Drawer>
      <main className="content-main-crear-test">
        <div className="toolbar-icono"/>
        <Container maxWidth="lg" style={{paddingTop: '32px', paddingBottom: '32px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className="paper-crear-test">
                      {tituloRespuesta}
                    </Paper>
                </Grid>

                <Divider />

                {/* <form className="container-login-signup-form" noValidate> */}
                { handleSeleccionarTipoPregunta() }

                <Grid item xs={12} md={12} lg={12}>
                  <Paper className="paper-crear-test">
                    <Box className="flex-box-titulo">
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
                        Terminar Examen
                        </Button>
                      </Box>
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