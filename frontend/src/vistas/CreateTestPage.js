import React, { useState, useEffect } from 'react';
import moment from 'moment';

// assets
import '../assets/css/createTestPage.css';

// Steps
import StepConfiguracionBasica from '../componentes/steps/StepConfiguracionBasica.js';
import StepCrearPreguntas from '../componentes/steps/StepCrearPreguntas.js';
import StepConfiguracionDinamica from '../componentes/steps/StepConfiguracionDinamica.js';
import StepSecciones from '../componentes/steps/StepSecciones.js';

// contexts
import { useGeneral } from '../context/generalContext';
import { useUsuario } from '../context/usuarioContext.js';

// material
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// servicios
import { createTest, getStudents, postSecciones } from '../servicios/servicioCrearExamen.js';

export default function CreateTestPage() {

    // Página
    const { setContentMenu } = useGeneral();
    const [ step, setStep ] = useState('step_0');
    const [ tipoConfiguracion, setTipoConfiguracion ] = useState("Configuración Dinámica");
    const [ exam_id, SetExamId ] = useState(null);
    const { usuario } = useUsuario();

    // Configuracion Basica
    const [switchChecked, setSwitchChecked] = useState(true);
    const [duracion, setDuracion] = useState(null); 
    const [valorFechaInicio, setValorFechaInicio] = useState( moment().toDate() );
    const [valorFechaFin, setValorFechaFin] = useState( moment().add(1, 'd').toDate() );
    const [titulo, setTitulo] = useState(null);
    const [comentarios, setComentarios] = useState(null);

    // Secciones
    const [estudiantes, setEstudiantes] = useState([]);
    const [secciones, setSecciones] = useState([]);
    const [seccionSeleccionada, setSeccionSeleccionada] = useState(null);

    const handleCambiarValor = (e) => {
        if (e.target.name === 'duracion') setDuracion(e.target.value);
        else if (e.target.name === 'comentarios') setComentarios(e.target.value);
        else if (e.target.name === 'titulo') setTitulo(e.target.value);
        
    };

    const handleCambiarSwitch = () =>{
        setSwitchChecked(!switchChecked);
    }

    const handleChangeStartDate = (e) =>{
        setValorFechaInicio(e.toDate());
    }

    const handleChangeFinishDate = (e) =>{
        setValorFechaFin(e.toDate());
    }

    const handleUpdateSecciones = (item) => {
        setSecciones(item);
    }

    const handleChangeSeccionSeleccionada = (item) => {
        setSeccionSeleccionada(item);
    }

    const handleChangeEstudiantes = (estudiantes) => {
        setEstudiantes(estudiantes);
    }

    // POSTS REQUEST 
    const sendSectionsData = () => {
        let data = {};
        secciones.forEach( seccion => {
            if (seccion) {
                let students = seccion.estudiantes.map( estudiante => {
                    return estudiante.email;
                })
                data[`${seccion.id}`] = students;
            }
        })
        let request = { sections : data }
        // postSecciones(request, exam_id)
        // .then( res => {
        //     console.log(res)
        //     if (res) {
        //         console.log("Update Secciones")
        //     }
        // })
    }

    const sendInitialData = (step) => {
        // let request = {
        //     name : titulo,
        //     start_date : moment(valorFechaInicio).toISOString(),
        //     finish_date : moment(valorFechaFin).toISOString(),
        //     duration : duracion,
        //     description : comentarios,
        //     static : switchChecked,
        //     email : usuario.email,
        //     status : true
        // }
        // createTest(request)
        // .then( res => {
        //     console.log(res)
        //     if (res) {
        //         SetExamId(res.data.id);
                handleChangeStep(step);
        //     }
        // })
    }

    // GETS REQUEST 
    useEffect(() => {
        getStudents()
        .then( res => {
            if (res) setEstudiantes(res.data.results);
        })
    }, [])

    useEffect(() => {
        if (switchChecked) setTipoConfiguracion("Configuración Dinámica");
        else setTipoConfiguracion("Configuración Estática");
        
    }, [switchChecked, setTipoConfiguracion])

    useEffect(() => {
        let tipo = tipoConfiguracion;
        setTipoConfiguracion(tipo);

        if (tipo === "Configuración Dinámica") setSwitchChecked(true);
        else setSwitchChecked(false);
        
    }, [tipoConfiguracion, setTipoConfiguracion])



    const handleChangeStep = (step) => {
        setStep(step)
    }

    setContentMenu(`create_test ${step}`);

    return (
        <div>
            <div className="toolbar-icono"/>
            <Container maxWidth="lg" style={{paddingTop: '32px', paddingBottom: '32px'}}>
                <Grid container spacing={2}>
                    { 
                        step === 'step_0' ?
                            <Grid item xs={12} md={12} lg={12}>
                                <StepConfiguracionBasica 
                                tipoConfiguracion = {tipoConfiguracion}
                                setTipoConfiguracion = {setTipoConfiguracion}
                                handleChangeStep = {handleChangeStep}
                                handleCambiarValor = {handleCambiarValor}
                                handleCambiarSwitch = {handleCambiarSwitch}
                                sendInitialData = {sendInitialData}
                                switchChecked = {switchChecked}
                                duracion = {duracion}
                                valorFechaInicio = {valorFechaInicio}
                                valorFechaFin = {valorFechaFin}
                                titulo = {titulo}
                                comentarios = {comentarios}
                                handleChangeStartDate = {handleChangeStartDate}
                                handleChangeFinishDate = {handleChangeFinishDate}
                                exam_id = {exam_id}
                                />
                            </Grid>
                        : step === 'step_1' ?
                            <StepCrearPreguntas
                                step = {step}
                                handleChangeStep = {handleChangeStep}
                                tipoConfiguracion = {tipoConfiguracion}
                                tipoConfiguracion = {tipoConfiguracion}
                                exam_id = {exam_id}
                            />
                        : step === 'step_2' ?
                            <StepConfiguracionDinamica
                                step = {step}
                                handleChangeStep = {handleChangeStep}
                                tipoConfiguracion = {tipoConfiguracion}
                                exam_id = {exam_id}
                            />
                        : step === 'step_3' &&
                            <StepSecciones
                                step = {step}
                                estudiantes = {estudiantes}
                                secciones = {secciones}
                                seccionSeleccionada = {seccionSeleccionada}
                                handleChangeStep = {handleChangeStep}
                                handleUpdateSecciones = {handleUpdateSecciones}
                                handleChangeSeccionSeleccionada = {handleChangeSeccionSeleccionada}
                                handleChangeEstudiantes = {handleChangeEstudiantes}
                                tipoConfiguracion = {tipoConfiguracion}
                                exam_id = {exam_id}
                                sendSectionsData = {sendSectionsData}
                            />
                    }
                </Grid>
            </Container>
        </div>
    );
}