/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Container from '@mui/material/Container';
import {
    Typography,
    Paper,
    Box,
    Grid,
    Button,
    Divider,
    Link
  } from '@mui/material';

  const Footer = () => {
    return (
    <Typography
    component="footer"
    sx={{ display: 'flex', bgcolor: 'primary.main' }}
  >
    <Container sx={{ my: 8, display: 'flex' }}>
      <Grid container spacing={5} sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <Grid item xs={12} sm={6} md={6}>
          <Grid
            container
            direction="column"
            justifyContent="flex-end"
            spacing={2}
            sx={{ height: 170 }}
          >
            <Grid item sx={{ display: 'flex' }}>
              <Box
                component="a"
                sx={{ textAlign: 'center', marginLeft: { xs: '6em', md: '10em', xl: '10em'}}}
              >
                <Typography variant="h4" color="text.light">Web TPI</Typography>
                <img
                  style={{ marginTop: '1em' }}
                  src={process.env.PUBLIC_URL+'logoBlanco.png'} width="80px"
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="h6" marked="left" gutterBottom color="text.light">
            Info Contacto
          </Typography>
          <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
            <Typography variant="caption" color="text.light">
              webtpi.tecnicaturas@gmail.com
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Typography>
  )
};

export default Footer;