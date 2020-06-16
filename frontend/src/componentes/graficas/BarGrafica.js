import React, { Fragment } from 'react';
import { Bar } from 'react-chartjs-2';

const numeroAleatorio = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

export default function GraphicPage(props){

    const count = props.stack ? 33 : 100
    const dataBar = {
        datasets: [
            {
                borderWidth: 1,
                label: 'Respuestas Correctas',
                // yAxisID: "y-LastWeekData",
                // hidden: true,
                data: [numeroAleatorio(0, count), numeroAleatorio(0, count), numeroAleatorio(0, count), numeroAleatorio(0, count), numeroAleatorio(0, count), numeroAleatorio(0, count)],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(75, 192, 192, 0.4)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                hoverBackgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)'
                ]
            }, {
                borderWidth: 1,
                label: 'Respuestas Incorrectas',
                // yAxisID: "y-LastWeekData",
                // hidden: true,
                data: [numeroAleatorio(0, count), numeroAleatorio(0, count), numeroAleatorio(0, count), numeroAleatorio(0, count), numeroAleatorio(0, count), numeroAleatorio(0, count)],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(255, 99, 132, 0.4)'
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
                label: 'N/A',
                // yAxisID: "y-LastWeekData",
                // hidden: true,
                data: [numeroAleatorio(0, count), numeroAleatorio(0, count), numeroAleatorio(0, count), numeroAleatorio(0, count), numeroAleatorio(0, count), numeroAleatorio(0, count)],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.4)',
                    'rgba(255, 159, 64, 0.4)',
                    'rgba(255, 159, 64, 0.4)',
                    'rgba(255, 159, 64, 0.4)',
                    'rgba(255, 159, 64, 0.4)',
                    'rgba(255, 159, 64, 0.4)'
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                hoverBackgroundColor: [
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)'
                ]
            }
        ],
        labels: [`${props.type} 1`, `${props.type} 2`, `${props.type} 3`, `${props.type} 4`, `${props.type} 5`, `${props.type} 6`],
    };
    
    const optionsBar = {
        title: {
            display: true,
            text: props.title
        },
        scales: {
            yAxes: [
                {
                    display : true,
                    stacked: props.stack,
                    padding : 100,
                    ticks: {
                        min: 0,
                        max: 100,
                        stepSize: 10,
                        suggestedMin: 0,
                        suggestedMax: 100,
                        beginAtZero : true,
                        callback: function(value, index, values) {
                            return value + '%';
                        },
                    },
                    
                },
                // {
                //     display : true,
                //     // stacked: true,
                //     padding : 100,
                //     position: "right",
                //     ticks: {
                //         reverse: true,
                //         min: 0,
                //         max: 100,
                //         stepSize: 10,
                //         suggestedMin: 0,
                //         suggestedMax: 100,
                //         beginAtZero : true,
                //         callback: function(value, index, values) {
                //             return value + '%';
                //         },
                //     },
                    
                // },
            ],
            xAxes: [{
                stacked: props.stack
            }],
        }
    };

    return(
        <Fragment>
            <Bar 
                data={dataBar}
                options={optionsBar}
                // width={4}
                // height={3.5}
                // ref={(reference) => this.chart = reference}
            />
        </Fragment>
        
    )
}