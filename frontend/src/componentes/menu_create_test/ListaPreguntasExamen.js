import React, { useState, Fragment } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'

import Box from '@material-ui/core/Box';

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
        transition: `all ${curve} ${duration + 1}s`,
    };
}

const EstilosStartDragging = styled.div`
    opacity : ${props => props.isDragging ? 0.5 : 1};
`

export default function ListaPreguntasExamen() {

    const [preguntas, setPreguntas] = useState([
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 1'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 2'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 3'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 4'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 5'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 6'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 7'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 8'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 9'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 10'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 11'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 12'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 13'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 14'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 15'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 16'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 17'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 18'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 19'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 20'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 21'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 22'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 23'},
        {color : 'rgb(209, 213, 238)', texto : 'Pregunta 24'},
    ])

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
            preguntas,
            result.source.index,
            result.destination.index
        );
    
        setPreguntas(items);
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
                        >
                            {preguntas.map( (pregunta, index) => (
                                <Draggable key={`pregunta-${index}`} draggableId={`pregunta-${index}`} index={index}>
                                    {(provided, snapshot) => (
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

