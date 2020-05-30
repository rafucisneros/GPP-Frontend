import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Box
    } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Tooltip from '@material-ui/core/Tooltip';

// contexts
import { useCreateTestPage } from '../../context/createTestPageContext';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
    },
    content: {
        padding: 0
    },
    image: {
        height: 48,
        width: 48
    },
    actions: {
        justifyContent: 'flex-end'
    },
    active: {
        color: 'blue',
    }
}));

const ListaSecciones = (props) => {
    const classes = useStyles();
    const { className, ...rest } = props;
    const {  
        secciones,
        seccionSeleccionada
    } = useCreateTestPage();

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardHeader
                title="Lista de Secciones"
                subheader={`${secciones.length} en total`}
                action={
                    <Box style={{alignSelf: 'center', paddingTop: '8px'}}>
                        <Tooltip title={'Agregar sección'} placement="right" arrow>
                            <IconButton
                                variant="text"
                                onClick={() => props.handleAgregarSecciones()}
                            >
                                <AddBoxIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                }
            />
            <Divider />
            <CardContent className={classes.content}>
                <Box style={{maxHeight: '43vh', overflow: 'auto'}}>
                    <List>
                    {secciones.map((item, index) => (
                        <ListItem
                            divider={index < secciones.length - 1}
                            key={index}
                            selected={item && seccionSeleccionada ? item.id === seccionSeleccionada.id : false}
                        >
                        <ListItemText
                            primary={`Sección ${index + 1}`}
                            secondary={`${item.estudiantes.length} estudiante(s) escogido(s)`}
                        />
                        <IconButton
                            edge="end"
                            size="small"
                            onClick={() => props.handleEliminarSecciones(index)}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <Box style={{paddingLeft: '16px'}}>
                            <IconButton
                                edge="end"
                                size="small"
                                onClick={() => props.handleSeleccionarSeccion(item.id)}
                            >
                                <NavigateNextIcon />
                            </IconButton>
                        </Box>
                        </ListItem>
                    ))}
                    </List>
                </Box>
            </CardContent>
        </Card>
    );
};

ListaSecciones.propTypes = {
    className: PropTypes.string
};

export default ListaSecciones;