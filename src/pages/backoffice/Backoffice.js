import React from 'react';
import axios from 'axios';

import {
  Container,
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Button,
  TextField,
  Divider,
 } from '@mui/material';
 import * as XLSX from 'xlsx';
 import './backoffice.css';

 const apiURL = 'https://localhost:44311';
 const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im1pY2FAYWRtaW4uY29tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwibmJmIjoxNjM1Mjg5NzYzLCJleHAiOjE2MzUyOTMzNjMsImlhdCI6MTYzNTI4OTc2M30.Wzp9H5JYPHk5-SUJO0lN_zFeOXi8EaJGP0AQmAGKhrE"
 const headers = { 
  'Authorization': token,
};
 
const Backoffice = () => {
  const [valuePanel, setValuePanel] = React.useState(0);
  const [selectedFile, setSelectedFile] = React.useState('');
  const [cargaAlumnos, setCargaAlumnos] = React.useState([]);
  const [nCursada, setNCursada] = React.useState('');

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const handleChangePanel = (event, newValue) => {
    setValuePanel(newValue);
  }

  const handleNCursada = (event) => {
    const value = event.target.value;
    console.log(value);
    setNCursada(value);
  }

  const convertToJson = (event) => {
    console.log(event);
    const target = event.target;

    let hojas = [];
    let alumnos = [];
    let reader = new FileReader();
      reader.readAsArrayBuffer(target.files[0]);
      reader.onloadend = (e) => {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});

        workbook.SheetNames.forEach(function(sheetName) {
          // Here is your object
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          hojas.push({
            data: XL_row_object,
            sheetName
          })
        })
        
        hojas[0].data.forEach((row) => {
          if (row) {
            alumnos.push({
              nombre: row.nombre,
              dni: row.dni,
              email: row.email,
              emailUnlam: row.emailUnlam,
              password: row.Password.toString(),
              edad: row.edad,
              idTipo: 3,
              IdCursada: nCursada,
            })
          }
        })
        console.log(hojas[0].data);
        console.log(alumnos);
        setCargaAlumnos(alumnos);
      }
  }

  const altaAlumnos = () => {
    axios.post(apiURL + '/api/altamasivausuarios/postaltamasiva', cargaAlumnos, {headers})
      .then(response => {
        console.log(response.data);
      })
  };

  const TabPanel = (props) => {
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
          <Box sx={{ p: 3 }}>
            <Typography variant="text">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return(
    <Container maxWidth="xl"
      style={{
        padding: '4em',
      }}
    >
      <Tabs
        value={valuePanel}
        onChange={handleChangePanel}
        aria-label="basic tabs example"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab label="General" {...a11yProps(0)} />
        <Tab label="Alumnos" {...a11yProps(1)} />
        <Tab label="Novedades" {...a11yProps(2)} />
        <Tab label="Expo Proyecto" {...a11yProps(3)} />
      </Tabs>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '100%',
            height: '70vh',
          },
        }}
      >
        <Paper
          elevation={0}
          style={{
            border: '1px solid rgb(225, 227, 234)',
            marginTop: '3em',
            borderRadius: '20px',
          }}
        >
          <TabPanel value={valuePanel} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={valuePanel} index={1}>
            <Typography variant="h5" color="text.secondary">Alta masiva de alumnos</Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '50%',
                marginTop: '2em',
                marginBottom: '2em',
              }}>
              <TextField
                label="N° Cursada"
                onChange={handleNCursada}
                value={nCursada}
              />
              <input
                className="input-file"
                style={{ marginTop: '1em'}}
                type="file"
                value={selectedFile}
                onChange={convertToJson}>
              </input>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => altaAlumnos()}
                style={{ width: '7em', height: '2em', marginTop: '0.5em' }}
              >ALTA
              </Button>
            </div>
            <Divider />
            <Typography
              variant="h5"
              color="text.secondary"
              style={{ marginTop: '1em' }}
            >Alta manual de alumnos</Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                marginTop: '2em',
                marginBottom: '2em',
                width: '50%'
              }}>
              <TextField
                className="textField"
                label="N° Cursada"
                onChange={handleNCursada}
                value={nCursada}
              />
              <TextField
                className="textField"
                label="Nombre"
                // onChange={handleNCursada}
                // value={nCursada}
              />
              <TextField
                className="textField"
                label="Dni"
                onChange={handleNCursada}
                value={nCursada}
              />
              <TextField
                className="textField"
                label="Edad"
                // onChange={handleNCursada}
                // value={nCursada}
              />
              <TextField
                className="textField"
                label="Email"
                // onChange={handleNCursada}
                // value={nCursada}
              />
              <TextField
                className="textField"
                label="Email Unlam"
                // onChange={handleNCursada}
                // value={nCursada}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
              <Button
                style={{ alignItems: 'center' }}
                variant="contained"
                color="secondary"
                onClick={() => altaAlumnos()}
                style={{ width: '7em', height: '2em', marginBottom: '2em' }}
                >ALTA
                </Button>
            </div>
            <Divider />
          </TabPanel>
          <TabPanel value={valuePanel} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={valuePanel} index={3}>
            Item Four
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  )
};

export default Backoffice;