import React, {useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
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
  Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Configuracion = props => {
    console.log(props)

    const { className, ...rest } = props;
    const classes = useStyles();

    const [switchChecked, setSwitchChecked] = useState(false);
    const [tipoConfiguracion, setTipoConfiguracion] = useState("Configuración Estática");

    const handleCambiarSwitch = () =>{
        setSwitchChecked(!switchChecked);
    }

    useEffect(() => {
        if (switchChecked) setTipoConfiguracion("Configuración Dinámica");
        else setTipoConfiguracion("Configuración Estática");
        
      }, [switchChecked])

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
            >
            <form>
                <CardHeader
                    subheader="Aquí puedes modificar las configuraciones de tu examen"
                    title="Configuraciones"
                />
                <Divider />
                <Grid
                    className={classes.item}
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    style = {{'display' : 'block', 'padding': '16px'}}
                >
                    {tipoConfiguracion}
                    <Switch checked={switchChecked} onClick={() => handleCambiarSwitch()} color="primary"/>
                </Grid>
                {switchChecked &&
                <Fragment>
                <Divider />
                <CardContent>
                        <Grid
                            container
                            spacing={6}
                            wrap="wrap"
                        >
                            <Grid
                            className={classes.item}
                            item
                            md={12}
                            sm={12}
                            xs={12}
                            >
                            <FormControlLabel
                                control={
                                <Checkbox
                                    color="primary"
                                    defaultChecked //
                                />
                                }
                                label="Escoger la Configuracion 1"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    color="primary"
                                    defaultChecked //
                                />
                                }
                                label="Escoger la Configuracion 2"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" />}
                                label="Escoger la Configuracion 3"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    color="primary"
                                    defaultChecked //
                                />
                                }
                                label="Escoger la Configuracion 4"
                            />
                            </Grid>
                        </Grid>
                    </CardContent>
                    </Fragment>
                }
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