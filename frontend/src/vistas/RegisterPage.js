import React, { useState } from 'react';
import RegisterForm from '../componentes/register/RegisterForm.js';
import { register } from '../servicios/servicioUsuario';

const RegisterPage = () => {

    const [alert, setAlert] = useState({});

    const useRegistro = (data) => {
        register(data)
        .then( response => {
            console.log(response)
            if (response.status === 201) {
                let data = response.data;
                let mensaje = {
                    titulo : 'Registro Exitoso',
                    mensaje : `Bienvenido ${data.first_name} ${data.last_name}. Por favor ir a la página de Ingreso para entrar en la aplicación`,
                    type : 'success',
                    open : true
                }
                setAlert(mensaje);
            }
        })
        .catch((error) => {
            console.log(error)
            let data = error.data;
            let msg = '';
            msg = data.email ? `Correo Electrónico: ${[...data.email]} ` : '';
            msg += data.password ? `Contraseña: ${[...data.password]} ` : '';
            if (msg && msg.length === 0) msg = 'Ups! Algo malo pasó';
            let mensaje = {
                titulo : 'Registro Fallido',
                mensaje : msg,
                type : 'error',
                open : true
            }
            setAlert(mensaje);
        });
    
        return alert;
    }

    return( 
        <div>
            <RegisterForm
                useRegistro = {useRegistro}
                alert = {alert}
                setAlert = {setAlert}
            />
        </div>
    )
}

export default RegisterPage;
