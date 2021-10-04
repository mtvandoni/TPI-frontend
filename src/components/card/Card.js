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
  Chip
  } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import ChatIcon from '@mui/icons-material/Chat';
import Carousel from 'react-material-ui-carousel'
import './card.css';

const CardCustom = () => {
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
            <Typography>{children}</Typography>
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
      <Card sx={{ maxWidth: 300, borderRadius: '15px', marginTop: '2em', position: 'relative' }}>
        <CardMedia
          component="img"
          height="250"
          image="https://upload.wikimedia.org/wikipedia/commons/8/8b/Australia_green_tree_frog_%28Litoria_caerulea%29_crop.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <div className="badge">Fintech</div>
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
            Nombre proyecto
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
            <Carousel>
              <Paper>
              <img height="400" src="https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/5b768b715cafe83efce47cb1/parrafo-rana-apoyada-en-hoja.jpg" />
             </Paper>
             <Paper>
              <img height="400" src="https://estaticos.muyinteresante.es/media/cache/400x300_thumb/uploads/images/article/5f74511a5bafe85c54614207/ojos-ranas_0.jpg"/>
             </Paper>
             <Paper>
               <img height="400" src="https://static4.abc.es/media/ciencia/2019/03/28/scheele2HR-kWoH--620x349@abc.jpg" />
             </Paper>
          </Carousel>
          <Typography variant="h6" color="text.primary">
            What is Lorem Ipsum?
          </Typography>
          <Typography variant="body2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
          <Stack direction="row" spacing={1} style={{marginTop: '2em'}}>
            <Chip label="JAVA" color="secondary" size="small"/>
            <Chip label="REACTJS" color="primary" size="small"/>
          </Stack>
          </TabPanel>
          <TabPanel value={valuePanel} index={1}>
            Entregas
          </TabPanel>
          <TabPanel value={valuePanel} index={2}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: '4em',
          }}>
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
              <Paper elevation={3} className="cardPerson">
                <Typography variant="h4" color="white" className="typoCardPerson">
                  MV
                </Typography>
              </Paper>
              <Paper elevation={3} className="cardPerson">
                <Typography variant="h4" color="white" className="typoCardPerson">
                  MV
                </Typography>
              </Paper>
              <Paper elevation={3} className="cardPerson">
                <Typography variant="h4" color="white" className="typoCardPerson">
                  MV
                </Typography>
              </Paper>
              <Paper elevation={3} className="cardPerson">
                <Typography variant="h4" color="white" className="typoCardPerson">
                  MV
                </Typography>
              </Paper>
            </Box>
          </div>
          </TabPanel>

        </Box>
      </Drawer>
    </div>
  )
};

export default CardCustom;