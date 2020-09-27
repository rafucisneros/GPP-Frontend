import React, { useState, useEffect, useMemo } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import ListItemText from '@material-ui/core/ListItemText';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
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

  const [ areasAux, setAreasAux ] = useState([]);
  const [ subareasAux, setSubareasAux ] = useState({});
  const [ temasAux, setTemasAux ] = useState({});

  const [ seleccionado, setSeleccionado ] = useState(null)
  const [ elemento, setElemento ] = useState(null);
  const [ arraySubareas, setArraySubareas ] = useState([]);
  const [ areaSeleccionada, setAreaSeleccionadaAux ] = useState(null);
  const [ subareaSeleccionada, setSubareaSeleccionada ] = useState(null);
  const { 
    areas, 
    subareas, 
    temas,
    setAreas,
    setSubareas,
    setTemas,
    setAreaSeleccionada
  } = useCreateTestPage();
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
        let auxTopics = temasAux;
        let auxSubareas = subareasAux;
        let auxAreas = areasAux;
        if (seleccionado === 'tema'){
          if(auxTopics[data.subarea]) {
            if(!auxTopics[data.subarea].includes(data.topic)) auxTopics[data.subarea].push(data.topic);
          }
          if(auxSubareas[data.area]){
            if(!auxSubareas[data.area].includes(data.subarea)) auxSubareas[data.area].push(data.subarea);
          } 
          if(!auxAreas.includes(data.area)) auxAreas.push(data.area);
        } else if (seleccionado === 'subarea'){
          if(auxSubareas[data.area]) auxSubareas[data.area].push(data.subarea);
          if(!auxAreas.includes(data.area)) auxAreas.push(data.area);
          if(!auxTopics[data.subarea]) auxTopics[data.subarea] = [];
        } else {
          if(!auxAreas.includes(data.area)) auxAreas.push(data.area);
          if(!auxSubareas[data.area]) auxSubareas[data.area] = [];
        }
        console.log(auxTopics)
        console.log(auxSubareas)
        console.log(auxAreas)

        setAreasAux(auxAreas);
        setSubareasAux(auxSubareas);
        setTemasAux(auxTopics);

        setAreas(auxAreas);
        setSubareas(auxSubareas);
        setTemas(auxTopics);
        setAreaSeleccionada(null);

        updateArraySubareas(auxSubareas);
      }
    })
    handleCloseModal();
}
  useEffect(() => {
    if (areas) setAreasAux(areas);
  }, [areas])

  useEffect(() => {
    if (subareas){
      updateArraySubareas(subareas);
      setSubareasAux(subareas);
    } 
  }, [subareas])

  useEffect(() => {
    if (temas) setTemasAux(temas);
  }, [temas])

  const updateArraySubareas = (updateData) => {
    let keys = Object.keys(updateData)
    let data = [];
    keys.map( key => {
      updateData[`${key}`].forEach( sub => {
        data.push(sub);
      })
    })
    setArraySubareas(data);
  }

  useEffect(() => {
    if (subareaSeleccionada){
      let keys = Object.keys(subareasAux)
      console.log(keys, subareaSeleccionada)
      let select;
      keys.map( key => {
        if (subareasAux[`${key}`].includes(subareaSeleccionada)) select = key;
      })
      setAreaSeleccionadaAux(select);
    }
  }, [subareaSeleccionada])

  const handleCambiarSeleccionado = (e, flag) => {
    if (flag === 'select') setSeleccionado(e.target.value);
    else setElemento(e.target.value)
  };

  const handleChange = (e, flag) => {
    if (flag === 'area') setAreaSeleccionadaAux(e.target.value);
    else if (flag === 'subarea') setSubareaSeleccionada(e.target.value);
  }

  const handleCloseModal = () => {
    setSeleccionado(null);
    setElemento(null);
    setAreaSeleccionadaAux(null);
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl required variant="outlined" className={classes.formControl}>
                <InputLabel>Enfoque de las preguntas</InputLabel>
                <Select
                    label="Escoja un elemento de la lista"
                    value={seleccionado}
                    MenuProps={MenuProps}
                    style={{textAlignLast: 'center'}}
                    onChange={ (e) => handleCambiarSeleccionado(e, 'select')} 
                >
                {contenido.map(item => (
                    <MenuItem key={item.valor} value={item.valor} >
                        {item.label}
                    </MenuItem>
                ))}
                </Select>
              </FormControl>
            </Grid>
              { seleccionado &&
                <Grid item xs={12}>
                  <TextField
                    id="elemento"
                    margin="small"
                    label="Título"
                    variant="outlined"
                    fullWidth
                    value={elemento}
                    name="numero_preguntas"
                    autoFocus
                    style={{textAlignLast: 'center'}}
                    onChange={(e) => handleCambiarSeleccionado(e)} 
                  />
                </Grid>
              }
              { seleccionado === 'tema' &&
              <Grid item xs={12}>
                <FormControl required variant="outlined"  style={{width: '100%'}}>
                  <InputLabel>Subarea</InputLabel>
                  <Select
                    label="Subarea"
                    value={subareaSeleccionada}
                    onChange={(e) => handleChange(e, 'subarea')}
                    MenuProps={MenuProps}
                    style={{textAlignLast: 'center'}}
                    >
                    {arraySubareas.map(item => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            }
            { (seleccionado === 'tema' || seleccionado === 'subarea')  &&
              <Grid item xs={12}>
                <FormControl required variant="outlined" style={{width: '100%'}}>
                  <InputLabel>Área</InputLabel>
                  <Select
                    label="Área"
                    value={areaSeleccionada}
                    onChange={(e) => handleChange(e, 'area')}
                    disabled={ (seleccionado === 'tema' && subareaSeleccionada) || (seleccionado === 'subarea') ? false : true}
                    MenuProps={MenuProps}
                    style={{textAlignLast: 'center'}}
                    >
                    {areasAux.map(item => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  </FormControl>
              </Grid>
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={sendTopics} 
            color="primary" 
            disabled={
              ( seleccionado === 'tema' && areaSeleccionada && subareaSeleccionada && elemento ) ? 
                false :
                ( seleccionado === 'subarea' && areaSeleccionada && elemento ) ?
                  false :
                  ( seleccionado === 'area' && elemento ) ? 
                  false :
                  true
            }>
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
