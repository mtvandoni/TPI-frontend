/* eslint-disable no-unused-vars */
import * as React from 'react';

import axios from 'axios';
import session from '../../services/session';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Drawer,
  Box,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
  Paper,
  Stack,
  Chip,
  Avatar,
  TextField,
  Button
  } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import Slider from "react-slick";

import './card.css';

const apiURL = 'https://localhost:44311';
const headers = { 
 'Authorization': session().token,
 'Content-type': 'application/json; charset=iso-8859-1',
};

const user = session().usuario;

const CardCustom = ({type, data, participantes, descripcion, nombre, img, video, enabledComment}) => {
  const [openDrawer, setOpenDrawer ] = React.useState(false);
  const [valuePanel, setValuePanel] = React.useState(0);
  const [comentarios, setComentarios] = React.useState(null);
  const [update, setUpdate] = React.useState(false);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  React.useEffect(() => {
    axios.get(apiURL + '/api/usuario', {headers}).then((response) => {
      const all = [];
      if (response) {
        all.push(response.data);
        axios.get(apiURL + `/api/comentario/${data?.idProyecto}`, {headers}).then((response) => {
          if (response) {
            all.push(response.data);
          }
          setComentarios(normalizeComentarios(all));
        });
      }
    });
  }, [update]);

  const normalizeComentarios = (data) => {
    const usuarios = data[0];
    const comentarios = data[1];

    const all = [];

    comentarios.forEach((item) => {
      const aux = usuarios.find(user => user.id === item.idPersona);
      all.push({
        usuario: aux.nombre,
        idTipo: aux.idTipo,
        comentario: item.descripcion,
        fecha: item.fecha
      })
    });
    return all;
  };

  const toggleDrawer = (open) => (event) => {
    setOpenDrawer(open);
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography variant="text">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const handleChangePanel = (event, newValue) => {
    setValuePanel(newValue);
  }

  const nuevoComentario = (e) => {
    e.preventDefault();
    const obj = {
      descripcion: e.target.comentario.value,
      fecha: '2021-11-26',
      idProyecto: data.idProyecto,
      idPersona: session().data.id,
    }
    axios.post(apiURL + '/api/comentario', obj, {headers}).then((response) => {
      if (response) {
        setUpdate(!update);
        setUpdate(!update);
      }
    });
  };

  const likeProyecto = (e, id) => {
    e.preventDefault();
    const obj = {
      id: id,
      flagMeGusta: 'SI'
    };
    axios.put(apiURL + '/api/proyecto/megusta', obj, {headers}).then((response) => {
      if (response) {
        setUpdate(!update);
        setUpdate(!update);
      }
    });
  };

  const abrirVideo = (e, url) => {
    e.preventDefault();
    let win = window.open(url, '_blank');
  };

  return(
    <div>
      <Card sx={{ maxWidth: 300, minWidth: 300, borderRadius: '15px', marginTop: '2em', position: 'relative' }}>
        <CardMedia
          component="img"
          height="250"
          width="250"
          image={img}
        />
        <CardContent style={{ minHeight: '5em'}}>
          <Typography variant="h5">
            { type === 'proyecto' ? data?.nombre : nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { type === 'proyecto' ? data?.descripcion : descripcion}
          </Typography>
        </CardContent>
        <CardActions>
          { type === 'proyecto' ?
          
            <div style={{flexGrow: 1 }} >
              <Tooltip title="Me gusta">
                <IconButton onClick={e => likeProyecto(e, data?.idProyecto)}><FavoriteIcon/></IconButton>
              </Tooltip>
              {data?.cantMeGusta}
            </div> : null
          }
          <div style={{flexGrow: 1 }} >
            <Tooltip title="Mas info">
              <IconButton onClick={toggleDrawer(true)} style={{float: 'right'}}>
                <ReadMoreIcon />
              </IconButton>
            </Tooltip>
          </div>
        </CardActions>
      </Card>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{width: 800 }}
          role="presentation"
          style={{ padding: '2em'}}
        >
          <Typography variant="h5" color="text.primary">
            {data?.nombre}
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '2em' }}>
            <Tabs
              value={valuePanel}
              onChange={handleChangePanel}
              aria-label="basic tabs example"
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab label="Información"{...a11yProps(0)} style={{marginRight: '1em'}} />
              <Tab label="Equipo" style={{display: type !== 'proyecto' ? 'none': 'block' }}  {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={valuePanel} index={0}>
              <div>
                <img height="400" src={img} style={{borderRadius: 15, marginLeft: 'auto', marginRight: 'auto', display: 'block'}} alt={img}/>
              </div>
              {type === 'proyecto' ?
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  style={{ width: '20em', display: video ? 'block' : 'none' }}
                  onClick={(e) => abrirVideo(e, video)}
                  >Ver video</Button>
                </div>
                : null
              }
            <Typography variant="h6" color="text.primary">
              {data?.nombre}
            </Typography>
            <Typography variant="body2" style={{marginTop: '3em'}}>
              {data?.descripcion ? data.descripcion : descripcion}
            </Typography>
            { type === 'proyecto' ?
              <Stack direction="row" spacing={1} style={{marginTop: '2em'}}>
                <Chip label={data?.idTipoProyecto === 1 ? 'WEB' : 'MOBILE'} color="secondary" size="small"/>
              </Stack> : null
            }
          </TabPanel>
          <TabPanel value={valuePanel} index={1}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: '4em',
            justifyContent: 'center'
          }}>
          {
            participantes ? participantes.map((participante) => 
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  '& > :not(style)': {
                    m: 1,
                    width: 150,
                    height: 150,
                  },
                }}
              >
                  <div className="cardPerson">
                    <Paper elevation={3}>
                      <Typography variant="h4" color="white" className="typoCardPerson">
                        {participante?.nombre.charAt(0).toUpperCase()}
                      </Typography>
                    </Paper>
                    <div className="description">
                      <Typography variant="subtitle2" color="">{participante?.nombre} </Typography>
                      <Typography variant="subtitle1" color="">{participante?.idTipo === 3 ? 'Alumno' : 'Profesor'}</Typography>
                      <Typography variant="body2" style={{fontSize: '0.7rem'}}>{participante?.emailUnlam}</Typography>
                    </div>
                  </div>
              </Box>) : null
            }
            </div>
          </TabPanel>
        </Box>
       <div
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            width: '60%',
            marginBottom: '4em',
            display: enabledComment === 'no' ? 'none' : 'display'
          }}>
            {comentarios ?
            <div style={{ height: '20em', overflowY: 'scroll', width: '41em', marginBottom: '2em'}} >
            {comentarios && comentarios.map((comentario) => (
              <div
                style={{
                  borderBottom: '1px solid #80808052',
                  marginBottom: '2em',
                  paddingBottom: '1em',
                  marginRight: '10em',
                }}
              >
                <div
                  style={{
                    marginBottom: '1em',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{width: '50%'}}>
                    <Avatar sx={{ bgcolor: comentario.idTipo === 3 ? '#e9c46a': '#f4a261' }} style={{float: 'left', marginRight: '1em'}}>{comentario.usuario.substr(0,1).toUpperCase()}</Avatar>
                    <Typography variant="subtitle2" color="">{comentario.usuario}</Typography>
                    <Typography variant="subtitle2" style={{ color: comentario.idTipo === 3 ? '#e9c46a': '#f4a261'}}>{comentario.idTipo === 3 ? 'Alumno' : 'Profesor'}</Typography>
                  </div>
                  <Typography variant="subtitle2" color="">{comentario?.fecha.substr(0, 10)}</Typography>
                </div>
                <div style={{marginLeft: '4em'}}>
                <Typography variant="subtitle2" color="">{comentario?.comentario}</Typography>
                </div>
              </div>
            ))}
          </div> : null}
            
          <form
           onSubmit={nuevoComentario}
            name="comentario"
          >
            <TextField
              style={{width: '100%' }}
              id="standard-textarea"
              label="Comentar"
              placeholder="Nuevo comentario..."
              multiline
              variant="outlined"
              name="comentario"
            />
             <Button
                type="submit"
                fullWidth
                color="secondary"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Enviar
              </Button>
          </form>
        </div>
        {type !== 'proyecto' ?
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="button"
            variant="contained"
            color="error"
            style={{ width: '20em', display: video ? 'block' : 'none' }}
            onClick={(e) => abrirVideo(e, video)}
            >Ver video</Button>
          </div>
          : null
        }
        
      </Drawer>
    </div>
  )
};

export default CardCustom;