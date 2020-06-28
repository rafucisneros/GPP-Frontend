import React, { Fragment, useState } from 'react';
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
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
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

const listaSecciones = [
    { valor : 'Sección 1', label: 'Sección 1' },
    { valor : 'Sección 2', label: 'Sección 2' },
    { valor : 'Sección 3', label: 'Sección 3' },
    { valor : 'Sección 4', label: 'Sección 4' },
]

export default function GraphicPage(){

    const [ seccion1, setSeccion1 ] = useState('');
    const [ seccion2, setSeccion2 ] = useState('');
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
    setContentMenu(`grafica compare`);

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
                    <Grid item xs={6} md={6} lg={6} style={{ borderRight: '1px solid black'}}>
                        <Grid container spacing={3} style={{padding : '12px', paddingRight: '24px'}}>
                            <Grid item xs={12} md={12} lg={12} style={{textAlignLast : 'center'}}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Sección</InputLabel>
                                    <Select
                                        // labelId="demo-simple-select-label"
                                        // id="demo-simple-select"
                                        value={seccion1}
                                        onChange={ (e) => setSeccion1(e.target.value)}
                                    >
                                        {listaSecciones.map(item => (
                                            <MenuItem key={item.valor} value={item.valor} >
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <EstadisticaResumen
                                    datos = {datosCorrectos} 
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <EstadisticaResumen
                                    datos = {datosInCorrectos} 
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <EstadisticaResumen
                                    datos = {datosNA} 
                                />
                            </Grid>

                            <Grid item xs={6} md={6} lg={6}>
                                <EstadisticaResumen
                                    datos = {datosPromed} 
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper>
                                    <Box style={{padding : '16px'}}>
                                        <DoughnutGrafica 
                                            title = {'Aprobados vs Reprobados'}
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
                                        value={seccion2}
                                        onChange={ (e) => setSeccion2(e.target.value)}
                                    >
                                        {listaSecciones.map(item => (
                                            <MenuItem key={item.valor} value={item.valor} >
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <EstadisticaResumen
                                    datos = {datosCorrectos} 
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <EstadisticaResumen
                                    datos = {datosInCorrectos} 
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <EstadisticaResumen
                                    datos = {datosNA} 
                                />
                            </Grid>

                            <Grid item xs={6} md={6} lg={6}>
                                <EstadisticaResumen
                                    datos = {datosPromed} 
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper>
                                    <Box style={{padding : '16px'}}>
                                        <DoughnutGrafica 
                                            title = {'Aprobados vs Reprobados'}
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