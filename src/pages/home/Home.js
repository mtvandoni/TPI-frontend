/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import './home.css';

import CardCustom from '../../components/card/Card';

import Container from '@mui/material/Container';
import { Typography, Paper, Box, ButtonGroup, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import FoodBankRoundedIcon from '@mui/icons-material/FoodBankRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';

const Home = ({auth}) => {
  const [filterCategory, setFilterCategory] = React.useState(''); 
  const [user, setUser] = React.useState(null);
  const [proyecto, setProyecto] = React.useState([]);
  // const auth = JSON.parse(localStorage.getItem('auth'));
  const headers = { 
    'Authorization': auth?.token,
    'Content-type': 'application/json; charset=iso-8859-1',
  };
  React.useEffect(() => { 
    console.log(auth);
    axios.get("https://localhost:44311/api/proyecto", {headers})
      .then(response => {
        setProyecto(response.data);
        console.log(response.data);
      });

  }, [])

  const handleClickCategory = (title) => {
    setFilterCategory(title);
  };

  return(
    <Container maxWidth="xl"
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
        height: '20vh'
      }}>
        Coming Soon...
       {/* <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 127,
              height: 102,
              borderRadius: '15px'
            },
          }}
        >
          <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickCategory('Educación')}>
            <SchoolRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Educación
            </Typography>
          </Paper>
          <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickCategory('Salud')}>
            <LocalHospitalRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Salud
            </Typography>
          </Paper>
          <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickCategory('Fintech')}>
            <AttachMoneyRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Fintech
            </Typography>
          </Paper>
          <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickCategory('Alimentación')}>
            <FoodBankRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Alimentación
            </Typography>
          </Paper>
          <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickCategory('Ecommerce')}>
            <StoreRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Ecommerce
            </Typography>
          </Paper>
          <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickCategory('Eco Circular')}>
            <RepeatRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Eco Circular
            </Typography>
          </Paper>
        </Box> */}
      </div>
      <div
        style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
      >
        <Typography variant="h5" color="text.primary">
          {filterCategory}
        </Typography>
       {/*} <div style={{width: '38%'}}>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button variant="contained" style={{height: '4em', width: '8em'}}>WEB</Button>
            <Button style={{height: '4em', width: '8em'}}>MOBILE</Button>
          </ButtonGroup>
          <FormControl style={{width: '50%', marginLeft: '1em'}} >
            <InputLabel id="demo-simple-select-label">LENGUAJE</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="LENGUAJE"
              // onChange={handleChange}
            >
              <MenuItem value='php'>PHP</MenuItem>
              <MenuItem value='java'>JAVA</MenuItem>
              <MenuItem value='react'>REACT</MenuItem>
            </Select>
          </FormControl>
        </div> */}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: '4em',
      }}>
        {
          proyecto && proyecto.map((proy) => (
            <CardCustom key={proy.idProyecto} title={proy.nombre} data={proy} img={process.env.PUBLIC_URL+proy.rutaFoto} />
          ))
        }
      </div>
    </Container>
  )
};

export default Home;