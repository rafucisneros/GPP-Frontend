import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import ListItemText from '@material-ui/core/ListItemText';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@material-ui/core';

// contexts
import { useCreateTestPage } from '../../context/createTestPageContext.js';

// servicios
import { postTopics } from '../../servicios/servicioGeneral.js';

// const styles = theme => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

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

  const [ seleccionado, setSeleccionado ] = useState(null)
  const [ elemento, setElemento ] = useState(null);
  const [ arraySubareas, setArraySubareas ] = useState([]);
  const [ areaSeleccionada, setAreaSeleccionada ] = useState(null);
  const [ subareaSeleccionada, setSubareaSeleccionada ] = useState(null);
  const { areas, subareas } = useCreateTestPage();
  const classes = useStyles();

  const sendTopics = () => {
    let data = {};
    if (seleccionado === 'tema'){
      data.area = areaSeleccionada;
      data.subarea = subareaSeleccionada;
      data.topic = elemento;
    } else if (seleccionado === 'subarea'){
      data.subarea = elemento;
      data.area = areaSeleccionada;
    } else data.area = elemento;
    postTopics(data)
    .then( res => {
      if (res) {
          console.log("Update Secciones");
      }
    })
    handleCloseModal();
}

  useEffect(() => {
    if (subareas){
      let keys = Object.keys(subareas)
      let data = [];
      keys.map( key => {
        subareas[`${key}`].forEach( sub => {
          data.push(sub);
        })
      })
      setArraySubareas(data);
    }
  }, [subareas])

  useEffect(() => {
    if (subareaSeleccionada){
      let keys = Object.keys(subareas)
      let select;
      keys.map( key => {
        if (subareas[`${key}`].includes(subareaSeleccionada)) select = key;
      })
      setAreaSeleccionada(select);
    }
  }, [subareaSeleccionada])

  const handleCambiarSeleccionado = (e, flag) => {
    if (flag === 'select') setSeleccionado(e.target.value);
    else setElemento(e.target.value)
  };

  const handleChange = (e, flag) => {
    if (flag === 'area') setAreaSeleccionada(e.target.value);
    else if (flag === 'subarea') setSubareaSeleccionada(e.target.value);
  }

  const handleCloseModal = () => {
    setSeleccionado(null);
    setElemento(null);
    setAreaSeleccionada(null);
    setSubareaSeleccionada(null);
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
            <Grid style={{ display: 'flex', width : '100%'}}>
              { seleccionado &&
                <Box style={{ display: 'grid', margin: '8px', width : '100%'}}>
                  <TextField
                    id="elemento"
                    // type="number"
                    label="Título"
                    placeholder="Título"
                    margin="normal"
                    required
                    autoFocus
                    fullWidth
                    name="elemento"
                    onChange={(e) => handleCambiarSeleccionado(e)} 
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: { 
                          max: 100, min: 0, step : 1, style: { textAlign: 'center' }
                    }}}
                  />
                </Box>
              }
              { seleccionado === 'tema' &&
              <Box style={{ display: 'grid', margin: '8px', marginBottom: '16px', width : '100%'}}>
                <FormControl required style={{textAlignLast: 'center'}} >
                  <InputLabel>Subarea</InputLabel>
                  <Select
                    label="Subarea"
                    value={subareaSeleccionada}
                    onChange={(e) => handleChange(e, 'subarea')}
                    MenuProps={MenuProps}
                    >
                    {arraySubareas.map(item => (
                      <MenuItem key={item} value={item}>
                          <ListItemText primary={item} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            }
            { (seleccionado === 'tema' || seleccionado === 'subarea')  &&
              <Box style={{ display: 'grid', margin: '8px', marginBottom: '16px', width : '100%'}}>
                <FormControl required style={{textAlignLast: 'center'}} >
                  <InputLabel>Área</InputLabel>
                  <Select
                    label="Área"
                    value={areaSeleccionada}
                    onChange={(e) => handleChange(e, 'area')}
                    disabled={seleccionado === 'tema' ? true : false}
                    MenuProps={MenuProps}
                    >
                    {areas.map(item => (
                      <MenuItem key={item} value={item}>
                          <ListItemText primary={item} />
                      </MenuItem>
                    ))}
                  </Select>
                  </FormControl>
              </Box>
            }
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={sendTopics} color="primary">
            Agregar
          </Button>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
