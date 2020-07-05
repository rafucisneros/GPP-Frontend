import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

// materials
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';

// context
import { useGeneral } from '../../context/generalContext';

export default function MenuGrafica({}) {

    const [ clickItem, setClickItem ] = useState();
    const { setContentMenu } = useGeneral();

    const handleClickItem = (flag) => {
        if(flag === 'dashboard'){
            setClickItem('dashboard');
            setContentMenu('grafica general');
        } else if(flag === 'compare'){
            setClickItem('compare');
            setContentMenu('grafica compare');
        }
    }

    return(
        <Fragment>
            <List>
                <Link to="/home" className="link">
                    <ListItem
                        button
                        selected={clickItem === 'menu'}
                        onClick={ () => setClickItem('menu')}
                    >
                    <ListItemIcon>
                        <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography type="body2" style={{ fontSize: 'inherit' }}>Menú Principal</Typography>}
                    />
                    </ListItem>
                </Link>
                <ListItem
                    button
                    selected={clickItem === 'dashboard'}
                    onClick={ () => handleClickItem('dashboard')}
                >
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                    primary={<Typography type="body2" style={{ fontSize: 'inherit' }}>Datos Generales</Typography>}
                />
                </ListItem>
                <ListItem
                    button
                    selected={clickItem === 'compare'}
                    onClick={ () => handleClickItem('compare')}
                >
                <ListItemIcon>
                    <CompareArrowsIcon />
                </ListItemIcon>
                <ListItemText
                    primary={<Typography type="body2" style={{ fontSize: 'inherit' }}>Comparar Secciones</Typography>}
                />
                </ListItem>
                <Link to={"/exams"} className='link'>
                    <ListItem
                        button 
                        style={{paddingLeft : '38px'}} 
                    >
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary={<Typography type="body2" style={{ fontSize: 'inherit' }}> Ver Examenes </Typography>}
                        />
                    </ListItem>
                </Link>
            </List>
            <Divider/>
        </Fragment>
    )
}