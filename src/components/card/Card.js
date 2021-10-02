import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './card.css';

const CardCustom = () => {
  return(
    <div>
      <Card sx={{ maxWidth: 250, borderRadius: '15px', marginTop: '2em', position: 'relative' }}>
        <CardMedia
          component="img"
          height="150"
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
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  )
};

export default CardCustom;