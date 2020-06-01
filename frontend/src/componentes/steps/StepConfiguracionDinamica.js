import React, { useState, useMemo, Fragment }  from 'react';
import validator from 'validator';

// material
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import InputAdornment from '@material-ui/core/InputAdornment';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@material-ui/core';

// contexts
import { useCreateTestPage } from '../../context/createTestPageContext';

const tipoPreguntas = [
    {valor : 'area', label: 'Área'},
    {valor : 'subarea', label: 'Subárea'},
    {valor : 'tema', label: 'Tema'},
]

const areas = [
    {label : 'Area 1' , max : 5 },
    {label : 'Area 2' , max : 1 },
    {label : 'Area 3' , max : 1 },
    {label : 'Area 4' , max : 1 },
    {label : 'Area 5' , max : 1 },
    {label : 'Area 6' , max : 1 }
];

const subareas = [
    {label : 'Subarea 1', max : 5 },
    {label : 'Subarea 2', max : 3 },
    {label : 'Subarea 3', max : 1 },
    {label : 'Subarea 4', max : 1 }
]

const temas = [
    {label : 'Tema 1' , max : 5 },
    {label : 'Tema 2' , max : 1 },
    {label : 'Tema 3' , max : 1 },
    {label : 'Tema 4' , max : 1 },
    {label : 'Tema 5' , max : 1 },
    {label : 'Tema 6' , max : 1 },
    {label : 'Tema 7' , max : 1 },
    {label : 'Tema 8' , max : 1 },
    {label : 'Tema 9' , max : 1 },
    {label : 'Tema 10', max : 1 },
    {label : 'Tema 11', max : 1 },
    {label : 'Tema 12', max : 1 },
    {label : 'Tema 13', max : 1 },
    {label : 'Tema 14', max : 1 },
    {label : 'Tema 15', max : 1 },
    {label : 'Tema 16', max : 1 },
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
    } = useCreateTestPage();

    const [ errores, setErrores ] = useState({tipoPreguntaSeleccionadoError : false, maxPreguntasError : false});

    const verifyData = (flag) => {
        let error = false;
        let listError = {};

        if(flag === 'all' || flag === 'tipoPreguntaSeleccionado'){
            if( !tipoPreguntaSeleccionado || validator.isEmpty(tipoPreguntaSeleccionado)){
                error = true;
                listError.tipoPreguntaSeleccionadoError = true;
            } 
            else listError.tipoPreguntaSeleccionadoError = false;
        }

        if(flag === 'all' || flag === 'maxPreguntas'){
            console.log(maxPreguntas, validator.isNumeric(String(maxPreguntas)))
            if( !maxPreguntas || (validator.isEmpty(String(maxPreguntas)) && maxPreguntas > 0)){
                error = true;
                listError.maxPreguntasError = true;
            } 
            else listError.maxPreguntasError = false;
        }

        setErrores({...errores, ...listError});
        return error;
    }

    useMemo( () => {
        if (tipoPreguntaSeleccionado) verifyData('tipoPreguntaSeleccionado');
    }, [tipoPreguntaSeleccionado])

    useMemo( () => {
        if (maxPreguntas) verifyData('maxPreguntas');
    }, [maxPreguntas])

    const handleTipoPregunta = (e) => {
        let preguntas;
        if (e.target.value === 'area') preguntas = areas;
        else if (e.target.value === 'subarea') preguntas = subareas;
        else preguntas = temas;

        if ( !listaTipoPreguntas ) setListaTipoPregunta(preguntas);
        else resetCountPreguntas(preguntas);

        setTipoPreguntaSeleccionado(e.target.value);
    };

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
                count : countPreguntas,
                approach : tipoPreguntaSeleccionado,
            }
            let divisions = listaTipoPreguntas.map( topic => {
                return {
                    name : topic.label,
                    quantity : topic.valor,
                    max_quantity : topic.max
                }
            })
            request.divisions = divisions;
            handleChangeStep(step);
            // createTest(request)
            // .then( res => {
            //     console.log(res)
            //     if (res) {
            //         SetExamId(res.data.id);
            //     }
            // })
        }
    }
    
    return( 
        <Fragment>
            <Grid item xs={12}>
                <Paper className="paper-crear-test" style={{display : 'contents'}}>
                    <Box className="flex-box-titulo">
                        <Box style={{height : 'auto'}}>
                            <Typography variant="h6">
                                Paso - Configuración Dinámica
                            </Typography>
                        </Box>
                        <Box >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{marginRight: '8px'}}
                                onClick={ () => handleChangeStep('step_1')}
                                endIcon={<NavigateBeforeIcon/>}
                            >
                                Paso Anterior
                            </Button>
                            <Button
                                style={{background:"#ff4949", color : "white"}}
                                type="submit"
                                variant="contained"
                                color="red"
                                onClick={ () => sendConfDinamica('step_3')}
                                endIcon={<NavigateNextIcon/>}
                            >
                                Siguiente Paso
                        </Button>
                        </Box>
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
                <Grid
                    className="items-configuracion-examen"
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    style = {{'display' : 'block', 'padding': '16px', 'width' : '100%'}}
                >
                <Typography component="body1" variant="body1" >
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>
                </Grid>
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
                                            max: 100, min: 0, step : 1
                                    }}}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={12}>
                            {listaTipoPreguntas && Number(maxPreguntas) > 0 && listaTipoPreguntas.length > 0 &&
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
                                </Fragment>
                            }
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Fragment>
    )
}

export default StepConfiguracionDinamica;
