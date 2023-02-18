import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { positions } from '@mui/system';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardUser({ user, removeUser, editUser, addComent, mode}) {
  const [expanded, setExpanded] = React.useState(false);
  console.log(user.nombre);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(user);
  return (
    <Card sx={{ maxWidth: 345, backgroundColor:'lightblue' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], positions:'right' }} aria-label="recipe">
            L
          </Avatar>
        }
        title={user.nombre}
        subheader={user.lugarNacimiento}
      />
      
      {mode=="Admin"&&<CardActions disableSpacing>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Dirección: {user.direccion}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            DNI: {user.dni}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Trabajo: {user.trabajo}
          </Typography>
        </CardContent>
        {/*Botones de eliminar y editar*/}
        <Button size="small" onClick={e => {removeUser(user._id)}}>Elimnar</Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>}

      {mode=="User"&&<CardActions disableSpacing>
      <CardContent>
          <Typography variant="body2" color="text.secondary">
            Dirección: {user.direccion}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            DNI: Solo visible por el Admin
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Trabajo: {user.trabajo}
          </Typography>
        </CardContent>
        {/*Botones de eliminar y editar*/}
        <Button size="small" onClick={e => {removeUser(user._id)}}>Elimnar</Button>
        <Button size="small" onclick={e => {editUser(user._id)}}>Editar</Button>
        <Button size="small" onclick={e => {addComent(user._id)}}>Añadir Comentario</Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Descripcion Personal:</Typography>
          <Typography paragraph>
            {user.descripcionPersonal}
          </Typography>
          <Typography paragraph>Comentarios:</Typography>
          <Typography paragraph>
            {user.comentario}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
