import React from 'react';
import nonMobile from '../assets/imagenes/non-moviles.png';

// helpers
import { logout } from '../helpers/auth.js'

// material
import {
    Button,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={logout}
                endIcon={<ExitToAppIcon/>}
            >
                Salir
            </Button>
            </header>
        </div>
    )
}