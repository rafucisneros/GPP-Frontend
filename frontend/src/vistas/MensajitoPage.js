import React, { useState, useEffect } from 'react';
import logo from '../assets/imagenes/gpp.png';
import { getMensajito } from '../servicios/LoginServices';

const useMensajito = () => {

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

export default function MensajitoPage () {
  const mensajito = useMensajito();

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