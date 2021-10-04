import React from 'react';
import CardCustom from '../../components/card/Card';

import Container from '@mui/material/Container';
import { Typography, Paper, Box } from '@mui/material';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';



const Home = () => {
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
        <CardCustom />
        <CardCustom />
        <CardCustom />
        <CardCustom />
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
      }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 110,
              height: 110,
            },
          }}
        >
          <Paper elevation={3} style={{marginRight: '4em'}}>Educacion</Paper>
          <Paper elevation={3} style={{marginRight: '4em'}}>Salud</Paper>
          <Paper elevation={3} style={{marginRight: '4em'}}>Fintech</Paper>
          <Paper elevation={3} style={{marginRight: '4em'}}>Alimentación</Paper>
          <Paper elevation={3} style={{marginRight: '4em'}}>Ecommerce</Paper>
          <Paper elevation={3} style={{marginRight: '4em'}}>EcoCircular</Paper>
        </Box>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: '4em',
      }}>
        <CardCustom />
        <CardCustom />
        <CardCustom />
      </div>
    </Container>
  )
};

export default Home;