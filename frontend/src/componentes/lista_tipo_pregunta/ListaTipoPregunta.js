import React from 'react';
import { Link } from 'react-router-dom';

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
import Typography from '@material-ui/core/Typography';
import PostAddIcon from '@material-ui/icons/PostAdd';
import MenuBookIcon from '@material-ui/icons/MenuBook';

// contexts
import {useTipoPreguntaRespuesta} from '../../context/createTestContext'

export default function ListaTipoPregunta() {

  const {handleOpcionExamen, itemSeleccionado, subMenuTipoPregunta, setSubMenuTipoPregunta, setItemSeleccionado} = useTipoPreguntaRespuesta();

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

  const handleSeleccionarConfiguraciones = () => {
    handleCloseSubMenuTipoPregunta('2');
    handleOpcionExamen("configuracion", '2');
  }
  
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
            primary={<Typography type="body2" style={{ fontSize: 'inherit' }}>Añadir Pregunta</Typography>}
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
              <ListItemText primary={<Typography type="body2" style={{ fontSize: 'inherit' }}>Selección Simple</Typography>} />
            </ListItem>
            <ListItem button style={{paddingLeft : '38px'}} onClick={() => handleOpcionExamen("seleccion_multiple", '1.2')} selected={itemSeleccionado === '1.2'}>
              <ListItemIcon>
                <DoneAllIcon />
              </ListItemIcon>
              <ListItemText primary={<Typography type="body2" style={{ fontSize: 'inherit' }}>Selección Múltiple</Typography>} />
            </ListItem>
            <ListItem button style={{paddingLeft : '38px'}} onClick={() => handleOpcionExamen("verdadero_falso", '1.3')} selected={itemSeleccionado === '1.3'}>
              <ListItemIcon>
                <ThumbsUpDownIcon />
              </ListItemIcon>
              <ListItemText primary={<Typography type="body2" style={{ fontSize: 'inherit' }}>Verdadero / Falso</Typography>} />
            </ListItem>
            <ListItem button style={{paddingLeft : '38px'}} onClick={() => handleOpcionExamen("ordenamiento", '1.4')} selected={itemSeleccionado === '1.4'}>
              <ListItemIcon>
                <FormatListNumberedIcon />
              </ListItemIcon>
              <ListItemText primary={<Typography type="body2" style={{ fontSize: 'inherit' }}>Ordenamiento</Typography>} />
            </ListItem>
          </List>
        </Collapse>
        <ListItem
          button
          onClick={ () => handleSeleccionarConfiguraciones()}
          selected={itemSeleccionado === '2'}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary={<Typography type="body2" style={{ fontSize: 'inherit' }}>Configuraciones</Typography>}
          />
        </ListItem>
        <Link to="home" className="link">
          <ListItem
            button
            selected={itemSeleccionado === '3'}
          >
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography type="body2" style={{ fontSize: 'inherit' }}>Menú Principal</Typography>}
            />
          </ListItem>
        </Link>
        <ListItem
          button
          onClick={ () => handleCloseSubMenuTipoPregunta('4')}
          selected={itemSeleccionado === '4'}
        >
          <ListItemIcon>
            <ForwardIcon />
          </ListItemIcon>
          <ListItemText
            primary={<Typography type="body2" style={{ fontSize: 'inherit' }}>Muy pronto...</Typography>}
          />
        </ListItem>
      </List>
    </div>
  )
}