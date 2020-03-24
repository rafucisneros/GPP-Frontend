import React, { useEffect, useState } from 'react';
import RegisterForm from '../componentes/register/RegisterForm.js';
import { register } from '../servicios/servicioUsuario';

const RegisterPage = () => {

    const [exito, setExito] = useState(false);

    const useRegistro = (data) => {
      
        useEffect( () => {
            register(data)
            .then( response => {
                if (response.status === 200) {
                    setExito(true);
                }
            })
            .catch((error) => {
                console.log(error)
            });
        }, []);
    
        return exito;
    }

    return( 
        <div>
            <RegisterForm
                useRegistro = {useRegistro}
                exito = {exito}
                setExito = {setExito}
            />
        </div>
    )
}

export default RegisterPage;
