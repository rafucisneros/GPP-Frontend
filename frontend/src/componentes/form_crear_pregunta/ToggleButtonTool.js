import React, { Fragment, useState } from 'react';

import TextFieldsIcon from '@material-ui/icons/TextFields';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

// assets
import latexSvgSelected from '../../assets/imagenes/latex_selected.svg';
import latexSvgNoSelected from '../../assets/imagenes/latex_no_selected.svg';
import './ToggleButtonTool.css';

export default function ToggleButtonTool(props){

    return (
        <Fragment>
            <ToggleButtonGroup value={props.formats} exclusive onChange={props.handleFormat} aria-label="text formatting">
                <ToggleButton size="small" value="text" aria-label="text">
                    <TextFieldsIcon style={{ width: '60px' }}/>
                </ToggleButton>
                <ToggleButton size="small" value="latex" aria-label="latex">
                    {props.formats === 'latex' ? 
                        <img className="toggle-button" src={latexSvgSelected} alt="_latex" /> :
                        <img className="toggle-button" src={latexSvgNoSelected} alt="_latex" />
                    }
                </ToggleButton>
            </ToggleButtonGroup>
        </Fragment>
    );
}