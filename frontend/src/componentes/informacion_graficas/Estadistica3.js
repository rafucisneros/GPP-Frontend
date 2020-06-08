import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ClearIcon from '@material-ui/icons/Clear';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 700
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
        color: '#388e3c'
    },
    differenceValue: {
        color: '#388e3c',
        marginRight: '8px'
    }
}));

const Estadistica2 = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

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
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            Promedio de estudiantes aprobados
                        </Typography>
                        <Typography variant="h5">53%</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <DoneAllIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

Estadistica2.propTypes = {
    className: PropTypes.string
};

export default Estadistica2;