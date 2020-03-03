import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';

// assets
import './ListaPreguntasExamen.css';

const preguntas = [
    {color : 'lightgoldenrodyellow', texto : 'Pregunta 1'},
    {color : 'lightgreen', texto : 'Pregunta 2'},
    {color : 'lightblue', texto : 'Pregunta 3'},
    {color : 'lightpink', texto : 'Pregunta 4'},
    {color : 'lightsalmon', texto : 'Pregunta 5'},
    {color : 'lightgray', texto : 'Pregunta 6'},
    {color : 'lightseagreen', texto : 'Pregunta 7'},
    {color : 'lightcyan', texto : 'Pregunta 8'},
    {color : 'lightgoldenrodyellow', texto : 'Pregunta 9'},
    {color : 'lightgreen', texto : 'Pregunta 10'},
    {color : 'lightblue', texto : 'Pregunta 11'},
    {color : 'lightpink', texto : 'Pregunta 12'},
    {color : 'lightsalmon', texto : 'Pregunta 13'},
    {color : 'lightgray', texto : 'Pregunta 14'},
    {color : 'lightseagreen', texto : 'Pregunta 15'},
    {color : 'lightcyan', texto : 'Pregunta 16'},
    {color : 'lightgoldenrodyellow', texto : 'Pregunta 17'},
    {color : 'lightgreen', texto : 'Pregunta 18'},
    {color : 'lightblue', texto : 'Pregunta 19'},
    {color : 'lightpink', texto : 'Pregunta 20'},
    {color : 'lightsalmon', texto : 'Pregunta 21'},
    {color : 'lightgray', texto : 'Pregunta 22'},
    {color : 'lightseagreen', texto : 'Pregunta 23'},
    {color : 'lightcyan', texto : 'Pregunta 24'},
  ];

export default function TextArea() {

    return (
        // <Grid className = "contenedor-lista-preguntas" >
            <Box className = "seccion-lista-preguntas">
                <Typography variant="subtitle1" gutterBottom>
                    Lista de Preguntas
                </Typography>
                {preguntas.map( (pregunta, index) => {
                    return (
                        <Box className="rectangulo-pregunta" style = {{backgroundColor : pregunta.color }}>
                            {pregunta.texto}
                        </Box>
                    )
                })}
            </Box>
        // </Grid>
    )
}