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
import MiEquipo from '../../pages/miEquipo/MiEquipo';
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

import session from '../../services/session';
import {logout} from '../../services/security';
const Header = () => {
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    setUser(session().data);
  }, []);

  const goLogin =() => {
    logout();
    window.location.href = '/login';
  };
  return(
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <img style={{marginRight: '2em', padding: '1em'}} src={process.env.PUBLIC_URL+'logoBlanco.png'} width="60"/>
            
              <Typography variant="subtitle2" color="white" style={{ marginLeft: '18em', marginRight: '2em' }}>
                <Link to="/home">Home</Link>
              </Typography>
              <Typography variant="subtitle2" color="white" style={{marginRight: '2em'}}>
                <Link to="/novedades">Novedades</Link>
              </Typography>
              <Typography variant="subtitle2" color="white" sx={{ flexGrow: 1 }} style={{marginRight: '2em'}} >
                <Link to="/expoproyecto">ExpoProyecto</Link>
              </Typography>
              
            {
              user 
              ?
                <>
                {user.idTipo === 1
                  ?
                  <Button variant="outlined" style={{ marginRight: '2em', borderColor: 'white'}}>
                    <Link to="/backoffice">Backoffice</Link>
                  </Button>
                  : <Button variant="outlined" style={{ marginRight: '2em', borderColor: 'white'}}>
                    <Link to="/miequipo">Mi Equipo</Link>
                  </Button>
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
            <Home />
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
          <Route path="/miequipo">
            <MiEquipo auth={user?.token} />
          </Route>
        </Switch>
    </Router>
  )
};


export default Header;