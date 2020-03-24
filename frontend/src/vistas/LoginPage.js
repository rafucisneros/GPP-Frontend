import React, { useEffect, useState }  from 'react';
import LoginForm from '../componentes/login/LoginForm.js';
import { login } from '../servicios/servicioUsuario.js';
import { addToken } from '../helpers/auth.js';

// context
import {useUsuario} from '../context/usuarioContext.js';

const LoginPage = () => {

    const [error, setError] = useState(false);

    const useLogin = (data) => {

        const [usuario, setUsuario] = useUsuario(null);
      
        useEffect( () => {
            login(data)
            .then( response => {
                if (response.status === 200) {
                    console.log(response.data);
                    addToken(response.data.token);
                    delete response.data.token;
                    setUsuario(...response.data.token);
                    window.location = '/create_test';
                } else {
                    setError(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            });
        }, []);
    
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
