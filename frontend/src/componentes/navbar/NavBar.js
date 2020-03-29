import React, { useState, Fragment } from 'react';
import clsx from 'clsx';

// componentes
import ListaTipoPregunta from '../../componentes/lista_tipo_pregunta/ListaTipoPregunta.js';
import ListaPreguntasExamen from '../../componentes/lista_preguntas_examen/ListaPreguntasExamen.js';

// contexts
import {useTipoPreguntaRespuesta} from '../../context/general_context';

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

const NavBar = ({children}) => {
    const classes = useStyle();
    const [contentMenu] = useState('create_test');
    const [bar, setBar] = useState(true);
    const {setSubMenuTipoPregunta} = useTipoPreguntaRespuesta();

    const handleBarOpen = () => {
        setBar(true);
    };

    const handleBarClose = () => {
        setSubMenuTipoPregunta();
        setBar(false);
    };

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
            </Drawer>
            
            <main className="content-main" >
                {children}
            </main>  
        </div>
    )
}

export default NavBar;