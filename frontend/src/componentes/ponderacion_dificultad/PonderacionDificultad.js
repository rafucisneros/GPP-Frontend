import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    FormHelperText,
    Grid,
    ListItemText
} from '@material-ui/core';

// contexts
import { useCreateTestPage } from '../../context/createTestPageContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
        width : '100%'
    }
}));

const listaDificultad = [
    {valor : 1, label: 'Baja'},
    {valor : 2, label: 'Baja-Media'},
    {valor : 3, label: 'Media'},
    {valor : 4, label: 'Alta'},
    {valor : 5, label: 'Muy Alta'},
]

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function PonderacionDificultad(props) {
    const classes = useStyles();
    const { 
        handleChangeInput,
        dificultad,
        ponderacion
    } = useCreateTestPage();
    
    const handleCambiarRespuesta = (e) => {
        handleChangeInput(e);
    };

    return (
        <Box style={{display: 'flex', textAlign : 'center', width : '100%'}}>
            <Grid item lg={6} sm={6} xl={6} xs={6} md={6} style={{paddingRight : '4px'}}>
                <FormControl required variant="outlined" error={props.errores && props.errores.dificultadError} className={classes.formControl}>
                    <InputLabel>Dificultad</InputLabel>
                    <Select
                        error={props.errores && props.errores.dificultadError}
                        helperText="El campo es requerido"
                        label="Dificultad"
                        id='dificultad'
                        name='dificultad'
                        value={dificultad ? dificultad : ''}
                        MenuProps={MenuProps}
                        onChange={handleCambiarRespuesta}
                        // style={{lineHeight : '1.5'}}
                    >
                    {listaDificultad.map(item => (
                        <MenuItem key={item.valor} value={item.valor} >
                            {/* <ListItemText primary={item.label} style={{margin : '0px'}}/> */}
                            {item.label}
                        </MenuItem>
                    ))}
                    </Select>
                        { props.errores && props.errores.dificultadError && <FormHelperText>El campo es requerido</FormHelperText> }
                </FormControl>
            </Grid>
            <Grid item lg={6} sm={6} xl={6} xs={6} md={6} style={{paddingLeft : '4px'}}>
                <TextField
                    error={props.errores && props.errores.ponderacionError}
                    helperText={props.errores && props.errores.ponderacionError ? "El campo es requerido" : null}
                    id="ponderacion"
                    type="number"
                    margin="normal"
                    label="Ponderación"
                    required
                    variant="outlined"
                    fullWidth
                    name="ponderacion"
                    autoFocus
                    value={ponderacion ? ponderacion : ''}
                    className={{lineHeight : 1.5}}
                    onChange={(e) => handleCambiarRespuesta(e)}
                    InputProps={{
                        inputProps: { 
                            min: 0, step : 0.25
                    }}}
                />
            </Grid>
        </Box>
    )
}