import React from 'react';
import './home.css';

import CardCustom from '../../components/card/Card';

import Container from '@mui/material/Container';
import { Typography, Paper, Box } from '@mui/material';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import FoodBankRoundedIcon from '@mui/icons-material/FoodBankRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';

const Home = () => {
  const handleClickEducacion = () => {

  
    console.log('educacion');
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
      }}>
        <CardCustom title='TPI' body='lalalalaa TPI alalala' category='Educacion' img="https://thumbs.dreamstime.com/b/aprendizaje-electr%C3%B3nico-app-del-vector-49960281.jpg" />
        <CardCustom title='FintechApp1' body='lalalalaa FINTECHAPP alalala' category='Fintech' img="https://future.inese.es/wp-content/uploads/2020/02/fintechfuture.jpg" />
        <CardCustom title='Salud' body='lalalalaa SALUD alalala' category='Salud' img="https://www.nalgeneiberia.com/wp-content/uploads/2016/02/1602_Nalgene_blog_5appssalud_01-770x452.jpg" />
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
        marginTop: '1em'
      }}>
        <Box
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
          <Paper tabIndex="0" elevation={0} className="paperCategory" onClick={() => handleClickEducacion()}>
            <SchoolRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Educación
            </Typography>
          </Paper>
          <Paper tabIndex="0" elevation={0} className="paperCategory">
            <LocalHospitalRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Salud
            </Typography>
          </Paper>
          <Paper tabIndex="0" elevation={0} className="paperCategory">
            <AttachMoneyRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Fintech
            </Typography>
          </Paper>
          <Paper tabIndex="0" elevation={0} className="paperCategory">
            <FoodBankRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Alimentación
            </Typography>
          </Paper>
          <Paper tabIndex="0" elevation={0} className="paperCategory">
            <StoreRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Ecommerce
            </Typography>
          </Paper>
          <Paper tabIndex="0" elevation={0} className="paperCategory">
            <RepeatRoundedIcon style={{ fontSize: '4.5em'}} />
            <Typography variant="subtitle2" color="inherit">
              Eco Circular
            </Typography>
          </Paper>
        </Box>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: '4em',
      }}>
        <CardCustom title='FintechApp1' body='lalalalaa FINTECHAPP1 alalala' category='Fintech' img="https://future.inese.es/wp-content/uploads/2020/02/fintechfuture.jpg" />
        <CardCustom title='FintechApp2' body='lalalalaa FINTECHAPP2 alalala' category='Fintech' img="https://future.inese.es/wp-content/uploads/2020/02/fintechfuture.jpg" />
        <CardCustom title='FintechApp3' body='lalalalaa FINTECHAPP3 alalala' category='Fintech' img="https://future.inese.es/wp-content/uploads/2020/02/fintechfuture.jpg" />
      </div>
    </Container>
  )
};

export default Home;