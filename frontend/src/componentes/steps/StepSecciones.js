import React, { useState, Fragment }  from 'react';
import uuid from 'uuid/v1';

// componentes
import Loading from '../loading/Loading.js';
import ListaSecciones from '../../componentes/lista_secciones/ListaSecciones.js';
import ListaEstudiantes from '../../componentes/lista_estudiantes/ListaEstudiantes.js';

// contexts
import { useCreateTestPage } from '../../context/createTestPageContext';

// servicios 
import { postSecciones } from '../../servicios/servicioCrearExamen.js';

// material
import Typography from '@material-ui/core/Typography';
import PublishIcon from '@material-ui/icons/Publish';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StepSecciones = (props) => {

    const {  
        handleChangeStep,
        handleChangeComp,
        secciones,
        tipoConfiguracion,
        exam_id,
    } = useCreateTestPage();

    const [open, setOpen] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlertModal(false);
    };

    const handleLoading = (bool) => {
        setLoading(bool)
    }

    const verifyData = () => {
        let error = true;
        secciones.forEach( seccion => {
            if (seccion) {
                let len = seccion.estudiantes.length
                if (len > 0) error = false;
            }
        })
        setAlertModal(error);
        return error;
    }

    const sendSectionsData = () => {
        let data = {};        secciones.forEach( seccion => {
            if (seccion) {
                let students = seccion.estudiantes.map( estudiante => {
                    return estudiante.email;
                })
                data[`${seccion.id}`] = students;
            }
        })
        let request = { sections : data }
        console.log(request)
        setLoading(true);
        postSecciones(request, exam_id)
        .then( res => {
            console.log(res)
            if (res) {
                setLoading(true);
                handleChangeStep('step_4');
                console.log("Update Secciones")
            }
        })
    }

    const handleAgregarEstudiante = (estudiante) => {
        console.log(estudiante)
        handleChangeComp(estudiante, 'estudiantes');
    }

    const handleSeleccionarSeccion = (id) => {
        if (secciones.length > 0){
            for( let seccion of secciones){
                if(seccion.id === id) {
                    // handleLoading(true);
                    handleChangeComp(seccion, 'seccion_seleccionada');
                    break;
                }    
            }
        }
    }

    const handleAgregarSecciones = () => {
        let data = [...secciones];
        data.push({
            id: `Sección ${data.length + 1}`,
            estudiantes : []
        });
        handleChangeComp(data, 'secciones');
    }

    const handleEliminarSecciones = (index) => {
        let data = [...secciones];
        data.splice(index, 1);

        let newData = data.map( (item, index) => {
            item.id = `Sección ${index + 1}`;
            return item;
        })
        handleChangeComp(newData, 'secciones');
    }

    const finishStep = () => {
        let error = verifyData();
        if (!error){
            handleWarning();
            sendSectionsData();
        } else handleWarning();
    }

    const handleWarning = () => setOpen(!open);
    
    return( 
        <Fragment>
            <Grid item xs={12}>
                <Paper className="paper-crear-test" style={{display : 'contents'}}>
                    <Box style={{display: 'flex', AlignItems: 'center'}}>
                        <Grid item lg={3} sm={3} xl={3} xs={3}>
                            <Button
                                type="submit"
                                variant="contained"
                                style={{background:"#6a3df3", color : "white", marginRight: '8px'}}
                                onClick={ () => handleChangeStep( tipoConfiguracion === 'Configuración Dinámica' ? 'step_2' : 'step_1')}
                                endIcon={<NavigateBeforeIcon/>}
                            >
                                Paso Anterior
                            </Button>
                        </Grid>
                        <Grid item lg={6} sm={6} xl={6} xs={6}  style={{textAlign : 'center'}}>
                            <Typography variant="h6">
                                Paso - Asignar Secciones e Invitaciones
                            </Typography>
                        </Grid>
                        <Grid item lg={3} sm={3} xl={3} xs={3}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="red"
                                style={{background : "#ff4949", color : "white"}}
                                onClick={handleWarning}
                                endIcon={<PublishIcon/>}
                            >
                                Finalizar Creación
                            </Button>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
            <Grid container spacing={4} style={{marginTop : '4px'}}>
                <Grid item lg={4} md={4} xl={4} xs={12}>
                    <ListaSecciones 
                        handleAgregarSecciones = {handleAgregarSecciones}
                        handleEliminarSecciones = {handleEliminarSecciones}
                        handleSeleccionarSeccion = {handleSeleccionarSeccion}
                        handleLoading = {handleLoading}
                    />
                </Grid>
                <Grid item lg={8} md={8} xl={8} xs={12}>
                    <ListaEstudiantes 
                        handleAgregarEstudiante = {handleAgregarEstudiante}
                        handleLoading = {handleLoading}
                    />
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleWarning}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Advertencia"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿Está seguro que desea terminar la creación del examen?
                        </DialogContentText>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleWarning} color="secondary">
                        No, aún no
                    </Button>
                    <Button onClick={() => finishStep()} color="primary" autoFocus>
                        Sí, estoy seguro
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={alertModal} autoHideDuration={5000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseAlert} severity="error">
                    Debe heber al menos una sección con al menos un estudiante.
                </Alert>
            </Snackbar>
            { loading && <Loading/> }
        </Fragment>
    )
}

export default StepSecciones;
