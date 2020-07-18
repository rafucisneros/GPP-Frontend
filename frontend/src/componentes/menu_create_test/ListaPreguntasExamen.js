import React, { useState, useEffect, Fragment, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components'

// material
import Typography from '@material-ui/core/Typography';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

// contexts
import { useCreateTestPage } from '../../context/createTestPageContext.js';
import { useTipoPreguntaRespuesta } from '../../context/createTestContext';

// assets
import './ListaPreguntasExamen.css';

const estilosDropDragging = (style, snapshot) => {
    if (!snapshot.isDropAnimating) {
        return style;
    }
    const { curve, duration } = snapshot.dropAnimation;
    // const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
    // const rotate = 'rotate(1turn)';

    return {
        ...style,
    //   transform: 'rotate(10deg)',
        transition: `all ${curve} ${duration}s`,
    };
}

const EstilosStartDragging = styled.div`
    opacity : ${props => props.isDragging ? 0.4 : 1};
`

export default () => <ListaPreguntasExamen></ListaPreguntasExamen>

const ListaPreguntasExamen = () => {

    const { 
        listaPreguntasExamen,
        indexItemPregunta,
        setIndexItemPregunta,
        flagEditarPregunta,
        setFlagEditarPregunta,
        handleChangeAreaSubAreaTema,
        handleChangeInput,
        setSelectedRespuesta,
        setRespuestas,
        setFormats,
        setListaPreguntasExamen
    } = useCreateTestPage();
    const { tituloRespuesta, tipoPregunta, handleOpcionExamen } = useTipoPreguntaRespuesta();
    const [ lista, setLista ] = useState([]);

    useMemo(() => {
        if (listaPreguntasExamen){
            let aux = listaPreguntasExamen.map( (pregunta, index)  => {
                return {color : indexItemPregunta === index ? 'rgba(99, 196, 197, 0.4)' : 'rgba(63, 81, 181, 0.4)', texto : `${pregunta.content}`, posicion : index}
            })
            setLista(aux);
        }
    }, [listaPreguntasExamen, indexItemPregunta])

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        let aux = [...listaPreguntasExamen];
        const [removedAux] = aux.splice(startIndex, 1);
        aux.splice(endIndex, 0, removedAux);
        setListaPreguntasExamen(aux);

        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = reorder(
            lista,
            result.source.index,
            result.destination.index
        );

        setLista(items);
    }

    const handleClickItem = (index) => {
        let pregunta = listaPreguntasExamen[index];
        setearDataItemSeleccionado(pregunta);
        setIndexItemPregunta(index);
    }

    const setearDataItemSeleccionado = (pregunta) => {
        let event_pond = { target : { name : 'ponderacion', value : pregunta.value }};
        let event_diff = { target : { name : 'dificultad', value : pregunta.difficulty }};
        let event_preg = { target : { name : 'pregunta', value : pregunta.content }};
        let latex = pregunta.latex ? 'latex' : 'text';

        let menu = {};
        if (pregunta.q_type_id === "Selección Simple"){
            menu.value = "seleccion_simple";
            menu.key = '1.1';
        } 
        else if (pregunta.q_type_id === "Selección Múltiple"){
            menu.value = "seleccion_multiple";
            menu.key = '1.2';
        }
        else if (pregunta.q_type_id === "Verdadero o Falso"){
            menu.value = "verdadero_falso";
            menu.key = '1.3';
        }
        else if (pregunta.q_type_id === "Ordenamiento"){
            menu.value = "ordenamiento";
            menu.key = '1.4';
        }

        if (menu.value === 'verdadero_falso'){
            let valor = pregunta.answers[0].correct === 1 ? 'verdadero' : 'falso';
            setSelectedRespuesta(valor);
        } else {
            let respuestas = pregunta.answers.map( (respuesta, index) => {
                return { respuesta : respuesta.content, checked: respuesta.correct, id : respuesta.id }
            })
            setRespuestas(respuestas);
        }
        
        handleOpcionExamen(menu.value, menu.key);
        setFlagEditarPregunta(true);
        handleChangeInput(event_pond);
        handleChangeInput(event_diff);
        handleChangeInput(event_preg);
        handleChangeAreaSubAreaTema(pregunta.approach.area, 'area_seleccionada');
        handleChangeAreaSubAreaTema(pregunta.approach.subarea, 'subarea_seleccionada');
        handleChangeAreaSubAreaTema(true, 'permitir_subarea');
        handleChangeAreaSubAreaTema(pregunta.approach.topic, 'tema_seleccionada');
        handleChangeAreaSubAreaTema(true, 'permitir_tema');
        setFormats(latex);
    }

    return (
        // <Grid className = "contenedor-lista-preguntas" >
        <Fragment>
            <Box style={{padding : '16px 16px 0px 16px'}}>
                <Typography variant="subtitle1" gutterBottom>
                    Lista de Preguntas
                </Typography>
            </Box>
            <Box className = "seccion-lista-preguntas">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            // onClick={() => alert('click')}
                        >
                            {lista && lista.length > 0 && lista.map( (pregunta, index) => (
                                <Draggable key={`pregunta-${index}`} draggableId={`pregunta-${index}`} index={index}>
                                    {(provided, snapshot) => (
                                        <Box >
                                            <EstilosStartDragging
                                                onClick={() => handleClickItem(index)}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                key={`${pregunta}-${index}`}
                                                isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
                                                style={Object.assign({ backgroundColor : pregunta.color, textOverflow: 'ellipsis' }, estilosDropDragging(provided.draggableProps.style, snapshot))}
                                                className="rectangulo-pregunta" 
                                            >
                                                <Box style={{display: 'flex', alignItems: 'center'}}>
                                                    <Box style={{display : 'flex', paddingRight : '5px', alignSelf: 'center'}}>
                                                        <DragIndicatorIcon/>
                                                    </Box>
                                                    <Box style={{ overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                                        {pregunta.texto}
                                                    </Box>
                                                </Box>
                                            </EstilosStartDragging>
                                        </Box>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>
        </Fragment>
        // </Grid>
    )
}

