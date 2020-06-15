import React, { Fragment } from 'react';

// componentes
import TableList from '../componentes/tables/TableList.js';

// material
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

// context
import { useGeneral } from '../context/generalContext';

export default function EditTestPage(){

    const { setContentMenu } = useGeneral();
    setContentMenu(`edit_test`);

    return (
        <Container maxWidth={false} style={{paddingTop: '88px'}}>
            <Grid container spacing={3} style={{display: 'contents'}}>
                <Grid item xs={12} md={12} lg={12}>
                    <TableList>

                    </TableList>
                </Grid>
            </Grid>
        </Container>
    );
}