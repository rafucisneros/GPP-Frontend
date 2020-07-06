import React from 'react';
import nonMobile from '../assets/imagenes/non-moviles.png';

export default function NonResponsivePage(){

    return(
        <div className="App">
            <header className="App-header">
                <img src={nonMobile} className="App-logo" alt="logo" />
                <br></br>
                <br></br>
            <p>
                {'Esta aplicación no está disponible en dispostivos móviles.'}
            </p>
            <p>
                {'Disculpe las molestias ofrecidas.'}
            </p>
            </header>
        </div>
    )
}