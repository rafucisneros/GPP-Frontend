import React, { useState, Fragment }  from 'react';
import uuid from 'uuid/v1';

// componentes
import ListaSecciones from '../../componentes/lista_secciones/ListaSecciones.js';
import ListaEstudiantes from '../../componentes/lista_estudiantes/ListaEstudiantes.js';

// material
import Typography from '@material-ui/core/Typography';
import PublishIcon from '@material-ui/icons/Publish';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const res = [
    { 
        name : 'Andrés Buelvas', email : '13-10184@usb.ve'
    },
    { 
        name : 'Ritces Parra', email : ''
    },
    { 
        name : 'Jefferson Gutierritos', email : 'jefferson@usb.ve'
    },
    { 
        name : 'Alvin Yakitori', email : 'alvin@usb.ve'
    },
    { 
        name : 'Donato Bracuto', email : 'seccion_5'
    },
    { 
        name : 'Rafael Cisneros', email : 'seccion_6'
    },
    { 
        name : 'Miguel Canedo', email : 'seccion_7'
    },
    { 
        name : 'Carolina Martínez', email : 'seccion_8'
    },
    { 
        name : 'Andrés Buelvas', email : '13-10184@usb.ve'
    },
    { 
        name : 'Ritces Parra', email : ''
    },
    { 
        name : 'Jefferson Gutierritos', email : 'jefferson@usb.ve'
    },
    { 
        name : 'Alvin Yakitori', email : 'alvin@usb.ve'
    },
    { 
        name : 'Donato Bracuto', email : 'seccion_5'
    },
    { 
        name : 'Rafael Cisneros', email : 'seccion_6'
    },
    { 
        name : 'Miguel Canedo', email : 'seccion_7'
    },
    { 
        name : 'Carolina Martínez', email : 'seccion_8'
    },
]

const StepSecciones = (props) => {
    const [ secciones, setSecciones ] = useState([]);
    const [ seccionSeleccionada, setSeccionSeleccionada] = useState(null);
    const [ estudiantes, setEstudiantes ] = useState(res);

    const handleAgregarEstudiante = (estudiante) => {
        setEstudiantes(estudiante);
    }

    const handleSeleccionarSeccion = (id) => {
        if (secciones.length > 0){
            for( let seccion of secciones){
                if(seccion.id === id) {
                    setSeccionSeleccionada(seccion);
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
        setSecciones(data);
    }

    const handleEliminarSecciones = (index) => {
        let data = [...secciones];
        data.splice(index, 1);
        setSecciones(data);
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
                            onClick={ () => props.handleChangeStep('step_3')}
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
                            secciones = {secciones}
                            handleAgregarSecciones = {handleAgregarSecciones}
                            handleEliminarSecciones = {handleEliminarSecciones}
                            handleSeleccionarSeccion = {handleSeleccionarSeccion}
                            seccionSeleccionada = {seccionSeleccionada}
                        />
                    </Grid>
                    <Grid item lg={8} md={8} xl={8} xs={12}>
                        <ListaEstudiantes 
                            secciones = {secciones}
                            seccionSeleccionada = {seccionSeleccionada}
                            handleAgregarEstudiante = {handleAgregarEstudiante}
                            estudiantes = {estudiantes}
                        />
                    </Grid>
                </Grid>
        </Fragment>
    )
}

export default StepSecciones;
