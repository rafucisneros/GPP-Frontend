import React, {useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Carousel from '../componentes/carousel/carousel.js';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
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
}))

export default function HomePage(){
  const classes = useStyle();

  const [bar, setBar] = useState(true);

  const handleBarOpen = () => {
    setBar(true);
  };

  const handleBarClose = () => {
    setBar(false);
  };

  return (
    <div style={{display : 'flex'}}>
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
              Bienvenido
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
          Menu
          <IconButton onClick={handleBarClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to={"create_test/"}>
            <ListItem>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Mi Perfil" />
            </ListItem>
          </Link>
          <Link to={"create_test/"}>
            <ListItem>
              <ListItemIcon>
              <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Crear Examen" />
            </ListItem>
          </Link>
          <Link to={"create_test/"}>
            <ListItem>
              <ListItemIcon>
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText primary="Crear Salon" />
            </ListItem>
          </Link>
          <ListItem>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary="Salir del Sistema" />
          </ListItem>
        </List>
      </Drawer>
      <main className="content-main-crear-test">
      <div className="toolbar-icono"/>
        <Container maxWidth="lg" style={{paddingTop: '32px', paddingBottom: '32px'}}>
          <Grid container spacing={2} direction="column">
              <div>
                <h1>Mis Examenes</h1>
              </div>
              <Grid container spacing={2} direction="row" justify="space-around">
                <Card>
                  <CardContent>
                    <AssignmentIcon style={{fontSize: "5.5rem"}}/>
                    <Divider />
                      Examen 1
                  </CardContent>
                  <CardActions>
                    <Button size="small">Ver detalles</Button>
                  </CardActions>
                </Card>
                <Card>
                  <CardContent>
                    <AssignmentIcon style={{fontSize: "5.5rem"}}/>
                    <Divider />
                      Examen 1
                  </CardContent>
                  <CardActions>
                    <Button size="small">Ver detalles</Button>
                  </CardActions>
                </Card>
                <Card>
                  <CardContent>
                    <AssignmentIcon style={{fontSize: "5.5rem"}}/>
                    <Divider />
                      Examen 1
                  </CardContent>
                  <CardActions>
                    {/* <Link to={`/makeTest/${id}`}> */}
                    <Link to={`/makeTest/`}>
                      <Button size="small">Ver detalles</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}