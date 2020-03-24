import React, { useState, useMemo, useEffect } from 'react';
import { getToken } from '../helpers/auth';
import { getDataUsuario } from '../servicios/servicioUsuario.js';

const UsuarioContext = React.createContext();

export function UsuarioProvider(props) {
    const [usuario, setUsuario] = useState({
        'email' : '',
        'first_name': '',
        'last_name' : ''
    });
    const [cargandoUsuario, setCargandoUsuario] = useState(true);

    useEffect(() => {
        async function cargarUsuario(){
            if (!getToken()) {
                setCargandoUsuario(true);
                return;
            }

            try{
                const { data : usuario } = await getDataUsuario();
                setUsuario(usuario);
                setCargandoUsuario(false);
            } catch (err) {
                console.log(err);
            }
        }
    })

    const value = useMemo( () => {
        return({
            usuario,
            setUsuario,
            cargandoUsuario,
            setUsuario
        })
    }, [usuario, cargandoUsuario]);

    return <UsuarioContext.Provider value = {value} {...props} />
}

export function useUsuario() {
    const context = React.useContext(UsuarioContext);
    if (!context){
        throw new Error('useTipoPreguntaRespuesta debe estar dentro del proveedor TipoPreguntaRespuestaContext')
    }
    return context;
}