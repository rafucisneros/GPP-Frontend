import React, {useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Switch,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText
} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const tituloTooltip = "El modo estático le permitirá mostrar el examen en el orden que usted desee. En el modo dinámico el examen será mostrado de manera aleatoria de acuerdo a las configuraciones introucidas."

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
        width : '100%'
    }
}));

const duracionExamen = [
    {valor : 2, label: '2 min'},
    {valor : 5, label: '5 min'},
    {valor : 8, label: '8 min'},
    {valor : 10, label: '10 min'},
    {valor : 15, label: '15 min'},
    {valor : 30, label: '30 min'},
    {valor : 45, label: '45 min'},
    {valor : 60, label: '1 hora'},
    {valor : 90, label: '1 hora y 30 min'},
    {valor : 120, label: '2 horas'},
    {valor : 150, label: '2 hora y 30 min'},
    {valor : 180, label: '3 horas'}
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Configuracion = props => {

    // const { className, ...rest } = props;
    // const classes = useStyles();

    const classes = useStyles();

    const [switchChecked, setSwitchChecked] = useState(false);
    const [tipoConfiguracion, setTipoConfiguracion] = useState("Configuración Estática");
    const [numeroSeccionSeleccionado, setNumeroSeccionSeleccionado] = useState(null); 

    const handleCambiarSwitch = () =>{
        setSwitchChecked(!switchChecked);
    }

    useEffect(() => {
        if (switchChecked) setTipoConfiguracion("Configuración Dinámica");
        else setTipoConfiguracion("Configuración Estática");
        
      }, [switchChecked])

    return (
        <Card>
            <form>
                <CardHeader
                    subheader={`Aquí puedes modificar las configuraciones de tu examen.`}
                    title="Configuraciones Básicas"
                />
                <Divider />
                <Grid
                    className="items-configuracion-examen"
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    style = {{'display' : 'block', 'padding': '16px'}}
                >
                    <Box style={{display: 'flex'}}>
                        <Switch checked={switchChecked} onClick={() => handleCambiarSwitch()} color="primary"/>
                        <Tooltip title={tituloTooltip} placement="right" arrow>
                            <Box style={{alignSelf: 'center'}}>{tipoConfiguracion}</Box>
                        </Tooltip>
                    </Box>
                </Grid>
                <Fragment>
                <Divider />
                <CardContent>
                    {/* <Grid
                        container
                        spacing={6}
                        wrap="wrap"
                    >
                        <Grid
                        item
                        style={{display : 'grid'}}
                        md={12}
                        sm={12}
                        xs={12}
                        >
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Fecha de inicio del Examen"
                        />
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Fecha de fin del Examen"
                        />
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Estado del examen"
                        />
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Duracion del examen"
                        />
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Duracion del examen"
                        />
                        </Grid>
                    </Grid> */}
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6} lg={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="Nombres"
                            autoFocus
                        />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Apellidos"
                            name="lastName"
                            autoComplete="lname"
                        />
                        </Grid> 
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                id={`numero-secciones`}
                                type="number"
                                margin="normal"
                                label="Número de Secciones"
                                required
                                variant="outlined"
                                fullWidth
                                name={`numero_secciones`}
                                autoFocus
                                // onChange={(e) => handleCambiarRespuesta(e, index)}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                InputProps={{
                                inputProps: { 
                                    max: 100, min: 0, step : 1
                                }}}
                            />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                        <FormControl required variant="outlined" className={classes.formControl}>
                            <InputLabel>Duracion del examen</InputLabel>
                            <Select
                            // multiple
                            // native
                            value={numeroSeccionSeleccionado}
                            // inputProps={<Input />}
                            MenuProps={MenuProps}
                            >
                            {duracionExamen.map(item => (
                                <MenuItem key={item.valor} value={item.valor}>
                                {/* <Checkbox checked={subareaSeleccionada.indexOf(item) > -1} color="primary"/> */}
                                <ListItemText primary={item.label} />
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        </Grid>
                    </Grid>
                    <TextField
                    placeholder="MultiLine with rows: 2 and rowsMax: 4"
                    multiline
                    rows={6}
                    rowsMax={6}
                    />
                </CardContent>
                </Fragment>
                <Divider />
                <CardActions>
                    <Button
                        color="primary"
                        variant="outlined"
                    >
                    Guardar
                    </Button>
                </CardActions>
            </form>
        </Card>
    )
}

Configuracion.propTypes = {
    className: PropTypes.string
};
  
export default Configuracion;