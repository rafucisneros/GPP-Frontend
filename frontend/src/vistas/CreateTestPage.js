import React, { useState, useEffect } from 'react';

// assets
import '../assets/css/createTestPage.css';

// componentes
import Loading from '../componentes/loading/Loading.js';
import StepConfiguracionBasica from '../componentes/steps/StepConfiguracionBasica.js';
import StepCrearPreguntas from '../componentes/steps/StepCrearPreguntas.js';
import StepConfiguracionDinamica from '../componentes/steps/StepConfiguracionDinamica.js';
import StepSecciones from '../componentes/steps/StepSecciones.js';
import StepFinish from '../componentes/steps/StepFinish.js';

// contexts
import { useCreateTestPage } from '../context/createTestPageContext.js';
import { useGeneral } from '../context/generalContext';

// material
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// servicios
import { getAllInfoExamen } from '../servicios/servicioGeneral';

export default (props) => <CreateTestPage {...props} />

const CreateTestPage = (props) => {
    const { setContentMenu } = useGeneral();
    const { step } = useCreateTestPage();
    const [ loading, setLoading ] = useState(false);
    const [ redirectExams ] = useState(false);

    setContentMenu(`crear_examen ${step}`);

    useEffect(() => {
        if (props.match && props.match.params && props.match.params.id && !isNaN(props.match.params.id)){
            setLoading(true);
            getAllInfoExamen(props.match.params.id)
            .then( res => {
                if (res.data) {
                    console.log(res.data);
                    setLoading(false);
                }
            })
        }
    }, [])

    return (
        <div>
            <div className="toolbar-icono"/>
            <Container maxWidth="lg" style={{paddingTop: '32px', paddingBottom: '32px'}}>
                <Grid container spacing={2}>
                    { 
                        step === 'step_0' ?
                            <Grid item xs={12} md={12} lg={12}>
                                <StepConfiguracionBasica/>
                            </Grid>
                        : step === 'step_1' ?
                            <StepCrearPreguntas/>
                        : step === 'step_2' ?
                            <StepConfiguracionDinamica/>
                        : step === 'step_3' ?
                            <StepSecciones/>
                        : step === 'step_4' &&
                            <StepFinish/>
                    }
                </Grid>
            </Container>
            { loading && <Loading/> }
        </div>
    );
}