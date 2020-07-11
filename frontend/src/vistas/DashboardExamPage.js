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

export default function DashboardExamPage(props){

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

    const createDataBar = (data, flag) => {
        let correctAnswers = [];
        let incorrectAnswers = [];
        let naAnswers = [];
        let labels = [];

        Object.keys(data).forEach( key => {
            labels.push(key);
            if (flag && flag === 'secciones'){
                correctAnswers.push(Number(( data[key].total_ans_correct / (data[key].total_ans / 100)).toFixed(2) ));
                incorrectAnswers.push(Number(( data[key].total_ans_incorrect / (data[key].total_ans / 100)).toFixed(2) ));
                naAnswers.push(Number(( data[key].total_ans_empty /(data[key].total_ans / 100)).toFixed(2) ));
            } else {
                correctAnswers.push(Number(( data[key].correct / (data[key].total / 100)).toFixed(2) ));
                incorrectAnswers.push(Number(( data[key].incorrect / (data[key].total / 100)).toFixed(2) ));
                naAnswers.push(Number(( data[key].empty /(data[key].total / 100)).toFixed(2) ));
            }
        })
        return [correctAnswers, incorrectAnswers, naAnswers, labels];
    }

    const createDataDoughnut = (data) => {
        return [data.passed, data.failed];
    }

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