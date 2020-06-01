import React, { } from 'react';

// material
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default () => <TestDetailsPage></TestDetailsPage>

const TestDetailsPage = () => {
    
    const [basicConfigExpanded, setBasicConfigExpanded] = React.useState(true);
    const handleChangeBasicConfigExpanded = () => {
        setBasicConfigExpanded(!basicConfigExpanded);
    };
    
    const [questionsExpanded, setQuestionsExpanded] = React.useState(true);
    const handleChangeQuestionsExpanded = () => {
        setQuestionsExpanded(!questionsExpanded);
    };

    const [listSectionsExpanded, setListSectionsExpanded] = React.useState(true);
    const handleChangeListSectionsExpanded = () => {
        setListSectionsExpanded(!listSectionsExpanded);
    };

    return (
        <div>
            <div className="toolbar-icono"/>
            <Container maxWidth="lg" style={{paddingTop: '32px', paddingBottom: '32px'}}>
                <Grid container spacing={2}>
                    {/* Configuración Basica */}
                    <ExpansionPanel expanded={basicConfigExpanded} onChange={handleChangeBasicConfigExpanded}>
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>Configuración Básica</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    {/* Preguntas */}
                    <ExpansionPanel expanded={questionsExpanded} onChange={handleChangeQuestionsExpanded}>
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>Preguntas</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    {/* Lista Secciones */}
                    <ExpansionPanel expanded={listSectionsExpanded} onChange={handleChangeListSectionsExpanded}>
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>Lista de Secciones</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
            </Container>
        </div>
    );
}