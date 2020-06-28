import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';

// contexts
import { useCreateTestPage } from '../../context/createTestPageContext';

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
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
        <Box style={{textAlign : 'center', width : '100%'}}>
            <Box style={{float : 'left'}}>
                <FormControl required error={props.errores && props.errores.areaSeleccionadaError} className={classes.formControl}>
                    <InputLabel>Áreas</InputLabel>
                    <Select
                        error={props.errores && props.errores.areaSeleccionadaError}
                        value={areaSeleccionada}
                        onChange={(e) => handleChange(e, 'area')}
                    >
                        {areas.map(item => (
                            <MenuItem key={item} value={item}>
                            <ListItemText primary={item} />
                            </MenuItem>
                        ))}
                    </Select>
                    { props.errores && props.errores.areaSeleccionadaError && <FormHelperText>El campo es requerido</FormHelperText>}
                </FormControl>
            </Box>

            <Box style={{display: 'inline-block'}}>
                <FormControl required error={props.errores && props.errores.subareaSeleccionadaError} className={classes.formControl}>
                    <InputLabel>Sub Áreas</InputLabel>
                    <Select
                        error={props.errores && props.errores.subareaSeleccionadaError}
                        value={subareaSeleccionada}
                        onChange={(e) => handleChange(e, 'subarea')}
                        disabled={permitirSubArea && listaFiltradoSubArea.length > 0 ? false : true}
                        MenuProps={MenuProps}
                    >
                        {listaFiltradoSubArea.map(item => (
                            <MenuItem key={item} value={item}>
                            <ListItemText primary={item} />
                            </MenuItem>
                        ))}
                    </Select>
                    { props.errores && props.errores.subareaSeleccionadaError && <FormHelperText>El campo es requerido</FormHelperText>}
                </FormControl>
            </Box>

            <Box style={{float : 'right'}}>
                <FormControl required error={props.errores && props.errores.temaSeleccionadoError} className={classes.formControl}>
                    <InputLabel>Temas</InputLabel>
                    <Select
                        error={props.errores && props.errores.temaSeleccionadoError}
                        value={temaSeleccionado}
                        onChange={(e) => handleChange(e, 'tema')}
                        disabled={permitirTarea && listaFiltradoTema.length > 0 && listaFiltradoSubArea.length > 0 ? false : true}
                    >
                        {listaFiltradoTema.map(item => (
                            <MenuItem key={item} value={item}>
                            <ListItemText primary={item} />
                            </MenuItem>
                        ))}
                    </Select>
                    { props.errores && props.errores.temaSeleccionadoError && <FormHelperText>El campo es requerido</FormHelperText>}
                </FormControl>
            </Box>
        </Box>
    )
}