import React, { useState, useMemo } from 'react';
// import { getToken } from '../helpers/auth';
// import { getDataUsuario } from '../servicios/servicioUsuario.js';

const UsuarioContext = React.createContext();

export function UsuarioProvider(props) {
    const [usuario, setUsuario] = useState({
        'email' : '',
        'first_name': '',
        'last_name' : '',
        'username' : ''
    });
    // const [cargandoUsuario, setCargandoUsuario] = useState(true);
    // const [cargandoUsuario] = useState(true);

    // useEffect(() => {
    //     async function cargarUsuario(){
    //         if (!getToken()) {
    //             setCargandoUsuario(true);
    //             return;
    //         }

    //         try{
    //             const { data : usuario } = await getDataUsuario();
    //             setUsuario(usuario);
    //             setCargandoUsuario(false);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    // })

    const value = useMemo( () => {
        return({
            usuario,
            setUsuario,
            // cargandoUsuario,
        })
    // }, [usuario, cargandoUsuario]);
    }, [usuario]);

    return <UsuarioContext.Provider value = {value} {...props} />
}

export function useUsuario() {
    const context = React.useContext(UsuarioContext);
    if (!context){
        throw new Error('useUsuario debe estar dentro del proveedor UsuarioContext');
    }
    return context;
}