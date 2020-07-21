import React, {useState} from 'react';

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
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';

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
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('First Name:', firstName, 'Last Name:', lastName, 'Email:', email, 'Password:', password);
    props.useRegistro({email : email, password : password, first_name : firstName, last_name : lastName});
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          <Collapse in={props.alert.open}>
            <Alert 
              severity={props.alert.type}
              action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  props.setAlert({...props.alert, open : false});
                }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              >
            <AlertTitle>{props.alert.titulo}</AlertTitle>
              {props.alert.mensaje}
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
              type={showPassword ? 'text' : 'password'}
              id="password"
              InputProps={{
                endAdornment: 
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>,
              }}
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