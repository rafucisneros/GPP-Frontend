import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
      style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
      },
  },
};

const useStyles = makeStyles(theme => ({
  formControl: {
      marginTop: theme.spacing(2),
      minWidth: 200,
      width : '100%'
  }
}));

const contenido = [
  {
    valor : 'area',
    label : 'Área'
  },{
    valor : 'subarea',
    label : 'Subárea'
  },{
    valor : 'tema',
    label : 'Tema'
  }
]

// const DialogTitle = withStyles(styles)(props => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root} {...other}>
//       <Typography variant="h2">{children}</Typography>
//       {onClose ? (
//         <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ModalAddAreaSubAreaTema(props) {
  const classes = useStyles();
  const [seleccionado, setSeleccionado] = useState(null)
  const [elemento, setElemento] = useState(null);

  const handleCambiarSeleccionado = (e, flag) => {
    if (flag === 'select') setSeleccionado(e.target.value);
    else setElemento(e.target.value)
  };

  const handleCloseModal = () => {
    setSeleccionado(null);
    setElemento(null);
    props.handleModal();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
        <DialogTitle style={{alignSelf : 'center', marginTop: '16px'}}> Añadir área, subárea o tema </DialogTitle>
        <DialogContent style={{padding: '16px 24px', overflowY : 'initial'}} divider>
          <DialogContentText>
            Seleccionar un elemento de la lista y luego escribir el título del tipo de contenido seleccionado
          </DialogContentText>
          <Grid item xs={12} style={{margin :'0px 5vw 0px 5vw'}}>
            <FormControl required style={{textAlignLast: 'center'}} className={classes.formControl}>
              <InputLabel>Tipo de contenido</InputLabel>
              <Select
                  label="Escoja un elemento de la lista"
                  value={seleccionado}
                  MenuProps={MenuProps}
                  onChange={ (e) => handleCambiarSeleccionado(e, 'select')} 
              >
              {contenido.map(item => (
                  <MenuItem key={item.valor} value={item.valor} >
                      {item.label}
                  </MenuItem>
              ))}
              </Select>
            </FormControl>
            { seleccionado &&
              <TextField
                id={`elemento`}
                // type="number"
                margin="normal"
                label="Título"
                required
                autoFocus
                fullWidth
                name={`elemento`}
                autoFocus
                onChange={(e) => handleCambiarSeleccionado(e)} 
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { 
                      max: 100, min: 0, step : 1, style: { textAlign: 'center' }
                  }}}
              />
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

{/* <FormControl required variant="outlined" style={{textAlignLast: 'center'}} className={classes.formControl}>
<InputLabel>Tipo de contenido</InputLabel>
<Select
    label="Escoja un elemento de la lista"
    value={seleccionado}
    MenuProps={MenuProps}
    onChange={handleCambiarSeleccionado} 
>
{contenido.map(item => (
    <MenuItem key={item.valor} value={item.valor} >
        {item.label}
    </MenuItem>
))}
</Select>
{ seleccionado &&
  <TextField
    id={`elemento`}
    // type="number"
    margin="normal"
    label="Título"
    required
    variant="outlined"
    autoFocus
    fullWidth
    name={`elemento`}
    autoFocus
    InputLabelProps={{
      shrink: true,
    }}
    InputProps={{
    inputProps: { 
        max: 100, min: 0, step : 1
    }}}
  />
}
</FormControl> */}