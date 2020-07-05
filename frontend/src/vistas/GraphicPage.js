import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

// componentes
import GeneralDashboard from '../componentes/graficas/GeneralDashboard';
import CompareDashboard from '../componentes/graficas/CompareDashboard';

// assets
import '../assets/css/mantenimientoPage.css';

// context
import { useGeneral } from '../context/generalContext';

// servicios
import { getResultadosEstadisticas } from '../servicios/servicioGeneral';

export default function GraphicPage(props){

    const { contentMenu, setContentMenu } = useGeneral();
    const [ redirectExams, setRedirectExams ] = useState(false);
    const [ estadisticas, setEstadisticas ] = useState(false);
    setContentMenu(`grafica general`);

    // GET requests y componentes de montaje
    useEffect(() => {
        if (props.match && props.match.params && props.match.params.id && !isNaN(props.match.params.id)){
            getResultadosEstadisticas(props.match.params.id)
            .then( res => {
                if (res.data) {
                    setEstadisticas(res.data);
                }
            })
        } else{
            setRedirectExams(true);
        }

    }, [])

    const createDataBar = (data) => {
        let correctAnswers = [];
        let incorrectAnswers = [];
        let naAnswers = [];
        let labels = [];

        Object.keys(data).forEach( key => {
            labels.push(data[key]);
            correctAnswers.push(data[key].correct /  data[key].total);
            incorrectAnswers.push(data[key].incorrect /  data[key].total);
            naAnswers.push(data[key].empty /  data[key].total);
        })
        return [correctAnswers, incorrectAnswers, naAnswers, labels];
    }

    const createDataDoughnut = (data) => {
        console.log("Doughnut")
    }

    console.log(contentMenu)
    // debugger

    return(
        <Fragment>
            {
                redirectExams && <Redirect to={'/exams'}/>
            }
            {
                contentMenu.split(' ')[1] === 'compare' 
                    ? 
                        <CompareDashboard 
                            estadisticas = {estadisticas}
                            createDataBar = {createDataBar}
                            createDataDoughnut = {createDataDoughnut}
                        />
                    : 
                        <GeneralDashboard 
                            estadisticas = {estadisticas}
                            createDataBar = {createDataBar}
                            createDataDoughnut = {createDataDoughnut}
                        />
                
            }
        </Fragment>
        
    )
}