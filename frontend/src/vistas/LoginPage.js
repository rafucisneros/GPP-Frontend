import React, { useState }  from 'react';
import LoginForm from '../componentes/login/LoginForm.js';
import { login } from '../servicios/servicioUsuario.js';
import { addToken } from '../helpers/auth.js';

// context
// import {useUsuario} from '../context/usuarioContext.js';

const LoginPage = () => {

    const [error, setError] = useState({});
    const [usuario] = useState(null);

    const useLogin = (data) => {
      
        login(data)
        .then( response => {
            if (response.status === 200) {
                addToken(response.data.access);
                window.location = '/create_test';
            }
        })
        .catch((error) => {
            console.log(error)
            let mensaje = {
                titulo : 'Ingreso Fallido',
                mensaje : 'Correo eletrónico o contraseña incorrecta',
                type : 'error',
                open : true
            }
            setError(mensaje);
        });
    
        return usuario;
    }
    
    return( 
        <div>
            <LoginForm 
                useLogin = {useLogin}
                error = {error}
                setError = {setError}
            />
        </div>
    )
}

export default LoginPage;
