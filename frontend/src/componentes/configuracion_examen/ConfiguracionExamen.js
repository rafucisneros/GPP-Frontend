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
  Switch,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'

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
    const [valorFechaInicio, setValorFechaInicio] = useState( new Date() );
    const [valorFechaFin, setValorFechaFin] = useState( new Date() );

    const handleCambiarNumeroSeccion = (e) => {
        setNumeroSeccionSeleccionado(e.target.value);
    };

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
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6} lg={6}>
                            <FormControl required variant="outlined" style={{textAlignLast: 'center'}} className={classes.formControl}>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DateTimePicker 
                                        inputVariant="outlined"
                                        format="DD/MM/YYYY hh:mm a"
                                        margin="normal"
                                        value={valorFechaInicio} 
                                        onChange={setValorFechaInicio} 
                                        label="Fecha y hora de comienzo"
                                        KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                        }}
                                        />
                                </MuiPickersUtilsProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <FormControl required variant="outlined" style={{textAlignLast: 'center'}} className={classes.formControl}>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DateTimePicker
                                        inputVariant="outlined"
                                        format="DD/MM/YYYY hh:mm a"
                                        margin="normal"
                                        value={valorFechaFin}  
                                        onChange={setValorFechaFin} 
                                        label="Fecha y hora de culminacion"
                                        KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </FormControl>
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
                            <FormControl required variant="outlined" style={{textAlignLast: 'center'}} className={classes.formControl}>
                                <InputLabel>Duracion del examen</InputLabel>
                                <Select
                                    label="Duracion del examen"
                                    value={numeroSeccionSeleccionado}
                                    MenuProps={MenuProps}
                                    onChange={handleCambiarNumeroSeccion} 
                                >
                                {duracionExamen.map(item => (
                                    <MenuItem key={item.valor} value={item.valor} >
                                        {item.label}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={12}>
                            <TextField
                                id={`comentarios`}
                                margin="normal"
                                label="Comentario"
                                variant="outlined"
                                fullWidth
                                name={`comentarios`}
                                placeholder="Comentarios adicionales..."
                                multiline
                                rows={6}
                                rowsMax={6}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
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