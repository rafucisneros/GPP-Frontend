import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

// componentes
import ListaTipoPregunta from '../../componentes/lista_tipo_pregunta/ListaTipoPregunta.js';
import ListaPreguntasExamen from '../../componentes/lista_preguntas_examen/ListaPreguntasExamen.js';

// contexts
import { useTipoPreguntaRespuesta } from '../../context/createTestContext';
import { useGeneral } from '../../context/generalContext';
import { useMakeTest } from '../../context/makeTestContext';

// helpers
import { logout } from '../../helpers/auth.js'

// assets
import './NavBar.css';

// material
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

// constants
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
      overflowY : 'auto',
      transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen}),
      height: '100vh',
      backgroundColor : '#fcfcfc',  
    //   maxHeight : 750

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

const NavBar = ({children}) => {
    const classes = useStyle();

    const { contentMenu } = useGeneral();
    const { setSubMenuTipoPregunta } = useTipoPreguntaRespuesta();
    const { exam, setExam } = useMakeTest();

    const [ bar, setBar ] = useState(true);
    

    const handleBarOpen = () => {
        setBar(true);
    };

    const handleBarClose = () => {
        setSubMenuTipoPregunta();
        setBar(false);
    };

    // <ListItem
    //       button
    //       onClick={ () => handleCloseSubMenuTipoPregunta('3')}
    //       selected={itemSeleccionado === '4'}
    //     >
    //       <ListItemIcon>
    //         <ForwardIcon />
    //       </ListItemIcon>
    //       <ListItemText
    //         primary={<Typography type="body2" style={{ fontSize: 'inherit' }}>Muy pronto...</Typography>}
    //       />
    //     </ListItem>

    return(
        <div style={{display: 'flex'}}>
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
                <IconButton color="inherit" onClick={logout}>
                    <PowerSettingsNewIcon />
                </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                paper: clsx(classes.drawerPaper, !bar && classes.drawerPaperClose),
                }}
                open={bar}
            >

            { contentMenu === 'home' &&
                <Fragment>
                    <div className="toolbar-icono">
                    Menú
                    <IconButton onClick={handleBarClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                    </div>
                    <Divider />
                    <List>
                    <Link to={"perfil"} className='link'>
                            <ListItem
                                button  
                            >
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={<Typography type="body2" style={{ fontSize: 'inherit' }}> Mi Perfil </Typography>}
                                />
                            </ListItem>
                        </Link>
                        <Link to={"create_test"} className='link'>
                            <ListItem
                                button  
                            >
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={<Typography type="body2" style={{ fontSize: 'inherit' }}> Crear Exámen </Typography>}
                                />
                            </ListItem>
                        </Link>
                        <Link to={"create_classroom"} className='link'>
                            <ListItem
                                button  
                            >
                                <ListItemIcon>
                                    <GroupAddIcon />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={<Typography type="body2" style={{ fontSize: 'inherit' }}> Crear Salón </Typography>}
                                />
                            </ListItem>
                        </Link>
                    </List>
                </Fragment>
            }
            
            { contentMenu === 'create_test' &&
                <Fragment>
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
                </Fragment>
            }

            { contentMenu === 'make_test' &&
                <Fragment>
                    <div className="toolbar-icono">
                        Resumen de Preguntas
                        <IconButton onClick={handleBarClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <CheckIcon style={{color: "green"}}/>
                        </ListItemIcon>
                        <ListItemText primary="Respondida" style={{color: 'green' }} />
                    </ListItem>
                        <ListItem>
                        <ListItemIcon>
                            <CloseIcon style={{color: "red"}}/>
                        </ListItemIcon>
                        <ListItemText primary="No Respondida" style={{color: 'red' }} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {exam.Preguntas.map( (pregunta, index) => {
                    return (              
                        <ListItem key={index}>
                        <ListItemIcon>
                            {["ordenamiento", "seleccion_multiple"].includes(pregunta.tipo) ?
                            (pregunta.respuesta.length ? 
                                <CheckIcon style={{color: "green"}}/> : 
                                <CloseIcon style={{color: "red"}}/>) : 
                            (pregunta.respuesta ? 
                                <CheckIcon style={{color: "green"}}/> : 
                                <CloseIcon style={{color: "red"}}/>)
                            }
                        </ListItemIcon>
                        <ListItemText 
                            primary={`Pregunta ${pregunta._id}`} 
                            style={{
                            color: ["ordenamiento", "seleccion_multiple"].includes(pregunta.tipo) ?
                                (pregunta.respuesta.length ? "green" : "red") : 
                                (pregunta.respuesta ? "green" : "red")
                            }} 
                        />
                        </ListItem>
                    )
                    })}
                </List>
              </Fragment>
            }
            </Drawer>
            
            <main className="content-main" >
                {children}
            </main>  
        </div>
    )
}

export default NavBar;