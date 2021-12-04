/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  Container
} from '@mui/material';
import {login} from '../../services/security';

const Login = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    setUser(null);
    localStorage.setItem('auth', JSON.stringify(null));
  }, [])


  function submitSession(event) {
    event.preventDefault();

    const { search } = window.location;
    const params = new URLSearchParams(search);
    const redirect = params.get('callbackURL');

    login(event.target.email.value, event.target.password.value).then(() => {
      if (typeof window !== 'undefined') {
        window.location.href = redirect || '/home';
      }
    }).catch((error) => {
     console.log(error);
    });
  };

  return(
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: '1',
        minHeight: '100%',
        background: `url('${process.env.PUBLIC_URL}/backImage2.png') no-repeat center`,
        height: '80vh'
       }}
    >
      <Container maxWidth="sm"
        sx={{ backdropFilter: 'blur(2px)' }}>
        <form
          onSubmit={submitSession}
          name="login"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Universitario"
            name="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Box sx={{ py: 2}}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  )
}

export default Login;