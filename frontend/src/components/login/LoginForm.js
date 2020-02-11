import React, {useState} from 'react';
import { Redirect } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import './login.css';
import logo from '../../assets/gpi.jpg';

export default function LoginForm() {

  const [permitirAuth, setPermitirAuth] = useState(false);

  const onSubmit = () => {
    setPermitirAuth(true);
  }

  return (
    <div>
      { permitirAuth && <Redirect to="/mensajito"/>}
      <Grid container component="main" className="container-login-signup">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="container-image-login" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className="container-grid-form">
          <div className="container-login-signup-paper">
            <Avatar className="container-login-signup-avatar" src={logo}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingresar
            </Typography>
            <form className="container-login-signup-form" onSubmit={onSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Ingresar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    ¿Olvidó su Contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"¿No posee una cuenta? Regístrese"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
