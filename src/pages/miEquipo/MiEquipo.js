import React from 'react';
import axios from 'axios';

import session from '../../services/session';

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
  Alert,
  TableRow,
  TableCell,
  Collapse,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
 } from '@mui/material';
 import './miequipo.css';

 const apiURL = 'https://localhost:44311';
 const headers = { 
  'Authorization': session().token,
  'Content-type': 'application/json; charset=iso-8859-1',
};

const user = session().usuario;

const MiEquipo = () => {
  const [proyecto, setProyecto] = React.useState([]);
  const [equipos, setEquipos] = React.useState([]);
  const [equipoPersona, setEquipoPersona] = React.useState([]);
  const [miInfo, setMiInfo] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageSnackBar, setMessageSnackBar] = React.useState('');
  const [severitySnackBar, setSeveritySnackBar] = React.useState('success');

  React.useEffect(() => {
    const team = [];
    axios.get(apiURL + '/api/proyecto', {headers})
        .then((response) => {
          if (response) {
            setProyecto(response.data);
            team.push(response.data);
          }
          axios.get(apiURL + '/api/equipo', {headers})
            .then((response) => {
              if (response) {
                setEquipos(response.data);
                team.push(response.data);
              } 
              
              axios.get(apiURL + '/api/equipopersona', {headers})
              .then((response) => {
                if (response) {
                  setEquipoPersona(response.data);
                  team.push(response.data);
                }
              setMiInfo(normalizeInfo(team)[0]);
            });
          });
        });
  }, []);

  const normalizeInfo = (data) => {
    const proyecto = data[0];
    const equipo = data[1];
    const equipoPersona = data[2];
    const info = [];
    if (data) {
      const miEquipoPersona = equipoPersona.find(equipo => equipo.idPersona === user.id);
      if (miEquipoPersona) {
        const miEquipo = equipo.find(x => x.idEquipo === miEquipoPersona.idEquipo);
        if (miEquipo) {
          const miProyecto = proyecto.find(pro => pro.idProyecto === miEquipo.idProyecto);
          info.push(miProyecto);
        }
      }
    }
    return info;
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const submitEditProyecto = (e) => {
    e.preventDefault();
    console.log(miInfo.idProyecto);
    const obj = {
      idProyecto: miInfo.idProyecto,
      rutaFoto: e.target.foto?.value.substr(12, e.target.foto?.value.length - 1),
      // repositorio: e.target.repositorio?.value,
      // rutaVideo: e.target.rutaVideo?.value,
    };

    axios.put(apiURL + `/api/proyecto/${miInfo.idProyecto}`, obj, {headers}).then((response) => {
      if (response) {
        setMessageSnackBar('Nueva novedad generada correctamente');
        setSeveritySnackBar('success');
        setOpen(true);
      }
    })
  };

  return (
    <Container maxWidth="xl"
      sx={{ padding: {xs: '0.5em', md: '0.5em', lg: '4em'} }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '100%',
            height: 'auto',
            minHeight: '70vh',
          },
        }}
      >
        <Paper
          elevation={0}
          style={{
            border: '1px solid rgb(225, 227, 234)',
            marginTop: '3em',
            borderRadius: '20px',
            padding: '2em',
          }}
        >
          <Chip label={"Mi Proyecto: " + miInfo?.nombre} color="primary" />
          <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: '2em',
                marginBottom: '2em',
              }}>
                <form
                  className="forms"
                  onSubmit={submitEditProyecto}
                  name="cursada"
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{marginBottom: '1em'}}
                  >Descripción</Typography>
                  <TextField
                    // label="Descripción"
                    name="descripcion"
                    value={miInfo?.descripcion}
                    fullWidth
                    style={{marginRight: '2em', marginBottom: '2em'}}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{marginBottom: '1em'}}
                  >Propuesta de Valor</Typography>
                  <TextField
                    // label="Propuesta de Valor"
                    name="descripcion"
                    value={miInfo?.propuestaValor}
                    fullWidth
                    style={{marginRight: '2em', marginBottom: '2em'}}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{marginBottom: '1em'}}
                  >Repositorio</Typography>
                  <TextField
                    // label="Repositorio"
                    name="descripcion"
                    fullWidth
                    value={miInfo?.repositorio ? miInfo.repositorio : null}
                    style={{marginRight: '2em', marginBottom: '2em'}}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{marginBottom: '1em'}}
                  >Ruta de video</Typography>
                  <TextField
                    // label="Ruta video"
                    name="rutaVideo"
                    fullWidth
                    value={miInfo?.rutaVideo ? miInfo.rutaVideo : null}
                    style={{marginRight: '2em', marginBottom: '2em'}}
                  />
                  <br />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{marginBottom: '1em'}}
                  >Seleccione la imagen principal para su proyecto</Typography>
                  <Button
                    variant="raised"
                    component="label"
                    classNamE="buttonLabel"
                  >
                    <input
                      type="file"
                      name="foto"
                     // hidden
                    />
                  </Button>
                  <br/>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled
                  >
                    Guardar cambios
                  </Button>
                </form>
              </div>
            
            <Divider />
            <Typography variant="h5" color="text.secondary" 
              style={{ marginTop: '1em' }}>Entregas</Typography><br />
            <Typography variant="body2" color="text.secondary">Seleccione los archivos a entregar</Typography>
            <div>
              Very soon...
            </div>
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

export default MiEquipo;
