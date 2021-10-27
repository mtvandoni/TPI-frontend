/* eslint-disable no-unused-vars */
import * as React from 'react';
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
  TextField
  } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import ChatIcon from '@mui/icons-material/Chat';
import Carousel from 'react-material-ui-carousel'
import './card.css';

const CardCustom = ({data, title, body, category, img}) => {
  const [openDrawer, setOpenDrawer ] = React.useState(false);
  const [valuePanel, setValuePanel] = React.useState(0);

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

  return(
    <div>
      <Card sx={{ maxWidth: 300, minWidth: 300, borderRadius: '15px', marginTop: '2em', position: 'relative' }}>
        <CardMedia
          component="img"
          height="250"
          image={img}
        />
        <CardContent>
          <Typography variant="h5">
            {data?.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.descripcion}
          </Typography>
          {/* <div className="badge">{category}</div> */}
        </CardContent>
        <CardActions>
          <div style={{flexGrow: 1 }} >
          <Tooltip title="Me gusta">
            <IconButton style={{marginRight: '1em'}}><FavoriteIcon/></IconButton>
            </Tooltip>
            <Tooltip title="Comentarios">
              <IconButton><ChatIcon/></IconButton>
            </Tooltip>
          </div>
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
              <Tab label="Información" {...a11yProps(0)} style={{marginRight: '1em'}} />
              <Tab label="Entregas" {...a11yProps(1)} />
              <Tab label="Equipo" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={valuePanel} index={0}>
              <Paper>
              <img height="400" src={img} style={{borderRadius: 15}} alt="prueba"/>
             </Paper>
          <Typography variant="h6" color="text.primary">
            {data?.nombre}
          </Typography>
          <Typography variant="body2">
            {data?.descripcion}
          </Typography>
          <Stack direction="row" spacing={1} style={{marginTop: '2em'}}>
            <Chip label={data?.idTipoProyecto === 1 ? 'WEB' : 'MOBILE'} color="secondary" size="small"/>
          </Stack>
          </TabPanel>
          <TabPanel value={valuePanel} index={1}>
            Coming Soon...
          </TabPanel>
          <TabPanel value={valuePanel} index={2}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: '4em',
          }}>
            Coming Soon...
            {/*<Box
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
                    MV
                  </Typography>
                </Paper>
                <div className="description">
                  <Typography variant="subtitle2" color="">Fulanito de tal </Typography>
                  <Typography variant="subtitle1" color="">Alumno </Typography>
                </div>
              </div>
              <div className="cardPerson">
                <Paper elevation={3}>
                  <Typography variant="h4" color="white" className="typoCardPerson">
                    MV
                  </Typography>
                </Paper>
                <div className="description">
                  <Typography variant="subtitle2" color="">Fulanito de tal </Typography>
                  <Typography variant="subtitle1" color="">Alumno </Typography>
                </div>
              </div>
              <div className="cardPerson">
                <Paper elevation={3}>
                  <Typography variant="h4" color="white" className="typoCardPerson">
                    MV
                  </Typography>
                </Paper>
                <div className="description">
                  <Typography variant="subtitle2" color="">Fulanito de tal </Typography>
                  <Typography variant="subtitle1" color="">Alumno </Typography>
                </div>
              </div>
              <div className="cardPerson">
                <Paper elevation={3}>
                  <Typography variant="h4" color="white" className="typoCardPerson">
                    MV
                  </Typography>
                </Paper>
                <div className="description">
                  <Typography variant="subtitle2" color="">Fulanito de tal </Typography>
                  <Typography variant="subtitle1" color="">Profesor </Typography>
                </div>
              </div>
            </Box> */}
          </div>
          </TabPanel>
        </Box>
        {/*<div
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            width: '60%',
            marginBottom: '4em'
          }}>
          <div
            style={{
              borderBottom: '1px solid #80808052',
              marginBottom: '2em',
              paddingBottom: '1em'
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
                <Avatar sx={{ bgcolor: 'warning.main' }} style={{float: 'left', marginRight: '1em'}}>MV</Avatar>
                <Typography variant="subtitle2" color="">Micaela</Typography>
                <Typography variant="subtitle2" color="warning.main">Alumno</Typography>
              </div>
              <Typography variant="subtitle2" color="">07/09/2021</Typography>
            </div>
            <div style={{marginLeft: '4em'}}>
            <Typography variant="subtitle2" color="">Lorem lorem ipsum!! </Typography>
            </div>
          </div>
          <div
            style={{
              borderBottom: '1px solid #80808052',
              marginBottom: '2em',
              paddingBottom: '1em'
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
                <Avatar sx={{ bgcolor: 'info.main' }} style={{float: 'left', marginRight: '1em'}}>MJ</Avatar>
                <Typography variant="subtitle2" color="">Mariano Juiz</Typography>
                <Typography variant="subtitle2" color="info.main">Profesor</Typography>
              </div>
              <Typography variant="subtitle2" color="">07/09/2021</Typography>
            </div>
            <div style={{marginLeft: '4em'}}>
            <Typography variant="subtitle2" color="">Lorem lorem ipsum!! </Typography>
            </div>
          </div>
          <TextField
            style={{width: '100%' }}
            id="standard-textarea"
            label="Comentar"
            placeholder="Nuevo comentario..."
            multiline
            variant="outlined"
          />
        </div> */}
      </Drawer>
    </div>
  )
};

export default CardCustom;