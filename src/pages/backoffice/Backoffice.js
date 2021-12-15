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
  Tooltip,
 } from '@mui/material';
 import IconButton from '@mui/material/IconButton';
 import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
 import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
 import * as XLSX from 'xlsx';
 import './backoffice.css';
 import session from '../../services/session';
 import ModalEquipoEdit from './components/ModalEquipoEdit';
 import ModalEquipoDelete from './components/ModalEquipoDelete';
 import ModalEquipoDisabled from './components/ModalEquipoDisabled';

 import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
 import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
 import ReactExport from "react-export-excel";
 import Footer from '../../components/footer/Footer';

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
 
 const apiURL = 'http://webtpi-001-site1.dtempurl.com'; // "http://webtpi-001-site1.dtempurl.com"; // 'https://localhost:44311';
 const headers = { 
  'Authorization': session().token,
  'Content-type': 'application/json; charset=iso-8859-1',
  'Access-Control-Allow-Origin': '*',
};
 
const Backoffice = ({auth}) => {
  const [valuePanel, setValuePanel] = React.useState(0);
  const [selectedFile, setSelectedFile] = React.useState('');
  const [cargaAlumnos, setCargaAlumnos] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageSnackBar, setMessageSnackBar] = React.useState('');
  const [severitySnackBar, setSeveritySnackBar] = React.useState('success');
  const [cursada, setCursada] = React.useState('');
  const [update, setUpdate] = React.useState(true);
  const [alumnos, setAlumnos] = React.useState([]);
  const [profesores, setProfesores] = React.useState([]);
  const [alumnoName, setAlumnoName] = React.useState([]);
  const [profesorName, setProfesorName] = React.useState([]);
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const [proyectos, setProyectos] = React.useState([]);
  const [equipos, setEquipos] = React.useState([]);
  const [equipoPersona, setEquipoPersona] = React.useState([]);
  const [rowsEquipos, setRowsEquipos] = React.useState([]);

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

  React.useEffect(() => {
    axios.get(apiURL + '/api/cursada', {headers})
      .then((response) => {
        if (response) {
          setCursada(response.data);
        }
    });

    axios.get(apiURL + '/api/equipo/getequiposfull', {headers}).then((response) => {
      console.log(response);
      normalizeTeams2(response.data.$values);
    })

    axios.get(apiURL + '/api/usuario', {headers})
      .then((response) => {
        const teams = [];
        if (response) {
          console.log(response.data.$values);
          setProfesores(normalizeUsuarios(response.data.$values)[0]);
          setAlumnos(normalizeUsuarios(response.data.$values)[1]);
          teams.push(normalizeUsuarios(response.data.$values)[1]);
        }
        axios.get(apiURL + '/api/proyecto', {headers})
        .then((response) => {
          if (response) {
            setProyectos(response.data.$values);
            teams.push(response.data.$values);
          }
          axios.get(apiURL + '/api/equipo', {headers})
            .then((response) => {
              if (response) {
                setEquipos(response.data.$values);
                teams.push(response.data.$values);
              } 
          });
          axios.get(apiURL + '/api/equipopersona', {headers})
            .then((response) => {
              if (response) {
                setEquipoPersona(response.data.$values);
                teams.push(response.data.$values);
              }
            setRowsEquipos(normalizeTeams(teams));
          });
        });
    });
  }, [update]);

  const normalizeUsuarios = (data) => {
    const object = [];
    const alumnos = [];
    const profesor = [];
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

  const normalizeTeams2 = (data) => {
    const alumnos = [];
    const team = [];
    const equipo = [];
    
    data.forEach((item) => {
      alumnos.push({ nombrePersona: item.nombrePersona, dniPersona: item.dniPersona, edad: item.edad, email: item.email, emailUnlam: item.emailUnlam,
      idEquipo: item.idEquipo, idPersona: item.idPersona});

    });
    console.log(alumnos);
    
    data.forEach((item) => {
      let asd = alumnos.filter(e => e.idEquipo === item.idEquipo);
      if (asd) {
        team.push(asd);
      }
    });
    console.log(team);
  };

  const normalizeTeams = (data) => {
    const alumnos = data[0];
    const proyectos = data[1];
    const equipos = data[2];
    const equipoPersona = data[3];
    console.log(data);

    const teams = [];

    const asdasd = [];
    alumnos.forEach((alumno) => {
      const auxAlumno = equipoPersona?.find(equiPer => equiPer.idPersona === alumno.id);
      if (alumno.id === auxAlumno?.idPersona) {
        const students = {
          nombre: alumno.nombre,
          dni: alumno.dni,
          idEquipo: auxAlumno.idEquipo
        };
        asdasd.push(students);
      }
    });

    equipos?.forEach((equipo) => {
      const proAux = proyectos.find(pro => pro.idProyecto === equipo.idProyecto);
      const team = {
        id: equipo.idEquipo ? equipo.idEquipo : '',
        nombreProyecto :proAux ? proAux.nombreProyecto : '',
        concepto: proAux ? proAux.descripcion : '',
        propuestaValor: proAux ? proAux.propuestaValor : '',
        nombreEquipo: equipo.nombre ? equipo.nombre : '',
        alumnos: [],
        idProyecto: proAux ? proAux.idProyecto : '',
        idTipoProyecto: proAux ? proAux.idTipoProyecto : '',
        idCategoria: proAux ? proAux.idCategoria : '',
        estado: equipo ? equipo.estado : ''
      };
      teams.push(team);
    });
    console.log('teams', teams);

    asdasd.forEach((item) => {
      const aux = teams.find(team => team.id === item.idEquipo);
      aux.alumnos.push({ dni: item.dni, nombre: item.nombre});
    });
    
    return teams;
    
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const handleChangePanel = (event, newValue) => {
    event.preventDefault();
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
              estado: 'S',
            })
          }
        })
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
      idCursada: cursada.idCursada,
      estado: 'S',
    };

    axios.post(apiURL + '/api/usuario', object, {headers})
      .then(response => {
        if(response) { 
          setMessageSnackBar('Usuario creado correctamente');
          setSeveritySnackBar('success');
          setOpen(true);
          setUpdate(!update);
          setUpdate(!update);
        }
      })
      .catch(err => {
        if(err.toString().includes('400')) {
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
      estado: 'S',
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
          setUpdate(!update);
          setUpdate(!update);
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
    axios.post(apiURL + '/api/equipo', {
      nombre: e.target.nombre.value,
      equipoPersonas: equipoPersonas,
    }, {headers}).then((response) => {
        
        setMessageSnackBar('Alta de equipo generado correctamente');
        setSeveritySnackBar('success');
        setOpen(true);
        setUpdate(!update);
        setUpdate(!update);
      if (response) {
        setMessageSnackBar('Alta de equipo generado correctamente');
          setSeveritySnackBar('success');
          setOpen(true);
          setUpdate(!update);
          setUpdate(!update);
      }
    })
  };

  const submitNuevaCategoria = (e) => {
    e.preventDefault();
    axios.post(apiURL + '/api/categoria', {descripcion: e.target.descripcion.value}, {headers}).then((response) => {
      if (response) {
        setMessageSnackBar('Nueva categoría generada correctamente');
        setSeveritySnackBar('success');
        setOpen(true);
        setUpdate(!update);
        setUpdate(!update);
      }
    });
  };

  const submitNuevoTipoProyecto = (e) => {
    e.preventDefault();
    axios.post(apiURL + '/api/tipoproyecto', {descripcion: e.target.descripcion.value}, {headers}).then((response) => {
      if (response) {
        setMessageSnackBar('Nuevo tipo de proyecto generado correctamente');
        setSeveritySnackBar('success');
        setOpen(true);
        setUpdate(!update);
        setUpdate(!update);
      }
    });
  };

  const submitNuevaNovedad = (e) => {
    e.preventDefault();
    const obj = {
      descripcion: e.target.descripcion.value,
      rutaFoto: e.target.foto.value.substr(12, e.target.foto.value.length - 1),
      idPersona: session().data.id,
      rutaVideo: e.target.rutaVideo.value,
    };
    axios.post(apiURL + '/api/novedad', obj, {headers}).then((response) => {
      if (response) {
        setMessageSnackBar('Nueva novedad generada correctamente');
        setSeveritySnackBar('success');
        setOpen(true);
        setUpdate(!update);
        setUpdate(!update);
      }
    });
  };

  const handleChangeAlumnos = (e) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;
    setAlumnoName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeProfesores = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setProfesorName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const disabledAlumno = (e, estado, id) => {
    e.preventDefault();
    if (estado === 'S') {
      axios.put(apiURL + '/api/usuario/deshabilitarusuario', {id: id}, {headers}).then((response) => {
        setUpdate(!update);
        setUpdate(!update);
      });
    } else {
      axios.put(apiURL + '/api/usuario/habilitarusuario', {id: id}, {headers}).then((response) => {
        setUpdate(!update);
        setUpdate(!update);
      });
    }
  };




  return(
    <><Container maxWidth="xl"
      sx={{ padding: { xs: '0.5em', md: '0.5em', lg: '4em' } }}
    >
      <Tabs
        value={valuePanel}
        onChange={handleChangePanel}
        textColor="secondary"
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
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
            <Typography variant="h5" color="secondary">Alta cursada</Typography><br />
            <Typography variant="body2" color="text">Ingrese el código único que tendra esta cursada</Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '2em',
                marginBottom: '2em',
              }}>
              <form
                className="forms"
                onSubmit={submitNuevaCursada}
                name="cursada"
              >
                <TextField
                  label="Código Cursada"
                  required
                  fullWidth
                  name="codCursada" />
                <TextField
                  label="Descripción"
                  required
                  fullWidth
                  name="descripcion"
                  sx={{ mt: 3, width: '100%' }} />
                <Typography variant="body2" sx={{ mt: 2, width: '100%' }} color="text.secondary">Fecha inicio</Typography>
                <input type="date" name="fechaInicio" required />
                <Typography variant="body2" sx={{ mt: 2, width: '100%' }} color="text.secondary">Fecha fin</Typography>
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
            <Divider /><br />
            <Typography variant="h5" color="secondary">Nueva Categoría</Typography><br />
            <Typography variant="body2" color="text">Ingrese el nombre de la nueva categoría para luego asignarla a un proyecto</Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                // width: '50%',
                marginTop: '2em',
                marginBottom: '2em',
              }}>
              <form
                className="forms"
                onSubmit={submitNuevaCategoria}
                name="categoria"
              >
                <TextField
                  label="Nombre Categoria"
                  required
                  fullWidth
                  name="descripcion" />
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  type="submit"
                  sx={{ mt: 3, mb: 2 }}
                >GUARDAR CATEGORÍA
                </Button>
              </form>
            </div>
            <Divider /><br />
            <Typography variant="h5" color="secondary">Nuevo Tipo de Proyecto</Typography><br />
            <Typography variant="body2" color="text">Ingrese el nombre del tipo de proyecto</Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '2em',
                marginBottom: '2em',
              }}>
              <form
                className="forms"
                onSubmit={submitNuevoTipoProyecto}
                name="categoria"
              >
                <TextField
                  label="Nombre Tipo de Proyecto"
                  required
                  fullWidth
                  name="descripcion" />
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  type="submit"
                  sx={{ mt: 3, mb: 2 }}
                >GUARDAR TIPO PROYECTO
                </Button>
              </form>
            </div>
          </TabPanel>
          <TabPanel value={valuePanel} index={1}>
            <Typography variant="h5" color="secondary">Tabla de Alumnos</Typography><br />
            <Typography variant="body2" color="text">Información de alumnos - Puede habilitarlos o deshabilitarlos</Typography><br />
            <ExcelFile
              filename="Alumnos"
              element={<Button style={{ float: 'right' }} size="small" variant="contained" color="secondary">Exportar excel</Button>}
            >
              <ExcelSheet data={alumnos} name="Alumnos">
                <ExcelColumn label="Alumno" value="nombre" />
                <ExcelColumn label="DNI" value="dni" />
                <ExcelColumn label="email" value="email" />
              </ExcelSheet>
            </ExcelFile>
            <TableContainer component={Paper} sx={{ maxHeight: 350, marginTop: '3em' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Alumno</TableCell>
                    <TableCell align="left">DNI</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="center">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {alumnos.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.nombre}
                      </TableCell>
                      <TableCell align="left">{row.dni}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="center">
                        <Button onClick={(e) => disabledAlumno(e, row.estado, row.id)} color="secondary">
                          {row.estado === 'S' ?
                            <Tooltip title="Deshabilitar">
                              <DoNotDisturbAltIcon color="error" />
                            </Tooltip> :
                            <Tooltip title="Habilitar">
                              <CheckCircleOutlineRoundedIcon color="success" />
                            </Tooltip>}

                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer><br />
            <Divider /> <br />
            <Typography variant="h5" color="secondary">Alta de profesor</Typography><br />
            <Typography variant="body2" color="text">Complete los campos para poder dar de alta a un profesor</Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '2em',
                marginBottom: '2em',
              }}
            >
              <form
                className="forms"
                onSubmit={altaProfesor}
                name="altaProfesor"
              >
                <TextField
                  key="nombre"
                  name="nombre"
                  className="textField"
                  label="Nombre"
                  required
                  fullWidth
                  sx={{ mt: 2, width: '100%' }} />
                <TextField
                  key="dni"
                  name="dni"
                  className="textField"
                  label="Dni"
                  required
                  fullWidth
                  sx={{ mt: 2, width: '100%' }} />
                <TextField
                  key="edad"
                  name="edad"
                  className="textField"
                  label="Edad"
                  required
                  fullWidth
                  sx={{ mt: 2, width: '100%' }} />
                <TextField
                  key="email"
                  name="email"
                  className="textField"
                  label="Email"
                  required
                  fullWidth
                  sx={{ mt: 2, width: '100%' }} />
                <TextField
                  key="emailunlam"
                  name="emailunlam"
                  className="textField"
                  label="Email Unlam"
                  required
                  fullWidth
                  sx={{ mt: 2, width: '100%' }} />
                <TextField
                  key="descripcion"
                  name="descripcion"
                  className="textField"
                  label="Descripción"
                  required
                  fullWidth
                  sx={{ mt: 2, width: '100%' }} />
                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  type="submit"
                  sx={{ mt: 3, mb: 2 }}
                >GUARDAR PROFESOR
                </Button>
              </form>
            </div>
            <Divider />
            <Typography variant="h5" color="secondary"
              style={{ marginTop: '1em' }}>Alta masiva de alumnos</Typography><br />
            <Typography variant="body2" color="text">Seleccione el excel de alumnos para el alta masiva</Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '2em',
                marginBottom: '2em',
              }}>
              <form
                className="forms"
              >
                <TextField
                  key="cursada"
                  label="N° Cursada"
                  disabled
                  id="cursada"
                  name="cursada"
                  value={cursada.codCursada ? cursada.codCursada : ''} />
                <input
                  style={{ marginTop: '1em' }}
                  type="file"
                  value={selectedFile}
                  onChange={convertToJson}>
                </input>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => altaAlumnosMasiva()}
                  sx={{ mt: 3, mb: 2 }}
                  fullWidth
                >ALTA MASIVA
                </Button>
              </form>
            </div>
            <Divider />
            <Typography
              variant="h5"
              color="secondary"
              style={{ marginTop: '1em' }}
            >Alta manual de alumnos</Typography><br />
            <Typography variant="body2" color="text">Si necesita o prefiere puede dar de alta por cada alumno</Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '2em',
                marginBottom: '2em',
              }}>
              <form
                className="forms"
                onSubmit={altaAlumnoIndividual}
                name="altaManualAlumnos"
              >
                <TextField
                  key="cursada"
                  label="N° Cursada"
                  disabled
                  id="cursada"
                  name="cursada"
                  value={cursada.codCursada ? cursada.codCursada : ''}
                  sx={{ width: '100%' }} />
                <TextField
                  key="nombre"
                  name="nombre"
                  className="textField"
                  label="Nombre"
                  required
                  fullWidth
                  sx={{ mt: 2, width: '100%' }} />
                <TextField
                  key="dni"
                  name="dni"
                  className="textField"
                  label="Dni"
                  required
                  fullWidth
                  sx={{ mt: 2, width: '100%' }} />
                <TextField
                  key="edad"
                  name="edad"
                  className="textField"
                  label="Edad"
                  required
                  fullWidth
                  sx={{ mt: 2, width: '100%' }} />
                <TextField
                  key="email"
                  name="email"
                  className="textField"
                  label="Email"
                  required
                  fullWidth
                  sx={{ mt: 2, width: '100%' }} />
                <TextField
                  key="emailunlam"
                  name="emailunlam"
                  className="textField"
                  label="Email Unlam"
                  required
                  fullWidth
                  sx={{ mt: 2, width: '100%' }} />
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  sx={{ mt: 3, mb: 2 }}
                  fullWidth
                >GUARDAR ALUMNO
                </Button>
              </form>
            </div>
            <Divider />
          </TabPanel>
          <TabPanel value={valuePanel} index={2}>
            <Typography variant="h5" color="secondary">Tabla de Equipos</Typography><br />
            <Typography variant="body2" color="text">Información de equipos - Puede editarlos y asignarle un proyecto</Typography><br />
            <ExcelFile
              filename="Equipos"
              element={<Button style={{ float: 'right' }} size="small" variant="contained" color="secondary">Exportar excel</Button>}
            >
              <ExcelSheet data={rowsEquipos} name="Equipos">
                <ExcelColumn label="Marca" value="nombreProyecto" />
                <ExcelColumn label="Concepto" value="concepto" />
                <ExcelColumn label="Propuesta de Valor" value="propuestaValor" />
              </ExcelSheet>
            </ExcelFile>
            <TableContainer component={Paper} style={{ marginTop: '3em' }}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Equipo</TableCell>
                    <TableCell align="left">Marca</TableCell>
                    <TableCell align="left">Concepto</TableCell>
                    <TableCell align="left">Propuesta de valor</TableCell>
                    <TableCell align="left">Acción</TableCell>
                    <TableCell align="left">Eliminar</TableCell>
                    <TableCell align="left">Deshabilitar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsEquipos.map((row) => (
                    <Row key={row.id} row={row} update={update} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer><br />
            <Divider /> <br />
            <Typography variant="h5" color="secondary">Creación de Equipo</Typography><br />
            <Typography variant="body2" color="text">Ingrese nombre, seleccione todos los participantes y mínimo un profesor / mentor</Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: '2em',
                marginBottom: '2em',
              }}>
              <form
                className="forms"
                onSubmit={submitNuevoEquipo}
                name="equipo"
              >
                <TextField
                  label="Nombre"
                  required
                  fullWidth
                  name="nombre" />
                <FormControl sx={{ mt: 5, width: '100%' }} name="alumnos">
                  <InputLabel id="demo-multiple-chip-label">Alumnos</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={alumnoName}
                    onChange={e => handleChangeAlumnos(e)}
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
                <FormControl sx={{ mt: 5, width: '100%' }} name="profesores">
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
            <Typography variant="h5" color="secondary">Alta Novedad</Typography><br />
            <Typography variant="body2" color="text">Complete los siguientes campos para poder dar alta una novedad.</Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '2em',
                marginBottom: '2em',
              }}>
              <form
                className="forms"
                onSubmit={submitNuevaNovedad}
                name="novedad"
              >
                <TextField
                  label="Descripción"
                  required
                  fullWidth
                  name="descripcion" />
                <Button
                  variant="raised"
                  component="label"
                  style={{ marginTop: '1em' }}
                >
                  <input
                    type="file"
                    name="foto"
                    // hidden
                    required />
                </Button>
                <TextField
                  style={{ marginTop: '1em' }}
                  label="Ruta del Video"
                  fullWidth
                  name="rutaVideo" />
                <Button
                  type="submit"
                  fullWidth
                  color="secondary"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Confirmar novedad
                </Button>
              </form>
            </div>
            <Divider /><br />
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
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={severitySnackBar} sx={{ width: '100%' }}>
          {messageSnackBar}
        </Alert>
      </Snackbar>
    </Container><Footer /></>
  )
};

function Row(props) {
  const { row, update } = props;
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [messageSnackBar, setMessageSnackBar] = React.useState('');
  const [severitySnackBar, setSeveritySnackBar] = React.useState('success');
  
  const confirmEditEquipo = (e) => {
    e.preventDefault();
    console.log(e.target.idProyecto.value);
    const objectProyecto = {
      nombre: e.target.nombre.value,
      descripcion: e.target.descripcion.value,
      propuestaValor: e.target.propuestaValor.value,
      idTipoProyecto: e.target.tipoProyecto.value,
      idCategoria: e.target.categoria.value,
      rutaFoto: e.target.foto?.value.substr(12, e.target.foto?.value.length - 1),
      cantMeGusta: 0,
    }
    if (e.target.type.value === 'Add') {
      axios.post(apiURL + '/api/proyecto', objectProyecto, {headers}).then((response) => {
        if (response) {
          const objectEquipo = {
            idEquipo: e.target.idEquipo.value,
            nombre: e.target.nombreEquipo.value,
            idProyecto: response.data.idProyecto,
            estado: 'S',
          };
         axios.put(apiURL + `/api/equipo/${e.target.idEquipo.value}`, objectEquipo, {headers}).then((response) => {
            if (response) {
              setMessageSnackBar('Información de equipo agregado correctamente');
              setSeveritySnackBar('success');
              setOpenSnack(true);
              setOpen(false);
            }
          });
        }
      });
    } else {
      objectProyecto.idProyecto = e.target.idProyecto.value;
      axios.put(apiURL + `/api/proyecto/${e.target.idProyecto.value}`, objectProyecto, {headers}).then((response) => {
        if (response) {
          setMessageSnackBar('El equipo se ha editado correctamente');
          setSeveritySnackBar('success');
          setOpenSnack(true);
          setOpen(false);
        }
      })
    }
  };

  const confirmEliminarEquipo = (e) => {
    e.preventDefault();

    axios.delete(apiURL + `/api/equipo/${e.target.id.value}`, {headers}).then((response) => {
      if (response) {
        setMessageSnackBar('El equipo se ha eliminado correctamente');
        setSeveritySnackBar('success');
        setOpenSnack(true);
        setOpen(false);
      }
    });
  };

  const confirmDeshabilitarEquipo = (e, estado, id) => {
    e.preventDefault();
    if (estado === 'S') {
      axios.put(apiURL + '/api/equipopersona/deshabilitarequipo', {idEquipo: id}, {headers}).then((response) => {
        if (response) {
        }
      });
    } else {
      axios.put(apiURL + '/api/equipopersona/habilitarequipo', {idEquipo: id}, {headers}).then((response) => {
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
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
        <TableCell align="left">
          <ModalEquipoEdit
            equipo={row}
            disabled={row.marca ? true : false}
            handleEdicionEquipo={() => confirmEditEquipo}
          />
        </TableCell>
        <TableCell align="left">
          <ModalEquipoDelete
            equipo={row}
            handleEliminarEquipo={() => confirmEliminarEquipo}
          />
        </TableCell>
        <TableCell align="left">
        <Button onClick={(e) => confirmDeshabilitarEquipo(e, row.estado, row.id)} color="secondary">
          {row.estado === 'S' ?
            <Tooltip title="Deshabilitar">
              <DoNotDisturbAltIcon color="error"/>
            </Tooltip> :
            <Tooltip title="Habilitar">
              <CheckCircleOutlineRoundedIcon color="success" />
            </Tooltip>
            }
          
        </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="body2" gutterBottom>
                Participantes
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
      <Snackbar
        open={openSnack}
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
    </React.Fragment>
  );
}

export default Backoffice;