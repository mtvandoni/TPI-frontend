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

import './header.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

const Header = () => {

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
            <Typography variant="h6" style={{width: '10%'}}>
              TPI
            </Typography>
            <Typography variant="subtitle2" style={{ marginRight: '2em' }}>
              <Link to="/home">Home</Link>
            </Typography>
            <Typography variant="subtitle2" style={{marginRight: '2em'}}>
              <Link to="/novedades">Novedades</Link>
            </Typography>
            <Typography variant="subtitle2" sx={{ flexGrow: 1 }} style={{marginRight: '2em'}} >
              <Link to="/expoproyecto">ExpoProyecto</Link>
            </Typography>
            <Button color="primary" variant="contained"><Link to="/login">Login</Link></Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/novedades">
            <Novedades />
          </Route>
          <Route path="/expoproyecto">
            <ExpoProyecto />
          </Route>
        </Switch>
    </Router>
  )
};


export default Header;