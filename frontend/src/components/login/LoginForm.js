import React, { Component } from 'react';
import logo from '../../assets/gpp.png';
import {getMensajito} from '../../services/LoginServices';

class LoginForm extends Component { 
    constructor(props) {
        super(props);
        this.state = {
          mensajito : "Esperando mensaje..."
        };
    }

    componentDidMount = () => {
      getMensajito()
      .then( response => {
        if (response.status === 200) this.setState({mensajito: response.data.message})
      })
      .catch((error) => {
        console.log(error)
      });
    }
    
    render = () => {
        return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <br></br>
                <br></br>
                <p>
                  {this.state.mensajito}
                </p>
              </header>
            </div>
          );
    }
}

export default LoginForm;