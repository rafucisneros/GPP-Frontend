import React, { useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(2),
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

    const [areaSeleccionada, setAreaSeleccionada] = useState(null);  // Arreglo de areas seleccionadas
    const [subareaSeleccionada, setSubareaSeleccionada] = useState(null);  // Arreglo de subareas seleccionadas
    const [temaSeleccionado, setTemaSeleccionado] = useState(null);  // Arreglo de temas seleccionadas

    const [listaFiltradoArea, setListaFiltradoaArea] = useState(areas);  // Arreglo de areas filtradas a mostrar
    const [listaFiltradoSubArea, setListaFiltradoSubArea] = useState([]);  // Arreglo de subareas filtradas a mostrar
    const [listaFiltradoTema, setListaFiltradoTema] = useState([]);  // Arreglo de temas filtradas a mostrar

    const [permitirSubArea, setPermitirSubArea] = useState(false);
    const [permitirTarea, setPermitirTarea] = useState(false);

    const handleChange = (e, type) => {
      if (type === 'area'){
        setPermitirSubArea(true);
        setAreaSeleccionada(e.target.value);

        if (e.target.value !== areaSeleccionada) {
          setTemaSeleccionado(null);
          setSubareaSeleccionada(null);
        }
        
      } else if (type === 'subarea'){
        setPermitirTarea(true);
        setSubareaSeleccionada(e.target.value);

        if (e.target.value !== subareaSeleccionada) {
          setTemaSeleccionado(null);
        }

      } else if (type === 'tema'){
        setTemaSeleccionado(e.target.value);
      }
      
    };

    useEffect(() => {
      if (areaSeleccionada){
        let areasSeleccionadas = []; 
        subareas[areaSeleccionada].forEach(item => {
          areasSeleccionadas.push(item);
        })
        
        setListaFiltradoSubArea(areasSeleccionadas);
      }
    }, [areaSeleccionada])
    
    useEffect(() => {
      if (subareaSeleccionada){
        let subAreasSeleccionadas = [];
        temas[subareaSeleccionada].forEach(item => {
          subAreasSeleccionadas.push(item);
        })

        setListaFiltradoTema(subAreasSeleccionadas);
      }
    }, [subareaSeleccionada])

    useEffect(() => {
      if (!subareaSeleccionada){
        setTemaSeleccionado(null);
        setPermitirTarea(false);
      }
      
    }, [subareaSeleccionada])
    
    useEffect(() => {
      if (!areaSeleccionada){
        setTemaSeleccionado(null);
        setSubareaSeleccionada(null);
        setPermitirSubArea(false);
        setPermitirSubArea(false);
      }
    }, [areaSeleccionada])

    return (
      <Box style={{textAlign : 'center', width : '100%'}}>
        <Box style={{float : 'left'}}>
          <FormControl required className={classes.formControl}>
              <InputLabel>Áreas</InputLabel>
              <Select
              value={areaSeleccionada}
              onChange={(e) => handleChange(e, 'area')}
              >
              {listaFiltradoArea.map(item => (
                  <MenuItem key={item} value={item}>
                    <ListItemText primary={item} />
                  </MenuItem>
              ))}
              </Select>
          </FormControl>
        </Box>

        {
          permitirSubArea && listaFiltradoSubArea.length > 0 &&
          <Box style={{display: 'inline-block'}}>
            <FormControl required className={classes.formControl}>
              <InputLabel>Sub Áreas</InputLabel>
              <Select
              value={subareaSeleccionada}
              onChange={(e) => handleChange(e, 'subarea')}
              MenuProps={MenuProps}
              >
              {listaFiltradoSubArea.map(item => (
                  <MenuItem key={item} value={item}>
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
            <FormControl required className={classes.formControl}>
              <InputLabel>Temas</InputLabel>
              <Select
              value={temaSeleccionado}
              onChange={(e) => handleChange(e, 'tema')}
              >
              {listaFiltradoTema.map(item => (
                  <MenuItem key={item} value={item}>
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