import React from 'react';
import {Container} from '@mui/material';

import CardCustom from '../../components/card/Card';

const Novedades = () => {
  return(
    <Container maxWidth="xl"
      style={{
        padding: '4em',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: '4em',
      }}>
        <CardCustom type="novedad" title='NOVEDAD 1' descripcion='lalalalaa NOVEDAD 1 alalala' category='ExpoProyecto' img="https://prensaobrera.com/wp-content/uploads/Unlam-1.jpg" />
        <CardCustom type="novedad" title='NOVEDAD 2' descripcion='lalalalaa NOVEDAD 2 alalala' category='ExpoProyecto' img="https://prensaobrera.com/wp-content/uploads/Unlam-1.jpg" />
        <CardCustom type="novedad" title='NOVEDAD 3' descripcion='lalalalaa NOVEDAD 3 alalala' category='ExpoProyecto' img="https://prensaobrera.com/wp-content/uploads/Unlam-1.jpg" />
      </div>
    </Container>
  )
}

export default Novedades;