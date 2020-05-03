import React, { Fragment, useState } from 'react';

// assets
import '../assets/css/createTestPage.css';

// componentes
import RespuestaSeleccion from '../componentes/respuesta_seleccion/RespuestaSeleccion.js';
import SeleccionarAreaTema from '../componentes/seleccionar_tema/SeleccionarAreaTema.js';
import PonderacionDificultad from '../componentes/ponderacion_dificultad/PonderacionDificultad.js';
import ConfiguracionBasica from '../componentes/configuracion_examen/ConfiguracionBasica.js'
import StepConfiguracionDinamica from '../componentes/steps/StepConfiguracionDinamica.js';
import StepSecciones from '../componentes/steps/StepSecciones.js';

// contexts
import { useTipoPreguntaRespuesta } from '../context/createTestContext';
import { useGeneral } from '../context/generalContext';

// material
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';
import Container from '@material-ui/core/Container';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default function CreateTestPage() {

    const { setContentMenu } = useGeneral();
    const { tituloRespuesta, tipoPregunta } = useTipoPreguntaRespuesta();
    const [ step, setStep ] = useState('step_1');
    const [ tipoConfiguracion, setTipoConfiguracion ] = useState("Configuración Dinámica");

    const handleSeleccionarTipoPregunta = () => {
        if ( tipoPregunta === "seleccion_simple" ){
            return( <RespuestaSeleccion key={`${tipoPregunta}`} /> )
        } else if ( tipoPregunta === "seleccion_multiple")  {
            return ( <RespuestaSeleccion key={`${tipoPregunta}`} /> )
        } else if ( tipoPregunta === "verdadero_falso" ) {
            return ( <RespuestaSeleccion key={`${tipoPregunta}`} /> )
        } else if ( tipoPregunta === "ordenamiento" ) {
            return ( <RespuestaSeleccion key={`${tipoPregunta}`} /> )
        } else {
            return(<div></div>)
        }
    }

    const handleChangeStep = (step) => {
        setStep(step)
    }

    setContentMenu(`create_test ${step}`);

    return (
        <div>
            <div className="toolbar-icono"/>
            <Container maxWidth="lg" style={{paddingTop: '32px', paddingBottom: '32px'}}>
                <Grid container spacing={2}>
                { tipoPregunta !== 'configuracion' ?
                    <Fragment>
                    { step === 'step_1' ?
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
                                    Guardado Automático
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

                        <Grid item lg={9} sm={9} xl={9} xs={9}>
                        <Paper className="paper-crear-test" style={{height : '100%'}}>
                            Enfoque
                            <SeleccionarAreaTema/>
                        </Paper>
                        </Grid>

                        <Grid item lg={3} sm={3} xl={3} xs={3}>
                        <Paper className="paper-crear-test" style={{height : '100%'}}>
                            Evaluación
                            <PonderacionDificultad/>
                        </Paper>
                        </Grid>

                        { handleSeleccionarTipoPregunta() }

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
                        : step === 'step_2' ?
                            <StepConfiguracionDinamica
                                step = {step}
                                handleChangeStep = {handleChangeStep}
                                tipoConfiguracion = {tipoConfiguracion}
                            />
                        : step === 'step_3' &&
                            <StepSecciones
                                step = {step}
                                handleChangeStep = {handleChangeStep}
                                tipoConfiguracion = {tipoConfiguracion}
                            />
                        }
                    </Fragment>
                    :
                    <Grid item xs={12} md={12} lg={12}>
                        <ConfiguracionBasica 
                        tipoConfiguracion = {tipoConfiguracion}
                        setTipoConfiguracion = {setTipoConfiguracion}
                        />
                    </Grid>
                }
                </Grid>
            </Container>
        </div>
    );
}