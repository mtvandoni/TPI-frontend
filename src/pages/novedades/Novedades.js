import React from 'react';
import {Container} from '@mui/material';
import axios from 'axios';

import CardCustom from '../../components/card/Card';

import session from '../../services/session';
const apiURL = 'https://localhost:44311';

const Novedades = () => {
  const [novedades, setNovedades] = React.useState([]);

  const headers = { 
    'Authorization': session().token,
    'Content-type': 'application/json; charset=iso-8859-1',
  };

  React.useEffect(() => {
    axios.get(apiURL + '/api/novedad', {headers}).then((response) => {
      setNovedades(response.data);
    });
  }, []);

  return(
    <Container maxWidth="xl"
      style={{
        padding: '4em',
        height: '100vh'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: '4em',
      }}>
        { novedades && novedades.map((novedad) => (
          <CardCustom type="novedad" descripcion={novedad.descripcion} img={novedad.rutaFoto} enabledComment="no" video={novedad.rutaVideo}/>
        ))} 
      </div>
    </Container>
  )
}

export default Novedades;