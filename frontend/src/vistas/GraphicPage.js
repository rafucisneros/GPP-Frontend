import React, { Fragment } from 'react';

// componentes
import GeneralDashboard from '../componentes/graficas/GeneralDashboard';
import CompareDashboard from '../componentes/graficas/CompareDashboard';

// assets
import '../assets/css/mantenimientoPage.css';

// context
import { useGeneral } from '../context/generalContext';

export default function GraphicPage(){

    const { contentMenu, setContentMenu } = useGeneral();
    setContentMenu(`grafica general`);

    return(
        <Fragment>
            {
                contentMenu.split(' ')[1] === 'compare' 
                    ? <CompareDashboard/>
                    : <GeneralDashboard/>
                
            }
        </Fragment>
        
    )
}