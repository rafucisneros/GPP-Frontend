import React, { useState, useEffect } from 'react';
import logo from '../../assets/gpp.png';
import {getMensajito} from '../../services/LoginServices';

const useLogin = () => {

  const [mensajito, setMensajito] = useState("Esperando mensaje...");

  useEffect( () => {
    getMensajito()
    .then( response => {
      if (response.status === 200) setMensajito(response.data.message);
    })
    .catch((error) => {
      console.log(error)
    });
  }, []);

  return mensajito;
}

export default function LoginForm () {
  const mensajito = useLogin();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br></br>
        <br></br>
        <p>
          {mensajito}
        </p>
      </header>
    </div>
  );
}
