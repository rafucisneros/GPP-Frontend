import React, { Fragment, useState }  from 'react';
import { Link } from 'react-router-dom';

// material
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// context
import { useCreateTestPage } from '../../context/createTestPageContext';

const StepFinish = () => {

    const {  
        titulo,
        destroyData
    } = useCreateTestPage();

    const handleStep = () => {
        destroyData();
    }

    return( 
        <Fragment>
            <Grid container spacing={3} style={{textAlign : 'center', display: 'flex', width : '100%', paddingTop: '25vh'}}>
                <Grid item xs={12}>
                    <CheckCircleOutlinedIcon style={{ color: 'green', fontSize : 100 }}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" >
                        {`Se ha creado satisfactoriamente el examen ${titulo ? titulo : ''}`}
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{marginTop: '32px'}}>
                    <Link to={"/home"} className="link" onClick={handleStep}>
                        <Button
                            // type="submit"
                            variant="contained"
                            color="primary"
                            // onClick={() => handleCrearPregunta()}
                        >
                            Ir al Menú Principal
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default StepFinish;
