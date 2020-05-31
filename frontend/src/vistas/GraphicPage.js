import React, { Fragment } from 'react';
import { Bar, defaults, Doughnut, Pie, Polar, Radar } from 'react-chartjs-2';

// materials
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

// assets
import '../assets/css/mantenimientoPage.css';

// context
import { useGeneral } from '../context/generalContext';

const numeroAleatorio = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

const dataDoughnut = {
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        borderWidth: 1,
        label: 'Gráfica',
        // hidden: true,
        data: [numeroAleatorio(0, 100), numeroAleatorio(0, 100), numeroAleatorio(0, 100), numeroAleatorio(0, 100), numeroAleatorio(0, 100), numeroAleatorio(0, 100)],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        hoverBackgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ]
    }],

    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
};

const dataBar = {
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            borderWidth: 1,
            label: 'Data 1',
            // hidden: true,
            data: [numeroAleatorio(0, 100), numeroAleatorio(0, 100), numeroAleatorio(0, 100), numeroAleatorio(0, 100), numeroAleatorio(0, 100), numeroAleatorio(0, 100)],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            hoverBackgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)'
            ]
        },{
            borderWidth: 1,
            label: 'Data 2',
            // hidden: true,
            data: [numeroAleatorio(0, 100), numeroAleatorio(0, 100), numeroAleatorio(0, 100), numeroAleatorio(0, 100), numeroAleatorio(0, 100), numeroAleatorio(0, 100)],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            hoverBackgroundColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)'
            ]
        },
        {
            borderWidth: 1,
            label: 'Data 3',
            // hidden: true,
            data: [numeroAleatorio(0, 100), numeroAleatorio(0, 100), numeroAleatorio(0, 100), numeroAleatorio(0, 100), numeroAleatorio(0, 100), numeroAleatorio(0, 100)],
            backgroundColor: [
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            hoverBackgroundColor: [
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)'
            ]
        },
],

    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
};

const optionsBar = {
    title: {
        display: true,
        text: 'Gráfica'
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

const options = {
    title: {
        display: true,
        text: 'Gráfica'
    }
    // scales: {
    //     xAxes: [{
    //         stacked: true
    //     }],
    //     yAxes: [{
    //         stacked: true
    //     }]
    // }
};

export default function GraphicPage(){

    const { setContentMenu } = useGeneral();
    setContentMenu(`general`);

    return(
        <Fragment>
            <div className="toolbar-icono"/>
                <Container maxWidth="lg" style={{paddingTop: '32px'}}>
                    <Grid container spacing={3} >
                        <Grid item xs={6} md={6} lg={6}>
                            <Paper>
                                <Box style={{padding : '16px'}}>
                                    <Bar 
                                        data={dataBar}
                                        options={optionsBar}
                                        // width={4}
                                        // height={3.5}
                                        // ref={(reference) => this.chart = reference}
                                    />
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Paper>
                                <Box style={{padding : '16px'}}>
                                    <Doughnut 
                                        data={dataDoughnut}
                                        options={options}
                                        // width={4}
                                        // height={3.5}
                                        // ref={(reference) => this.chart = reference}
                                    />
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Paper>
                                <Box style={{padding : '16px'}}>
                                    <Polar 
                                        data={dataDoughnut}
                                        options={options}
                                        // width={4}
                                        // height={3.5}
                                        // ref={(reference) => this.chart = reference}
                                    />
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Paper>
                                <Box style={{padding : '16px'}}>
                                    <Pie 
                                        data={dataDoughnut}
                                        options={options}
                                        // width={4}
                                        // height={3.5}
                                        // ref={(reference) => this.chart = reference}
                                    />
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
    </Fragment>
        
    )
}