import React, { Fragment, useState, useMemo, }  from 'react';
import validator from 'validator';

// componentes
import Loading from '../loading/Loading.js';
import FormCrearPregunta from '../../componentes/form_crear_pregunta/FormCrearPregunta.js';
import SeleccionarAreaTema from '../../componentes/seleccionar_tema/SeleccionarAreaTema.js';
import PonderacionDificultad from '../../componentes/ponderacion_dificultad/PonderacionDificultad.js';

// contexts
import { useTipoPreguntaRespuesta } from '../../context/createTestContext';
import { useCreateTestPage } from '../../context/createTestPageContext';

// servicios
import { postPreguntasExamen } from '../../servicios/servicioCrearExamen.js';

// material
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PostAddIcon from '@material-ui/icons/PostAdd';
import UpdateIcon from '@material-ui/icons/Update';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PublishIcon from '@material-ui/icons/Publish';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StepCrearPreguntas = () => {

    const { tituloRespuesta, tipoPregunta } = useTipoPreguntaRespuesta();
    const {  
        handleChangeStep,
        tipoConfiguracion,
        listaPreguntasExamen,
        areaSeleccionada,
        subareaSeleccionada,
        temaSeleccionado,
        ponderacion,
        dificultad,
        pregunta,
        setListaPreguntasExamen,
        handleChangeAreaSubAreaTema,
        handleChangeInput,
        respuestas,
        setRespuestas,
        selectedRespuesta,
        setSelectedRespuesta,
        exam_id,
        step,
        openExam
    } = useCreateTestPage();

    const [ alertSucess, setAlertSucess ] = useState(false);
    const [ alertError, setAlertError ] = useState(false);
    const [ msgError, setMsgError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const [ errores, setErrores ] = useState({
        preguntaError : false, 
        areaSeleccionadaError : false,
        subareaSeleccionadaError : false,
        temaSeleccionadoError : false,
        ponderacionError : false,
        dificultadError : false,
    });
    const [formats, setFormats] = useState('text')

    const handleFormat = (event, newFormats) => {
        let event_preg = { target : { name : 'pregunta', value : ''}};
        setFormats(newFormats);
        handleChangeInput(event_preg);
    };

    const verifyDataListaPregunta = () => {
        let error = true;
        if (listaPreguntasExamen.length > 0) error = false;
        setAlertError(error);
        setMsgError('Debe haber al menos una pregunta creada.');
        return error;
    }

    const verifyData = (flag) => {
        let error = false;
        let listError = {};

        if(flag === 'all' || flag === 'pregunta'){
            if( !pregunta || validator.isEmpty(pregunta)){
                error = true;
                listError.preguntaError = true;
            } 
            else listError.preguntaError = false;
        }

        if(flag === 'all' || flag === 'areaSeleccionada'){
            if( !areaSeleccionada || validator.isEmpty(areaSeleccionada)){
                error = true;
                listError.areaSeleccionadaError = true;
            } 
            else listError.areaSeleccionadaError = false;
        }

        if(flag === 'all' || flag === 'subareaSeleccionada'){
            if( !subareaSeleccionada || validator.isEmpty(subareaSeleccionada)){
                error = true;
                listError.subareaSeleccionadaError = true;
            } 
            else listError.subareaSeleccionadaError = false;
        }

        if(flag === 'all' || flag === 'temaSeleccionado'){
            if( !temaSeleccionado || validator.isEmpty(temaSeleccionado)){
                error = true;
                listError.temaSeleccionadoError = true;
            } 
            else listError.temaSeleccionadoError = false;
        }

        if(flag === 'all' || flag === 'ponderacion'){
            if( !ponderacion || validator.isEmpty(ponderacion)){
                error = true;
                listError.ponderacionError = true;
            } 
            else listError.ponderacionError = false;
        }

        if(flag === 'all' || flag === 'dificultad'){
            if( !dificultad || validator.isEmpty(String(dificultad))){
                error = true;
                listError.dificultadError = true;
            } 
            else listError.dificultadError = false;
        }

        if(flag === 'all' || flag === 'respuesta'){
            if (tipoPregunta !== 'verdadero_falso' && respuestas.length < 2){
                error = true;
                setAlertError(error);
                setMsgError('Debe haber al menos dos respuestas creadas.');
            }
        }

        setErrores({...errores, ...listError});
        return error;
    }

    const handleCrearPregunta = () => {
        let error = verifyData('all');
        if(!error){
            const auxListaExamen = listaPreguntasExamen.map( value => { return {...value} });
            const form = {};
            const answer = [];

            if (tipoPregunta === 'verdadero_falso'){
                answer.push({
                    content : '',
                    correct : selectedRespuesta === 'verdadero' ? 1 : 0
                })
            } else {
                respuestas.forEach( (respuesta, index) => {
                    answer.push({
                        content : respuesta.respuesta,
                        correct : tipoPregunta === 'ordenamiento' ? index : respuesta.checked
                    })
                })
            }
            form.content = pregunta;
            form.q_type = tituloRespuesta;
            form.q_type_id = form.q_type;
            form.exam = exam_id;
            form.position = auxListaExamen.length + 1;
            form.difficulty = Number(dificultad);
            form.latex = formats === 'latex' ? true : false;
            form.approach = {
                topic : temaSeleccionado,
                area : areaSeleccionada,
                subarea : subareaSeleccionada,
            }
            form.answers = answer;
            form.value = Number(ponderacion);
            auxListaExamen.push(form);

            // Clean Form
            // setLoading(true);
            // postPreguntasExamen(form, exam_id)
            // .then( res => {
            //     console.log(res)
            //     if (res) {
                    // Agregar Nueva Pregunta
                    setLoading(false);
                    setListaPreguntasExamen(auxListaExamen);
                    handleCleanForm();
                    setAlertSucess(true);
                // }
            // })
        }
    }

    const handleCloseAlertSuccess = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlertSucess(false);
    };

    const handleCloseAlertError = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlertError(false);
    };

    const handleCleanForm = () => {
        const event_pond = { target : { name : 'ponderacion', value : ''}};
        const event_diff = { target : { name : 'dificultad', value : ''}};
        const event_preg = { target : { name : 'pregunta', value : ''}};

        handleChangeInput(event_pond);
        handleChangeInput(event_diff);
        handleChangeInput(event_preg);
        handleChangeAreaSubAreaTema(null, 'area_seleccionada');
        handleChangeAreaSubAreaTema(null, 'subarea_seleccionada');
        handleChangeAreaSubAreaTema(null, 'tema_seleccionada');
        setSelectedRespuesta(true);
        setRespuestas([]);
        setFormats('text');
    }

    const nextStep = () => {
        let error = verifyDataListaPregunta();
        if(!error){
            let paso = tipoConfiguracion === 'Configuración Dinámica' ? 'step_2' : openExam ? 'step_4' : 'step_3';
            if (paso === 'step_4') handleWarning();
            else handleChangeStep(paso);
        }
    }

    const finishStep = () => {
        handleChangeStep('step_4');
    }

    const handleWarning = () => setOpen(!open);

    useMemo( () => {
        if (pregunta) verifyData('pregunta');
    }, [pregunta])

    useMemo( () => {
        if (step === 'step_1') handleCleanForm();
    }, [step])

    useMemo(() => {
        if (ponderacion) verifyData('ponderacion');
    }, [ponderacion])

    useMemo( () => {
        if (dificultad) verifyData('dificultad');
    }, [dificultad])

    useMemo(() => {
        if (temaSeleccionado) verifyData('temaSeleccionado');
    }, [temaSeleccionado])

    useMemo( () => {
        if (areaSeleccionada) verifyData('areaSeleccionada');
    }, [areaSeleccionada])

    useMemo(() => {
        if (subareaSeleccionada) verifyData('subareaSeleccionada');
    }, [subareaSeleccionada])
    
    return( 
        <Fragment>
            <Grid item xs={12}>
                <Paper className="paper-crear-test" style={{display : 'contents'}}>
                    <Box style={{display: 'flex', AlignItems: 'center'}}>
                        <Grid item lg={3} sm={3} xl={3} xs={3}>
                            <Button
                                style={{background:"#6a3df3", color : "white", marginRight: '8px'}}
                                type="submit"
                                variant="contained"
                                onClick={ () => handleChangeStep('step_0')}
                                endIcon={<NavigateBeforeIcon/>}
                            >
                                Paso Anterior
                            </Button>
                        </Grid>
                        <Grid item lg={6} sm={6} xl={6} xs={6}  style={{textAlign : 'center'}}>
                            <Typography variant="h6">
                                Paso - Creación Examen ({tipoConfiguracion}) - {tituloRespuesta}
                            </Typography>
                        </Grid>
                        <Grid item lg={3} sm={3} xl={3} xs={3} style={{textAlignLast : 'right'}}>
                            { !(tipoConfiguracion === 'Configuración Dinámica') && openExam ?
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="red"
                                    style={{background : "#ff4949", color : "white"}}
                                    onClick={ () => nextStep()}
                                    endIcon={<PublishIcon/>}
                                >
                                    Publicar Examen
                                </Button> :
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={ () => nextStep()}
                                    endIcon={<NavigateNextIcon/>}
                                >
                                    Siguiente Paso
                                </Button>
                            }
                        </Grid>
                    </Box>
                </Paper>
            </Grid>

            <Grid item lg={8} sm={8} xl={8} xs={8}>
                <Paper className="paper-crear-test" style={{height : '100%'}}>
                    Enfoque
                    <SeleccionarAreaTema errores={errores}/>
                </Paper>
            </Grid>

            <Grid item lg={4} sm={4} xl={4} xs={4}>
                <Paper className="paper-crear-test" style={{height : '100%'}}>
                    Evaluación
                    <PonderacionDificultad errores={errores}/>
                </Paper>
            </Grid>

            <FormCrearPregunta 
                errores={errores} 
                handleFormat={handleFormat}
                formats={formats}
            />

            <Grid item xs={12} md={12} lg={12}>
                <Paper className="paper-crear-test">
                    <Box className="div-buttons-respuestas">
                        {/* <Button
                            type="submit"
                            variant="contained"
                            style={{marginRight: '8px', backgroundColor : 'orange'}}
                            disable={true}
                            startIcon={<UpdateIcon/>}
                        >
                            Actualizar Pregunta
                        </Button> */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{marginRight: '8px'}}
                            onClick={() => handleCrearPregunta()}
                            startIcon={<PostAddIcon/>}
                        >
                            Crear Pregunta
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disable={true}
                            startIcon={<DeleteForeverIcon/>}
                        >
                            Eliminar Pregunta
                        </Button>
                    </Box>
                </Paper>
            </Grid> 
            <Snackbar open={alertSucess} autoHideDuration={5000} onClose={handleCloseAlertSuccess} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseAlertSuccess} severity="success">
                    Pregunta Creada exitosamente.
                </Alert>
            </Snackbar>
            <Snackbar open={alertError} autoHideDuration={5000} onClose={handleCloseAlertError} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseAlertError} severity="error">
                    {msgError}
                </Alert>
            </Snackbar>
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
            { loading && <Loading/> }
        </Fragment>
    )
}

export default StepCrearPreguntas;
