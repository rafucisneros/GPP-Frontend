import React, { Fragment, useState, useMemo } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import validator from 'validator';

// componentes
import Loading from '../loading/Loading.js';

// material
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import MuiAlert from '@material-ui/lab/Alert';
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
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

// contexts
import { useCreateTestPage } from '../../context/createTestPageContext';
import { useUsuario } from '../../context/usuarioContext';

// servicios
import { createTest } from '../../servicios/servicioCrearExamen.js';

const stylesTooltip = {
    tooltip: {
        fontSize : '13px',
        textAlign : 'center'
    }
};

const CustomTooltip = withStyles(stylesTooltip)(Tooltip);

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const GpiSwitch = withStyles({
    switchBase: {
        color: '#fff',
        '&$checked': {
            color: '#6a3df3',
        },
        '&$checked + $track': {
            backgroundColor: '#6a3df3',
        },
    },
    checked: {},
    track: {},
})(Switch);

const tituloTooltip = "El modo estático le permitirá mostrar el examen en el orden que usted desee. En el modo dinámico el examen será mostrado de manera aleatoria de acuerdo a las configuraciones introducidas."

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
        width : '100%'
    }
}));

const duracionExamen = [
    // {valor : 2, label: '2 min'},
    // {valor : 5, label: '5 min'},
    // {valor : 8, label: '8 min'},
    // {valor : 10, label: '10 min'},
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

const nroIntentosLista = [
    {valor : 'infinito', label: 'No hay límite'},
    {valor : 1, label: '1 Intento'},
    {valor : 2, label: '2 Intentos'},
    {valor : 3, label: '3 Intentos'},
    {valor : 4, label: '4 Intentos'},
    {valor : 5, label: '5 Intentos'},
]

const openExamLista = [
    {valor : true, label: 'Todos'},
    {valor : false, label: 'Por Secciones'},
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
        duracion,
        nroIntentos,
        SetExamId,
        openExam,
        msgAlert,
        setMsgAlert,
        alertError,
        setAlertError,
        exam_id
    } = useCreateTestPage();

    const [errores, setErrores] = useState({tituloError : false, duracionError : false, nroIntentosError: false, openExamError : false});
    const [loading, setLoading] = useState(false);

    const verifyData = (flag) => {
        let error = false;
        let listError = {};

        if(flag === 'all' || flag === 'titulo'){
            if( !titulo || validator.isEmpty(titulo)){
                error = true;
                listError.tituloError = true;
            } else listError.tituloError = false;
        }

        if(flag === 'all' || flag === 'duracion'){
            if( !duracion || validator.isEmpty(String(duracion))){
                error = true;
                listError.duracionError = true;
            } else listError.duracionError = false;
        }

        if(flag === 'all' || flag === 'nro_intentos'){
            if( !nroIntentos || validator.isEmpty(String(nroIntentos))){
                error = true;
                listError.nroIntentosError = true;
            } else listError.nroIntentosError = false;
        }

        if(flag === 'all' || flag === 'open_exam'){
            if( openExam === undefined || openExam === null || validator.isEmpty(String(openExam))){
                error = true;
                listError.openExamError = true;
            } else listError.openExamError = false;
        }

        setErrores({...errores, ...listError});
        return error;
    }

    const sendInitialData = (step) => {
        let error = verifyData('all');
        if(!error){
            let request = {
                name : titulo,
                start_date : moment(valorFechaInicio).toISOString(),
                finish_date : moment(valorFechaFin).toISOString(),
                duration : duracion,
                attempt : Number(nroIntentos),
                description : comentarios,
                static : !switchChecked,
                email : usuario.email,
                status : true,
                open : openExam,
                exam_id : exam_id,
            }
            console.log(request)
            setLoading(true);
            createTest(request)
            .then( res => {
                console.log(res)
                if (res) {
                    SetExamId(res.data.id);
                    handleChangeStep(step);
                }
            })
        }
    }

    const handleCloseErrorMsg = () => {
        setAlertError(false);
    }

    // const handleClickShowPassword = () => {
    //     setShowPassword(!showPassword);
    // };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        event.stopPropagation()
    };

    useMemo( () => {
        if (titulo) verifyData('titulo');
    }, [titulo])

    useMemo(() => {
        if (duracion) verifyData('duracion');
    }, [duracion])

    useMemo(() => {
        if (nroIntentos) verifyData('nro_intentos');
    }, [nroIntentos])

    useMemo(() => {
        if (openExam === true || openExam === false) verifyData('open_exam');
    }, [openExam])

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
                                type="submit"
                                variant="contained"
                                color="primary"
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
                        subheader={`Datos iniciales del examen`}
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
                        <Box style={{display: 'flex', alignItems : 'center'}}>
                            <GpiSwitch checked={switchChecked} onClick={() => handleCambiarSwitch()} />
                            <Box style={{alignSelf: 'center', paddingLeft : '4px'}}>
                                <span style={{fontWeight: 800}}>{tipoConfiguracion}</span>
                            </Box>
                            <IconButton edge="end">
                                <CustomTooltip title={tituloTooltip} placement="right" arrow>
                                    <InfoOutlinedIcon/>
                                </CustomTooltip>
                            </IconButton>
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
                                    placeholder="Título del Examen"
                                    required
                                    value={titulo ? titulo : ''}
                                    onChange={handleCambiarValor}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <FormControl required variant="outlined" error={errores && errores.duracionError} className={classes.formControl}>
                                    <InputLabel>Duracion del examen</InputLabel>
                                    <Select
                                        error={errores && errores.duracionError}
                                        helperText="El campo es requerido"
                                        label="Duración del examen"
                                        id='duracion'
                                        name='duracion'
                                        value={duracion ? duracion : ''}
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
                                <FormControl required variant="outlined" error={errores && errores.openExamError} className={classes.formControl}>
                                    <InputLabel>Público dirigido</InputLabel>
                                    <Select
                                        error={errores && errores.openExamError}
                                        helperText="El campo es requerido"
                                        label="Duracion del examen"
                                        id='open_exam'
                                        name='open_exam'
                                        value={openExam === false || openExam === true ? openExam : ''}
                                        MenuProps={MenuProps}
                                        onChange={handleCambiarValor} 
                                    >
                                    {openExamLista.map(item => (
                                        <MenuItem key={item.valor} value={item.valor} >
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                    { errores && errores.openExamError && <FormHelperText>El campo es requerido</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <FormControl required variant="outlined" error={errores && errores.nroIntentosError} className={classes.formControl}>
                                    <InputLabel>Número de intentos</InputLabel>
                                    <Select
                                        error={errores && errores.nroIntentosError}
                                        helperText="El campo es requerido"
                                        label="Número de intentos"
                                        id='nro_intentos'
                                        name='nro_intentos'
                                        value={nroIntentos ? nroIntentos : ''}
                                        MenuProps={MenuProps}
                                        onChange={handleCambiarValor} 
                                    >
                                    {nroIntentosLista.map(item => (
                                        <MenuItem key={item.valor} value={item.valor} >
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                    { errores && errores.nroIntentosError && <FormHelperText>El campo es requerido</FormHelperText>}
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
                                            label="Fecha de Habilitación del Examen"
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            InputProps={{
                                                endAdornment: 
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onMouseDown={(e) => handleMouseDownPassword(e)}
                                                        edge="end"
                                                    >
                                                        <CustomTooltip title="Esta fecha señala cuando el examen comenzará a estar disponible para su realización." arrow>
                                                            <InfoOutlinedIcon/>
                                                        </CustomTooltip>
                                                    </IconButton>
                                                </InputAdornment>,
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
                                            label="Fecha de Deshabilitación del Examen"
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            InputProps={{
                                                endAdornment: 
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onMouseDown={(e) => handleMouseDownPassword(e)}
                                                        edge="end"
                                                    >
                                                        <CustomTooltip title="Esta fecha señala cuando el examen dejará de estar disponible para ser realizado." arrow>
                                                            <InfoOutlinedIcon/>
                                                        </CustomTooltip>
                                                    </IconButton>
                                                </InputAdornment>,
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
            { loading && <Loading/> }
            <Snackbar open={alertError} autoHideDuration={7000} onClose={() => handleCloseErrorMsg()} onExited={() => handleCloseErrorMsg()} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => handleCloseErrorMsg()} severity="error">
                    {msgAlert}
                </Alert>
            </Snackbar>
        </Fragment>
    )
}

StepConfiguracionBasica.propTypes = {
    className: PropTypes.string
};

export default StepConfiguracionBasica;