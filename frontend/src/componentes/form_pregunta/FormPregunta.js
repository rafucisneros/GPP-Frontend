import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function FormPregunta({ 
  pregunta, changeAnswer, changeQuestion, isFirstQuestion, isLastQuestion, finishExam 
  }){

  // Cambio de respuesta en seleccion simple/verdadero y falso
  const handleChange = event => {
    changeAnswer(event.target.value.toString());
  };

  // Cambio de respuesta en seleccion multiple
  const handleChangeMultiple = event => {
    if(event.target.checked){
      changeAnswer([...pregunta.respuesta, event.target.value]);
    } else {
      changeAnswer(pregunta.respuesta.filter(x => x !== event.target.value));
    }
  };

  // Cambio de respuesta en ordenamiento
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    let nuevoOrden = pregunta.respuesta.length ? [...pregunta.respuesta] : [...pregunta.opciones]
    let elementoCambiado = nuevoOrden.splice(result.source.index, 1)[0]
    nuevoOrden.splice(result.destination.index, 0, elementoCambiado)
    changeAnswer(nuevoOrden)
  }

  // Cambiar a siguiente pregunta
  const handlePreviousQuestion = ()=>{
    changeQuestion(pregunta["_id"] - 1)
  }

  // Cambiar a pregunta anterior
  const handleNextQuestion = ()=>{
    changeQuestion(pregunta["_id"] + 1)
  }

  return (
    <Container maxWidth="lg" style={{paddingTop: '20px', paddingBottom: '32px'}}>
      <Grid container spacing={2} direction="column">
        <div>
          <h1>Pregunta {pregunta._id}</h1>
        </div>
        <Grid container spacing={2} direction="row" justify="space-around">
          {pregunta.tipo === "seleccion_simple" && 
            (<div>              
              <FormControl component="fieldset">
                <FormLabel component="legend">{pregunta.pregunta}</FormLabel>
                <RadioGroup aria-label="respuesta" name="respuesta1" onChange={handleChange} value={pregunta.respuesta}>
                  {pregunta.opciones.map((opcion, index) => {
                    return <FormControlLabel value={opcion.toString()} control={<Radio />} label={opcion} key={index} />
                  })}
                </RadioGroup>
              </FormControl>
            </div>)
          }
          {pregunta.tipo === "seleccion_multiple" && 
            (<div>   
              <FormGroup >
                <FormLabel component="legend">{pregunta.pregunta}</FormLabel>
                  {pregunta.opciones.map((opcion, index) => {
                    return  (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={pregunta.respuesta.find(x => x === opcion.toString()) ? true : false}
                            onChange={handleChangeMultiple}
                            name="checkedB"
                            color="primary"
                            value={opcion}
                          />
                        }
                        label={opcion}
                        key={index}
                      />)
                  })}
              </FormGroup>           
            </div>)
          }
          {pregunta.tipo === "verdadero_falso" && 
            (<div>              
              <FormControl component="fieldset">
                <FormLabel component="legend">{pregunta.pregunta}</FormLabel>
                <RadioGroup aria-label="respuesta" name="respuesta1" onChange={handleChange} value={pregunta.respuesta}>
                  <FormControlLabel value={"Verdadero"} control={<Radio />} label="Verdadero"/>
                  <FormControlLabel value={"Falso"} control={<Radio />} label="Falso"/>
                </RadioGroup>
              </FormControl>
            </div>)
          }
          {pregunta.tipo === "ordenamiento" && 
            (<div>
              <FormLabel component="legend">{pregunta.pregunta}</FormLabel>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {pregunta.respuesta.length ? pregunta.respuesta.map((opcion, index) => (
                        <Draggable key={`opcion-${index}`} draggableId={`opcion-${index}`} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={`${opcion}-${index}`}
                              className="flex-box-opcions"
                            >
                              {opcion}
                            </div>
                          )}
                        </Draggable>
                      ))
                      : pregunta.opciones.map((opcion, index) => (
                        <Draggable key={`opcion-${index}`} draggableId={`opcion-${index}`} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={`${opcion}-${index}`}
                              className="flex-box-opcions"
                            >
                              {opcion}
                            </div>
                          )}
                        </Draggable>
                      ))
                      }
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>)
          }
        </Grid>
        <br />
        <Grid container spacing={2} direction="row" justify="space-around">
          <Box className="div-buttons-respuestas">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isFirstQuestion}
              onClick={handlePreviousQuestion}
            >
              Anterior
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLastQuestion}
              onClick={handleNextQuestion}
            >
              Siguiente
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={finishExam}
            >
            Terminar Examen
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
} 