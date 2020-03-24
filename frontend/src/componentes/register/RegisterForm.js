import React, {useState} from 'react';
import { Redirect } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

// import '../login/login.css';
import logo from '../../assets/imagenes/gpi.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
  
export default function RegisterForm(props) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('First Name:', firstName, 'Last Name:', lastName, 'Email:', email, 'Password:', password);
    console.log({email : email, password : password, first_name : firstName, last_name : lastName})
    // this.props.useRegistro({email : email, password : password, first_name : firstName, last_name : lastName});
    props.setExito(true)
  }

  const classes = useStyles();
  
  return (
    <Grid container component="main" className="container-login-signup">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className="container-image-signup" />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className="container-grid-form">
        <div className="container-login-signup-paper">
          <Avatar className="container-login-signup-avatar" src={logo}>
          </Avatar>
          <Typography component="h1" variant="h5" style={{marginBottom: '16px'}}>
            Registro
          </Typography>
          <div className={classes.root}>
          <Collapse in={props.exito}>
            <Alert 
              severity="success"
              action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  props.setExito(false);
                }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              >
            <AlertTitle>Registro Exitoso</AlertTitle>
              {`Bienvenido ${firstName} ${lastName}`}
            </Alert>
          </Collapse>
        </div>
          <form className="container-login-signup-form" onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  onInput={ (e) => setFirstName(e.target.value)}
                  id="firstName"
                  label="Nombres"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  onInput={ (e) => setLastName(e.target.value)}
                  label="Apellidos"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid> 
            </Grid>
            <TextField
              variant="outlined"
              required
              fullWidth
              margin="normal"
              id="email"
              onInput={ (e) => setEmail(e.target.value)}
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Contraseña"
              margin="normal"
              onInput={ (e) => setPassword(e.target.value)}
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
              Registrarse
            </Button> 
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  ¿Ya posee una cuenta? Ingresar.
                </Link>
              </Grid>
            </Grid>        
          </form>
          </div>
      </Grid>
    </Grid>
  );
}

{/* Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="container-login-signup-paper">
            <Avatar className="container-login-signup-avatar" src={logo}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Registro
            </Typography>
            <form className="container-login-signup-form" onSubmit={onSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item >
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="Nombres"
                    autoFocus
                  />
                </Grid>
                <Grid item >
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Apellidos"
                    name="lastName"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item >
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Correo Electrónico"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item >
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Registrarse
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    ¿Ya posee una cuenta? Ingresar.
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div> */}