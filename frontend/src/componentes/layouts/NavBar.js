import React, { useState, Fragment, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

// componentes
import MenuCreateTest from '../menu_create_test/MenuCreateTest.js';
import ListaPreguntasExamen from '../menu_create_test/ListaPreguntasExamen.js';
import MenuGrafica from '../graficas/MenuGrafica.js';

// contexts
import { useTipoPreguntaRespuesta } from '../../context/createTestContext';
import { useGeneral } from '../../context/generalContext';
import { useMakeTest } from '../../context/makeTestContext';
import { useUsuario } from '../../context/usuarioContext';

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
import PersonIcon from '@material-ui/icons/Person';
import Box from '@material-ui/core/Box';
import PeopleIcon from '@material-ui/icons/People';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EditIcon from '@material-ui/icons/Edit';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BuildIcon from '@material-ui/icons/Build';
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import MinimizeIcon from '@material-ui/icons/Minimize';
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// constants
const drawerWidth = 240;
const useStyle = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        height: 'auto',
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        height: 'auto',
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

const NavBar = () => {
    const { contentMenu } = useGeneral();
    const { setSubMenuTipoPregunta } = useTipoPreguntaRespuesta();
    const { exam } = useMakeTest();
    const { usuario } = useUsuario();

    const [ clickItem, setClickItem ] = useState(false);
    const [ bar, setBar ] = useState(true);
    const [ collapse, setCollapse ] = useState(false);
    const classes = useStyle();
    
    const handleBarOpen = () => {
        setBar(true);
    };

    const handleBarClose = () => {
        setSubMenuTipoPregunta();
        setBar(false);
    };

    const handleClickItem = () => {
        setClickItem(!clickItem);
        setCollapse(!collapse);
    }

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

    useEffect( () => {
        setCollapse(false);
        setClickItem(false)
    }, [contentMenu])

    return(
        <div style={{display: 'flex'}}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, bar && classes.appBarShift)}>
                <Toolbar style={{paddingRight : '24px', width: '100%'}}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleBarOpen}
                        className = {!bar ? 'abrir-menu-crear-examen' : 'cerrar-menu-crear-examen'}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box className="flex-box-titulo">
                        <Typography component="h2" variant="h6" color="inherit" noWrap style={{flexGrow: 1}}>
                            GPI
                        </Typography>
                        <IconButton color="inherit" onClick={logout}>
                            <ExitToAppIcon style={{ fontSize : 30}} />
                        </IconButton>
                        <Grid style={{display : 'flex', justifyContent : 'flex-end'}}>
                            <IconButton color="inherit" className={classes.iconButtonAvatar}>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                                <Box style={{ marginLeft : '8px'}}>
                                    <Typography variant="subtitle1" color="inherit" noWrap style={{flexGrow: 1}}>
                                        {`${usuario.first_name.charAt(0).toUpperCase()}${usuario.first_name.slice(1).toLowerCase()}`}
                                    </Typography>
                                </Box>
                            </IconButton>
                        </Grid>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                paper: clsx(classes.drawerPaper, !bar && classes.drawerPaperClose),
                }}
                open={bar}
            >

            { (contentMenu === 'home' || contentMenu === 'profile') &&
                <Fragment>
                    <div className="toolbar-icono">
                    Menú
                    <IconButton onClick={handleBarClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <Link to="/home" className="link">
                            <ListItem
                                button
                            >
                            <ListItemIcon>
                                <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography type="body2" style={{ fontSize: 'inherit' }}>Menú Principal</Typography>}
                            />
                            </ListItem>
                        </Link>
                        <Link to={"/perfil"} className='link'>
                            <ListItem
                                button  
                            >
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={<Typography type="body2" style={{ fontSize: 'inherit' }}> Perfil </Typography>}
                                />
                            </ListItem>
                        </Link>
                        <ListItem
                            button
                            onClick={() => handleClickItem()}
                            selected={clickItem}
                        >
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography type="body2" style={{ fontSize: 'inherit' }}> Examenes </Typography>}
                            />
                            {collapse ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={collapse}
                            timeout="auto"
                            unmountOnExit
                        >
                            <Link to={"/create_test"} className='link'>
                                <ListItem
                                    button 
                                    style={{paddingLeft : '38px'}} 
                                >
                                    <ListItemIcon>
                                        <AddCircleOutlineIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={<Typography type="body2" style={{ fontSize: 'inherit' }}> Crear Examen </Typography>}
                                    />
                                </ListItem>
                            </Link>
                            <Link to={"/exams"} className='link'>
                                <ListItem
                                    button 
                                    style={{paddingLeft : '38px'}} 
                                >
                                    <ListItemIcon>
                                        <EditIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={<Typography type="body2" style={{ fontSize: 'inherit' }}> Ver Examenes </Typography>}
                                    />
                                </ListItem>
                            </Link>
                        </Collapse>
                        { usuario.groups.find(x => x.name === "Admin") && (
                        <Link to={"/admin"} className='link'>
                            <ListItem
                                button  
                            >
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={<Typography type="body2" style={{ fontSize: 'inherit' }}> Administración </Typography>}
                                />
                            </ListItem>
                        </Link>
                            )
                        }
                        {/* <Link to={"/mantenimiento"} className='link'>
                            <ListItem
                                button  
                            >
                                <ListItemIcon>
                                    <BuildIcon />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={<Typography type="body2" style={{ fontSize: 'inherit' }}> Próximamente </Typography>}
                                />
                            </ListItem>
                        </Link> */}
                    </List>
                </Fragment>
            }
            
            { contentMenu.split(' ')[0] === 'create_test' &&
                <Fragment>
                    <div className="toolbar-icono">
                        Menú del Examen
                        <IconButton onClick={handleBarClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider/>
                    <MenuCreateTest step = {contentMenu.split(' ')[1]}/>
    
                    <Divider/>
                    {
                        contentMenu.split(' ')[1] === 'step_1' && <ListaPreguntasExamen/>
                    }
                </Fragment>
            }

            { contentMenu.split(' ')[0] === 'grafica' &&
                <Fragment>
                    <div className="toolbar-icono">
                        Menú del Examen
                        <IconButton onClick={handleBarClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider/>
                    <MenuGrafica/>
                </Fragment>
            }

            { (contentMenu === 'general' || contentMenu.split(' ')[0] === 'edit_test') && 
                <Fragment>
                    <div className="toolbar-icono">
                        Menú del Examen
                        <IconButton onClick={handleBarClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <Link to="/home" className="link">
                            <ListItem
                                button
                            >
                            <ListItemIcon>
                                <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography type="body2" style={{ fontSize: 'inherit' }}>Menú Principal</Typography>}
                            />
                            </ListItem>
                        </Link>
                    </List>
                    <Divider/>
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
                            <TripOriginIcon style={{color: "#3f51b5"}}/>
                        </ListItemIcon>
                        <ListItemText primary="Respondida" style={{color: '#3f51b5' }} />
                    </ListItem>
                        <ListItem>
                        <ListItemIcon>
                            <MinimizeIcon style={{color: "grey"}}/>
                        </ListItemIcon>
                        <ListItemText primary="No Respondida" style={{color: 'grey' }} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {exam.Preguntas.map( (pregunta, index) => {
                    return (              
                        <ListItem 
                            key={index}
                            onClick={()=>{
                                exam.changeQuestion(pregunta["index"], exam)
                            }}
                            style={{cursor: "pointer"}}
                        >
                        <ListItemIcon>
                            {pregunta.respuesta ? 
                                <TripOriginIcon style={{color: "#3f51b5"}}/> : 
                                <MinimizeIcon style={{color: "grey"}}/>
                            }
                        </ListItemIcon>
                        <ListItemText 
                            primary={`Pregunta ${pregunta["index"]}`} 
                            style={{
                            color: pregunta.respuesta ? "#3f51b5" : "grey"
                            }} 
                        />
                        </ListItem>
                    )
                    })}
                </List>
            </Fragment>
            }

            { contentMenu === 'test_details' &&
                <Fragment>
                    <div className="toolbar-icono">
                        Menú del Examen
                        <IconButton onClick={handleBarClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider/>
                    <MenuCreateTest step = {contentMenu.split(' ')[1]}/>
    
                    <Divider/>
                    {
                        contentMenu.split(' ')[1] === 'step_1' && <ListaPreguntasExamen/>
                    }
                </Fragment>
            }
            </Drawer>
        </div>
    )
}

export default NavBar;