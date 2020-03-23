import React, { useState, Fragment } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import RadioGroup from '@material-ui/core/RadioGroup';

import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

// componentes
import TextArea from '../text_area/TextArea.js';

// contexts
import {useTipoPreguntaRespuesta} from '../../context/general_context'

export default function RespuestaSeleccion() {

    const [respuestas, setRespuestas] = useState([]);
    const {tituloRespuesta, tipoPregunta} = useTipoPreguntaRespuesta();

    const handleAgregarRespuesta = () => {
        let campo = [...respuestas];
        campo.push({
            respuesta : '',
            checked : false
        });
        if (respuestas.length === 0) {
            campo[0].checked = true;
        }
        setRespuestas(campo);
    }
  
    const handleEliminarRespuesta = (index) => {
        let campos = [...respuestas];
        campos.splice(index, 1);
        setRespuestas(campos);
    }
  
    const handleCambiarRespuesta = (e, index) => {
        let valores = [...respuestas];
        let name = e.target.name;
        let value = e.target.value;
        valores[index][name] = value;
        setRespuestas(valores);
    }

    const handleChangeCheckedSimple = (e, index) => {
        let checkeds = respuestas.map( item => {
            item.checked = false;
            item.respuestaVerdaderoFalso = 'verdadero';
            return item;
        })
        checkeds[index].checked = true;
        setRespuestas(checkeds);
    }

    const handleChangeCheckedMultiple = (e, index) => {
        let checkeds = [...respuestas];
        checkeds[index].checked = !checkeds[index].checked;
        setRespuestas(checkeds);
    }

    const handleAgregarRadio = () => {
      handleAgregarRespuesta();
    }

    const handleChangeRadio = (e, index) => {
        let checkeds = [...respuestas];
        let value = e.target.value;
        checkeds.respuestaVerdaderoFalso = value;
    }

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
    
      return result;
    };

    const onDragEnd = (result) => {
      if (!result.destination) {
        return;
      }
  
      const items = reorder(
        respuestas,
        result.source.index,
        result.destination.index
      );
  
      setRespuestas(items)
    }

    return (
        <Fragment>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className="paper-crear-test section-paper-crear-test">
                <TextField
                    id={`pregunta`}
                    margin="normal"
                    label="Pregunta"
                    variant="outlined"
                    fullWidth
                    name={`pregunta`}
                    placeholder="Introduzca su pregunta..."
                    multiline
                    rows={7}
                    rowsMax={7}
                    variant="outlined"
                />
              </Paper>
            </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className="paper-crear-test section-paper-crear-test ultima-seccion">
                <Box id="titulo-respuesta" className="flex-box-titulo">
                    <Box >
                        <span className = "respuestas-subtitulo">
                            Respuestas
                        </span>
                    </Box>
                    { (tipoPregunta !== 'verdadero_falso') &&
                      <Box >
                        <Tooltip title="Agregar respuesta" aria-label="add">
                          <Fab color="primary" size="small" onClick={handleAgregarRespuesta}>
                              <AddIcon/>
                          </Fab>
                        </Tooltip>
                      </Box>
                    }
                </Box>
                { (tipoPregunta === 'verdadero_falso') &&
                  <RadioGroup name="vdd_fals" defaultValue="verdadero" onChange={(e) => handleChangeRadio(e)} style={{display : 'block', textAlignLast: 'center'}}>
                        Verdadero 
                        <Radio value="verdadero" color="primary" style={{marginLeft : '10px'}} label="Verdadero"/>
                        <Radio value="falso" style={{marginRight : '10px'}} label="Falso"/>
                        Falso
                  </RadioGroup>
                }
                {tipoPregunta !== 'ordenamiento' && tipoPregunta !== 'verdadero_falso' && respuestas.map( (respuesta, index) => {
                  return (
                        <Box key={`${respuesta}-${index}`} className="flex-box-respuestas">
                          <Box >
                            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={respuesta.respuesta}
                            id={`respuesta${index}`}
                            label="Escribe una respuesta"
                            name={`respuesta`}
                            autoFocus
                            onChange={(e) => handleCambiarRespuesta(e, index)}
                            />
                          </Box>
                          <Box >
                              <Switch checked={respuesta.checked} onChange={tipoPregunta === 'seleccion_simple' ? (e) => handleChangeCheckedSimple(e, index) : (e) => handleChangeCheckedMultiple(e, index)} color="primary"/>
                          </Box>
                          <Box >
                            <Tooltip title="Eliminar respuesta" aria-label="delete">
                              <Fab color="secondary" size="small" onClick={ () => handleEliminarRespuesta(index)}>
                                <CloseIcon/>
                              </Fab>
                            </Tooltip>
                          </Box>
                        </Box>
                    )
                  })
                }
                {tipoPregunta === 'ordenamiento' &&
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {respuestas.map((respuesta, index) => (
                            <Draggable key={`respuesta-${index}`} draggableId={`respuesta-${index}`} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  key={`${respuesta}-${index}`}
                                  className="flex-box-respuestas"
                                >
                                    <Box >
                                      <TextField
                                      variant="outlined"
                                      margin="normal"
                                      required
                                      fullWidth
                                      value={respuesta.respuesta}
                                      id={`respuesta${index}`}
                                      label="Escribe una respuesta"
                                      name={`respuesta`}
                                      autoFocus
                                      onChange={(e) => handleCambiarRespuesta(e, index)}
                                      />
                                    </Box>
                                    <Box >
                                      <Tooltip title="Eliminar respuesta" aria-label="delete">
                                        <Fab color="secondary" size="small" onClick={ () => handleEliminarRespuesta(index)}>
                                          <CloseIcon/>
                                        </Fab>
                                      </Tooltip>
                                    </Box>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                }
            </Paper>
          </Grid>
        </Fragment> 
    )
}