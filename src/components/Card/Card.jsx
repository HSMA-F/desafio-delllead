import React from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import "./Card.css"

const Cards = ( props)=>{
    

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = (props) => {
    setExpanded(!expanded);
  };
    return(
      <div className="cards">
          <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        >
        <Card sx={{ maxWidth: 345 },{width:250}}>
    <CardMedia
      component="img"
      height="350"
      image={`https://www.themoviedb.org/t/p/w440_and_h660_face${props.poster}`}
      />
      <Typography variant="body2" color="black">
      {props.title}<br/>Nota: {props.rating}
      </Typography>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>{props.sinopse}:</Typography>
      </CardContent>
    </Collapse>
    </Card>
    </ExpandMore>
      </div>
    )
  }
  export default Cards