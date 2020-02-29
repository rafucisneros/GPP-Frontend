import React, { useState, Fragment } from 'react';

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

    const [ListaSeleccionadoArea, setListaSeleccionadoaArea] = useState([]);
    const [ListaSeleccionadoSubArea, setListaSeleccionadoSubArea] = useState([]);
    const [ListaSeleccionadoTema, setListaSeleccionadoTema] = useState([]);
    const [ListaFiltradoArea, setListFiltradoaArea] = useState(areas);
    const [ListaFiltradoSubArea, setListaFiltradoSubArea] = useState([]);
    const [ListaFiltradoTema, setListaFiltradoTema] = useState([]);
    const [permitirSubArea, setPermitirSubArea] = useState(false);
    const [permitirTarea, setPermitirTarea] = useState(false);

    const handleChange = (e, type) => {
      if (type === 'area'){

        setListaSeleccionadoaArea(e.target.value);
        setPermitirSubArea(true);

        let areasSeleccionadas = []; 
        ListaSeleccionadoArea.forEach( area => {
          subareas[area].forEach(item => {
            areasSeleccionadas.push(item);
          })
        })
        setListaFiltradoSubArea(areasSeleccionadas);
      } else if (type === 'subarea'){

        setListaSeleccionadoSubArea(e.target.value);
        setPermitirTarea(true);

        let subAreasSeleccionadas = [];
        ListaSeleccionadoSubArea.forEach( subarea => {
          temas[subarea].forEach(item => {
            subAreasSeleccionadas.push(item);
          })
        })
        setListaFiltradoTema(subAreasSeleccionadas);
      } else if (type === 'tema'){
        setListaSeleccionadoTema(e.target.value);
      }
      
    };

    return (
      <Box style={{textAlign : 'center', width : '100%'}}>
        <Box style={{float : 'left'}}>
          <FormControl className={classes.formControl}>
              <InputLabel>Áreas</InputLabel>
              <Select
              // labelId="demo-mutiple-checkbox-label"
              // id="demo-mutiple-checkbox"
              multiple
              value={ListaSeleccionadoArea}
              onChange={(e) => handleChange(e, 'area')}
              input={<Input />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
              >
              {ListaFiltradoArea.map(item => (
                  <MenuItem key={item} value={item}>
                    <Checkbox checked={ListaSeleccionadoArea.indexOf(item) > -1} color="primary"/>
                    <ListItemText primary={item} />
                  </MenuItem>
              ))}
              </Select>
          </FormControl>
        </Box>

        {
          permitirSubArea &&
          <Box style={{display: 'inline-block'}}>
            <FormControl className={classes.formControl}>
              <InputLabel>Sub Áreas</InputLabel>
              <Select
              // labelId="demo-mutiple-checkbox-label"
              // id="demo-mutiple-checkbox"
              multiple
              value={ListaSeleccionadoSubArea}
              onChange={(e) => handleChange(e, 'subarea')}
              input={<Input />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
              >
              {ListaFiltradoSubArea.map(item => (
                  <MenuItem key={item} value={item}>
                  <Checkbox checked={ListaSeleccionadoSubArea.indexOf(item) > -1} color="primary"/>
                  <ListItemText primary={item} />
                  </MenuItem>
              ))}
              </Select>
            </FormControl>
          </Box>
        }

        {
          permitirTarea &&
          <Box style={{float : 'right'}}>
            <FormControl className={classes.formControl}>
              <InputLabel>Temas</InputLabel>
              <Select
              // labelId="demo-mutiple-checkbox-label"
              // id="demo-mutiple-checkbox"
              multiple
              value={ListaSeleccionadoTema}
              onChange={(e) => handleChange(e, 'tema')}
              input={<Input />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
              >
              {ListaFiltradoTema.map(item => (
                  <MenuItem key={item} value={item}>
                  <Checkbox checked={ListaSeleccionadoTema.indexOf(item) > -1} color="primary"/>
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