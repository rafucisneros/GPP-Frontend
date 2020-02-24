import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import CheckIcon from '@material-ui/icons/Check';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import DoneAllIcon from '@material-ui/icons/DoneAll';

// contexts
import {useTipoPreguntaRespuesta} from '../../context/general_context'

export default function ListaTipoPregunta() {

  const {tituloRespuesta, tipoPregunta, handleCambiarTipoPregunta} = useTipoPreguntaRespuesta();

  return(
    <div>
      <ListItem button onClick={() => handleCambiarTipoPregunta("seleccion_simple")}>
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>
        <ListItemText primary="Selección Simple" />
      </ListItem>
      <ListItem button onClick={() => handleCambiarTipoPregunta("seleccion_multiple")}>
        <ListItemIcon>
          <DoneAllIcon />
        </ListItemIcon>
        <ListItemText primary="Selección Múltiple" />
      </ListItem>
      <ListItem button onClick={() => handleCambiarTipoPregunta("verdadero_falso")}>
        <ListItemIcon>
          <ThumbsUpDownIcon />
        </ListItemIcon>
        <ListItemText primary="Verdadero / Falso" />
      </ListItem>
      <ListItem button onClick={() => handleCambiarTipoPregunta("ordenamiento")}>
        <ListItemIcon>
          <FormatListNumberedIcon />
        </ListItemIcon>
        <ListItemText primary="Ordenamiento" />
      </ListItem>
      <ListItem button>
      </ListItem>
    </div>
  )
}