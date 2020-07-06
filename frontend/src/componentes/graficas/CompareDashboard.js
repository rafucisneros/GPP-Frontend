import React, { Fragment, useState, useEffect, useMemo} from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import GetAppIcon from '@material-ui/icons/GetApp';
// import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// context
import { useGeneral } from '../../context/generalContext';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function CompareDashboard(props){

    const [ secciones, setSecciones ] = useState([]);
    const [ seccion_1, setSeccion_1 ] = useState('');
    const [ seccion_2, setSeccion_2 ] = useState('');

    const [correctAnswers_1, setCorrectAnswers_1] = useState(0);
    const [incorrectAnswers_1, setIncorrectAnswers_1] = useState(0);
    const [naAnswers_1, setNaAnswers_1] = useState(0);
    const [average_1, setAverage_1] = useState(0);

    const [correctAnswers_2, setCorrectAnswers_2] = useState(0);
    const [incorrectAnswers_2, setIncorrectAnswers_2] = useState(0);
    const [naAnswers_2, setNaAnswers_2] = useState(0);
    const [average_2, setAverage_2] = useState(0);

    const [ datosCorrectos_1, setDatosCorrectos_1 ] = useState({
        title : 'Porcentaje de respuestas correctas',
        value : `${correctAnswers_1}%`,
        type : 'correcto',
        color : 'success'
    });
    const [ datosInCorrectos_1, setDatosInCorrectos_1 ] = useState({
        title : 'Porcentaje de respuestas incorrectas',
        value : `${incorrectAnswers_1}%`,
        type : 'incorrecto',
        color : 'error'
    });
    const [ datosNA_1, setDatosNA_1 ] = useState({
        title : 'Porcentaje de preguntas no contestadas',
        value : `${naAnswers_1}%`,
        type : 'NA',
        color : 'warning'
    });
    const [ datosPromed_1, setDatosPromed_1 ] = useState({
        title : 'Promedio de notas',
        value : `${average_1}`,
        type : 'promedio',
        color : 'normal'
    });

    const [ datosCorrectos_2, setDatosCorrectos_2 ] = useState({
        title : 'Porcentaje de respuestas correctas',
        value : `${correctAnswers_2}%`,
        type : 'correcto',
        color : 'success'
    });
    const [ datosInCorrectos_2, setDatosInCorrectos_2 ] = useState({
        title : 'Porcentaje de respuestas incorrectas',
        value : `${incorrectAnswers_2}%`,
        type : 'incorrecto',
        color : 'error'
    });
    const [ datosNA_2, setDatosNA_2 ] = useState({
        title : 'Porcentaje de preguntas no contestadas',
        value : `${naAnswers_2}%`,
        type : 'NA',
        color : 'warning'
    });
    const [ datosPromed_2, setDatosPromed_2 ] = useState({
        title : 'Promedio de notas',
        value : `${average_2}`,
        type : 'promedio',
        color : 'normal'
    });

    useEffect(() => {
        if (props.estadisticas){
            let seccionesAux = Object.keys(props.estadisticas.by_section).map( key => {
                return { label : key, valor : key}
            })
            setSecciones(seccionesAux);
            // props.estadisticas.total_ans > 0 ? setCorrectAnswers((props.estadisticas.total_ans_correct / (props.estadisticas.total_ans / 100 )).toFixed(2)) : setCorrectAnswers(0);
            // props.estadisticas.total_ans > 0 ? setIncorrectAnswers((props.estadisticas.total_ans_incorrect / (props.estadisticas.total_ans / 100 )).toFixed(2)): setIncorrectAnswers(0);
            // props.estadisticas.total_ans > 0 ? setNaAnswers((props.estadisticas.total_ans_empty / (props.estadisticas.total_ans / 100 )).toFixed(2)) : setNaAnswers(0);
            // setAverage(props.estadisticas.average_score.toFixed(2));

            // props.estadisticas.total_ans > 0 ? setCorrectAnswers((props.estadisticas.total_ans_correct / (props.estadisticas.total_ans / 100 )).toFixed(2)) : setCorrectAnswers(0);
            // props.estadisticas.total_ans > 0 ? setIncorrectAnswers((props.estadisticas.total_ans_incorrect / (props.estadisticas.total_ans / 100 )).toFixed(2)): setIncorrectAnswers(0);
            // props.estadisticas.total_ans > 0 ? setNaAnswers((props.estadisticas.total_ans_empty / (props.estadisticas.total_ans / 100 )).toFixed(2)) : setNaAnswers(0);
            // setAverage(props.estadisticas.average_score.toFixed(2));
        }
    }, [props.estadisticas])

        useMemo(() => {
        if (seccion_1){
            let section = props.estadisticas.by_section[seccion_1]
            if(section){
                section.total_ans > 0 ? setCorrectAnswers_1((section.total_ans_correct / (section.total_ans / 100 )).toFixed(2)) : setCorrectAnswers_1(0);
                section.total_ans > 0 ? setIncorrectAnswers_1((section.total_ans_incorrect / (section.total_ans / 100 )).toFixed(2)): setIncorrectAnswers_1(0);
                section.total_ans > 0 ? setNaAnswers_1((section.total_ans_empty / (section.total_ans / 100 )).toFixed(2)) : setNaAnswers_1(0);
                setAverage_1(section.average_score.toFixed(2));
            }
        }
    }, [seccion_1])

    useMemo(() => {
        if (seccion_2){
            let section = props.estadisticas.by_section[seccion_2]
            if(section){
                section.total_ans > 0 ? setCorrectAnswers_2((section.total_ans_correct / (section.total_ans / 100 )).toFixed(2)) : setCorrectAnswers_2(0);
                section.total_ans > 0 ? setIncorrectAnswers_2((section.total_ans_incorrect / (section.total_ans / 100 )).toFixed(2)): setIncorrectAnswers_2(0);
                section.total_ans > 0 ? setNaAnswers_2((section.total_ans_empty / (section.total_ans / 100 )).toFixed(2)) : setNaAnswers_2(0);
                setAverage_2(section.average_score.toFixed(2));
            }
        }
    }, [seccion_2])

    useMemo(() => {
        if (correctAnswers_1){
            let datosCorrectosAux = datosCorrectos_1;
            datosCorrectosAux.value = `${correctAnswers_1}%`;
            setDatosCorrectos_1(datosCorrectosAux);
        }
    }, [correctAnswers_1])

    useMemo(() => {
        if (incorrectAnswers_1){
            let datosInCorrectosAux = datosInCorrectos_1;
            datosInCorrectosAux.value = `${incorrectAnswers_1}%`;
            setDatosInCorrectos_1(datosInCorrectosAux);
        }
    }, [incorrectAnswers_1])

    useMemo(() => {
        if (naAnswers_1){
            let datosNAAux = datosNA_1;
            datosNAAux.value = `${naAnswers_1}%`;
            setDatosNA_1(datosNAAux);
        }
    }, [naAnswers_1])

    useMemo(() => {
        if (average_1){
            let datosPromedAux = datosPromed_1;
            datosPromedAux.value = average_1;
            setDatosPromed_1(datosPromedAux);
        }
    }, [average_1])

    useMemo(() => {
        if (correctAnswers_2){
            let datosCorrectosAux = datosCorrectos_2;
            datosCorrectosAux.value = `${correctAnswers_2}%`;
            setDatosCorrectos_2(datosCorrectosAux);
        }
    }, [correctAnswers_2])

    useMemo(() => {
        if (incorrectAnswers_2){
            let datosInCorrectosAux = datosInCorrectos_2;
            datosInCorrectosAux.value = `${incorrectAnswers_2}%`;
            setDatosInCorrectos_2(datosInCorrectosAux);
        }
    }, [incorrectAnswers_2])

    useMemo(() => {
        if (naAnswers_2){
            let datosNAAux = datosNA_2;
            datosNAAux.value = `${naAnswers_2}%`;
            setDatosNA_2(datosNAAux);
        }
    }, [naAnswers_2])

    useMemo(() => {
        if (average_2){
            let datosPromedAux = datosPromed_2;
            datosPromedAux.value = average_2;
            setDatosPromed_2(datosPromedAux);
        }
    }, [average_2])

    const { setContentMenu } = useGeneral();
    setContentMenu(`grafica compare`);
    // debugger

    const classes = useStyles();

    return(
        <Fragment>
            <div className="toolbar-icono"/>
            <Container maxWidth={false} style={{paddingTop: '32px'}}>
                <Grid container spacing={3} >
                    <Box style={{display: 'flex', paddingLeft : '12px', paddingRight : '12px', width : '100%'}}>
                        <Grid item style={{display: 'flex', alignSelf: 'center'}}>
                            <Typography variant="h6">
                            Comparación por Sección
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
                    <Grid item xs={6} md={6} lg={6} style={{ borderRight: '1px solid black'}}>
                        <Grid container spacing={3} style={{padding : '12px', paddingRight: '24px'}}>
                            <Grid item xs={12} md={12} lg={12} style={{textAlignLast : 'center'}}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Sección</InputLabel>
                                    <Select
                                        // labelId="demo-simple-select-label"
                                        // id="demo-simple-select"
                                        value={seccion_1}
                                        onChange={ (e) => setSeccion_1(e.target.value)}
                                    >
                                        {secciones.map(item => (
                                            <MenuItem key={item.valor} value={item.valor} >
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <EstadisticaResumen datos = {datosCorrectos_1} />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <EstadisticaResumen datos = {datosInCorrectos_1} />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <EstadisticaResumen datos = {datosNA_1} />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <EstadisticaResumen datos = {datosPromed_1} />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper>
                                    <Box style={{padding : '16px'}}>
                                        <DoughnutGrafica 
                                            title = {'Aprobados vs Reprobados'}
                                            createDataDoughnut = {props.createDataDoughnut}
                                            data={ 
                                                props.estadisticas.by_section && props.estadisticas.by_section[seccion_1] ?
                                                props.estadisticas.by_section[seccion_1].evaluation : null
                                            }
                                        />
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper>
                                    <Box style={{padding : '16px'}}>
                                        <BarGrafica 
                                            title = {'Desemepeño por Áreas'}
                                            type = {'Área'}
                                            stack = {false}
                                            createDataBar = {props.createDataBar}
                                            data={ 
                                                props.estadisticas.by_section && props.estadisticas.by_section[seccion_1] ?
                                                props.estadisticas.by_section[seccion_1].by_area : null
                                            }
                                        />
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper>
                                    <Box style={{padding : '16px'}}>
                                        <BarGrafica 
                                            title = {'Desemepeño por Subareas'}
                                            type = {'Subarea'}
                                            stack = {true}
                                            createDataBar = {props.createDataBar}
                                            data={ 
                                                props.estadisticas.by_section && props.estadisticas.by_section[seccion_1] ?
                                                props.estadisticas.by_section[seccion_1].by_subarea : null
                                            }
                                        />
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper>
                                    <Box style={{padding : '16px'}}>
                                        <BarGrafica 
                                            title = {'Desemepeño por Temas'}
                                            type = {'Tema'}
                                            stack = {true}
                                            createDataBar = {props.createDataBar}
                                            data={ 
                                                props.estadisticas.by_section && props.estadisticas.by_section[seccion_1] ?
                                                props.estadisticas.by_section[seccion_1].by_topic : null
                                            }
                                        />
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Grid container spacing={3}  style={{padding : '12px', paddingLeft : '24px'}}>
                            <Grid item xs={12} md={12} lg={12} style={{textAlignLast : 'center'}}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Sección</InputLabel>
                                    <Select
                                        // labelId="demo-simple-select-label"
                                        // id="demo-simple-select"
                                        value={seccion_2}
                                        onChange={ (e) => setSeccion_2(e.target.value)}
                                    >
                                        {secciones.map(item => (
                                            <MenuItem key={item.valor} value={item.valor} >
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <EstadisticaResumen
                                    datos = {datosCorrectos_2} 
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <EstadisticaResumen
                                    datos = {datosInCorrectos_2} 
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <EstadisticaResumen
                                    datos = {datosNA_2} 
                                />
                            </Grid>

                            <Grid item xs={6} md={6} lg={6}>
                                <EstadisticaResumen
                                    datos = {datosPromed_2} 
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper>
                                    <Box style={{padding : '16px'}}>
                                        <DoughnutGrafica 
                                            title = {'Aprobados vs Reprobados'}
                                            createDataDoughnut = {props.createDataDoughnut}
                                            data={ 
                                                props.estadisticas.by_section && props.estadisticas.by_section[seccion_2] ?
                                                props.estadisticas.by_section[seccion_2].evaluation : null
                                            }
                                        />
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper>
                                    <Box style={{padding : '16px'}}>
                                        <BarGrafica 
                                            title = {'Desemepeño por Áreas'}
                                            type = {'Área'}
                                            stack = {false}
                                            createDataBar = {props.createDataBar}
                                            data={ 
                                                props.estadisticas.by_section && props.estadisticas.by_section[seccion_2] ?
                                                props.estadisticas.by_section[seccion_2].by_area : null
                                            }
                                        />
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper>
                                    <Box style={{padding : '16px'}}>
                                        <BarGrafica 
                                            title = {'Desemepeño por Subareas'}
                                            type = {'Subarea'}
                                            stack = {true}
                                            createDataBar = {props.createDataBar}
                                            data={ 
                                                props.estadisticas.by_section && props.estadisticas.by_section[seccion_2] ?
                                                props.estadisticas.by_section[seccion_2].by_subarea : null
                                            }
                                        />
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper>
                                    <Box style={{padding : '16px'}}>
                                        <BarGrafica 
                                            title = {'Desemepeño por Temas'}
                                            type = {'Tema'}
                                            stack = {true}
                                            createDataBar = {props.createDataBar}
                                            data={ 
                                                props.estadisticas.by_section && props.estadisticas.by_section[seccion_2] ?
                                                props.estadisticas.by_section[seccion_2].by_topic : null
                                            }
                                        />
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
        
    )
}