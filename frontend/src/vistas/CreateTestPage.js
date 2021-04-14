import React, { useState, useEffect, useMemo } from 'react';

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
import { makeStyles } from '@material-ui/core/styles';
import { StepConnector } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel'

// servicios
import { getAllInfoExamen } from '../servicios/servicioGeneral';
import { getStudents } from '../servicios/servicioCrearExamen.js';

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#3f51b5',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#3f51b5',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        background: 'none',
        border: 'none',
    },
    // backButton: {
    //     marginRight: theme.spacing(1),
    // },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default (props) => <CreateTestPage {...props} />

const CreateTestPage = (props) => {
    const { setContentMenu } = useGeneral();
    const { 
        step,
        SetExamId,
        handleColocarData,
        setEstudiantes, 
        flagGetAllInfo,
        setFlagGetAllInfo,
        openExam,
        tipoConfiguracion,
        destroyData
    } = useCreateTestPage();
    const [ loading, setLoading ] = useState(false);
    const [ activeStep, setActiveStep ] = useState(0);
    const [ steps, setSteps ] = useState(['Configuración Básica', 'Crear Preguntas', 'Configuración Dinámica', 'Crear Secciones', 'Terminar Creación de Examen']);

    const classes = useStyles();

    setContentMenu(`crear_examen ${step}`);

    useEffect(() => {
        destroyData();
        if (props.match && props.match.params && props.match.params.id && !isNaN(props.match.params.id)){
            setLoading(true);
            getStudents()
            .then( res => {
                if (res.data) {
                    console.log(res.data.student)
                    setEstudiantes(res.data.student);
                    setFlagGetAllInfo(true);
                }
                
            })
        }
    }, [])

    useMemo(() => {
        if (flagGetAllInfo){
            getAllInfoExamen(props.match.params.id)
            .then( res => {
                if (res.data) {
                    SetExamId(props.match.params.id);
                    handleColocarData(res.data);
                    setLoading(false);
                }
            })
        }
    }, [flagGetAllInfo])

    useMemo(() => {
        if (step){
            if (step === 'step_0') setActiveStep(0);
            if (step === 'step_1') setActiveStep(1);
            if (step === 'step_2') setActiveStep(2);
            if (step === 'step_3') setActiveStep(3);
            if (step === 'step_4') setActiveStep(4);
        }
    }, [step])

    useMemo(() => {
        if (tipoConfiguracion){
            let listaSteps = [];
            if (tipoConfiguracion === 'Configuración Dinámica') {
                openExam ? 
                    listaSteps = ['Configuración Básica', 'Crear Preguntas', 'Configuración Dinámica' , 'Terminar Creación de Examen'] :
                    listaSteps = ['Configuración Básica', 'Crear Preguntas', 'Configuración Dinámica', 'Crear Secciones', 'Terminar Creación de Examen']
            } else {
                openExam ? 
                    listaSteps = ['Configuración Básica', 'Crear Preguntas', 'Terminar Creación de Examen'] :
                    listaSteps = ['Configuración Básica', 'Crear Preguntas',, 'Crear Secciones', 'Terminar Creación de Examen']
            }
            setSteps(listaSteps);
        }
    }, [tipoConfiguracion, openExam])

    return (
        <div>
            <div className="toolbar-icono"/>
            <Container maxWidth="lg" style={{paddingTop: '32px', paddingBottom: '32px'}}>
                <Grid container spacing={2}>
                    <Box className={classes.root}>
                        <Stepper 
                            alternativeLabel 
                            activeStep={activeStep} 
                            className={classes.root}
                            connector={<QontoConnector />}
                        >
                            {steps.map( (label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
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