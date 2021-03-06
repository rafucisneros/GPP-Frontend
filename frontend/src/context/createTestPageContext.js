import React, { useState, useMemo, useEffect } from 'react';
import moment from 'moment';
import { useUsuario } from '../context/usuarioContext';

// servicios
import { getTopics, getStudents } from '../servicios/servicioCrearExamen.js';

// context
import { useTipoPreguntaRespuesta } from './createTestContext';

const CreateTestPageContext = React.createContext();
let opciones = {
    'selección simple' : 'Selección Simple',
    'selección múltiple' : 'Selección Múltiple',
    'verdadero o falso' : 'Verdadero o Falso',
    'ordenamiento' : 'Ordenamiento'
}

export function CreateTestPageProvider(props) {

    const { handleOpcionExamen } = useTipoPreguntaRespuesta();

    // Mensajes, errores y exitos
    const [msgAlert, setMsgAlert] = useState(null);
    const [alertError, setAlertError] = useState(false);
    const [editTest, setEditTest] = useState(null);
    const [flagGetAllInfo, setFlagGetAllInfo] = useState(null);

    // Página
    const [step, setStep] = useState('step_0');
    const [tipoConfiguracion, setTipoConfiguracion] = useState("Configuración Estática");
    const [exam_id, SetExamId] = useState(null);

    // Step Configuracion Basica (Variables de estados)
    const [switchChecked, setSwitchChecked] = useState(false);
    const [duracion, setDuracion] = useState(null); 
    const [nroIntentos, SetNroIntentos] = useState(null); 
    const [openExam, setOpenExam] = useState(true); 
    const [valorFechaInicio, setValorFechaInicio] = useState( moment().toDate() );
    const [valorFechaFin, setValorFechaFin] = useState( moment().add(1, 'd').toDate() );
    const [titulo, setTitulo] = useState(null);
    const [comentarios, setComentarios] = useState(null);
    
    // Step Crear Preguntas (Variables de estados)
    const [indexItemPregunta, setIndexItemPregunta] = useState(null);
    const [flagEditarPregunta, setFlagEditarPregunta] = useState(false);
    const [formats, setFormats] = useState('text');

    const [areas, setAreas] = useState([]);  
    const [subareas, setSubareas] = useState({});  
    const [temas, setTemas] = useState({}); 

    const [listaFiltradoSubArea, setListaFiltradoSubArea] = useState([]);  // Arreglo de subareas filtradas a mostrar
    const [listaFiltradoTema, setListaFiltradoTema] = useState([]);  // Arreglo de temas filtradas a mostrar

    const [permitirSubArea, setPermitirSubArea] = useState(false);
    const [permitirTarea, setPermitirTarea] = useState(false);

    const [pregunta, setPregunta] = useState(null);
    const [ponderacion, setPonderacion] = useState(null);  
    const [dificultad, setDificultad] = useState(null); 
    const [areaSeleccionada, setAreaSeleccionada] = useState(null);  // Arreglo de areas seleccionadas
    const [subareaSeleccionada, setSubareaSeleccionada] = useState(null);  // Arreglo de subareas seleccionadas
    const [temaSeleccionado, setTemaSeleccionado] = useState(null);  // Arreglo de temas seleccionadas
    const [listaPreguntasExamen, setListaPreguntasExamen] = useState([]); 
    const [respuestas, setRespuestas] = useState([]);
    const [selectedRespuesta, setSelectedRespuesta] = useState('verdadero');

    // Step Configuracion Dinamica (Variables de estados)
    const [tipoPreguntaSeleccionado, setTipoPreguntaSeleccionado] = useState(null); 
    const [listaTipoPreguntas, setListaTipoPregunta] = useState([]);
    const [countPreguntas, setCountPreguntas] = useState(0);
    const [maxPreguntas, setMaxPreguntas] = useState(0);

    // Step Secciones (Variables de estados)
    const [estudiantes, setEstudiantes] = useState([]);
    const [missingEstudiantes, setMissingEstudiantes] = useState({'ALL' : []});
    const [secciones, setSecciones] = useState([]);
    const [seccionSeleccionada, setSeccionSeleccionada] = useState(null);
    const {usuario, setUsuario} = useUsuario();

    // GET requests y componentes de montaje
    useEffect(() => {
        if(usuario.groups.find(x => x.name === "Professor")){
            getStudents()
            .then( res => {
                if (res.data) setEstudiantes(res.data.student);
            })
        }
    }, [])

    useEffect(() => {
        // console.log("LLAMANDO ENDPOINT")
        if(usuario.groups.find(x => x.name === "Professor")){
            getTopics()
            .then( res => {
                if (res.data){
                    let data = res.data;
                    // console.log(data)
                    setAreas(data.areas);
                    setSubareas(data.subareas);
                    setTemas(data.topics);
                } 
            })
        }
    }, [usuario])

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

    const handleColocarData = (data) => {
        setEditTest(true);
        console.log(data);

        // Paso Basico Inicial
        SetExamId(data.conf_ini.id);
        setSwitchChecked(!data.conf_ini.static);
        setDuracion(data.conf_ini.duration);
        setValorFechaInicio(moment(data.conf_ini.start_date).toDate());
        setValorFechaFin( moment(data.conf_ini.finish_date).toDate());
        setTitulo(data.conf_ini.name);
        setComentarios(data.conf_ini.comments);
        SetNroIntentos(data.conf_ini.attempt ? data.conf_ini.attempt : "infinito");
        setOpenExam(data.conf_ini.open);

        // Paso Crear Preguntas
        let preguntas = [];
        data.questions.reverse().forEach( item => {
            let aux = {};
            aux.content = item.content;
            aux.difficulty = item.difficulty
            aux.id = item.id
            aux.latex = item.latex
            aux.q_type = opciones[item.q_type.name]
            aux.q_type_id = opciones[item.q_type.name]
            aux.exam = item.exam;
            aux.value = item.value;
            aux.position = item.position;
            aux.approach =  {
                topic : item.topic.name,
                subarea : item.topic.subarea.name,
                area : item.topic.subarea.area.name
            }
            let reversed = [...item.answers].reverse();
            aux.answers = reversed.map( elem => {
                return { content : elem.content, correct: elem.option ? true : false, id : elem.id }
            })
            preguntas.push(aux);
        })
        setListaPreguntasExamen(preguntas);

        // Paso Dinamico
        let approachAux = data.dinamic.approach === 'topic' ? 'tema' : data.dinamic.approach;
        setTipoPreguntaSeleccionado(approachAux);
        if (data.dinamic.distribution){
            let count = 0;
            let enfoques = data.dinamic.distribution.reverse().map( distri => {
                count += Number(distri.quantity)
                return { 
                    label : distri.name,
                    valor : Number(distri.quantity),
                    max : distri.max_quantity,
                    id : distri.id
                }
            })
            setListaTipoPregunta(enfoques);
            setMaxPreguntas(data.dinamic.total_questions);
            setCountPreguntas(count);
        }
        // setMaxPreguntas(data.dinamic.total_quantity)

        // Paso Secciones
        let auxSections = [];
        let missingEmails = {};
        missingEmails['ALL'] =  [];
        let keys = Object.keys(data.sections).reverse();
        keys.forEach( key => {
            let info = {};
            info.id = key;
            info.estudiantes = [];
            console.log(data.sections[key])
            data.sections[key].students.forEach( email => {
                let studentInfo = {};
                let indexEstudiante = estudiantes.findIndex( est => email === est.email);
                if (indexEstudiante > 0 ) {
                    studentInfo.email = email;
                    info.estudiantes.push(studentInfo);
                }
            })
            data.sections[key].missing_emails.forEach( email => {
                let studentInfo = {};
                studentInfo.email = email;
                info.estudiantes.push(studentInfo);
            })
            missingEmails[key] =  data.sections[key].missing_emails;
            missingEmails['ALL'] =  [... missingEmails['ALL'], ...data.sections[key].missing_emails]
            auxSections.push(info);
        });
        setMissingEstudiantes(missingEmails);
        setSecciones(auxSections);
    }

    // Funciones globales
    const handleChangeStep = (step) =>  setStep(step);
    
    // Step Conguracion Basica
    const handleCambiarValor = (e) => {
        if (e.target.name === 'duracion') setDuracion(e.target.value);
        else if (e.target.name === 'open_exam') setOpenExam(e.target.value);
        else if (e.target.name === 'nro_intentos') SetNroIntentos(e.target.value);
        else if (e.target.name === 'comentarios') setComentarios(e.target.value);
        else if (e.target.name === 'titulo') setTitulo(e.target.value); 
    };

    const handleCambiarSwitch = () => setSwitchChecked(!switchChecked);
    const handleChangeStartDate = (e) => {
        let now = moment();
        if ( e < now ) {
            e = now;
            setMsgAlert('Fecha Incorrecta. Se ajustará automáticamente a la fecha actual');
            setAlertError(true);
        }
        else if (e > moment(valorFechaFin)) {
            e = moment(valorFechaFin);
            setMsgAlert('Fecha Incorrecta. Se ajustará automáticamente a la fecha de culminación actual');
            setAlertError(true);
        }
        setValorFechaInicio(e.toDate());
    };
    const handleChangeFinishDate = (e) => {
        if (e < moment(valorFechaInicio)) {
            e = moment(valorFechaInicio);
            setMsgAlert('Fecha Incorrecta. Se ajustará automáticamente a la fecha de comienzo actual');
            setAlertError(true);
        }
        setValorFechaFin(e.toDate());
    };

    // Step Crear Preguntas
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

    const setearDataItemSeleccionado = (pregunta) => {
        let event_pond = { target : { name : 'ponderacion', value : pregunta.value }};
        let event_diff = { target : { name : 'dificultad', value : pregunta.difficulty }};
        let event_preg = { target : { name : 'pregunta', value : pregunta.content }};
        let latex = pregunta.latex ? 'latex' : 'text';

        let menu = {};
        if (pregunta.q_type_id === "Selección Simple"){
            menu.value = "seleccion_simple";
            menu.key = '1.1';
        } 
        else if (pregunta.q_type_id === "Selección Múltiple"){
            menu.value = "seleccion_multiple";
            menu.key = '1.2';
        }
        else if (pregunta.q_type_id === "Verdadero o Falso"){
            menu.value = "verdadero_falso";
            menu.key = '1.3';
        }
        else if (pregunta.q_type_id === "Ordenamiento"){
            menu.value = "ordenamiento";
            menu.key = '1.4';
        }

        if (menu.value === 'verdadero_falso'){
            let valor = pregunta.answers[0].correct ? 'verdadero' : 'falso';
            setSelectedRespuesta(valor);
        } else {
            let respuestas = pregunta.answers.map( (respuesta, index) => {
                return { respuesta : respuesta.content, checked: respuesta.correct, id : respuesta.id }
            })
            setRespuestas(respuestas);
        }
        
        handleOpcionExamen(menu.value, menu.key);
        setFlagEditarPregunta(true);
        handleChangeInput(event_pond);
        handleChangeInput(event_diff);
        handleChangeInput(event_preg);
        handleChangeAreaSubAreaTema(pregunta.approach.area, 'area_seleccionada');
        handleChangeAreaSubAreaTema(pregunta.approach.subarea, 'subarea_seleccionada');
        handleChangeAreaSubAreaTema(true, 'permitir_subarea');
        handleChangeAreaSubAreaTema(pregunta.approach.topic, 'tema_seleccionada');
        handleChangeAreaSubAreaTema(true, 'permitir_tema');
        setFormats(latex);
    }

    // Step Secciones
    const handleChangeComp = (item, type) => {
        if (type === 'secciones') setSecciones(item);
        else if (type === 'seccion_seleccionada') setSeccionSeleccionada(item);
        else if (type === 'estudiantes') setEstudiantes(item); 
    }

    // Step Finish
    const destroyData = () => {
        setStep('step_0')
        setTipoConfiguracion("Configuración Estática")
        SetExamId(null)
        setSwitchChecked(false)
        setDuracion(null)
        setValorFechaInicio(moment().toDate())
        setValorFechaFin( moment().add(1, 'd').toDate())
        setTitulo(null)
        setComentarios(null)
        setListaFiltradoSubArea([])
        setListaFiltradoTema([])
        setPermitirSubArea(false)
        setOpenExam(true)
        SetNroIntentos(null)
        setPermitirTarea(false)
        setPregunta(null)
        setPonderacion(null)
        setDificultad(null)
        setAreaSeleccionada(null)
        setSubareaSeleccionada(null)
        setTemaSeleccionado(null)
        setListaPreguntasExamen([])
        setRespuestas([])
        setSelectedRespuesta('verdadero')
        setTipoPreguntaSeleccionado(null)
        setListaTipoPregunta([])
        setCountPreguntas(0)
        setMaxPreguntas(0)
        setSecciones([])
        setSeccionSeleccionada(null)
    }

    const value = useMemo( () => {
        return({
            areas : [...areas],
            subareas,
            temas,
            step,
            tipoConfiguracion,
            exam_id,
            switchChecked,
            duracion,
            valorFechaInicio,
            valorFechaFin,
            titulo,
            comentarios,
            areaSeleccionada,
            subareaSeleccionada,
            temaSeleccionado,
            listaFiltradoSubArea,
            listaFiltradoTema,
            permitirSubArea,
            permitirTarea,
            ponderacion,
            dificultad,
            pregunta,
            estudiantes,
            secciones,
            seccionSeleccionada,
            tipoPreguntaSeleccionado,
            listaTipoPreguntas,
            countPreguntas,
            maxPreguntas,
            listaPreguntasExamen,
            respuestas,
            nroIntentos,
            openExam,
            selectedRespuesta,
            handleChangeStep,
            handleCambiarValor,
            handleCambiarSwitch,
            handleChangeStartDate,
            handleChangeFinishDate,
            handleChangeAreaSubAreaTema,
            handleChangeInput,
            handleChangeComp,
            setTipoPreguntaSeleccionado,
            setListaTipoPregunta,
            setCountPreguntas,
            setMaxPreguntas,
            setListaPreguntasExamen,
            setRespuestas,
            setSelectedRespuesta,
            destroyData,
            SetExamId,
            msgAlert,
            setMsgAlert,
            alertError,
            setAlertError,
            setAreas,
            setSubareas,
            setTemas,
            setAreaSeleccionada,
            indexItemPregunta,
            setIndexItemPregunta,
            flagEditarPregunta,
            setFlagEditarPregunta,
            formats,
            setFormats,
            handleColocarData,
            setEstudiantes,
            editTest,
            setFlagGetAllInfo,
            flagGetAllInfo,
            missingEstudiantes,
            setearDataItemSeleccionado
        })
    }, [
        areas, 
        subareas, 
        temas, 
        step,
        tipoConfiguracion,
        exam_id,
        switchChecked,
        duracion,
        valorFechaInicio,
        valorFechaFin,
        titulo,
        comentarios,
        areaSeleccionada,
        subareaSeleccionada,
        temaSeleccionado,
        listaFiltradoSubArea,
        listaFiltradoTema,
        permitirSubArea,
        permitirTarea,
        ponderacion,
        dificultad,
        pregunta,
        estudiantes,
        secciones,
        seccionSeleccionada,
        tipoPreguntaSeleccionado,
        listaTipoPreguntas,
        countPreguntas,
        maxPreguntas,
        listaPreguntasExamen,
        respuestas,
        selectedRespuesta,
        nroIntentos,
        openExam,
        msgAlert,
        alertError,
        indexItemPregunta,
        flagEditarPregunta,
        formats,
        editTest,
        missingEstudiantes,
        flagGetAllInfo
    ]);

    return <CreateTestPageContext.Provider value = {value} {...props} />
}

export function useCreateTestPage() {
    const context = React.useContext(CreateTestPageContext);
    if (!context){
        throw new Error('useCreateTestPage debe estar dentro del proveedor CreateTestPageContext')
    }
    return context;
}