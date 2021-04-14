import React, { Fragment, useState, useMemo, useEffect }  from 'react';
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
import { postPreguntasExamen, postAllPreguntasExamen, deletePregunta} from '../../servicios/servicioCrearExamen.js';

// material
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import BackspaceIcon from '@material-ui/icons/Backspace';
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
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';

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

const StepCrearPreguntas = () => {

    const { tituloRespuesta, tipoPregunta, handleOpcionExamen } = useTipoPreguntaRespuesta();
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
        openExam,
        formats,
        setFormats,
        flagEditarPregunta,
        indexItemPregunta,
        setIndexItemPregunta,
        setFlagEditarPregunta,
        setearDataItemSeleccionado,
        flagGetAllInfo
    } = useCreateTestPage();

    const [ alertSucess, setAlertSucess ] = useState(false);
    const [ alertSucessUpdate, setAlertSucessUpdate ] = useState(false);
    const [ alertError, setAlertError ] = useState(false);
    const [ msgError, setMsgError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const [ openModalEliminarPregunta, setOpenModalEliminarPregunta ] = useState(false);
    const [ openConfirmacion, setOpenConfirmacion ] = useState(false);
    const [ errores, setErrores ] = useState({
        preguntaError : false, 
        areaSeleccionadaError : false,
        subareaSeleccionadaError : false,
        temaSeleccionadoError : false,
        ponderacionError : false,
        dificultadError : false,
    });

    useEffect(() => {
        console.log(flagGetAllInfo, listaPreguntasExamen)
        if (flagGetAllInfo && listaPreguntasExamen && listaPreguntasExamen.length > 0) {
            console.log("dsds")
            let index = 0;
            let pregunta = listaPreguntasExamen[index];
            setIndexItemPregunta(index);
            setearDataItemSeleccionado(pregunta);
        }
    }, [])

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
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
            if( !ponderacion || validator.isEmpty(String(ponderacion)) || (!isNaN(parseFloat(ponderacion)) && Number(parseFloat(ponderacion) < 1 )) ){
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
            let auxListaExamen = listaPreguntasExamen.map( value => { return {...value} });
            let form = {};
            let answer = [];
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
            
            // Clean Form
            console.log(form)
            setLoading(true);
            postPreguntasExamen(form, exam_id)
            .then( res => {
                if (res) {
                    // Agregar Nueva Pregunta
                    setLoading(false);

                    let reversed = [...res.data.answers].reverse();
                    form.answers = reversed.map( elem => {
                        return { content : elem.content, correct: elem.option ? true : false, id : elem.id }
                    })
                    form.id = res.data.id;
                    console.log(form)
                    auxListaExamen.push(form);
                    setListaPreguntasExamen(auxListaExamen);

                    handleCleanForm();
                    setAlertSucess(true);
                }
            })
        }
    }

    const handleCloseAlertSuccess = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlertSucess(false);
    };

    const handleCloseAlertSuccessUpdate = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlertSucessUpdate(false);
    };

    const handleCloseAlertError = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlertError(false);
    };

    const handleCleanForm = () => {
        let event_pond = { target : { name : 'ponderacion', value : null}};
        let event_diff = { target : { name : 'dificultad', value : null}};
        let event_preg = { target : { name : 'pregunta', value : null}};

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
            handleModalConfirmacion();
        }
    }

    const handleNextStep = () => {
        setLoading(true);
        handleModalConfirmacion();
        let auxListaExamen = listaPreguntasExamen.map( value => { return {...value} });
        console.log(listaPreguntasExamen)
        auxListaExamen.forEach( value => {
            if (value.q_type_id === 'Ordenamiento') {
                value.answers.forEach( (res, index) => {
                    res.correct = index;
                })
            }
        })
        console.log(auxListaExamen);
        postAllPreguntasExamen(listaPreguntasExamen, exam_id)
        .then( res => {
            if (res) {
                console.log(listaPreguntasExamen)
                setLoading(false);
                let paso = tipoConfiguracion === 'Configuración Dinámica' ? 'step_2' : openExam ? 'step_4' : 'step_3';
                if (paso === 'step_4') handleWarning();
                else handleChangeStep(paso);
            }
        })
    }

    const finishStep = () => handleChangeStep('step_4');
    const handleWarning = () => setOpen(!open);
    const handleModalEliminarPregunta = () => setOpenModalEliminarPregunta(!openModalEliminarPregunta);
    const handleModalConfirmacion = () => setOpenConfirmacion(!openConfirmacion);

    const handleCrearNuevaPregunta = () => {
        handleOpcionExamen("seleccion_simple", '1.1');
        setIndexItemPregunta(null);
        setFlagEditarPregunta(false);
        handleCleanForm();
    }

    const handleActualizarPregunta = () => {
        let auxListaExamen = listaPreguntasExamen.map( value => { return {...value} });
        let form = {};
        let answer = [];

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
        form.id = auxListaExamen[indexItemPregunta].id;
        auxListaExamen[indexItemPregunta] = form;

        // Clean Form
        console.log(form)
        setLoading(true);
        postPreguntasExamen(form, exam_id)
        .then( res => {
            if (res) {
                // Agregar Nueva Pregunta
                setLoading(false);

                let reversed = [...res.data.answers].reverse();
                form.answers = reversed.map( elem => {
                    return { content : elem.content, correct: elem.option ? true : false, id : elem.id }
                })
                console.log(form)
                auxListaExamen[indexItemPregunta] = form;
                setListaPreguntasExamen(auxListaExamen);

                handleCrearNuevaPregunta();
                setAlertSucessUpdate(true);
            }
        })
    }

    const handleEliminarPregunta = () => {
        let auxListaExamen = listaPreguntasExamen.map( value => { return {...value} });
        let question = auxListaExamen[indexItemPregunta];
        setOpenModalEliminarPregunta(!openModalEliminarPregunta);
        setLoading(true);
        deletePregunta(question.exam, question.id)
        .then( res => {
            if (res) {
                auxListaExamen.splice(indexItemPregunta, 1);
                setLoading(false);
                setListaPreguntasExamen(auxListaExamen);
                setIndexItemPregunta(null);
                setFlagEditarPregunta(false);
                handleCleanForm();
            }
        })
        .catch( err => {
            console.log(err);
            setLoading(false);
        })
    }

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

    useMemo(() => {
        if (flagEditarPregunta) {
            setErrores({
                preguntaError : false, 
                areaSeleccionadaError : false,
                subareaSeleccionadaError : false,
                temaSeleccionadoError : false,
                ponderacionError : false,
                dificultadError : false,
            })
        }
    }, [flagEditarPregunta])
    
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
                                Paso - Creación Examen ({tipoConfiguracion})<Typography variant="h6" style={{fontWeight : 600}}>{tituloRespuesta}</Typography>
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
                                    Finalizar Creación
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
                    <Box>
                        Enfoque
                        <IconButton
                            edge="end"
                        >
                            <CustomTooltip title="Nota: si desea añadir un nuevo elemento dentro de la lista de áreas, subáreas o temas, deberá crearlo respectivamente en la oopción Añadir Contenido ubicado en el menú." arrow>
                                <InfoOutlinedIcon/>
                            </CustomTooltip>
                        </IconButton>
                    </Box>
                    <SeleccionarAreaTema errores={errores}/>
                </Paper>
            </Grid>

            <Grid item lg={4} sm={4} xl={4} xs={4}>
                <Paper className="paper-crear-test" style={{height : '100%'}}>
                    <Box>
                        Evaluación
                        <IconButton
                            edge="end"
                        >
                            <CustomTooltip title="Nota: el campo Ponderación es un número entre 1 y 100." arrow>
                                <InfoOutlinedIcon/>
                            </CustomTooltip>
                        </IconButton>
                    </Box>
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
                        { flagEditarPregunta ? 
                            <Fragment>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{marginRight: '8px', backgroundColor : 'orange'}}
                                    disable={true}
                                    onClick={() => handleActualizarPregunta()}
                                    startIcon={<UpdateIcon/>}
                                >
                                    Actualizar Pregunta
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{marginRight: '8px'}}
                                    onClick={() => handleCrearNuevaPregunta()}
                                    startIcon={<PostAddIcon/>}
                                >
                                    Crear Nueva Pregunta
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    disable={true}
                                    onClick={() => handleModalEliminarPregunta()}
                                    startIcon={<DeleteForeverIcon/>}
                                >
                                    Eliminar Pregunta
                                </Button>
                            </Fragment>
                            :
                            <Fragment>
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
                                    onClick={() => handleCleanForm()}
                                    startIcon={<BackspaceIcon/>}
                                    >
                                    Limpiar Formulario
                                </Button>
                            </Fragment>
                        }
                    </Box>
                </Paper>
            </Grid> 
            <Snackbar open={alertSucess} autoHideDuration={3000} onClose={handleCloseAlertSuccess} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseAlertSuccess} severity="success">
                    Pregunta Creada exitosamente.
                </Alert>
            </Snackbar>
            <Snackbar open={alertSucessUpdate} autoHideDuration={3000} onClose={handleCloseAlertSuccessUpdate} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseAlertSuccessUpdate} severity="success">
                    Pregunta Actualizada exitosamente.
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
            <Dialog
                open={openModalEliminarPregunta}
                onClose={handleModalEliminarPregunta}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Advertencia"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿Está seguro que desea eliminar esta pregunta?
                            Esta opción es irreversible.
                        </DialogContentText>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalEliminarPregunta} color="secondary">
                        No, en verdad no
                    </Button>
                    <Button onClick={() => handleEliminarPregunta()} color="primary" autoFocus>
                        Sí, estoy seguro
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openConfirmacion}
                onClose={handleModalConfirmacion}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Advertencia"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿Desea guardar los cambios realizados?
                        </DialogContentText>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalConfirmacion} color="secondary">
                        No, en verdad no
                    </Button>
                    <Button onClick={() => handleNextStep()} color="primary" autoFocus>
                        Sí, guardar
                    </Button>
                </DialogActions>
            </Dialog>
            { loading && <Loading/> }
        </Fragment>
    )
}

export default StepCrearPreguntas;
