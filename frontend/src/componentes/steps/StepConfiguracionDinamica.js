import React, { useState, useMemo, useEffect, Fragment }  from 'react';
import validator from 'validator';

// material
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import InputAdornment from '@material-ui/core/InputAdornment';
import PublishIcon from '@material-ui/icons/Publish';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// contexts
import { useCreateTestPage } from '../../context/createTestPageContext';

// servicios
import { patchConfigDinamica } from '../../servicios/servicioCrearExamen.js';

// componentes
import Loading from '../loading/Loading.js';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const tipoPreguntas = [
    {valor : 'area', label: 'Área'},
    {valor : 'subarea', label: 'Subárea'},
    {valor : 'tema', label: 'Tema'},
]

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
        width : '100%'
    }
}));

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

const StepConfiguracionDinamica = (props) => {
    const classes = useStyles();
    const {  
        handleChangeStep,
        tipoPreguntaSeleccionado,
        listaTipoPreguntas,
        countPreguntas,
        maxPreguntas,
        setTipoPreguntaSeleccionado,
        setListaTipoPregunta,
        setCountPreguntas,
        setMaxPreguntas,
        listaPreguntasExamen,
        exam_id,
        openExam,
        dinamic_id,
        setDinamicId,
    } = useCreateTestPage();

    const [ errores, setErrores ] = useState({tipoPreguntaSeleccionadoError : false, maxPreguntasError : false});
    const [ alertModal, setAlertModal ] = useState(false);
    const [ alertModal2, setAlertModal2 ] = useState(false);
    const [ areas, setAreas ] = useState([]);
    const [ subareas, setSubareas ] = useState([]);
    const [ temas, setTemas ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ open, setOpen ] = useState(false);

    useEffect( () => {
        let auxListaExamen = listaPreguntasExamen.map( value => { return {...value} });
        let obj_areas = {};
        let obj_subareas = {};
        let obj_temas = {};
        if (auxListaExamen && auxListaExamen.length > 0){
            auxListaExamen.forEach( item => {
                let content = item.approach;
                if(content['area']) contarTemarios(obj_areas, content['area']);
                if(content['topic']) contarTemarios(obj_temas, content['topic']);
                if(content['subarea']) contarTemarios(obj_subareas, content['subarea']);
            })
        }
        let array_areas = Object.keys(obj_areas).map( key => { return obj_areas[key] } );
        let array_subareas = Object.keys(obj_subareas).map( key => { return obj_subareas[key] } );
        let array_temas = Object.keys(obj_temas).map( key => { return obj_temas[key] } );

        setAreas(array_areas);
        setSubareas(array_subareas);
        setTemas(array_temas);

        if (tipoPreguntaSeleccionado === 'area') setListaTipoPregunta(array_areas);
        else if (tipoPreguntaSeleccionado === 'subarea') setListaTipoPregunta(array_subareas);
        else if (tipoPreguntaSeleccionado === 'tema') setListaTipoPregunta(array_temas);
    }, [listaPreguntasExamen])

    const contarTemarios = (obj, especialidad) => {
        if (obj[especialidad]) obj[especialidad].max = obj[especialidad].max + 1;
        else obj[especialidad] = {label: especialidad, max: 1};
    }

    const handleTipoPregunta = (e) => {
        let preguntas;
        if (e.target.value === 'area') preguntas = areas;
        else if (e.target.value === 'subarea') preguntas = subareas;
        else preguntas = temas;   

        if ( !listaTipoPreguntas ) setListaTipoPregunta(preguntas);
        else resetCountPreguntas(preguntas);

        setTipoPreguntaSeleccionado(e.target.value);
    };

    const verifyData = (flag) => {
        let error = false;
        let listError = {};
        if(flag === 'all' || flag === 'tipoPreguntaSeleccionado'){
            if( !tipoPreguntaSeleccionado || validator.isEmpty(tipoPreguntaSeleccionado)){
                error = true;
                listError.tipoPreguntaSeleccionadoError = true;
            } else listError.tipoPreguntaSeleccionadoError = false;
        }
        if(flag === 'all' || flag === 'maxPreguntas'){
            if( !maxPreguntas || (validator.isEmpty(String(maxPreguntas)) && maxPreguntas > 0)){
                error = true;
                listError.maxPreguntasError = true;
            } else listError.maxPreguntasError = false;
        }

        if (flag === 'all' && (maxPreguntas <= 0 || (maxPreguntas > 0 && countPreguntas !== maxPreguntas) ) ){
            error = true;
            setAlertModal(true);
        }

        setErrores({...errores, ...listError});
        return error;
    }

    const nuevoPosibleCantidadPreguntas = (e) => {
        if (listaTipoPreguntas && listaTipoPreguntas.length > 0 ){
            const aux = [];
            let count = 0;
            listaTipoPreguntas.forEach( (element, index) => {
                if (index === Number(e.target.id)){
                    if (e.target.value && e.target.value.length > 0) count += parseInt(Number(e.target.value))
                    else count += 0;
                    aux.push({
                        label : element.label, 
                        max : element.max,
                        valor : Number(parseInt(e.target.value))
                    })
                } else {
                    if (element.valor) count += parseInt(Number(element.valor))
                    else count += 0;
                    aux.push({
                        label : element.label, 
                        max : element.max,
                        valor : element.valor ? parseInt(Number(element.valor)) : 0
                    })
                }
            });
            if (count > maxPreguntas) return [count, false];
            else return [count, true, aux];
        }
    }

    const resetCountPreguntas = (preguntas = null) => {
        if (!preguntas || (preguntas && !(preguntas.length > 0))){
            if (listaTipoPreguntas && listaTipoPreguntas.length > 0){
                preguntas = [...listaTipoPreguntas];
            }
        }
        if (preguntas && preguntas.length > 0){
            preguntas.forEach(element => {
                element.valor = 0;
            });
            setListaTipoPregunta([...preguntas]);
            setCountPreguntas(0);
        }
    }

    const handleMaxPreguntas = (e) => {
        if (e && e.target.value > listaPreguntasExamen.length) {
            e.target.value = listaPreguntasExamen.length;
            setAlertModal2(true);
        }
        if (Number(e.target.value) < maxPreguntas) resetCountPreguntas();
        setMaxPreguntas(Number(e.target.value));
    }

    const handleCambiarCantidad = (e) => {
        let count = parseInt(Number(e.target.value));    
        if (e.target.max >= count){
            let [total, permitir, aux] = nuevoPosibleCantidadPreguntas(e);
            if (permitir){
                setListaTipoPregunta(aux);
                setCountPreguntas(total);
            } else {
                e.target.value = listaTipoPreguntas[Number(e.target.id)].valor;
            }
        } else console.log("Limite excedido")
    }

    const sendConfDinamica = (step) => {
        let error = verifyData('all');
        if(!error){
            let request = {
                total_quantity : maxPreguntas,
                approach : tipoPreguntaSeleccionado,
            }
            let divisions = listaTipoPreguntas.map( topic => {
                return {
                    name : topic.label,
                    quantity : topic.valor,
                    max_quantity : topic.max
                }
            })
            request.distribution = divisions;
            request.id = dinamic_id;
            console.log(request)
            setLoading(true);
            patchConfigDinamica(request, exam_id)
            .then( res => {
                console.log(res)
                if (res) {
                    setLoading(false);
                    setDinamicId(res.data.id);
                    let paso = openExam ? 'step_4' : 'step_3';
                    if (paso === 'step_4') handleWarning();
                    else handleChangeStep(paso);
                }
            })
        }
    }

    const finishStep = () => {
        handleChangeStep('step_4');
    }

    const handleWarning = () => setOpen(!open);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlertModal(false);
    };
    
    const handleCloseAlert2 = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlertModal2(false);
    };

    useMemo( () => {
        if (tipoPreguntaSeleccionado) verifyData('tipoPreguntaSeleccionado');
    }, [tipoPreguntaSeleccionado])

    useMemo( () => {
        if (maxPreguntas) verifyData('maxPreguntas');
    }, [maxPreguntas])
    
    return( 
        <Fragment>
            <Grid item xs={12}>
                <Paper className="paper-crear-test" style={{display : 'contents'}}>
                    <Box style={{display: 'flex', AlignItems: 'center'}}>
                        <Grid item lg={3} sm={3} xl={3} xs={3}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{background:"#6a3df3", color : "white", marginRight: '8px'}}
                                onClick={ () => handleChangeStep('step_1')}
                                endIcon={<NavigateBeforeIcon/>}
                            >
                                Paso Anterior
                            </Button>
                        </Grid>
                        <Grid item lg={6} sm={6} xl={6} xs={6}  style={{textAlign : 'center'}}>
                            <Typography variant="h6">
                                Paso - Configuración Dinámica
                            </Typography>
                        </Grid>
                        <Grid item lg={3} sm={3} xl={3} xs={3} style={{textAlignLast : 'right'}}>
                            {
                                openExam ?
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{background : "#ff4949", color : "white"}}
                                    color="red"
                                    onClick={ () => sendConfDinamica()}
                                    endIcon={<PublishIcon/>}
                                >
                                    Publicar Examen
                                </Button> :
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={ () => sendConfDinamica()}
                                    endIcon={<NavigateNextIcon/>}
                                >
                                    Siguiente Paso
                                </Button>
                            }
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
            <Card
                style={{width : '100%', marginTop : '16px'}}
            >
                <CardHeader
                    subheader={`Aquí puedes modificar las configuraciones avanzadas de tu examen.`}
                    title="Configuraciones Dinámica"
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={2}>
                            <Grid item xs={6} md={6} lg={6}>
                                <FormControl required error={errores && errores.tipoPreguntaSeleccionadoError} variant="outlined" style={{textAlignLast: 'center'}} className={classes.formControl}>
                                    <InputLabel>Enfoque de las preguntas</InputLabel>
                                    <Select
                                        label="Enfoque de las preguntas "
                                        value={tipoPreguntaSeleccionado}
                                        MenuProps={MenuProps}
                                        onChange={handleTipoPregunta} 
                                    >
                                    {tipoPreguntas.map(item => (
                                        <MenuItem key={item.valor} value={item.valor} >
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                    { errores && errores.tipoPreguntaSeleccionadoError && <FormHelperText>El campo es requerido</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <TextField
                                    error={errores && errores.maxPreguntasError}
                                    helperText={errores && errores.maxPreguntasError ? "El campo deber ser número mayor a 0" : null}
                                    id="numero_preguntas"
                                    type="number"
                                    margin="normal"
                                    label="Número de Preguntas"
                                    required
                                    variant="outlined"
                                    fullWidth
                                    value={maxPreguntas}
                                    name="numero_preguntas"
                                    autoFocus
                                    style={{textAlignLast: 'center'}}
                                    onChange={handleMaxPreguntas} 
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        inputProps: { 
                                            max: listaPreguntasExamen.length, min: 0, step : 1
                                    }}}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={12}>

                            {Number(maxPreguntas) > 0 && listaTipoPreguntas && listaTipoPreguntas.length > 0 ?
                                <Fragment>
                                    <Box style={{margin : '16px'}}>
                                        {listaTipoPreguntas.map( (item, index) => (
                                            <Grid container spacing={2} style={{textAlignLast: 'center'}}>
                                                <Grid item xs={12} md={12} lg={12}>
                                                    <Box style={{display: 'flex'}}>
                                                        <Grid item xs={8} md={8} lg={8} style={{alignSelf: 'center'}}>
                                                            {item.label}
                                                        </Grid>
                                                        <Grid item xs={2} md={2} lg={2} style={{alignSelf: 'center'}}>
                                                            <TextField
                                                                id={`${index}`}
                                                                type="number"
                                                                margin="normal"
                                                                label="Cantidad"
                                                                required
                                                                value={item.valor}
                                                                defaultValue={0}
                                                                variant="outlined"
                                                                fullWidth
                                                                name={item.label}
                                                                autoFocus
                                                                onChange={(e) => handleCambiarCantidad(e)}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                InputProps={{
                                                                    inputProps: { 
                                                                        max: Number(item.max), min: 0, step : 1
                                                                    },
                                                                    // pattern: "\d*",
                                                                    endAdornment: <InputAdornment position="end"> {` / ${item.max}`} </InputAdornment>
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Box>
                                    <Divider />
                                    <Grid container spacing={2} style={{textAlignLast: 'center', marginTop: '8px'}}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <Box style={{display: 'flex'}}>
                                                <Grid item xs={8} md={8} lg={8} style={{alignSelf: 'center'}}>
                                                    Total preguntas seleccionadas
                                                </Grid>
                                                <Grid item xs={2} md={2} lg={2} style={{alignSelf: 'center'}}>
                                                    {` ${countPreguntas} / ${maxPreguntas}`}
                                                </Grid>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Fragment> :
                                    <Fragment>
                                        <Skeleton height={30}/> 
                                        <Skeleton height={30}/> 
                                        <Skeleton height={30}/> 
                                    </Fragment>
                            }
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Dialog
                open={open}
                onClose={handleWarning}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Advertencia"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿Está seguro que desea terminar la creación del examen?
                            Esta opción es irreversible.
                        </DialogContentText>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleWarning} color="secondary">
                        No, aún no
                    </Button>
                    <Button onClick={() => finishStep()} color="primary" autoFocus>
                        Sí, estoy seguro
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={alertModal} autoHideDuration={8000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseAlert} severity="error">
                    El número máximo de preguntas permitidas por examen debe ser mayor a cero e igual al número de preguntas escogidas en el enfoque correspondiente.
                </Alert>
            </Snackbar>
            <Snackbar open={alertModal2} autoHideDuration={5000} onClose={handleCloseAlert2} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseAlert2} severity="error">
                    {`No puede colocar colocar un número mayor a ${listaPreguntasExamen.length} preguntas en el examen.`}
                </Alert>
            </Snackbar>
            { loading && <Loading/> }
        </Fragment>
    )
}

export default StepConfiguracionDinamica;
