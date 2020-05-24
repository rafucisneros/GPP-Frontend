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
import { CreateTestPageProvider } from '../context/createTestPageContext.js';
import { useGeneral } from '../context/generalContext';
import { useUsuario } from '../context/usuarioContext.js';

// material
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// servicios
import { createTest, getStudents, postSecciones } from '../servicios/servicioCrearExamen.js';

// const areas_v = [
//     'Area 1',
//     'Area 2'
// ];

// const subareas_v = { 
//     'Area 1' : 
//         [
//             'SubArea 1',
//             'SubArea 2',
//         ],
//     'Area 2' : 
//         [
//             'SubArea 3',
//             'SubArea 4',
//         ],
//     'Area 3' : 
//         [
//             'SubArea 5',
//             'SubArea 6',
    
//         ],
//     'Area 4' : 
//         [
//             'SubArea 7',
//             'SubArea 8',
//         ],
//     }
    
// const temas_v = { 
//     'SubArea 1' : 
//         [
//             'Tema 1',
//             'Tema 2',
//         ] ,
//     'SubArea 2' : 
//         [
//             'Tema 3',
//             'Tema 4',
//         ],
//     'SubArea 3' : 
//         [
//             'Tema 5',
//             'Tema 6',
//         ],
//     'SubArea 4' : 
//         [
//             'Tema 7',
//             'Tema 8',
//         ],
//     'SubArea 5' : 
//         [
//             'Tema 9',
//             'Tema 10',
//         ],
//     'SubArea 6' : 
//         [
//             'Tema 11',
//             'Tema 12',
//         ],
//     'SubArea 7' : 
//         [
//             'Tema 13',
//             'Tema 14',
//         ],
//     'SubArea 8' : 
//         [
//             'Tema 15',
//             'Tema 16',
//         ],
//     }

export default function CreateTestPage() {

    // Página
    const { setContentMenu } = useGeneral();
    const [ step, setStep ] = useState('step_0');
    const [ tipoConfiguracion, setTipoConfiguracion ] = useState("Configuración Dinámica");
    const [ exam_id, SetExamId ] = useState(null);
    const { usuario } = useUsuario();
    setContentMenu(`create_test ${step}`);

    // Step Configuracion Basica (Variables de estados)
    const [switchChecked, setSwitchChecked] = useState(true);
    const [duracion, setDuracion] = useState(null); 
    const [valorFechaInicio, setValorFechaInicio] = useState( moment().toDate() );
    const [valorFechaFin, setValorFechaFin] = useState( moment().add(1, 'd').toDate() );
    const [titulo, setTitulo] = useState(null);
    const [comentarios, setComentarios] = useState(null);
    
    // Step Crear Preguntas (Variables de estados)
    const [areaSeleccionada, setAreaSeleccionada] = useState(null);  // Arreglo de areas seleccionadas
    const [subareaSeleccionada, setSubareaSeleccionada] = useState(null);  // Arreglo de subareas seleccionadas
    const [temaSeleccionado, setTemaSeleccionado] = useState(null);  // Arreglo de temas seleccionadas

    const [listaFiltradoArea, setListaFiltradoArea] = useState();  // Arreglo de areas filtradas a mostrar
    const [listaFiltradoSubArea, setListaFiltradoSubArea] = useState([]);  // Arreglo de subareas filtradas a mostrar
    const [listaFiltradoTema, setListaFiltradoTema] = useState([]);  // Arreglo de temas filtradas a mostrar

    const [permitirSubArea, setPermitirSubArea] = useState(false);
    const [permitirTarea, setPermitirTarea] = useState(false);

    const [ponderacion, setPonderacion] = useState(null);  
    const [dificultad, setDificultad] = useState(null);  

    const [pregunta, setPregunta] = useState(null);

    const handleChangeAreaSubAreaTema = (value, type) => {
        if (type === 'area_seleccionada') setAreaSeleccionada(value);
        else if (type === 'subarea_seleccionada') setSubareaSeleccionada(value);
        else if (type === 'tema_seleccionada') setTemaSeleccionado(value);
        else if (type === 'lista_filtrado_subarea') setListaFiltradoSubArea(value);
        else if (type === 'lista_filtrado_tema') setListaFiltradoTema(value);
        else if (type === 'permitir_subarea') setPermitirSubArea(value);
        else if (type === 'permitir_tema') setPermitirTarea(value);
    }

    const handleChangeInput = (e) => {
        if (e.target.name === 'dificultad') setDificultad(e.target.value);
        else if (e.target.name === 'ponderacion') setPonderacion(e.target.value);
        else if (e.target.name === 'pregunta') setPregunta(e.target.value);
    }

    // Step Configuracion Dinamica (Variables de estados)

    // Step Secciones (Variables de estados)
    const [estudiantes, setEstudiantes] = useState([]);
    const [secciones, setSecciones] = useState([]);
    const [seccionSeleccionada, setSeccionSeleccionada] = useState(null);

    // GET requests y componentes de montaje
    useEffect(() => {
        getStudents()
        .then( res => {
            if (res.data) setEstudiantes(res.data.results);
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

    // Funciones globales
    const handleChangeStep = (step) =>  setStep(step);
    
    // Step Conguracion Basica
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

    const handleCambiarValor = (e) => {
        if (e.target.name === 'duracion') setDuracion(e.target.value);
        else if (e.target.name === 'comentarios') setComentarios(e.target.value);
        else if (e.target.name === 'titulo') setTitulo(e.target.value); 
    };

    const handleCambiarSwitch = () => setSwitchChecked(!switchChecked);
    const handleChangeStartDate = (e) => setValorFechaInicio(e.toDate());
    const handleChangeFinishDate = (e) => setValorFechaFin(e.toDate());

    // Step Secciones
    const handleChangeComp = (item, type) => {
        if (type === 'secciones') setSecciones(item);
        else if (type === 'seccion_seleccionada') setSeccionSeleccionada(item);
        else if (type === 'esudiantes') setEstudiantes(item); 
    }

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

    return (
        <div>
            <CreateTestPageProvider>
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
                                    handleChangeAreaSubAreaTema = {handleChangeAreaSubAreaTema}
                                    areaSeleccionada = {areaSeleccionada}
                                    subareaSeleccionada = {subareaSeleccionada}
                                    temaSeleccionado = {temaSeleccionado}
                                    listaFiltradoArea = {listaFiltradoArea}
                                    listaFiltradoSubArea = {listaFiltradoSubArea}
                                    listaFiltradoTema = {listaFiltradoTema}
                                    permitirSubArea = {permitirSubArea}
                                    permitirTarea = {permitirTarea}
                                    ponderacion = {ponderacion}
                                    dificultad = {dificultad}
                                    handleChangeInput = {handleChangeInput}
                                    pregunta = {pregunta}
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
                                    handleChangeComp = {handleChangeComp}
                                    tipoConfiguracion = {tipoConfiguracion}
                                    exam_id = {exam_id}
                                    sendSectionsData = {sendSectionsData}
                                />
                        }
                    </Grid>
                </Container>
            </CreateTestPageProvider> 
        </div>
    );
}