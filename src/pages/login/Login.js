import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Login = () => {


  return(
    <Container component="main" maxWidth="xl"  style={{ background: `url('${process.env.PUBLIC_URL}/backImage.png') no-repeat center`}}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
        style={{backdropFilter: 'blur(2px)' }}
      >
        <Typography component="h3" variant="h3" style={{ marginBottom: '1em', fontWeight: '500'}}>
          Bienvenidx!
        </Typography>
        <Typography component="h4" variant="h4" style={{ marginBottom: '1em', fontWeight: '300', width: '20em'}}>
        Por favor ingrese su email y contraseña para loguearse a la plataforma
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email facultativo"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" color="error">
                ¿Olvidaste la contraseña?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login;