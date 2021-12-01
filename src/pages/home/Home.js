/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import './home.css';

import CardCustom from '../../components/card/Card';

import Container from '@mui/material/Container';
import { Typography,
  Paper,
  Box,
  Grid,
  Button,
  Divider,
} from '@mui/material';

import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import Carousel from 'react-material-ui-carousel'

import session from '../../services/session';

const Home = () => {
  const [filterCategory, setFilterCategory] = React.useState(''); 
  const [proyecto, setProyecto] = React.useState([]);
  const [proyectoFilter, setProyectoFilter] = React.useState([]);
  const [categorias, setCategorias] = React.useState([]);
  const [masVotados, setMasVotados] = React.useState([]);

  const headers = { 
    'Authorization': session().token,
    'Content-type': 'application/json; charset=iso-8859-1',
  };
  const apiURL = "https://localhost:44311";

  React.useEffect(() => { 
    axios.get(apiURL + "/api/proyecto", {headers})
      .then(response => {
        const team = [];
        // setProyectoFilter(response.data);
        // setProyecto(response.data);
        team.push(response.data);
        axios.get(apiURL + '/api/equipopersona', {headers})
          .then((response) => {
            if (response) {
              team.push(response.data);
            }
            
            axios.get(apiURL + '/api/equipo', {headers})
            .then((response) => {
              if (response) {
                team.push(response.data);
              }

            axios.get(apiURL + '/api/usuario', {headers})
              .then((response) => {
                if (response) {
                  team.push(response.data);
              setProyectoFilter(normalizeProyectos(team));
              setProyecto(normalizeProyectos(team));
              setMasVotados(getMasVotados(team));
                }
              });
            });
          });
        });
    axios.get(apiURL + "/api/categoria", {headers})
      .then(response => {
        setCategorias(response.data);
      });
  }, [])

  const handleClickCategory = (id, title) => {
    setFilterCategory(title);
    console.log(id,title);
    const object = [];
    if (id) {
      if (proyecto) {
        proyectoFilter.forEach((item) => {
          console.log('item', item.data);
          if (item.data?.idCategoria === id) {
            object.push(item);
          }
        });
        setProyecto(object);
      }
    } else {
      setProyecto(proyectoFilter);
    }
  };

  const normalizeProyectos = (data) => {
    if (data) {
      const proyectos = data[0];
      const equiposPersonas = data[1];
      const equipos = data[2];
      const usuarios = data[3];
      const personas = [];

      const all = [];

      const asdasd = [];

      usuarios.forEach((usuario) => {
        const auxAlumno = equiposPersonas.find(equiPer => equiPer.idPersona === usuario.id);
        if (usuario.id === auxAlumno?.idPersona) {
          const participants = {
            nombre: usuario.nombre,
            idTipo: usuario.idTipo,
            edad: usuario.edad,
            emailUnlam: usuario.emailUnlam,
            idEquipo: auxAlumno.idEquipo,
          };
          asdasd.push(participants);
        }
      });

      equipos.forEach((equipo) => {
        const proAux = proyectos.find(pro => pro.idProyecto === equipo.idProyecto);
        if (proAux !== undefined) {
          const proyect = {
            id: equipo.idEquipo ? equipo.idEquipo : '',
            data: proAux,
            participantes: [],
          };
          all.push(proyect);
        }
      })
      asdasd.forEach((item) => {
        const aux = all.find(x => x?.id === item.idEquipo);
        aux?.participantes?.push({ nombre: item.nombre, idTipo: item.idTipo, edad: item.edad, emailUnlam: item.emailUnlam});
      })

      return all;
    }
  };

  const getMasVotados = (data) => {
    const proyectos = data[0]
    const masVotados = [];
    const todo = [];
    if (proyectos) {
      proyectos.forEach((item) => {
       todo.push(item.cantMeGusta);
      })
    }
    
    const aux = todo.sort(function (a, b) { return b - a; }).slice(0, 2);
    masVotados.push(aux);
    
    const array = [];
    masVotados.forEach((item) => {
      if (item) {
        const aux = proyectos.find(x => x.cantMeGusta === item);
        if (aux) {
          console.log('asd');
        }
        array.push(aux);
      }
    });
    console.log('array', array);
    data[0] = array;
    console.log(data);
    // TODO mas votados
    // return normalizeProyectos(data);
  };

  return(
    <>
    <Box
      sx={{ height: '50vh'}}
    >
      <Carousel autoPlay={false}>
        <Box
          sx={{
            height: '78vh',
            background: `url('http://periodicosic.com.ar/wp-content/uploads/2014/06/BIBLIOTECA-UNLAM.jpg') no-repeat center`, 
            backgroundSize: 'cover'
          }}
        >
          <Container sx={{ paddingTop: {xs: '24em', sm: '23em', md: '23em', lg: '20em'}}}>
            <Paper
              sx={{ padding: '1em 1.5em 1.5em 1em', width: {xs: '18em', md: '20em', lg:'20em'}}}
              elevation={3}
            >
              <Typography
                sx={{
                  fontSize: {xs: '14px', lg:'20px'},
                  fontWeight: '500',
                }}
              >Web TPI
              </Typography>
              <Typography
                sx={{
                  fontSize: {xs: '10px', lg:'16px'},
                }}
              >Una herramienta para alumnos y profesores de la materia 'Taller Practico Integrador'
              </Typography>
            </Paper>
          </Container>
        </Box>
        <Box
          sx={{
            height: '78vh',
            background: `url('https://lh3.googleusercontent.com/proxy/GdrafxmHml21UXlZ7-cVjJ_9PYGO44VHc8sVnhc4FDNac1k6QMnu7_sSkLQ5VoNwVt2iLmWe182JqILXNgYrzLF6XmuO2L6j57PluUxmcRqL') no-repeat center`, 
            backgroundSize: 'cover'
          }}
        >
          <Container sx={{ paddingTop: {xs: '24em', sm: '23em', md: '23em', lg: '20em'}}}>
            <Paper
              sx={{ padding: '1em 1.5em 1.5em 1em', width: {xs: '18em', md: '20em', lg:'20em'}}}
              elevation={3}
            >
              <Typography
                sx={{
                  fontSize: {xs: '14px', lg:'20px'},
                  fontWeight: '500',
                }}
              >Los proyectos en un solo lugar
              </Typography>
              <Typography
                sx={{
                  fontSize: {xs: '10px', lg:'16px'},
                }}
              >Herramienta para administrar los proyectos de la materia
              </Typography>
            </Paper>
          </Container>
        </Box>
      </Carousel>
    </Box>
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexGrow: '1',
        minHeight: '100%',
      }}
    >
      <Container maxWidth="xl"
        sx={{
          paddingTop: {xs: '15em', md: '24em', xl: '24em'}
        }}
      >
        <Box>
          <Typography
            color="text.primary"
            sx={{ fontSize: { xs: 14, md: 14, lg: 24}}}
          >
            <AdjustRoundedIcon style={{marginRight: '0.5em', color: '#c03618'}} />
            Los mas votados
          </Typography>
        </Box>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          marginBottom: '4em',
          height: '20vh'
        }}>
          Coming Soon...
          {/*<CardCustom title='EducApp' body='La app EducApp loremp impsum' category='Educacion' img="https://thumbs.dreamstime.com/b/aprendizaje-electr%C3%B3nico-app-del-vector-49960281.jpg" />
          <CardCustom title='MercadoPago' body='La app MercadoPago lorem impsum' category='Fintech' img="https://future.inese.es/wp-content/uploads/2020/02/fintechfuture.jpg" />
          <CardCustom title='OsdeApp' body='La app OsdeApp lorem impsmum' category='Salud' img="https://www.nalgeneiberia.com/wp-content/uploads/2016/02/1602_Nalgene_blog_5appssalud_01-770x452.jpg" /> */}
        </div>
        <br />
        <Divider />
        <br />
        <Typography 
          sx={{ fontSize: { xs: 14, md: 14, lg: 24}}}
          color="text.primary"
        >
          <AdjustRoundedIcon style={{marginRight: '0.5em', color: '#f2aa1e'}} />
          Categorías
        </Typography>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          marginBottom: '4em',
          marginTop: '1em',
        }}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth={false}>
              <Box sx={{ pt: 3}}>
                <Grid
                  container
                  spacing={3}
                >
                  {
                    categorias && categorias.map((cat) => (
                      <Grid
                        item
                        key={cat.id}
                        lg={4}
                        md={6}
                        xs={12}
                      >
                        <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickCategory(cat.idCategoria, cat.descripcion)}>
                          <Typography variant="subtitle2" color="inherit" style={{marginTop: '0.2em'}}>
                            {cat.descripcion}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))
                  }
                  <Grid
                        item
                        lg={4}
                        md={6}
                        xs={12}
                      >
                    <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickCategory()}>
                      <Typography
                        variant="subtitle2"
                        color="inherit"
                        style={{marginTop: '0.2em'}}>
                        Todos
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        </div>
        <div
          style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
        >
          <Typography
            sx={{ fontSize: { xs: 12, md: 12, lg: 20}}}
            color="text.primary"
          >
            {filterCategory ? filterCategory : 'Todos'}
          </Typography>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          marginBottom: '4em',
        }}>
          {
            proyecto.length > 0 ? proyecto.map((proy) => (
              <CardCustom
                key={proy?.data?.idProyecto}
                type="proyecto"
                data={proy?.data}
                participantes={proy?.participantes}
                img={process.env.PUBLIC_URL+proy?.data?.rutaFoto ? proy?.data?.rutaFoto : 'noImage.png'}
              />
            )) : <Typography variant="subtitle2" color="inherit" style={{marginTop: '4em'}}>
              Por el momento no hay proyectos con esta categoría
            </Typography>
            }
        </div>
      </Container>
    </Box></>
  )
};

export default Home;