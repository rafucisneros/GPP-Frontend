import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';

// contexts
import { useCreateTestPage } from '../../context/createTestPageContext';

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(2),
        width: '100%',
    }
}));

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

export default function SeleccionarAreaTema(props) {
    const classes = useStyles();
    const { 
        areas,
        subareas,
        temas,
        handleChangeAreaSubAreaTema,
        areaSeleccionada,
        subareaSeleccionada,
        temaSeleccionado,
        listaFiltradoSubArea,
        listaFiltradoTema,
        permitirSubArea,
        permitirTarea
    } = useCreateTestPage();

    const handleChange = (e, type) => {
        if (type === 'area'){
            handleChangeAreaSubAreaTema(true, 'permitir_subarea');
            handleChangeAreaSubAreaTema(e.target.value, 'area_seleccionada');

        if (e.target.value !== areaSeleccionada) {
            handleChangeAreaSubAreaTema(null, 'tema_seleccionada');
            handleChangeAreaSubAreaTema(null, 'subarea_seleccionada');
        }
        
        } else if (type === 'subarea'){
            handleChangeAreaSubAreaTema(true, 'permitir_tema');
            handleChangeAreaSubAreaTema(e.target.value, 'subarea_seleccionada');
        if (e.target.value !== subareaSeleccionada) {
            handleChangeAreaSubAreaTema(null, 'tema_seleccionada');
        }
        } else if (type === 'tema') handleChangeAreaSubAreaTema(e.target.value, 'tema_seleccionada');
    };

    useEffect(() => {
        if (areaSeleccionada){
            let areasSeleccionadas = []; 
            subareas[areaSeleccionada].forEach(item => {
                areasSeleccionadas.push(item);
            })
            handleChangeAreaSubAreaTema(areasSeleccionadas, 'lista_filtrado_subarea');
        }
    }, [areaSeleccionada])
    
    useEffect(() => {
        if (subareaSeleccionada){
            let subAreasSeleccionadas = [];
            temas[subareaSeleccionada].forEach(item => {
                subAreasSeleccionadas.push(item);
            })
            handleChangeAreaSubAreaTema(subAreasSeleccionadas, 'lista_filtrado_tema');
        }
    }, [subareaSeleccionada])

    useEffect(() => {
        if (!subareaSeleccionada){
            handleChangeAreaSubAreaTema(null, 'tema_seleccionada');
            handleChangeAreaSubAreaTema(false, 'permitir_tema');
        }
    }, [subareaSeleccionada])
    
    useEffect(() => {
        if (!areaSeleccionada){
            handleChangeAreaSubAreaTema(null, 'tema_seleccionada');
            handleChangeAreaSubAreaTema(null, 'subarea_seleccionada');
            handleChangeAreaSubAreaTema(false, 'permitir_subarea');
        }
    }, [areaSeleccionada])

    return (
        <Box style={{textAlign : 'center', width : '100%', display: 'flex'}}>
            <Grid item lg={4} sm={4} xl={4} xs={4} style={{paddingRight : '8px'}}>
                <FormControl required variant="outlined" error={props.errores && props.errores.areaSeleccionadaError} className={classes.formControl}>
                    <InputLabel>Áreas</InputLabel>
                    <Select
                        error={props.errores && props.errores.areaSeleccionadaError}
                        value={areaSeleccionada}
                        label="Áreas"
                        onChange={(e) => handleChange(e, 'area')}
                        style={{lineHeight : '1.5'}}
                    >
                        {areas.map(item => (
                            <MenuItem key={item} value={item}>
                                <ListItemText primary={item} style={{margin : '0px'}}/>
                            </MenuItem>
                        ))}
                    </Select>
                    { props.errores && props.errores.areaSeleccionadaError && <FormHelperText>El campo es requerido</FormHelperText>}
                </FormControl>
            </Grid>

            <Grid item lg={4} sm={4} xl={4} xs={4} style={{paddingRight : '8px'}}>
                <FormControl required variant="outlined" error={props.errores && props.errores.subareaSeleccionadaError} className={classes.formControl}>
                    <InputLabel>Sub Áreas</InputLabel>
                    <Select
                        error={props.errores && props.errores.subareaSeleccionadaError}
                        value={subareaSeleccionada}
                        onChange={(e) => handleChange(e, 'subarea')}
                        label="Sub Áreas"
                        disabled={permitirSubArea && listaFiltradoSubArea.length > 0 ? false : true}
                        MenuProps={MenuProps}
                        style={{lineHeight : '1.5'}}
                    >
                        {listaFiltradoSubArea.map(item => (
                            <MenuItem key={item} value={item}>
                                <ListItemText primary={item} style={{margin : '0px'}}/>
                            </MenuItem>
                        ))}
                    </Select>
                    { props.errores && props.errores.subareaSeleccionadaError && <FormHelperText>El campo es requerido</FormHelperText>}
                </FormControl>
            </Grid>

            <Grid item lg={4} sm={4} xl={4} xs={4}>
                <FormControl required variant="outlined" error={props.errores && props.errores.temaSeleccionadoError} className={classes.formControl}>
                    <InputLabel>Temas</InputLabel>
                    <Select
                        error={props.errores && props.errores.temaSeleccionadoError}
                        value={temaSeleccionado}
                        onChange={(e) => handleChange(e, 'tema')}
                        label="Temas"
                        style={{lineHeight : '1.5'}}
                        disabled={permitirTarea && listaFiltradoTema.length > 0 && listaFiltradoSubArea.length > 0 ? false : true}
                    >
                        {listaFiltradoTema.map(item => (
                            <MenuItem key={item} value={item}>
                                <ListItemText primary={item} style={{margin : '0px'}}/>
                            </MenuItem>
                        ))}
                    </Select>
                    { props.errores && props.errores.temaSeleccionadoError && <FormHelperText>El campo es requerido</FormHelperText>}
                </FormControl>
            </Grid>
        </Box>
    )
}