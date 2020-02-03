import React, { Component } from 'react';

import LoginForm from '../components/login/LoginForm.js';

class LoginPage extends Component {

    constructor(props) {
      super(props); 
      this.state = {
      };
    }

    render = () => {
        return( 
            <div>
                <LoginForm {...this}
                />
            </div>
        )
    }
}

export default LoginPage;
