/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
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
  Snackbar,
  Alert
 } from '@mui/material';
 import * as XLSX from 'xlsx';
 import './backoffice.css';

 const apiURL = 'https://localhost:44311';

 
const Backoffice = ({auth}) => {
  const [valuePanel, setValuePanel] = React.useState(0);
  const [selectedFile, setSelectedFile] = React.useState('');
  const [cargaAlumnos, setCargaAlumnos] = React.useState([]);
  const [nCursada, setNCursada] = React.useState();
  const [nCursada2, setNCursada2] = React.useState('');
  const [nombre, setNombre] = React.useState();
  const [dni, setDni] = React.useState();
  const [edad, setEdad] = React.useState();
  const [email, setEmail] = React.useState();
  const [emailUnlam, setEmailUnlam] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [messageSnackBar, setMessageSnackBar] = React.useState('');
  const [severitySnackBar, setSeveritySnackBar] = React.useState('success');

  const headers = { 
    'Authorization': auth,
    'Content-type': 'application/json; charset=iso-8859-1',
  };

  React.useEffect(() => {
    console.log(auth);
  }, []);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const handleChangePanel = (event, newValue) => {
    setValuePanel(newValue);
  }

  const convertToJson = (event) => {
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
        console.log(alumnos);
        setCargaAlumnos(alumnos);
      }
  };

  const handleCursada = (event) => {
    setNCursada(event.target.value);
  };

  const handleCursada2 = (event) => {
    setNCursada2(event.target.value);
    event.preventDefault();
  };

  const handleNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleDni = (event) => {
    setDni(event.target.value);
  };

  const handleEdad = (event) => {
    setEdad(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailUnlam = (event) => {
    setEmailUnlam(event.target.value);
  };

  const altaAlumnosMasiva = () => {
    axios.post(apiURL + '/api/altamasivausuarios/postaltamasiva', cargaAlumnos, {headers})
      .then(response => {
        if(response) { 
          setMessageSnackBar('Alta masiva creada correctamente');
          setSeveritySnackBar('success');
          setOpen(true);
        }
      });
  };


  const altaAlumnoIndividual = () => {
    const object = {
      nombre: nombre,
      dni: dni,
      edad: edad,
      email: email,
      emailUnlam: emailUnlam,
      idTipo: 2,
      idCursada: nCursada2
    };

    axios.post(apiURL + '/api/usuario', object, {headers})
      .then(response => {
        if(response) { 
          setMessageSnackBar('Usuario creado correctamente');
          setSeveritySnackBar('success');
          setOpen(true);
        }
      })
      .catch(err => {
        if(err.toString().includes('400')) {
          console.log('UPS');
          setMessageSnackBar('Usuario existente');
          setSeveritySnackBar('error');
          setOpen(true);
        }
        if(err.toString().includes('500')) {
          setMessageSnackBar('Usuario creado correctamente');
          setSeveritySnackBar('success');
          setOpen(true);
        }
      })

    console.log(object);
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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
            Very soon...
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
                <form>
                <TextField
                  key="cursada"
                  label="N° Cursada"
                  onChange={handleCursada}
                  required
                  id="cursada"
                  name="cursada"
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
                  onClick={() => altaAlumnosMasiva()}
                  style={{ width: '10em', height: '2em', marginTop: '0.5em' }}
                >ALTA MASIVA
                </Button>
              </form>
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
                  key="cursada2"
                  id="cursada2"
                  className="textField"
                  label="N° Cursada 2"
                  onChange={handleCursada2}
                  value={nCursada2}
                />
                <TextField
                  key="nombre"
                  id="nombre"
                  className="textField"
                  label="Nombre"
                  onChange={handleNombre}
                  value={nombre}
                />
                <TextField
                  key="dni"
                  id="dni"
                  className="textField"
                  label="Dni"
                  onChange={handleDni}
                  value={dni}
                />
                <TextField
                  key="edad"
                  id="edad"
                  className="textField"
                  label="Edad"
                  onChange={handleEdad}
                  value={edad}
                />
                <TextField
                  key="email"
                  id="email"
                  className="textField"
                  label="Email"
                  onChange={handleEmail}
                  value={email}
                />
                <TextField
                  key="emailunlam"
                  id="emailunlam"
                  className="textField"
                  label="Email Unlam"
                  onChange={handleEmailUnlam}
                  value={emailUnlam}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
              <Button
                style={{ alignItems: 'center' }}
                variant="contained"
                color="secondary"
                onClick={() => altaAlumnoIndividual()}
                style={{ width: '7em', height: '2em', marginBottom: '2em' }}
                >GUARDAR
                </Button>
            </div>
            <Divider />
          </TabPanel>
          <TabPanel value={valuePanel} index={2}>
            Very soon...
          </TabPanel>
          <TabPanel value={valuePanel} index={3}>
            Very soon...
          </TabPanel>
        </Paper>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      >
        <Alert
        onClose={handleClose}
        severity={severitySnackBar} sx={{ width: '100%' }}>
          {messageSnackBar}
        </Alert>
      </Snackbar>
    </Container>
  )
};

export default Backoffice;