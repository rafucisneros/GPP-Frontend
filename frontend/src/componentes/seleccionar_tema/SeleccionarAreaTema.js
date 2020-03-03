import React, { useState, Fragment, useEffect} from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';  
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

// componentes
import MultiSelect from './MultiSelect.js';

// contexts

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

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

const areas = [
  'Area 1',
  'Area 2'
];

const subareas = { 
  'Area 1' : 
    [
      'SubArea 1',
      'SubArea 2',
    ],
  'Area 2' : 
    [
      'SubArea 3',
      'SubArea 4',
    ],
  'Area 3' : 
    [
      'SubArea 5',
      'SubArea 6',

    ],
  'Area 4' : 
    [
      'SubArea 7',
      'SubArea 8',
    ],
}

const temas = { 
  'SubArea 1' : 
    [
      'Tema 1',
      'Tema 2',
    ],
  'SubArea 2' : 
    [
      'Tema 3',
      'Tema 4',
    ],
  'SubArea 3' : 
    [
      'Tema 5',
      'Tema 6',
    ],
  'SubArea 4' : 
    [
      'Tema 7',
      'Tema 8',
    ],
  'SubArea 5' : 
    [
      'Tema 9',
      'Tema 10',
    ],
  'SubArea 6' : 
    [
      'Tema 11',
      'Tema 12',
    ],
  'SubArea 7' : 
    [
      'Tema 13',
      'Tema 14',
    ],
  'SubArea 8' : 
    [
      'Tema 15',
      'Tema 16',
    ],
}

export default function SeleccionarAreaTema() {

    const classes = useStyles();

    const [listaSeleccionadoArea, setListaSeleccionadoaArea] = useState([]);  // Arreglo de areas seleccionadas
    const [listaSeleccionadoSubArea, setListaSeleccionadoSubArea] = useState([]);  // Arreglo de subareas seleccionadas
    const [listaSeleccionadoTema, setListaSeleccionadoTema] = useState([]);  // Arreglo de temas seleccionadas

    const [listaFiltradoArea, setListaFiltradoaArea] = useState(areas);  // Arreglo de areas filtradas a mostrar
    const [listaFiltradoSubArea, setListaFiltradoSubArea] = useState([]);  // Arreglo de subareas filtradas a mostrar
    const [listaFiltradoTema, setListaFiltradoTema] = useState([]);  // Arreglo de temas filtradas a mostrar

    const [permitirSubArea, setPermitirSubArea] = useState(false);
    const [permitirTarea, setPermitirTarea] = useState(false);

    const handleChange = (e, type) => {
      if (type === 'area'){
        setPermitirSubArea(true);
        setListaSeleccionadoaArea(e.target.value);
        
      } else if (type === 'subarea'){
        setPermitirTarea(true);
        setListaSeleccionadoSubArea(e.target.value);

      } else if (type === 'tema'){
        setListaSeleccionadoTema(e.target.value);
      }
      
    };

    useEffect(() => {
      let areasSeleccionadas = []; 
      listaSeleccionadoArea.forEach( area => {
        subareas[area].forEach(item => {
          areasSeleccionadas.push(item);
        })
      })
      
      setListaFiltradoSubArea(areasSeleccionadas);
    }, [listaSeleccionadoArea])
    
    useEffect(() => {
      let subAreasSeleccionadas = [];
      listaSeleccionadoSubArea.forEach( subarea => {
        temas[subarea].forEach(item => {
          subAreasSeleccionadas.push(item);
        })
      })

      setListaFiltradoTema(subAreasSeleccionadas);
    }, [listaSeleccionadoSubArea])

    useEffect(() => {
      if (listaSeleccionadoSubArea.length === 0){
        setListaSeleccionadoTema([]);
      }
      
    }, [listaSeleccionadoSubArea])
    
    useEffect(() => {
      if (listaSeleccionadoArea.length === 0){
        setListaSeleccionadoTema([]);
        setListaSeleccionadoSubArea([]);
      }
    }, [listaSeleccionadoArea])

    return (
      <Box style={{textAlign : 'center', width : '100%'}}>
        <Box style={{float : 'left'}}>
          <FormControl className={classes.formControl}>
              <InputLabel>Áreas</InputLabel>
              <Select
              // labelId="demo-mutiple-checkbox-label"
              // id="demo-mutiple-checkbox"
              multiple
              value={listaSeleccionadoArea}
              onChange={(e) => handleChange(e, 'area')}
              input={<Input />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
              >
              {listaFiltradoArea.map(item => (
                  <MenuItem key={item} value={item}>
                    <Checkbox checked={listaSeleccionadoArea.indexOf(item) > -1} color="primary"/>
                    <ListItemText primary={item} />
                  </MenuItem>
              ))}
              </Select>
          </FormControl>
        </Box>

        {
          permitirSubArea && listaFiltradoSubArea.length > 0 &&
          <Box style={{display: 'inline-block'}}>
            <FormControl className={classes.formControl}>
              <InputLabel>Sub Áreas</InputLabel>
              <Select
              multiple
              value={listaSeleccionadoSubArea}
              onChange={(e) => handleChange(e, 'subarea')}
              input={<Input />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
              >
              {listaFiltradoSubArea.map(item => (
                  <MenuItem key={item} value={item}>
                  <Checkbox checked={listaSeleccionadoSubArea.indexOf(item) > -1} color="primary"/>
                  <ListItemText primary={item} />
                  </MenuItem>
              ))}
              </Select>
            </FormControl>
          </Box>
        }

        {
          permitirTarea && listaFiltradoTema.length > 0 && listaFiltradoSubArea.length > 0 &&
          <Box style={{float : 'right'}}>
            <FormControl className={classes.formControl}>
              <InputLabel>Temas</InputLabel>
              <Select
              multiple
              value={listaSeleccionadoTema}
              onChange={(e) => handleChange(e, 'tema')}
              input={<Input />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
              >
              {listaFiltradoTema.map(item => (
                  <MenuItem key={item} value={item}>
                  <Checkbox checked={listaSeleccionadoTema.indexOf(item) > -1} color="primary"/>
                  <ListItemText primary={item} />
                  </MenuItem>
              ))}
              </Select>
            </FormControl>
          </Box>
        }
      </Box>
    )
}