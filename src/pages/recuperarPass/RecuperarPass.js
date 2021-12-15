/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Box,
  Container,
  Snackbar,
  Alert,
} from '@mui/material';

const RecuperarPass = () => {
  const [user, setUser] = React.useState(null);

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json; charset=iso-8859-1',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': '*',
  };
  const apiURL = "http://webtpi-001-site1.dtempurl.com";


  React.useEffect(() => {
  }, [])

  const { search } = window.location;
  const params = new URLSearchParams(search);
  const redirect = params.get('callbackURL');
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [messageSnackBar, setMessageSnackBar] = React.useState('');
  const [severitySnackBar, setSeveritySnackBar] = React.useState('success');

  function submitSession(e) {
    e.preventDefault();
    axios.put(apiURL + '/api/usuario/recuperarpass', {emailUnlam: e.target.email.value}, {headers}).then((response) => {
      if(response) {
        setMessageSnackBar('Contraseña restaurada correctamente');
        setSeveritySnackBar('success');
        setOpenSnack(true);
        setOpen(false);
        if (typeof window !== 'undefined') {
          window.location.href = redirect || '/login';
        }
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
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
          name="recuperarPass"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Universitario"
            name="email"
          />
          <Box sx={{ py: 2}}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
            >
              Recuperar Contraseña
            </Button>
          </Box>
          
        </form>
      </Container>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      >
        <Alert
        onClose={handleClose}
        severity={severitySnackBar} sx={{ width: '100%' }}>
          {messageSnackBar}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default RecuperarPass;