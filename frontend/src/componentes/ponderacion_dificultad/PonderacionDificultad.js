import React from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

export default function PonderacionDificultad(props) {

    const handleCambiarRespuesta = (e) => props.handleChangeInput(e);

    return (
        <Box style={{display: 'flex'}}>
            <Box style={{float: 'left', width : '50%', paddingRight: '3px'}}>
            <TextField
                id="dificultad"
                type="number"
                margin="normal"
                label="Dificultad"
                required
                variant="outlined"
                fullWidth
                name="dificultad"
                value={props.dificultad}
                autoFocus
                onChange={(e) => handleCambiarRespuesta(e)}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    inputProps: { 
                        max: 5, min: 0, step : 1
                }}}
            />
            </Box>
            <Box style={{float: 'rigth', width : '50%', paddingLeft: '3px'}}>
            <TextField
                id="ponderacion"
                type="number"
                margin="normal"
                label="Ponderación"
                required
                variant="outlined"
                fullWidth
                name="ponderacion"
                autoFocus
                value={props.ponderacion}
                onChange={(e) => handleCambiarRespuesta(e)}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    inputProps: { 
                        max: 100, min: 0, step : 0.25
                }}}
            />
            </Box>
        </Box>
    )
}