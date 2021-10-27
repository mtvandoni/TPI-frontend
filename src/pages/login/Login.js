import React from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@mui/material';

const apiURL = 'https://localhost:44311';
const { search } = window.location;
const params = new URLSearchParams(search);
const redirect = params.get('callbackURL'); 

const Login = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    axios.get(apiURL + '/api/usuario').then(response => {
      console.log(response);
    })
  })

  const submitSession = () => {
    const obj = {
      emailUnlam: 'mica@admin.com',
      password: '123'
    }
    axios.post(apiURL + '/api/usuario/authenticate', obj)
      .then(response => {
        console.log(response.data);
        if (response.data) {
          setUser(response.data.idTipo);
          if (response.data.token) {
            // window.location.href = redirect || '/home';
          }
        }
      })
      .catch((error) => {
        if (error) {
          return null;
        }
  
        throw error.response;
      });
  };

  return(
    <Container component="main" maxWidth="xl"  style={{ background: `url('${process.env.PUBLIC_URL}/backImage2.png') no-repeat center`}}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
        style={{backdropFilter: 'blur(2px)', height: '100vh' }}
      >
        <Typography component="h3" variant="h3" style={{ marginBottom: '1em', fontWeight: '500'}}>
          Bienvenidx!
        </Typography>
        <Typography component="h4" variant="h4" style={{ marginBottom: '1em', fontWeight: '300', width: '20em'}}>
        Por favor ingrese su email y contraseña para loguearse a la plataforma
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <form >
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
              onClick={submitSession}
            >
              Ingresar
            </Button>
          </form>
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