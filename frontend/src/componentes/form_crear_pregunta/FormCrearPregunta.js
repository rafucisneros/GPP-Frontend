import React, { useState, useEffect, Fragment } from 'react';
import validator from 'validator';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// componentes
import ToggleButton from './ToggleButtonTool.js'

// materiales
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import RadioGroup from '@material-ui/core/RadioGroup';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

// contexts
import { useTipoPreguntaRespuesta } from '../../context/createTestContext';
import { useCreateTestPage } from '../../context/createTestPageContext';

const Latex = require('react-latex');

export default function FormCrearPregunta(props) {
    const { tipoPregunta } = useTipoPreguntaRespuesta();
    const {  
        handleChangeInput,
        pregunta,
        respuestas,
        setRespuestas,
        selectedRespuesta,
        setSelectedRespuesta,
        flagEditarPregunta
    } = useCreateTestPage();

    useEffect(() => {
        if(!flagEditarPregunta){
            setRespuestas([]);
            setSelectedRespuesta('verdadero');
        }
    }, [tipoPregunta])

    const handleCheckedRespuesta = () => {
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

    const handleChangeRadio = (e) => setSelectedRespuesta(e.target.value);

    const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = reorder(
            respuestas,
            result.source.index,
            result.destination.index
        );

        setRespuestas(items);
    }

    return (
        <Fragment>
            <Grid item xs={12} md={12} lg={12}>
                <Paper className="paper-crear-test section-paper-crear-test">
                    <ToggleButton 
                        handleFormat = {props.handleFormat}
                        formats = {props.formats}
                    />
                    <TextField
                        error={props.errores && props.errores.preguntaError}
                        id="pregunta"
                        margin="normal"
                        label="Pregunta"
                        variant="outlined"
                        fullWidth
                        name="pregunta"
                        value={pregunta ? pregunta : ''}
                        placeholder="Introduzca su pregunta..."
                        onChange={(e) => handleChangeInput(e)}
                        multiline
                        rows={3}
                        rowsMax={5}
                        helperText={props.errores && props.errores.preguntaError ? "El campo es requerido" : ""}
                    />
                    { props.formats === 'latex' &&
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={12} style={{textAlign: 'center'}}>
                                <Typography variant="subtitle2" style={{fontWeight : 600, paddingBottom: '8px'}}> Visualización del texto en Latex: </Typography>
                                <Typography variant="h6" >
                                    {/* <Latex displayMode={true}>{pregunta}</Latex> */}
                                    <Latex>{pregunta ? pregunta : ''}</Latex>
                                </Typography>
                            </Grid>
                        </Grid>
                    }
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
                                    <Fab color="primary" size="small" onClick={handleCheckedRespuesta}>
                                        <AddIcon/>
                                    </Fab>
                                </Tooltip>
                            </Box>
                        }
                    </Box>
                    { (tipoPregunta === 'verdadero_falso') &&
                        <RadioGroup name="vdd_fals" defaultValue="verdadero" style={{display : 'block', textAlignLast: 'center'}}>
                            Verdadero 
                            <Radio value="verdadero" checked={ selectedRespuesta === "verdadero" } onChange={handleChangeRadio} color="primary" style={{marginLeft : '10px'}} label="Verdadero"/>
                            <Radio value="falso" checked={ selectedRespuesta === "falso" } onChange={handleChangeRadio} style={{marginRight : '10px'}} label="Falso"/>
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
                                                        <Box style={{display: 'flex'}}>
                                                            <Box style={{display : 'flex', paddingRight : '5px', alignSelf: 'center'}}>
                                                                <DragIndicatorIcon/>
                                                            </Box>
                                                            <Box style={{display: 'flex', width: '100%', paddingRight : '8px'}}>
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