/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from '../../pages/login/Login';
import Home from '../../pages/home/Home';
import Novedades from '../../pages/novedades/Novedades';
import ExpoProyecto from '../../pages/expoproyecto/Expoproyecto';
import Backoffice from '../../pages/backoffice/Backoffice';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

import './header.css';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Tooltip,
 } from '@mui/material';

const Header = () => {
  const [user, setUser] = React.useState(null)
  const auth = localStorage.getItem('auth');
  React.useEffect(() => {
    setUser(JSON.parse(auth));
  }, []);

  const goLogin =() => {
    window.location.href = '/login';
  };
  return(
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <img style={{marginRight: '2em'}} src={process.env.PUBLIC_URL+'logoTpi.png'} width="100"/>
            {
              user
              ?
               <><Typography variant="subtitle2" style={{ marginRight: '2em' }}>
                <Link to="/home">Home</Link>
              </Typography>
              <Typography variant="subtitle2" style={{marginRight: '2em'}}>
                <Link to="/novedades">Novedades</Link>
              </Typography>
              <Typography variant="subtitle2" sx={{ flexGrow: 1 }} style={{marginRight: '2em'}} >
                <Link to="/expoproyecto">ExpoProyecto</Link>
              </Typography></>
              : ''
            }
            {
              user 
              ?
                <>
                {user.idTipo === 1
                  ?
                  <Button color="primary" variant="contained" style={{ marginRight: '2em' }}>
                    <Link to="/backoffice">Backoffice</Link>
                  </Button>
                  : ''
                }<Tooltip title={user?.idTipo === 1 ? 'Administrador' : 'Alumno'} placement="bottom">
                    <Avatar sx={{ bgcolor: (user?.idTipo === 1 ? '#f4a261' : '#e9c46a') }}>{user ? user.nombre.substr(0, 1).toUpperCase() : null}</Avatar>
                  </Tooltip>
                  <IconButton
                    style={{ marginLeft: '2em' }}
                    onClick={() => goLogin()
                  }>
                  <ExitToAppRoundedIcon />
                </IconButton></>
              : ''
            }
          </Toolbar>
        </AppBar>
      </Box>

      <Switch>
         {/* } <Route path="/login">
            <Login />
          </Route> */}
          <Route path="/home">
            <Home auth={user} />
          </Route>
          <Route path="/novedades">
            <Novedades />
          </Route>
          <Route path="/expoproyecto">
            <ExpoProyecto />
          </Route>
          <Route path="/backoffice">
            <Backoffice auth={user?.token} />
          </Route>
        </Switch>
    </Router>
  )
};


export default Header;