import React, {useState} from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';

import './login.css';
import logo from '../../assets/imagenes/gpi.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function LoginForm(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log( 'EMAIL:', username, 'Password:', password);
    props.useLogin({email : username, password : password}, props.setError);
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
        <Grid item xs={false} sm={4} md={7} className="container-image-login" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className="container-grid-form">
          <div className="container-login-signup-paper">
            <Avatar className="container-login-signup-avatar" src={logo}>
            </Avatar>
            <Typography component="h1" variant="h5" style={{marginBottom: '16px'}}>
              Ingresar
            </Typography>
            <div className={classes.root}>
              <Collapse in={props.error.open}>
                <Alert 
                  severity={props.error.type}
                  action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      props.setError({...props.error, open : false});
                    }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  >
                <AlertTitle>{props.error.titulo}</AlertTitle>
                  {`Correo eletr??nico o contrase??a incorrecta`}
                </Alert>
              </Collapse>
            </div>
            <form className="container-login-signup-form" onSubmit={onSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Correo Electr??nico"
                name="username"
                autoComplete="email"
                onInput={ (e) => setUsername(e.target.value)}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contrase??a"
                type={showPassword ? 'text' : 'password'}
                id="password"
                onInput={ (e) => setPassword(e.target.value)}
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
                Ingresar
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    ??Olvid?? su Contrase??a?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/registro" variant="body2">
                    {"??No posee una cuenta? Reg??strese"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
  );
}
