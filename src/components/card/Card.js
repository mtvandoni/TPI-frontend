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
  IconButton } from '@mui/material';
  import FavoriteIcon from '@mui/icons-material/Favorite';
  import ReadMoreIcon from '@mui/icons-material/ReadMore';
  import ChatIcon from '@mui/icons-material/Chat';
import './card.css';

const CardCustom = () => {
  const [openDrawer, setOpenDrawer ] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    setOpenDrawer(open);
  };

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
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          style={{ padding: '2em'}}
        >
          
          <Typography variant="h5" color="text.primary">
              Nombre proyecto
            </Typography>

        </Box>
      </Drawer>
    </div>
  )
};

export default CardCustom;