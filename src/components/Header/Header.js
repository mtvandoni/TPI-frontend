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
import RecuperarPass from '../../pages/recuperarPass/RecuperarPass';
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
  Container,
  Menu,
  MenuItem,
 } from '@mui/material';
 import MenuIcon from '@mui/icons-material/Menu';

import session from '../../services/session';
import {logout} from '../../services/security';
const Header = () => {
  const [user, setUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [recover, setRecover] = React.useState(null);

  React.useEffect(() => {
    setUser(session().data);
    
    if (window.location.pathname === '/recuperarPass') {
      setRecover(true);
    }
  }, []);

  const goLogin =() => {
    logout();
    window.location.href = '/login';
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return(
    <Router>
      <Box sx={{ flexGrow: 1, height: { xs: '4em', md: '4em', xl: '4em'} }}>
        <AppBar position="fixed">
          <Container maxWidth="xl" sx={{backgroundColor: '#264653'}}>
            <Toolbar disableGutters>
              <Avatar
                variant="rounded"
                noWrap
                src={process.env.PUBLIC_URL+'logoBlanco.png'}
                sx={{ mr: 2, display: { xs: 'none', md: 'flex', width: 49, height:57 }}}
              />
              { user ?
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    <MenuItem key="1" onClick={handleCloseNavMenu}>
                      <Typography textAlign="center"><Link to="/home">Home</Link></Typography>
                    </MenuItem>
                    <MenuItem key="2" onClick={handleCloseNavMenu} sx={{marginRight: '5em'}}>
                      <Typography textAlign="center"><Link to="/novedades">Novedades</Link></Typography>
                    </MenuItem>
                    <MenuItem key="3" onClick={handleCloseNavMenu}>
                      <Typography textAlign="center"><Link to="/expoproyecto">ExpoProyecto</Link></Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              : ''}
              <div style={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <Avatar
                  variant="rounded"
                  noWrap
                  src={process.env.PUBLIC_URL+'logoBlanco.png'}
                  sx={{ display: { xs: 'flex', md: 'none' }, width: 51, height: 58 }}
                />
              </div>
              { user ?
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                    key="1"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <Link to="/home">Home</Link>
                  </Button>
                  <Button
                    key="2"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <Link to="/novedades">Novedades</Link>
                  </Button>
                  <Button
                    key="3"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <Link to="/expoproyecto">Expo Proyecto</Link>
                  </Button>
                </Box> : ''
              }
              { user ? 
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title={user?.idTipo === 1 ? 'Administrador' : 'Alumno'} placement="bottom">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar sx={{ bgcolor: (user?.idTipo === 1 ? '#f4a261' : '#e9c46a') }}>{user ? user.nombre.substr(0, 1).toUpperCase() : null}</Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {user.idTipo === 1 ?
                      <MenuItem key="1" onClick={handleCloseNavMenu}>
                        <Link to="/backoffice">Backoffice</Link>
                      </MenuItem> :
                      <MenuItem key="2" onClick={handleCloseNavMenu}>
                        <Link to="/miequipo">Mi Equipo</Link>
                      </MenuItem>
                    }
                    <br/>
                    <MenuItem key="3" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Salir <IconButton
                        onClick={() => goLogin()
                      }>
                        <ExitToAppRoundedIcon />
                      </IconButton></Typography>
                      
                    </MenuItem>
                  </Menu>
                </Box> : ''
              }
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Switch>
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
          {}
          <Route path="/recuperarPass">
            <RecuperarPass />
          </Route>
        </Switch>
    </Router>
  )
};


export default Header;