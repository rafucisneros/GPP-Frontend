import React, { Fragment, useState, useEffect } from 'react';

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
// import GetAppIcon from '@material-ui/icons/GetApp';
// import Button from '@material-ui/core/Button';

// context
import { useGeneral } from '../../context/generalContext';

export default function GraphicPage(props){

    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [naAnswers, setNaAnswers] = useState(0);
    const [average, setAverage] = useState(0);

    const [ datosCorrectos, setDatosCorrectos ] = useState({
        title : 'Porcentaje de respuestas correctas',
        value : `${correctAnswers}%`,
        // value : '62%',
        type : 'correcto',
        color : 'success'
    });
    const [ datosInCorrectos, setDatosInCorrectos ] = useState({
        title : 'Porcentaje de respuestas incorrectas',
        value : `${incorrectAnswers}%`,
        // value : '11%',
        type : 'incorrecto',
        color : 'error'
    });
    const [ datosNA, setDatosNA ] = useState({
        title : 'Porcentaje de preguntas no contestadas',
        value : `${naAnswers}%`,
        // value : '27%',
        type : 'NA',
        color : 'warning'
    });
    const [ datosPromed, setDatosPromed ] = useState({
        title : 'Promedio de notas',
        value : `${average}`,
        // value : '16.2',
        type : 'promedio',
        color : 'normal'
    });

    useEffect(() => {
        if (props.estadisticas){
            props.estadisticas.total_ans > 0 ? setCorrectAnswers(props.estadisticas.total_ans_correct / props.estadisticas.total_ans) : setCorrectAnswers(0);
            props.estadisticas.total_ans > 0 ? setIncorrectAnswers(props.estadisticas.total_ans_incorrect / props.estadisticas.total_ans) : setIncorrectAnswers(0);
            props.estadisticas.total_ans > 0 ? setNaAnswers(props.estadisticas.total_ans_empty / props.estadisticas.total_ans) : setNaAnswers(0);
            setAverage(props.estadisticas.average_score);
        }
    }, [])
    
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
                        {/* <Grid item style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                            <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    endIcon={<GetAppIcon/>}
                                >
                                    Exportar CSV
                            </Button>
                        </Grid> */}
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
                                    // data = { props.estadisticas.by_section}
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
                                    data = { props.estadisticas.by_area}
                                    createDataBar = {props.createDataBar}
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
                                    data = { props.estadisticas.by_subarea}
                                    createDataBar = {props.createDataBar}
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
                                    data = { props.estadisticas.topic}
                                    createDataBar = {props.createDataBar}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
        
    )
}