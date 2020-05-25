import React, { } from 'react';

// assets
import '../assets/css/createTestPage.css';

// Steps
import StepConfiguracionBasica from '../componentes/steps/StepConfiguracionBasica.js';
import StepCrearPreguntas from '../componentes/steps/StepCrearPreguntas.js';
import StepConfiguracionDinamica from '../componentes/steps/StepConfiguracionDinamica.js';
import StepSecciones from '../componentes/steps/StepSecciones.js';

// contexts
import { CreateTestPageProvider } from '../context/createTestPageContext.js';
import { useCreateTestPage } from '../context/createTestPageContext.js';
import { useGeneral } from '../context/generalContext';

// material
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export default () => <CreateTestPage></CreateTestPage>

const CreateTestPage = () => {

    const { setContentMenu } = useGeneral();
    const { step } = useCreateTestPage();

    setContentMenu(`create_test ${step}`);

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
                        : step === 'step_3' &&
                            <StepSecciones/>
                    }
                </Grid>
            </Container>
        </div>
    );
}