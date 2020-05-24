import React, { useState, useMemo, useEffect } from 'react';

// servicios
import { getTopics } from '../servicios/servicioCrearExamen.js';

const CreateTestPageContext = React.createContext();

export function CreateTestPageProvider(props) {
    const [areas, setAreas] = useState([]);  
    const [subareas, setSubareas] = useState({});  
    const [temas, setTemas] = useState({});  

    useEffect(() => {
        getTopics()
        .then( res => {
            if (res.data){
                let data = res.data;
                console.log(data)
                setAreas(data.areas);
                setSubareas(data.subareas);
                setTemas(data.topics);

                // setListaFiltradoArea(data.areas)
            } 
        })
    }, [])

    const value = useMemo( () => {
        console.log(areas, subareas, temas)
        return({
            areas,
            subareas,
            temas
        })
    }, [areas, subareas, temas]);

    return <CreateTestPageContext.Provider value = {value} {...props} />
}

export function useCreateTestPage() {
    const context = React.useContext(CreateTestPageContext);
    if (!context){
        throw new Error('useCreateTestPage debe estar dentro del proveedor CreateTestPageContext')
    }
    return context;
}