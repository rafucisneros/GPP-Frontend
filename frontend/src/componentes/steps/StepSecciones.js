import React, { useState, Fragment }  from 'react';
import uuid from 'uuid/v1';

// componentes
import ListaSecciones from '../../componentes/lista_secciones/ListaSecciones.js';
import ListaEstudiantes from '../../componentes/lista_estudiantes/ListaEstudiantes.js';

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
    // const [ secciones ] = useState([...props.secciones]);
    // const [ seccionSeleccionada ] = useState(props.seccionSeleccionada);
    // const [ estudiantes ] = useState([...props.estudiantes]);

    const handleAgregarEstudiante = (estudiante) => {
        props.handleChangeEstudiantes(estudiante)
    }

    const handleSeleccionarSeccion = (id) => {
        if (props.secciones.length > 0){
            for( let seccion of props.secciones){
                if(seccion.id === id) {
                    props.handleChangeSeccionSeleccionada(seccion);
                    break;
                }    
            }
        }
    }

    const handleAgregarSecciones = () => {
        let data = [...props.secciones];
        data.push({
            id: uuid(),
            estudiantes : []
        });
        props.handleUpdateSecciones(data);
    }

    const handleEliminarSecciones = (index) => {
        let data = [...props.secciones];
        data.splice(index, 1);
        props.handleUpdateSecciones(data);
    }
    
    return( 
        <Fragment>
            <Grid item xs={12}>
                <Paper className="paper-crear-test" style={{display : 'contents'}}>
                    <Box className="flex-box-titulo">
                        <Box style={{height : 'auto'}}>
                            <Typography variant="h6">
                                Paso - Asignar Secciones
                            </Typography>
                        </Box>
                    <Box >
                        <Button
                            style={{background:"#7e5ca8", color : "white", marginRight: '8px'}}
                            type="submit"
                            variant="contained"
                            color="red"
                            endIcon={<SaveIcon/>}
                            onClick={ () => props.sendSectionsData()}
                        >
                            Guardado Manual
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{marginRight: '8px'}}
                            onClick={ () => props.handleChangeStep( props.tipoConfiguracion === 'Configuración Dinámica' ? 'step_2' : 'step_1')}
                            endIcon={<NavigateBeforeIcon/>}
                        >
                            Paso Anterior
                        </Button>
                        <Button
                            style={{background:"#ff4949", color : "white"}}
                            type="submit"
                            variant="contained"
                            color="red"
                            onClick={ () => props.sendSectionsData()}
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
                            secciones = {[...props.secciones]}
                            handleAgregarSecciones = {handleAgregarSecciones}
                            handleEliminarSecciones = {handleEliminarSecciones}
                            handleSeleccionarSeccion = {handleSeleccionarSeccion}
                            seccionSeleccionada = {props.seccionSeleccionada}
                        />
                    </Grid>
                    <Grid item lg={8} md={8} xl={8} xs={12}>
                        <ListaEstudiantes 
                            secciones = {[...props.secciones]}
                            seccionSeleccionada = {props.seccionSeleccionada}
                            handleAgregarEstudiante = {handleAgregarEstudiante}
                            estudiantes = {[...props.estudiantes]}
                            handleUpdateSecciones = {props.handleUpdateSecciones}
                        />
                    </Grid>
                </Grid>
        </Fragment>
    )
}

export default StepSecciones;
