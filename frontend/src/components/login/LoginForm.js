import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import './login.css'
import logo from '../../assets/gpp.png';

export default function LoginForm() {

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="container-login-signup-paper">
        <Avatar className="container-login-signup-avatar" src={logo}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresar
        </Typography>
        <form className="container-login-signup-form" noValidate>
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
    </Container>
  );
}
