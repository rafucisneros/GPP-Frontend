import React, { useState } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from "@material-ui/core/Collapse";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import CheckIcon from '@material-ui/icons/Check';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SettingsIcon from '@material-ui/icons/Settings';
import ForwardIcon from '@material-ui/icons/Forward';
import PostAddIcon from '@material-ui/icons/PostAdd';

// contexts
import {useTipoPreguntaRespuesta} from '../../context/general_context'

export default function ListaTipoPregunta() {

  const {tituloRespuesta, tipoPregunta, handleOpcionExamen, itemSeleccionado, subMenuTipoPregunta, setSubMenuTipoPregunta, setItemSeleccionado} = useTipoPreguntaRespuesta();

  const handleSubMenuTipoPregunta = (key) => {
    setSubMenuTipoPregunta(!subMenuTipoPregunta);
    handleSeleccionarItem(key);
  };

  const handleSeleccionarItem = (key) => {
    setItemSeleccionado(key)
  }

  const handleCloseSubMenuTipoPregunta = (key) => {
    setSubMenuTipoPregunta(false);
    handleSeleccionarItem(key);
  };
  
  return(
    <div>
      <List>
        <ListItem
          button
          onClick={ () => handleSubMenuTipoPregunta('1')}
          selected={itemSeleccionado === '1'}
        >
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText
            primary={'Añadir Pregunta'}
          />
          {subMenuTipoPregunta ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
            in={subMenuTipoPregunta}
            timeout="auto"
            unmountOnExit
        >
          <List component="div" disablePadding>
            <ListItem button style={{paddingLeft : '38px'}} onClick={() => handleOpcionExamen("seleccion_simple", '1.1')} selected={itemSeleccionado === '1.1'}>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="Selección Simple" />
            </ListItem>
            <ListItem button style={{paddingLeft : '38px'}} onClick={() => handleOpcionExamen("seleccion_multiple", '1.2')} selected={itemSeleccionado === '1.2'}>
              <ListItemIcon>
                <DoneAllIcon />
              </ListItemIcon>
              <ListItemText primary="Selección Múltiple" />
            </ListItem>
            <ListItem button style={{paddingLeft : '38px'}} onClick={() => handleOpcionExamen("verdadero_falso", '1.3')} selected={itemSeleccionado === '1.3'}>
              <ListItemIcon>
                <ThumbsUpDownIcon />
              </ListItemIcon>
              <ListItemText primary="Verdadero / Falso" />
            </ListItem>
            <ListItem button style={{paddingLeft : '38px'}} onClick={() => handleOpcionExamen("ordenamiento", '1.4')} selected={itemSeleccionado === '1.4'}>
              <ListItemIcon>
                <FormatListNumberedIcon />
              </ListItemIcon>
              <ListItemText primary="Ordenamiento" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem
          button
          onClick={ () => handleCloseSubMenuTipoPregunta('2')}
          selected={itemSeleccionado === '2'}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary={'Configuraciones'}
          />
        </ListItem>
        <ListItem
          button
          onClick={ () => handleCloseSubMenuTipoPregunta('3')}
          selected={itemSeleccionado === '3'}
        >
          <ListItemIcon>
            <ForwardIcon />
          </ListItemIcon>
          <ListItemText
            primary={'Muy Pronto...'}
          />
        </ListItem>
      </List>
    </div>
  )
}