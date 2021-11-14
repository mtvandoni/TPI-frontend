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
 import IconButton from '@mui/material/IconButton';
 import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
 import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
 import * as XLSX from 'xlsx';
 import './backoffice.css';
 import session from '../../services/session';
 import ModalEquipoEdit from './components/ModalEquipoEdit';

 const apiURL = 'https://localhost:44311';

 
const Backoffice = ({auth}) => {
  const [valuePanel, setValuePanel] = React.useState(0);
  const [selectedFile, setSelectedFile] = React.useState('');
  const [cargaAlumnos, setCargaAlumnos] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageSnackBar, setMessageSnackBar] = React.useState('');
  const [severitySnackBar, setSeveritySnackBar] = React.useState('success');
  const [cursada, setCursada] = React.useState('');
  const [upload, setUpload] = React.useState(true);
  const [alumnos, setAlumnos] = React.useState([]);
  const [profesores, setProfesores] = React.useState([]);
  const [alumnoName, setAlumnoName] = React.useState([]);
  const [profesorName, setProfesorName] = React.useState([]);
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const headers = { 
    'Authorization': session().token,
    'Content-type': 'application/json; charset=iso-8859-1',
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  React.useEffect(() => {
    axios.get(apiURL + '/api/cursada', {headers})
      .then((response) => {
        setCursada(response.data);
      });

    axios.get(apiURL + '/api/usuario', {headers})
      .then((response) => {
        setProfesores(normalizeUsuarios(response.data)[0]);
        setAlumnos(normalizeUsuarios(response.data)[1]);
      })
  }, [upload]);

  const normalizeUsuarios = (data) => {
    const object = [];
    const alumnos = [];
    const profesor = [];
    console.log(data);
    if (data) {
      data.forEach((item) => {
        if (item.idTipo === 3) {
          alumnos.push(item);
        }
        if (item.idTipo === 2) {
          profesor.push(item);
        }
      });
    }
    
    object.push(profesor, alumnos);
    return object;
  }

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
              IdCursada: cursada.idCursada,
            })
          }
        })
        console.log(alumnos);
        setCargaAlumnos(alumnos);
      }
  };

  const altaAlumnosMasiva = () => {
    axios.post(apiURL + '/api/altamasivausuarios/postaltamasiva', cargaAlumnos, {headers})
      .then(response => {
        if(response) { 
          setMessageSnackBar('Alta masiva generada correctamente');
          setSeveritySnackBar('success');
          setOpen(true);
        }
      });
  };

  const altaAlumnoIndividual = (e) => {
    e.preventDefault();
    const object = {
      nombre: e.target.nombre.value,
      dni: e.target.dni.value,
      edad: e.target.edad.value,
      email: e.target.email.value,
      emailUnlam: e.target.emailunlam.value,
      idTipo: 3,
      idCursada: cursada.idCursada
    };

    axios.post(apiURL + '/api/usuario', object, {headers})
      .then(response => {
        if(response) { 
          setMessageSnackBar('Usuario creado correctamente');
          setSeveritySnackBar('success');
          setOpen(true);
          setUpload(!upload);
          setUpload(!upload);
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
      });
  };

  const altaProfesor = (e) => {
    e.preventDefault();
    const object = {
      nombre: e.target.nombre.value,
      dni: e.target.dni.value,
      edad: e.target.edad.value,
      email: e.target.email.value,
      emailUnlam: e.target.emailunlam.value,
      descripcion: e.target.descripcion.value,
      idTipo: 2,
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
      });
  }

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

  const submitNuevaCursada = (e) => {
    e.preventDefault();
    axios.post(apiURL + '/api/cursada', {
      codCursada: e.target.codCursada.value,
      descripcion: e.target.descripcion.value,
      fechaInicio: e.target.fechaInicio.value,
      fechaFin: e.target.fechaFin.value,
    }, {headers})
      .then((response) => {
        if (response) {
          setMessageSnackBar('Alta de cursada generada correctamente');
          setSeveritySnackBar('success');
          setOpen(true);
          setUpload(!upload);
        }
      });
  };

  const submitNuevoEquipo = (e) => {
    e.preventDefault();
    const all = e.target.alumnos.value.split(',');
    const equipoPersonas = [];
    all.forEach((item) => {
      const idAlumno = alumnos.find(al => al.nombre === item);
      equipoPersonas.push({idPersona: idAlumno.id });
    });
    console.log(equipoPersonas);
    axios.post(apiURL + '/api/equipo', {
      nombre: e.target.nombre.value,
      equipoPersonas
    }, {headers}).then((response) => {
      if (response) {
        setMessageSnackBar('Alta de equipo generado correctamente');
          setSeveritySnackBar('success');
          setOpen(true);
          setUpload(!upload);
      }
    })
  };

  function createData(id, marca, concepto, valor, nombreEquipo) {
    return {
      id,
      marca,
      concepto,
      valor,
      nombreEquipo,
      alumnos: [
        {
          dni: '39347706',
          nombre: 'Micaela Vandoni',
        },
        {
          dni: '18446058',
          nombre: 'Anonymous',
        },
      ],
    };
  }

  const rowsEquipos = [
    createData(3, 'WEB TPI', 'Aplicación para la materia Taller Practico Integrador', 'Valor ....', 'Cronos'),
    createData(4, 'BOMBEROS LA MATANZA', 'Aplicación para siniestros en la zona de la matanza', 'Valor...', 'eBlast'),
    createData(5, 'ENLAZAR', 'Aplicación para siniestros en la zona de la matanza', 'Valor...', 'Asd'),
  ];


  const handleChangeAlumnos = (event) => {
    const {
      target: { value },
    } = event;
    setAlumnoName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log(typeof value === 'string' ? value.split(',') : value);
  };

  const handleChangeProfesores = (event) => {
    const {
      target: { value },
    } = event;
    setProfesorName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
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
        <Tab label="Usuarios" {...a11yProps(1)} />
        <Tab label="Equipos" {...a11yProps(2)} />
        <Tab label="Novedades" {...a11yProps(3)} />
        <Tab label="Expo Proyecto" {...a11yProps(4)} />
      </Tabs>
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
          }}
        >
          <TabPanel value={valuePanel} index={0}>
            <Typography variant="h5" color="text.secondary">Alta cursada</Typography><br />
            <Typography variant="body2" color="text.secondary">Ingrese el código único que tendra esta cursada</Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '50%',
                marginTop: '2em',
                marginBottom: '2em',
              }}>
                <form
                  style={{ width: '50%' }}
                  onSubmit={submitNuevaCursada}
                  name="cursada"
                >
                  <TextField
                    label="Código Cursada"
                    required
                    fullWidth
                    name="codCursada"
                  />
                  <TextField
                    label="Descripción"
                    required
                    fullWidth
                    name="descripcion"
                  />
                  <Typography variant="body2" color="text.secondary">Fecha inicio</Typography>
                  <input type="date" name="fechaInicio" required />
                  <Typography variant="body2" color="text.secondary">Fecha fin</Typography>
                  <input type="date" name="fechaFin" required />
                  <Button
                    type="submit"
                    fullWidth
                    color="secondary"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Confirmar cursada
                  </Button>
                </form>
              </div>
            <Divider />
          </TabPanel>
          <TabPanel value={valuePanel} index={1}>
          <Typography variant="h5" color="text.secondary">Alta de profesor</Typography><br />
            <Typography variant="body2" color="text.secondary">Complete los campos para poder dar de alta a un profesor</Typography>
            <form
                style={{}}
                onSubmit={altaProfesor}
                name="altaProfesor"
              >
                <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  width: '50%',
                  marginTop: '2em',
                  marginBottom: '2em',
                }}>
                  <TextField
                    key="nombre"
                    name="nombre"
                    className="textField"
                    label="Nombre"
                  />
                  <TextField
                    key="dni"
                    name="dni"
                    className="textField"
                    label="Dni"
                  />
                  <TextField
                    key="edad"
                    name="edad"
                    className="textField"
                    label="Edad"
                  />
                  <TextField
                    key="email"
                    name="email"
                    className="textField"
                    label="Email"
                  />
                  <TextField
                    key="emailunlam"
                    name="emailunlam"
                    className="textField"
                    label="Email Unlam"
                  />
                  <TextField
                    key="descripcion"
                    name="descripcion"
                    className="textField"
                    label="Descripción"
                  />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                <Button
                  style={{ alignItems: 'center' }}
                  variant="contained"
                  color="secondary"
                  type="submit"
                  style={{ width: '13em', height: '2em', marginBottom: '2em' }}
                  >GUARDAR PROFESOR
                  </Button>
              </div>
            </form>
            <Divider />
            <Typography variant="h5" color="text.secondary" 
              style={{ marginTop: '1em' }}>Alta masiva de alumnos</Typography><br />
            <Typography variant="body2" color="text.secondary">Seleccione el excel de alumnos para el alta masiva</Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '50%',
                marginTop: '2em',
                marginBottom: '2em',
              }}>
              <form
              >
                <TextField
                  key="cursada"
                  label="N° Cursada"
                  disabled
                  id="cursada"
                  name="cursada"
                  value={cursada.codCursada ? cursada.codCursada : ''}
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
            >Alta manual de alumnos</Typography><br />
            <Typography variant="body2" color="text.secondary">Si necesita o prefiere puede dar de alta por cada alumno</Typography>
            
            <form
              style={{}}
              onSubmit={altaAlumnoIndividual}
              name="altaManualAlumnos"
            >
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
                    key="cursada"
                    label="N° Cursada"
                    disabled
                    id="cursada"
                    name="cursada"
                    value={cursada.codCursada ? cursada.codCursada : ''}
                  />
                  <TextField
                    key="nombre"
                    name="nombre"
                    className="textField"
                    label="Nombre"
                  />
                  <TextField
                    key="dni"
                    name="dni"
                    className="textField"
                    label="Dni"
                  />
                  <TextField
                    key="edad"
                    name="edad"
                    className="textField"
                    label="Edad"
                  />
                  <TextField
                    key="email"
                    name="email"
                    className="textField"
                    label="Email"
                  />
                  <TextField
                    key="emailunlam"
                    name="emailunlam"
                    className="textField"
                    label="Email Unlam"
                  />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                <Button
                  style={{ alignItems: 'center' }}
                  variant="contained"
                  color="secondary"
                  type="submit"
                  style={{ width: '12em', height: '2em', marginBottom: '2em' }}
                  >GUARDAR ALUMNO
                  </Button>
              </div>
            </form>
            <Divider />
          </TabPanel>
          <TabPanel value={valuePanel} index={2}>
            <Typography variant="h5" color="text.secondary">Tabla de Equipos</Typography><br />
            <Typography variant="body2" color="text.secondary">Información de equipos - Puede editarlos y asignarle un proyecto</Typography><br />
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Equipo</TableCell>
                    <TableCell align="left">Marca</TableCell>
                    <TableCell align="left">Concepto</TableCell>
                    <TableCell align="left">Propuesta de valor</TableCell>
                    <TableCell align="left">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsEquipos.map((row) => (
                    <Row key={row.id} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer><br />  
            <Divider /> <br />
            <Typography variant="h5" color="text.secondary">Creación de Equipo</Typography><br />
            <Typography variant="body2" color="text.secondary">Ingrese nombre, seleccione todos los participantes y mínimo un profesor / mentor</Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '50%',
                marginTop: '2em',
                marginBottom: '2em',
              }}>
                <form
                  style={{ width: '50%' }}
                  onSubmit={submitNuevoEquipo}
                  name="equipo"
                >
                  <TextField
                    label="Nombre"
                    required
                    fullWidth
                    name="nombre"
                  />
                  <FormControl sx={{ mt: 5, width: '100%' }} name="alumnos">
                    <InputLabel id="demo-multiple-chip-label">Alumnos</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={alumnoName}
                      onChange={handleChangeAlumnos}
                      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                      name="alumnos"
                    >
                      {alumnos.map((al) => (
                        <MenuItem
                          key={al.id}
                          value={al.nombre}
                        >
                          {al.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mt: 5, width: '100%' }}>
                    <InputLabel id="demo-multiple-chip-label">Profesor / Mentor</InputLabel>
                    <Select
                      labelId="demo-profesores"
                      id="demo-multiple-chip-profesores"
                      multiple
                      value={profesorName}
                      onChange={handleChangeProfesores}
                      input={<OutlinedInput id="select-multiple-chip-profesor" label="Chip" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {profesores.map((pro) => (
                        <MenuItem
                          key={pro.id}
                          value={pro.nombre}
                        >
                          {pro.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    color="secondary"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Confirmar equipo
                  </Button>
                </form>
              </div>
          </TabPanel>
          <TabPanel value={valuePanel} index={3}>
            Very soon...
          </TabPanel>
          <TabPanel value={valuePanel} index={4}>
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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  
  const editarEquipo = (equipo) => {
    console.log(equipo);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.nombreEquipo}
        </TableCell>
        <TableCell align="left">{row.marca}</TableCell>
        <TableCell align="left">{row.concepto}</TableCell>
        <TableCell align="left">{row.valor}</TableCell>
        <TableCell align="left"><ModalEquipoEdit equipo={row} /></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Alumnos del equipo: {row.nombreEquipo}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>DNI</TableCell>
                    <TableCell>Nombre</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.alumnos.map((historyRow) => (
                    <TableRow key={historyRow.dni}>
                      <TableCell component="th" scope="row">
                        {historyRow.dni}
                      </TableCell>
                      <TableCell>{historyRow.nombre}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Backoffice;