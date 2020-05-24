import React, { Fragment }  from 'react';

// componentes
import FormCrearPregunta from '../../componentes/form_crear_pregunta/FormCrearPregunta.js';
import SeleccionarAreaTema from '../../componentes/seleccionar_tema/SeleccionarAreaTema.js';
import PonderacionDificultad from '../../componentes/ponderacion_dificultad/PonderacionDificultad.js';

// contexts
import { useTipoPreguntaRespuesta } from '../../context/createTestContext';

// material
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const StepCrearPreguntas = (props) => {

    const { tituloRespuesta, tipoPregunta } = useTipoPreguntaRespuesta();
    
    return( 
        <Fragment>
            <Grid item xs={12}>
                <Paper className="paper-crear-test" style={{display : 'contents'}}>
                    <Box className="flex-box-titulo">
                        <Box style={{height : 'auto'}}>
                            <Typography variant="h6">
                                Paso - Creación Examen ({props.tipoConfiguracion}) - {tituloRespuesta}
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
                                onClick={ () => props.handleChangeStep('step_0')}
                                endIcon={<NavigateBeforeIcon/>}
                            >
                                Paso Anterior
                            </Button>
                            <Button
                                style={{background:"#ff4949", color : "white"}}
                                type="submit"
                                variant="contained"
                                color="red"
                                onClick={ () => props.handleChangeStep(props.tipoConfiguracion === 'Configuración Dinámica' ? 'step_2' : 'step_3' )}
                                endIcon={<NavigateNextIcon/>}
                            >
                                Siguiente Paso
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>

            <Grid item lg={9} sm={9} xl={9} xs={9}>
                <Paper className="paper-crear-test" style={{height : '100%'}}>
                    Enfoque
                    <SeleccionarAreaTema
                        handleChangeAreaSubAreaTema = {props.handleChangeAreaSubAreaTema}
                        areaSeleccionada = {props.areaSeleccionada}
                        subareaSeleccionada = {props.subareaSeleccionada}
                        temaSeleccionado = {props.temaSeleccionado}
                        listaFiltradoArea = {props.listaFiltradoArea}
                        listaFiltradoSubArea = {props.listaFiltradoSubArea}
                        listaFiltradoTema = {props.listaFiltradoTema}
                        permitirSubArea = {props.permitirSubArea}
                        permitirTarea = {props.permitirTarea}
                        areas = {props.areas}
                        subareas = {props.subareas}
                        temas = {props.temas}
                    />
                </Paper>
            </Grid>

            <Grid item lg={3} sm={3} xl={3} xs={3}>
                <Paper className="paper-crear-test" style={{height : '100%'}}>
                    Evaluación
                    <PonderacionDificultad
                        handleChangeInput = {props.handleChangeInput}
                        dificultad = {props.dificultad}
                        ponderacion = {props.ponderacion}
                    />
                </Paper>
            </Grid>

            <FormCrearPregunta
                tipoPregunta = {tipoPregunta}
                handleChangeInput = {props.handleChangeInput}
            />

            <Grid item xs={12} md={12} lg={12}>
                <Paper className="paper-crear-test">
                    <Box className="div-buttons-respuestas">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{marginRight: '8px'}}
                        >
                            Crear Pregunta
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                        >
                            Eliminar Pregunta
                        </Button>
                    </Box>
                </Paper>
            </Grid> 
        </Fragment>
    )
}

export default StepCrearPreguntas;
