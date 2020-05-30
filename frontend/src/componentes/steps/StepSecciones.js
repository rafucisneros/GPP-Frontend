import React, { useState, Fragment }  from 'react';
import uuid from 'uuid/v1';

// componentes
import ListaSecciones from '../../componentes/lista_secciones/ListaSecciones.js';
import ListaEstudiantes from '../../componentes/lista_estudiantes/ListaEstudiantes.js';

// contexts
import { useCreateTestPage } from '../../context/createTestPageContext';

// material
import Typography from '@material-ui/core/Typography';
import PublishIcon from '@material-ui/icons/Publish';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const StepSecciones = (props) => {

    const {  
        handleChangeStep,
        handleChangeComp,
        secciones,
        tipoConfiguracion
    } = useCreateTestPage();

    const sendSectionsData = () => {
        let data = {};
        secciones.forEach( seccion => {
            if (seccion) {
                let students = seccion.estudiantes.map( estudiante => {
                    return estudiante.email;
                })
                data[`${seccion.id}`] = students;
            }
        })
        let request = { sections : data }
        // postSecciones(request, exam_id)
        // .then( res => {
        //     console.log(res)
        //     if (res) {
        //         console.log("Update Secciones")
        //     }
        // })
    }

    const handleAgregarEstudiante = (estudiante) => handleChangeComp(estudiante, 'estudiantes');

    const handleSeleccionarSeccion = (id) => {
        if (secciones.length > 0){
            for( let seccion of secciones){
                if(seccion.id === id) {
                    handleChangeComp(seccion, 'seccion_seleccionada');
                    break;
                }    
            }
        }
    }

    const handleAgregarSecciones = () => {
        let data = [...secciones];
        data.push({
            id: uuid(),
            estudiantes : []
        });
        handleChangeComp(data, 'secciones');
    }

    const handleEliminarSecciones = (index) => {
        let data = [...secciones];
        data.splice(index, 1);
        handleChangeComp(data, 'secciones');
    }

    const finishStep = () => {
        sendSectionsData();
        handleChangeStep('step_4');
    }
    
    return( 
        <Fragment>
            <Grid item xs={12}>
                <Paper className="paper-crear-test" style={{display : 'contents'}}>
                    <Box className="flex-box-titulo">
                        <Box style={{height : 'auto'}}>
                            <Typography variant="h6">
                                Paso - Asignar Secciones e Invitaciones
                            </Typography>
                        </Box>
                    <Box >
                        <Button
                            style={{background:"#7e5ca8", color : "white", marginRight: '8px'}}
                            type="submit"
                            variant="contained"
                            color="red"
                            endIcon={<SaveIcon/>}
                            onClick={ () => sendSectionsData()}
                        >
                            Guardado Manual
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{marginRight: '8px'}}
                            onClick={ () => handleChangeStep( tipoConfiguracion === 'Configuración Dinámica' ? 'step_2' : 'step_1')}
                            endIcon={<NavigateBeforeIcon/>}
                        >
                            Paso Anterior
                        </Button>
                        <Button
                            style={{background:"#ff4949", color : "white"}}
                            type="submit"
                            variant="contained"
                            color="red"
                            onClick={ () => finishStep()}
                            endIcon={<PublishIcon/>}
                        >
                            Publicar Examen
                        </Button>
                    </Box>
                    </Box>
                </Paper>
            </Grid>
                <Grid container spacing={4} style={{marginTop : '4px'}}>
                    <Grid item lg={4} md={4} xl={4} xs={12}>
                        <ListaSecciones 
                            handleAgregarSecciones = {handleAgregarSecciones}
                            handleEliminarSecciones = {handleEliminarSecciones}
                            handleSeleccionarSeccion = {handleSeleccionarSeccion}
                        />
                    </Grid>
                    <Grid item lg={8} md={8} xl={8} xs={12}>
                        <ListaEstudiantes 
                            handleAgregarEstudiante = {handleAgregarEstudiante}
                        />
                    </Grid>
                </Grid>
        </Fragment>
    )
}

export default StepSecciones;
