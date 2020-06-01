import React, { Fragment, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';

// material
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    Divider,
    Switch,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    Typography,
} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import FormHelperText from '@material-ui/core/FormHelperText';
import MomentUtils from '@date-io/moment';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'

// contexts
import { useCreateTestPage } from '../../context/createTestPageContext';
import { useUsuario } from '../../context/usuarioContext';

const tituloTooltip = "El modo estático le permitirá mostrar el examen en el orden que usted desee. En el modo dinámico el examen será mostrado de manera aleatoria de acuerdo a las configuraciones introucidas."

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
        width : '100%'
    }
}));

const duracionExamen = [
    {valor : 2, label: '2 min'},
    {valor : 5, label: '5 min'},
    {valor : 8, label: '8 min'},
    {valor : 10, label: '10 min'},
    {valor : 15, label: '15 min'},
    {valor : 30, label: '30 min'},
    {valor : 45, label: '45 min'},
    {valor : 60, label: '1 hora'},
    {valor : 90, label: '1 hora y 30 min'},
    {valor : 120, label: '2 horas'},
    {valor : 150, label: '2 hora y 30 min'},
    {valor : 180, label: '3 horas'},
    {valor : 210, label: '3 horas y 30 minutos'},
    {valor : 240, label: '4 horas'},
    {valor : 270, label: '4 horas y 30 minutos'},
    {valor : 300, label: '5 horas'}
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const StepConfiguracionBasica = () => {

    const classes = useStyles();
    const { usuario } = useUsuario();
    const {  
        handleChangeStep,
        handleCambiarSwitch,
        handleCambiarValor,
        handleChangeStartDate,
        handleChangeFinishDate,
        valorFechaInicio,
        valorFechaFin,
        switchChecked,
        tipoConfiguracion,
        titulo,
        comentarios,
        duracion
    } = useCreateTestPage();

    const [errores, setErrores] = useState({tituloError : false, duracionError : false});

    const verifyData = (flag) => {
        let error = false;
        let listError = {};

        if(flag === 'all' || flag === 'titulo'){
            if( !titulo || validator.isEmpty(titulo)){
                error = true;
                listError.tituloError = true;
            } 
            else listError.tituloError = false;
        }

        if(flag === 'all' || flag === 'duracion'){
            if( !duracion || validator.isEmpty(String(duracion))){
                error = true;
                listError.duracionError = true;
            } 
            else listError.duracionError = false;
        }

        setErrores({...errores, ...listError});
        return error;
    }

    useMemo( () => {
        if (titulo) verifyData('titulo');
    }, [titulo])

    useMemo(() => {
        if (duracion) verifyData('duracion');
    }, [duracion])

    const sendInitialData = (step) => {
        let error = verifyData('all');
        if(!error){
            // let request = {
            //     name : titulo,
            //     start_date : moment(valorFechaInicio).toISOString(),
            //     finish_date : moment(valorFechaFin).toISOString(),
            //     duration : duracion,
            //     description : comentarios,
            //     static : switchChecked,
            //     email : usuario.email,
            //     status : true
            // }
            // createTest(request)
            // .then( res => {
            //     console.log(res)
            //     if (res) {
            //         SetExamId(res.data.id);
            handleChangeStep(step);
            //     }
            // })
        }
    }

    return (
        <Fragment>
            <Grid item xs={12} style={{marginBottom : '16px'}}>
                <Paper className="paper-crear-test" style={{display : 'contents'}}>
                    <Box className="flex-box-titulo">
                        <Box style={{height : 'auto'}}>
                            <Typography variant="h6">
                                Paso - Configuración Básica
                            </Typography>
                        </Box>
                        <Box >
                            <Button
                                style={{background:"#ff4949", color : "white"}}
                                type="submit"
                                variant="contained"
                                color="red"
                                onClick={ () => sendInitialData('step_1')}
                                endIcon={<NavigateNextIcon/>}
                            >
                                Siguiente Paso
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
            <Card>
                <form>
                    <CardHeader
                        subheader={`Aquí puedes modificar las configuraciones de tu examen.`}
                        title="Configuraciones Básicas"
                    />
                    <Divider />
                    <Grid
                        className="items-configuracion-examen"
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        style = {{'display' : 'block', 'padding': '16px'}}
                    >
                        <Box style={{display: 'flex'}}>
                            <Switch checked={switchChecked} onClick={() => handleCambiarSwitch()} color="primary"/>
                            <Tooltip title={tituloTooltip} placement="right" arrow>
                                <Box style={{alignSelf: 'center'}}>{tipoConfiguracion}</Box>
                            </Tooltip>
                        </Box>
                    </Grid>
                    <Fragment>
                    <Divider />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6} lg={6}>
                                <TextField
                                    error={errores && errores.tituloError}
                                    helperText={errores && errores.tituloError ? "El campo es requerido" : null}
                                    id='titulo'
                                    name='titulo'
                                    type="text"
                                    margin="normal"
                                    label="Título del Examen"
                                    required
                                    value={titulo}
                                    onChange={handleCambiarValor}
                                    variant="outlined"
                                    fullWidth
                                    autoFocus
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <FormControl required variant="outlined" error={errores && errores.duracionError} className={classes.formControl}>
                                    <InputLabel>Duracion del examen</InputLabel>
                                    <Select
                                        error={errores && errores.duracionError}
                                        helperText="El campo es requerido"
                                        label="Duracion del examen"
                                        id='duracion'
                                        name='duracion'
                                        value={duracion}
                                        MenuProps={MenuProps}
                                        onChange={handleCambiarValor} 
                                    >
                                    {duracionExamen.map(item => (
                                        <MenuItem key={item.valor} value={item.valor} >
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                    { errores && errores.duracionError && <FormHelperText>El campo es requerido</FormHelperText>}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6} lg={6}>
                                <FormControl required variant="outlined" style={{textAlignLast: 'center'}} className={classes.formControl}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <DateTimePicker 
                                            inputVariant="outlined"
                                            format="DD/MM/YYYY hh:mm a"
                                            margin="normal"
                                            id='start_date'
                                            name='start_date'
                                            value={valorFechaInicio} 
                                            onChange={(e) => handleChangeStartDate(e)} 
                                            label="Fecha y hora de comienzo"
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <FormControl required variant="outlined" style={{textAlignLast: 'center'}} className={classes.formControl}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <DateTimePicker
                                            inputVariant="outlined"
                                            format="DD/MM/YYYY hh:mm a"
                                            margin="normal"
                                            id='finish_date'
                                            name='finish_date'
                                            value={valorFechaFin}  
                                            onChange={(e) => handleChangeFinishDate(e)} 
                                            label="Fecha y hora de culminacion"
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </FormControl>
                            </Grid> 
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    id='comentarios'
                                    name='comentarios'
                                    margin="normal"
                                    label="Comentarios"
                                    value={comentarios}
                                    onChange={handleCambiarValor}
                                    fullWidth
                                    placeholder="Comentarios adicionales..."
                                    multiline
                                    rows={6}
                                    rowsMax={6}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    </Fragment>
                    <Divider />
                </form>
            </Card>
        </Fragment>
    )
}

StepConfiguracionBasica.propTypes = {
    className: PropTypes.string
};

export default StepConfiguracionBasica;