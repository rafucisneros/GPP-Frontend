import React, { useState } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import CheckIcon from '@material-ui/icons/Check';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import Collapse from "@material-ui/core/Collapse";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SettingsIcon from '@material-ui/icons/Settings';
import PostAddIcon from '@material-ui/icons/PostAdd';

// contexts
import {useTipoPreguntaRespuesta} from '../../context/general_context'

export default function ListaTipoPregunta() {

  const {tituloRespuesta, tipoPregunta, handleCambiarTipoPregunta} = useTipoPreguntaRespuesta();
  const [subMenuTipoPregunta, setSubMenuTipoPregunta] = useState(false);

  const handleSubMenuTipoPregunta = () => {
    setSubMenuTipoPregunta(!subMenuTipoPregunta);
  };

  return(
    <div>
      <List>
        <ListItem
          button
          onClick={ () => handleSubMenuTipoPregunta()}
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
            <ListItem button style={{paddingLeft : '32px'}} onClick={() => handleCambiarTipoPregunta("seleccion_simple")}>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="Selección Simple" />
            </ListItem>
            <ListItem button style={{paddingLeft : '32px'}} onClick={() => handleCambiarTipoPregunta("seleccion_multiple")}>
              <ListItemIcon>
                <DoneAllIcon />
              </ListItemIcon>
              <ListItemText primary="Selección Múltiple" />
            </ListItem>
            <ListItem button style={{paddingLeft : '32px'}} onClick={() => handleCambiarTipoPregunta("verdadero_falso")}>
              <ListItemIcon>
                <ThumbsUpDownIcon />
              </ListItemIcon>
              <ListItemText primary="Verdadero / Falso" />
            </ListItem>
            <ListItem button style={{paddingLeft : '32px'}} onClick={() => handleCambiarTipoPregunta("ordenamiento")}>
              <ListItemIcon>
                <FormatListNumberedIcon />
              </ListItemIcon>
              <ListItemText primary="Ordenamiento" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem
          button
          onClick={ () => handleSubMenuTipoPregunta()}
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
          onClick={ () => handleSubMenuTipoPregunta()}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary={'Muy Pronto...'}
          />
        </ListItem>
      </List>
    </div>
  )
}