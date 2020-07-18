import React, { useState, useMemo, useEffect } from 'react';
import moment from 'moment';
import { useUsuario } from '../context/usuarioContext';

// servicios
import { getTopics, getStudents } from '../servicios/servicioCrearExamen.js';

const CreateTestPageContext = React.createContext();

export function CreateTestPageProvider(props) {

    // Mensajes, errores y exitos
    const [msgAlert, setMsgAlert] = useState(null);
    const [alertError, setAlertError] = useState(false);

    // Página
    const [ step, setStep ] = useState('step_0');
    const [ tipoConfiguracion, setTipoConfiguracion ] = useState("Configuración Dinámica");
    const [ exam_id, SetExamId ] = useState(null);

    // Step Configuracion Basica (Variables de estados)
    const [switchChecked, setSwitchChecked] = useState(true);
    const [duracion, setDuracion] = useState(null); 
    const [nroIntentos, SetNroIntentos] = useState(null); 
    const [openExam, setOpenExam] = useState(null); 
    const [valorFechaInicio, setValorFechaInicio] = useState( moment().toDate() );
    const [valorFechaFin, setValorFechaFin] = useState( moment().add(1, 'd').toDate() );
    const [titulo, setTitulo] = useState(null);
    const [comentarios, setComentarios] = useState(null);
    
    // Step Crear Preguntas (Variables de estados)
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
    const [secciones, setSecciones] = useState([]);
    const [seccionSeleccionada, setSeccionSeleccionada] = useState(null);
    const { usuario, setUsuario } = useUsuario();

    // GET requests y componentes de montaje
    useEffect(() => {
        if(usuario.groups.find(x => x.name === "Professor")){
            getStudents()
            .then( res => {
                if (res.data) setEstudiantes(res.data.results);
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

    // Step Secciones
    const handleChangeComp = (item, type) => {
        if (type === 'secciones') setSecciones(item);
        else if (type === 'seccion_seleccionada') setSeccionSeleccionada(item);
        else if (type === 'esudiantes') setEstudiantes(item); 
    }

    // Step Finish
    const destroyData = () => {
        setStep('step_0')
        setTipoConfiguracion("Configuración Dinámica")
        SetExamId(null)
        setSwitchChecked(true)
        setDuracion(null)
        setValorFechaInicio(moment().toDate())
        setValorFechaFin( moment().add(1, 'd').toDate())
        setTitulo(null)
        setComentarios(null)
        setListaFiltradoSubArea([])
        setListaFiltradoTema([])
        setPermitirSubArea(false)
        setOpenExam(null)
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
        setEstudiantes([])
        setSecciones([])
        setSeccionSeleccionada(null)
    }

    const value = useMemo( () => {
        return({
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
            setAreaSeleccionada
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
        alertError
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