import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default function TextArea() {

    return (
        <Grid item xs={12} md={12} lg={12}>
            <Paper className="paper-crear-test section-paper-crear-test">
                <TextareaAutosize aria-label="minimum height" rowsMin={15} rowsMax={20} style={{resize : 'none'}} placeholder="Aqui va el texto" />
            </Paper>
        </Grid>
    )
}