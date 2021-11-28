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
} from '@mui/material';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import FoodBankRoundedIcon from '@mui/icons-material/FoodBankRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';

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
    <Container container maxWidth="xl"
      style={{
        padding: '4em',
      }}
    >
      <Typography variant="h5" color="text.primary">
        <LocalFireDepartmentOutlinedIcon style={{marginRight: '0.5em'}} />
        Los mas votados
      </Typography>
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
      <Typography variant="h5" color="text.primary">
        <CategoryOutlinedIcon style={{marginRight: '0.5em'}} />
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
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            '& > :not(style)': {
              m: 1,
              width: 127,
              height: 28,
              borderRadius: '6px'
            },
          }}
        >
          {
            categorias && categorias.map((cat) => (
              <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickCategory(cat.idCategoria, cat.descripcion)}>
                <Typography variant="subtitle2" color="inherit" style={{marginTop: '0.2em'}}>
                  {cat.descripcion}
                </Typography>
              </Paper>
            ))
          }
          <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickCategory()}>
            <Typography variant="subtitle2" color="inherit" style={{marginTop: '0.2em'}}>
              Todos
            </Typography>
          </Paper>
        </Box>
      </div>
      <div
        style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
      >
        <Typography variant="h5" color="text.primary">
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
  )
};

export default Home;