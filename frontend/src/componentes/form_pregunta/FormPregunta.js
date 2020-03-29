import React from 'react';
import List from '@material-ui/core/List';
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

export default function FormPregunta(props){
  const pregunta = props.pregunta;
  const [respuesta, setRespuesta] = React.useState("");
  const [respuestaMultiple, setRespuestaMultiple] = React.useState([]);

  const handleChange = event => {
    setRespuesta(event.target.value);
  };

  const handleChangeMultiple = event => {
    if(event.target.checked){
      setRespuestaMultiple([...respuestaMultiple, event.target.value]);
    } else {
      setRespuestaMultiple(respuestaMultiple.filter(x => x !== event.target.value));
    }
  };

  const handlePreviousQuestion = ()=>{
    if(pregunta.tipo === "seleccion_multiple" || pregunta.tipo === "ordenamiento") {
      pregunta["respuesta"] = respuestaMultiple
    } else {
      pregunta["respuesta"] = respuesta
    }
    props.changeQuestion(pregunta, pregunta["_id"] - 1)
  }

  const handleNextQuestion = ()=>{
    if(pregunta.tipo === "seleccion_multiple" || pregunta.tipo === "ordenamiento") {
      pregunta["respuesta"] = respuestaMultiple
    } else {
      pregunta["respuesta"] = respuesta
    }
    props.changeQuestion(pregunta, pregunta["_id"] + 1)
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
                <RadioGroup aria-label="respuesta" name="respuesta1" onChange={handleChange} value={respuesta}>
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
                            checked={respuestaMultiple.find(x => x === opcion.toString()) ? true : false}
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
                <RadioGroup aria-label="respuesta" name="respuesta1" onChange={handleChange} value={respuesta}>
                  <FormControlLabel value={"Verdadero"} control={<Radio />} label="Verdadero"/>
                  <FormControlLabel value={"Falso"} control={<Radio />} label="Falso"/>
                </RadioGroup>
              </FormControl>
            </div>)
          }
          {pregunta.tipo === "ordenamiento" && 
            <div>
              ordenamiento
            </div>
          }
        </Grid>
        <br />
        <Grid container spacing={2} direction="row" justify="space-around">
          <Box className="div-buttons-respuestas">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={props.firstQuestion}
              onClick={handlePreviousQuestion}
            >
              Anterior
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={props.lastQuestion}
              onClick={handleNextQuestion}
            >
              Siguiente
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
            >
            Terminar Examen
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
} 