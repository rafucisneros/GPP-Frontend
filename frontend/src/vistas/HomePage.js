import React, {useState } from 'react';

import { useGeneral } from '../context/generalContext';

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

export default function HomePage(){
  const { setContentMenu } = useGeneral();

  setContentMenu('home');

  return (
    <div>
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
                    <Link to={`/make_test/1`}>
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