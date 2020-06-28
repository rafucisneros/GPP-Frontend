import React, { Fragment, useState } from 'react';

// componentes
import EstadisticaResumen from '../informacion_graficas/EstadisticaResumen';
import BarGrafica from './BarGrafica';
import DoughnutGrafica from './DoughnutGrafica';

// materials
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';

// context
import { useGeneral } from '../../context/generalContext';

export default function GraphicPage(){

    const [ datosCorrectos, setDatosCorrectos ] = useState({
        title : 'Porcentaje de respuestas correctas',
        value : '62%',
        type : 'correcto',
        color : 'success'
    });
    const [ datosInCorrectos, setDatosInCorrectos ] = useState({
        title : 'Porcentaje de respuestas incorrectas',
        value : '11%',
        type : 'incorrecto',
        color : 'error'
    });
    const [ datosNA, setDatosNA ] = useState({
        title : 'Porcentaje de preguntas no contestadas',
        value : '27%',
        type : 'NA',
        color : 'warning'
    });
    const [ datosPromed, setDatosPromed ] = useState({
        title : 'Promedio de notas',
        value : '16.2',
        type : 'promedio',
        color : 'normal'
    });

    const { setContentMenu } = useGeneral();
    setContentMenu(`grafica general`);

    return(
        <Fragment>
            <div className="toolbar-icono"/>
            <Container maxWidth={false} style={{paddingTop: '32px'}}>
                <Grid container spacing={3} >
                    <Box style={{display: 'flex', marginBottom : '12px', paddingLeft : '12px', paddingRight : '12px', width : '100%'}}>
                        <Grid item style={{display: 'flex', alignSelf: 'center'}}>
                            <Typography variant="h6">
                                Estadísticas Generales del Examen
                            </Typography>
                        </Grid>
                        <Grid item style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                            <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    endIcon={<GetAppIcon/>}
                                >
                                    Exportar CSV
                            </Button>
                        </Grid>
                    </Box>
                </Grid>
                <Grid container spacing={3} >
                    <Grid item xs={3} md={3} lg={3}>
                        <EstadisticaResumen
                            datos = {datosCorrectos} 
                        />
                    </Grid>
                    <Grid item xs={3} md={3} lg={3}>
                        <EstadisticaResumen
                            datos = {datosInCorrectos} 
                        />
                    </Grid>
                    <Grid item xs={3} md={3} lg={3}>
                        <EstadisticaResumen
                            datos = {datosNA} 
                        />
                    </Grid>

                    <Grid item xs={3} md={3} lg={3}>
                        <EstadisticaResumen
                            datos = {datosPromed} 
                        />
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Paper style={{height : '100%'}}>
                            <Box style={{padding : '16px'}}>
                                Información del Examen
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Paper>
                            <Box style={{padding : '16px'}}>
                                <DoughnutGrafica 
                                    title = {'Aprobados vs Reprobados'}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Paper>
                            <Box style={{padding : '16px'}}>
                                <BarGrafica 
                                    title = {'Desemepeño por Secciones'}
                                    type = {'Sección'}
                                    stack = {false}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Paper>
                            <Box style={{padding : '16px'}}>
                                <BarGrafica 
                                    title = {'Desemepeño por Áreas'}
                                    type = {'Área'}
                                    stack = {false}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Paper>
                            <Box style={{padding : '16px'}}>
                                <BarGrafica 
                                    title = {'Desemepeño por Subareas'}
                                    type = {'Subarea'}
                                    stack = {true}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Paper>
                            <Box style={{padding : '16px'}}>
                                <BarGrafica 
                                    title = {'Desemepeño por Temas'}
                                    type = {'Tema'}
                                    stack = {true}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
        
    )
}