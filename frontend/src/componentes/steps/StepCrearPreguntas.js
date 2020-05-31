import React, { Fragment, useState }  from 'react';

// componentes
import FormCrearPregunta from '../../componentes/form_crear_pregunta/FormCrearPregunta.js';
import SeleccionarAreaTema from '../../componentes/seleccionar_tema/SeleccionarAreaTema.js';
import PonderacionDificultad from '../../componentes/ponderacion_dificultad/PonderacionDificultad.js';

// contexts
import { useTipoPreguntaRespuesta } from '../../context/createTestContext';
import { useCreateTestPage } from '../../context/createTestPageContext';

// material
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
        exam_id
    } = useCreateTestPage();

    const [ sucess, setSucess ] = useState(false);

    const handleCrearPregunta = () => {
        const auxListaExamen = listaPreguntasExamen.map( value => { return {...value} });
        const form = {};
        const answer = [];

        respuestas.forEach( (respuesta, index) => {
            answer.push({
                content : tipoPregunta === 'verdadero_falso' ? '' : respuesta.respuesta,
                correct : tipoPregunta === 'verdadero_falso' ? selectedRespuesta : tipoPregunta === 'ordenamiento' ? index : respuesta.checked
            })
        })

        form.content = pregunta;
        form.q_type = tituloRespuesta;
        form.exam = exam_id;
        form.position = auxListaExamen.length + 1;
        form.difficulty = Number(dificultad);
        form.approach = {
            topic : temaSeleccionado,
            area : areaSeleccionada,
            subarea : subareaSeleccionada,
        }
        form.answers = answer;
        form.weighing = Number(ponderacion);
        auxListaExamen.push(form);

        // Agregar Nueva Pregunta
        setListaPreguntasExamen(auxListaExamen);

        // Clean Form
        handleCleanForm();
        setSucess(true);
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') return;
        setSucess(false);
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
    }
    
    return( 
        <Fragment>
            <Grid item xs={12}>
                <Paper className="paper-crear-test" style={{display : 'contents'}}>
                    <Box className="flex-box-titulo">
                        <Box style={{height : 'auto'}}>
                            <Typography variant="h6">
                                Paso - Creación Examen ({tipoConfiguracion}) - {tituloRespuesta}
                            </Typography>
                        </Box>
                        <Box >
                            <Button
                                style={{background:"#7e5ca8", color : "white", marginRight: '8px'}}
                                type="submit"
                                variant="contained"
                                color="red"
                                endIcon={<SaveIcon/>}
                            >
                                Guardado Manual
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{marginRight: '8px'}}
                                onClick={ () => handleChangeStep('step_0')}
                                endIcon={<NavigateBeforeIcon/>}
                            >
                                Paso Anterior
                            </Button>
                            <Button
                                style={{background:"#ff4949", color : "white"}}
                                type="submit"
                                variant="contained"
                                color="red"
                                onClick={ () => handleChangeStep(tipoConfiguracion === 'Configuración Dinámica' ? 'step_2' : 'step_3' )}
                                endIcon={<NavigateNextIcon/>}
                            >
                                Siguiente Paso
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>

            <Grid item lg={8} sm={8} xl={8} xs={8}>
                <Paper className="paper-crear-test" style={{height : '100%'}}>
                    Enfoque
                    <SeleccionarAreaTema/>
                </Paper>
            </Grid>

            <Grid item lg={4} sm={4} xl={4} xs={4}>
                <Paper className="paper-crear-test" style={{height : '100%'}}>
                    Evaluación
                    <PonderacionDificultad/>
                </Paper>
            </Grid>

            <FormCrearPregunta/>

            <Grid item xs={12} md={12} lg={12}>
                <Paper className="paper-crear-test">
                    <Box className="div-buttons-respuestas">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{marginRight: '8px'}}
                            onClick={() => handleCrearPregunta()}
                        >
                            Crear Pregunta
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disable={true}
                        >
                            Eliminar Pregunta
                        </Button>
                    </Box>
                </Paper>
            </Grid> 
            <Snackbar open={sucess} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseAlert} severity="success">
                    Pregunta Creada exitosamente
                </Alert>
            </Snackbar>
            {/* <Snackbar open={sucess} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseAlert} severity="error">
                    {errorMessage}
                    Hubo un error
                </Alert>
            </Snackbar> */}
        </Fragment>
    )
}

export default StepCrearPreguntas;
