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
    opacity : ${props => props.isDragging ? 0.4 : 0.8};
    &:hover {
        opacity: 1;
        transition: all .2s ease-in-out;
        -webkit-transition: all .2s ease-in-out;
        -moz-transition: all .2s ease-in-out;
        -ms-transition: all .2s ease-in-out;
        -o-transition: all .2s ease-in-out;
        -webkit-transform: scale(1.05);
        -moz-transform: scale(1.05);
        -ms-transform: scale(1.05);
        -o-transform: scale(1.05);
    }
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
        setListaPreguntasExamen,
        setearDataItemSeleccionado
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

