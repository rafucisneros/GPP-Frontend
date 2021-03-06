import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar, Box } from '@material-ui/core';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import ClearIcon from '@material-ui/icons/Clear';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PeopleIcon from '@material-ui/icons/People';
import ReplayIcon from '@material-ui/icons/Replay';

const StylesSuccess = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        heigth: 'auto'
    },
    avatar: {
        backgroundColor: '#388e3c',
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    },
    difference: {
        marginTop: '16px',
        display: 'flex',
        alignItems: 'center'
    },
    differenceIcon: {
        color: '#388e3c',
    },
    differenceValue: {
        color: '#388e3c',
        marginRight: '8px'
    }
}));

const StylesWarning = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        heigth: 'auto'
    },
    avatar: {
        backgroundColor: '#455A64',
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    },
    difference: {
        marginTop: '16px',
        display: 'flex',
        alignItems: 'center'
    },
    differenceIcon: {
        color: '#455A64',
    },
    differenceValue: {
        color: '#455A64',
        marginRight: '8px'
    }
}));

const StylesError = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        heigth: 'auto'
    },
    avatar: {
        backgroundColor: '#d32f2f',
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    },
    difference: {
        marginTop: '16px',
        display: 'flex',
        alignItems: 'center'
    },
    differenceIcon: {
        color: '#d32f2f',
    },
    differenceValue: {
        color: '#d32f2f',
        marginRight: '8px'
    }
}));

const StylesInfo1 = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        heigth: 'auto'
    },
    avatar: {
        backgroundColor: '#6a3df3',
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    },
    difference: {
        marginTop: '16px',
        display: 'flex',
        alignItems: 'center'
    },
    differenceIcon: {
        color: '#6a3df3',
    },
    differenceValue: {
        color: '#6a3df3',
        marginRight: '8px'
    }
}));

const StylesInfo2 = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        heigth: 'auto'
    },
    avatar: {
        backgroundColor: '#f57c00',
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    },
    difference: {
        marginTop: '16px',
        display: 'flex',
        alignItems: 'center'
    },
    differenceIcon: {
        color: '#f57c00',
    },
    differenceValue: {
        color: '#f57c00',
        marginRight: '8px'
    }
}));

const StylesNormal = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        heigth: 'auto'
    },
    avatar: {
        backgroundColor: '#115293',
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    },
    difference: {
        marginTop: '16px',
        display: 'flex',
        alignItems: 'center'
    },
    differenceIcon: {
        color: '#115293',
    },
    differenceValue: {
        color: '#115293',
        marginRight: '8px'
    }
}));

const Style = (datos) => {
    if(datos.color === 'success'){
        return StylesSuccess();
    } else if(datos.color === 'error'){
        return StylesError();
    } else if(datos.color === 'warning'){
        return StylesWarning();
    } else if(datos.color === 'info_1'){
        return StylesInfo1();
    } else if(datos.color === 'info_2'){
        return StylesInfo2();
    } else {
        return StylesNormal();
    }
}

const EstadisticaResumen = props => {
    const { className, datos, ...rest } = props;

    const classes = Style(datos);

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardContent>
                <Grid
                    container
                    justify="space-between"
                >   
                    <Box style={{ display : 'flex', width : '100%'}}>
                        <Grid item style={{ display : 'flex', width : '100%', flexDirection : 'column'}}> 
                            <Typography
                                className={classes.title}
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                {datos.title}
                            </Typography>

                            <Typography variant="h5">{datos.value}</Typography>
                        </Grid>
                        <Grid item style={{ display : 'flex', paddingLeft : '8px'}}>
                            <Avatar className={classes.avatar}>
                                {   
                                    datos.type === 'correcto' ? <PlaylistAddCheckIcon className={classes.icon} /> :
                                    datos.type === 'incorrecto' ? <ClearIcon className={classes.icon} /> :
                                    datos.type === 'NA' ? <SpeakerNotesOffIcon className={classes.icon} /> :
                                    datos.type === 'replay' ? <ReplayIcon className={classes.icon} /> :
                                    datos.type === 'people' ? <PeopleIcon className={classes.icon} /> :
                                    <DoneAllIcon className={classes.icon} />
                                }
                            </Avatar>
                        </Grid>
                    </Box>
                    
                </Grid>
            </CardContent>
        </Card>
    );
};

EstadisticaResumen.propTypes = {
    className: PropTypes.string
};

export default EstadisticaResumen;