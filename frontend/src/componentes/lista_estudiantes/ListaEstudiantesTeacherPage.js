import React, { useState, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DataTable from '../datatable/DataTable.js';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const columns = [
  { title: 'Correo Electrónico', field: 'email', defaultSort : 'asc'  },
]


export const ListaEstudiantes = ({ secciones }) => {
  const [activeTab, setActiveTab] = useState(0)
  const changeTab = (event, newTab) => {
    setActiveTab(newTab)
  }
  return (
    <Fragment>
      <AppBar position="static">
        <Tabs value={activeTab} onChange={changeTab} aria-label="secciones">
          {Object.keys(secciones).map( (section, index) => <Tab label={"Sección " + (index + 1)}  />)}
        </Tabs>
      </AppBar>
       {Object.keys(secciones).map( (section, index) => (
        <TabPanel value={activeTab} index={index}>
          <DataTable 
            title={"Sección " + (index + 1)} 
            data={secciones[section].students.concat(secciones[section].missing_emails).map( x => {
              return {
                email: x
              }
            })} 
            columns={columns} 
          />
        </TabPanel>
       ))}
    </Fragment>

  )
}