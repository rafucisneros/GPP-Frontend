import React, { useState, useEffect, Fragment } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

// contexts
import { useCreateTestPage } from '../../context/createTestPageContext.js';

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
    opacity : ${props => props.isDragging ? 0.5 : 1};
`

export default () => <ListaPreguntasExamen></ListaPreguntasExamen>

const ListaPreguntasExamen = () => {

    const { listaPreguntasExamen } = useCreateTestPage();
    const [ lista, setLista ] = useState([]);

    useEffect(() => {
        if (listaPreguntasExamen && listaPreguntasExamen.length > 0){
            let aux = listaPreguntasExamen.map( (pregunta, index)  => {
                return {color : 'rgb(209, 213, 238)', texto : `Pregunta ${index + 1}`, posicion : index}
            })
            setLista(aux);
        }
    }, [listaPreguntasExamen])

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
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
                                        // <Button>
                                            <EstilosStartDragging
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                key={`${pregunta}-${index}`}
                                                isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
                                                style={Object.assign({ backgroundColor : pregunta.color, textOverflow: 'ellipsis' }, estilosDropDragging(provided.draggableProps.style, snapshot))}
                                                className="rectangulo-pregunta" 
                                            >
                                                {pregunta.texto}
                                            </EstilosStartDragging>
                                        // </Button>
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

