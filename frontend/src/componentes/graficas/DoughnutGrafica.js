import React, { Fragment, useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const numeroAleatorio = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

export default function DoughnutGrafica(props){

    const [data, setData] = useState([])

    useEffect(() => {
        if (props.createDataDoughnut && props.data){
            let [data1, data2] = props.createDataDoughnut(props.data);
            setData([data1, data2]);
        }
    }, [props.createDataDoughnut, props.data])

    const dataDoughnut = {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            borderWidth: 1,
            label: props.title,
            // hidden: true,
            // data: [numeroAleatorio(0, 100), numeroAleatorio(0, 100)],
            data: data,
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
            text: props.title
        }
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
        </Fragment>
        
    )
}