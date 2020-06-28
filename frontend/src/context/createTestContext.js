import React, { useState, useMemo } from 'react';

const TipoPreguntaRespuestaContext = React.createContext();

export function TipoPreguntaRespuestaProvider(props) {
    const [tituloRespuesta, setTituloRespuesta] = useState("Selección Simple");
    const [tipoPregunta, setTipoPregunta] = useState("seleccion_simple");
    const [itemSeleccionado, setItemSeleccionado] = useState('1.1');
    const [subMenuTipoPregunta, setSubMenuTipoPregunta] = useState(true);

    const handleOpcionExamen = (tipo, key) => {
        console.log(key)
        if (tipo === "seleccion_simple") setTituloRespuesta("Selección Simple");
        else if (tipo === "seleccion_multiple") setTituloRespuesta("Selección Múltiple");
        else if (tipo === "verdadero_falso") setTituloRespuesta("Verdadero y Falso");
        else if (tipo === "ordenamiento") setTituloRespuesta("Ordenamiento");
        else if (tipo === "configuracion") setTituloRespuesta("Configuración del Examen");
        setTipoPregunta(tipo);
        setItemSeleccionado(key);
    }

    const value = useMemo( () => {
        return({
            tituloRespuesta,
            tipoPregunta,
            handleOpcionExamen,
            itemSeleccionado,
            subMenuTipoPregunta,
            setSubMenuTipoPregunta,
            setItemSeleccionado
        })
    }, [tituloRespuesta, tipoPregunta, itemSeleccionado, subMenuTipoPregunta]);

    return <TipoPreguntaRespuestaContext.Provider value = {value} {...props} />
}

export function useTipoPreguntaRespuesta() {
    const context = React.useContext(TipoPreguntaRespuestaContext);
    if (!context){
        throw new Error('useTipoPreguntaRespuesta debe estar dentro del proveedor TipoPreguntaRespuestaContext')
    }
    return context;
}