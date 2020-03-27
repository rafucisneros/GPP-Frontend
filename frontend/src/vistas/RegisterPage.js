import React, { useEffect, useState } from 'react';
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
            let mensaje = {
                titulo : 'Registro Fallido',
                mensaje : data.password ? `${[...data.password]}` : 'Algo malo pasó',
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
