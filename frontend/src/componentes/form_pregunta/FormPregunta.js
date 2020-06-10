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
import Typography from '@material-ui/core/Typography';
import "./FormPregunta.css"

export default function FormPregunta({ 
  pregunta, changeAnswer, changeQuestion, isFirstQuestion, isLastQuestion, finishExam, ultimoGuardado 
  }){

  // Cambio de respuesta en seleccion simple/verdadero y falso
  const handleChange = event => {
    changeAnswer(event.target.value.toString());
  };

  // Cambio de respuesta en seleccion multiple
  const handleChangeMultiple = event => {
    if(event.target.checked){
      if(pregunta.respuesta){
        changeAnswer([...pregunta.respuesta, event.target.value]);
      } else {
        changeAnswer([event.target.value]);
      }
    } else {
      changeAnswer(pregunta.respuesta.filter(x => x !== event.target.value));
    }
  };

  // Cambio de respuesta en ordenamiento
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if(!pregunta.respuesta){
      pregunta.respuesta = [...pregunta.answers];
    }
    let nuevoOrden = [...pregunta.respuesta];
    let elementoCambiado = nuevoOrden.splice(result.source.index, 1)[0];
    nuevoOrden.splice(result.destination.index, 0, elementoCambiado);
    changeAnswer(nuevoOrden);
  }

  // Cambiar a siguiente pregunta
  const handlePreviousQuestion = ()=>{
    changeQuestion(pregunta["id"] - 1);
  }

  // Cambiar a pregunta anterior
  const handleNextQuestion = ()=>{
    changeQuestion(pregunta["id"] + 1);
  }

  return (
    <Container maxWidth="lg" className="form-container">
      <Grid container spacing={2} direction="column" style={{height: "100%"}}>
        <Grid>
          <div>
            <h1>Pregunta {pregunta["id"]}</h1>
          </div>
          <div>
            <h3>{pregunta.type[0].toUpperCase() + pregunta.type.substr(1)}</h3>
          </div>
        </Grid>
        <Grid container spacing={2} direction="row" justify="space-around" style={{flex: 1}}>
          {pregunta.type === "seleccion simple" && 
            (<div>              
              <FormControl component="fieldset">
                <FormLabel component="legend">{pregunta["content"]}</FormLabel>
                <RadioGroup aria-label="respuesta" name="respuesta1" onChange={handleChange} value={pregunta.respuesta}>
                  {pregunta.answers.map((opcion, index) => {
                    return <FormControlLabel value={opcion["id"].toString()} control={<Radio />} label={opcion["content"]} key={index} />
                  })}
                </RadioGroup>
              </FormControl>
            </div>)
          }
          {pregunta.type === "seleccion multiple" && 
            (<div>   
              <FormGroup >
                <FormLabel component="legend">{pregunta["content"]}</FormLabel>
                  {pregunta.answers.map((opcion, index) => {
                    return  (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={pregunta.respuesta && pregunta.respuesta.find(x => x === opcion["id"].toString()) ? true : false}
                            onChange={handleChangeMultiple}
                            name="checkedB"
                            color="primary"
                            value={opcion["id"]}
                          />
                        }
                        label={opcion["content"]}
                        key={index}
                      />)
                  })}
              </FormGroup>           
            </div>)
          }
          {pregunta.type === "verdadero o falso" && 
            (<div>              
              <FormControl component="fieldset">
                <FormLabel component="legend">{pregunta["content"]}</FormLabel>
                <RadioGroup aria-label="respuesta" name="respuesta1" onChange={handleChange} value={pregunta.respuesta}>
                  <FormControlLabel value={"1"} control={<Radio />} label="Verdadero"/>
                  <FormControlLabel value={"0"} control={<Radio />} label="Falso"/>
                </RadioGroup>
              </FormControl>
            </div>)
          }
          {pregunta.type === "ordenamiento" && 
            (<div>
              <FormControl component="fieldset">
                <FormLabel component="legend">{pregunta["content"]}</FormLabel>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}                       
                      >
                        {pregunta.respuesta && pregunta.respuesta.length ? pregunta.respuesta.map((opcion, index) => (
                          <Draggable key={`opcion-${index}`} draggableId={`opcion-${index}`} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                key={`${opcion["id"]}-${index}`}
                                className="flex-box-opcions"
                              >
                                <Typography style={{padding: "5px 0px"}}>
                                  {opcion["content"]}
                                </Typography> 
                              </div>
                            )}
                          </Draggable>
                        ))
                        : pregunta.answers.map((opcion, index) => (
                          <Draggable key={`opcion-${index}`} draggableId={`opcion-${index}`} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                key={`${opcion["id"]}-${index}`}
                                className="flex-box-opcions"
                              >
                                <Typography style={{padding: "5px 0px"}}>
                                  {opcion["content"]}
                                </Typography>
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
              </FormControl>
            </div>)
          }
        </Grid>
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
        <br/>
        <Grid container direction="row-reverse">
          Ultima vez guardado: {ultimoGuardado}
        </Grid>
      </Grid>
    </Container>
  )
} 