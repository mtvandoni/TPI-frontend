import React from 'react';
import {Container, Typography} from '@mui/material';

const ExpoProyecto = () => {
  return(
    <Container maxWidth="xl"
      style={{
        padding: '4em',
        backgroundColor: '#264653',
        position: 'relative',
      }}
    >
        
    <Typography variant="h1"
      style={{
        fontWeight: '500',
        position: 'absolute',
        top: '1.7em',
        left:' 3em',
        color: 'white'
      }}>
        EXPO
    </Typography>
    <Typography variant="h1"
      style={{
        fontWeight: '500',
        position: 'absolute',
        top: '2.7em',
        left:' 3em',
        color:'#264653',
      }}>
        PROYECTO
    </Typography>
    <div
      style={{
        background: `url('${process.env.PUBLIC_URL}/flyer.jpg') no-repeat center`,
        height: '67em',
      }}>
    </div>
    </Container>
  );
};

export default ExpoProyecto;