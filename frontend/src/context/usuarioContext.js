import React, { useState, useMemo, useEffect } from 'react';
import { getToken } from '../helpers/auth';
import { getDataUsuario } from '../servicios/servicioUsuario.js';

const UsuarioContext = React.createContext();

export function UsuarioProvider(props) {
    const [usuario, setUsuario] = useState({
        'email' : '',
        'first_name': '',
        'last_name' : '',
    });
    const [cargandoUsuario, setCargandoUsuario] = useState(false);

    useEffect(() => {
        async function cargarUsuario(){
            if (!getToken()) {
                setCargandoUsuario(false);
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
        cargarUsuario();
    }, [])

    const value = useMemo( () => {
        return({
            usuario,
            cargandoUsuario,
        })
    }, [usuario, cargandoUsuario]);

    return <UsuarioContext.Provider value = {value} {...props} />
}

export function useUsuario() {
    const context = React.useContext(UsuarioContext);
    if (!context){
        throw new Error('useUsuario debe estar dentro del proveedor UsuarioContext');
    }
    return context;
}