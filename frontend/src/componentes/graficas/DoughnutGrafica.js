import React, { Fragment } from 'react';
import { Doughnut } from 'react-chartjs-2';

const numeroAleatorio = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

export default function GraphicPage(props){

    const dataDoughnut = {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            borderWidth: 1,
            label: props.title,
            // hidden: true,
            data: [numeroAleatorio(0, 100), numeroAleatorio(0, 100)],
            backgroundColor: [
                'rgba(75, 192, 192, 0.4)',
                'rgba(255, 99, 132, 0.4)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            hoverBackgroundColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
            ]
        }],
        labels: ['Aprobados', 'Reprobados',],
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

    return(
        <Fragment>
            <Doughnut 
                data={dataDoughnut}
                options={options}
                // width={4}
                // height={3.5}
                // ref={(reference) => this.chart = reference}
            />
            {/* <Grid item xs={6} md={6} lg={6}>
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
            </Grid> */}
        </Fragment>
        
    )
}