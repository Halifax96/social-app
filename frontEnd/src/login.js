import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { DialogContent, DialogContentText, DialogTitle, Dialog } from '@mui/material';
import axios from "axios";
import Footer from "./Footer"
import GoogleButton from 'react-google-button'

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "15%",
  maxHeight: "15%",
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.unileon.es/">
        SocialCards
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
   
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('usuario'),
      contrasena: data.get('contrasena'),
    });
    let email = data.get('usuario');
    let contrasena = data.get('contrasena');

    if( data.get('usuario') === "" || data.get('contrasena') === ""){
      window.confirm("No puede estar el campo usuario o contraseña vacios");
      SignInSide();
    }

    //Modificar este trozo de codigo. Así no hacemos ninguna llamada al backend
    //Hay que hacer la solicitud al backend       
    
    //function validarUsuario(email, contrasena){
      axios.get("http://localhost:5000/busqueda/", {email:email, contrasena:contrasena})
      .then(function(response){
          if(response.status===200){
            let email = response.data.email;
            let contrasena = response.data.contrasena;
            //Aqui comprobamos si el usuario es valido
            if((email===email)&&(contrasena===contrasena)){ //Aqui tenemos que comprobar el rol del propio usuario
              if(response.data.rol==="rolUsuraio"){
                 navigate("./usuarioVista");
              }else if(response.data.rol==="rolAdmin"){
                 navigate("./administradorVista");
              }else if(response.data.rol==="rolManager"){
                  //Aqui pondremos la ventana del manager
              }else{
                 window.confirm("Error del rol de usuario");
              }

            }
          }else{
            window.confirm("Error al iniciar sesión");
          }
      });
    //}


    if( data.get('usuario') === "admin" && data.get('contrasena') === "admin"){
      let user = navigate("./administradorVista");
    }else{
      let user = navigate("./usuarioVista");
    }
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Img
              src={
                "https://static.vecteezy.com/system/resources/thumbnails/004/283/847/small/ia-logo-monogram-emblem-style-with-crown-shape-design-template-free-vector.jpg"
              }
            />
            <Typography component="h1" variant="h5">
              Bienvenido a SocialCards
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="usuario"
                label="Email Address"
                name="usuario"
                autoComplete="usuario"
                variant="standard"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="contrasena"
                label="contraseña"
                type="password"
                id="contrasena"
                autoComplete="current-password"
                variant="standard"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "lightblue" }}
              >
                ENTRAR
              </Button>
              <Grid container>
                <Grid item xs>
                  
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                      Contacta con nosotros
                    </DialogTitle>
                    <DialogContentText>
                      contacto@introapp.es
                    </DialogContentText>
                  </Dialog>
                </Grid>
              </Grid>
              <GoogleButton/>
              <Link href="#" variant="body2" onClick={handleClickOpen}>
                    Contacta con nosotros
              </Link>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer/>
    </ThemeProvider>
  );
}