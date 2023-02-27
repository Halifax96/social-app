import React, { useState } from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DialogContent, DialogContentText, DialogTitle, Dialog, DialogActions } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Footer from './Footer'
import { cambiarTituloSiUsuarioSeVa } from './cambiarTitulo';

cambiarTituloSiUsuarioSeVa()
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "9%",
  maxHeight: "9%",
});

const Imagenfondo = styled("imag")({
  margin: "auto",
  display: "block",
  maxWidth: "9%",
  maxHeight: "9%",
});

const theme = createTheme({
  typography: {
    button: {
      fontStyle: 'italic',
    },
  },
});

function Bienvenida() { 
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  let navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 10 }}>
    <AppBar position="static" sx={{ backgroundColor: "lightskyblue" }}>
      <Toolbar disableGutters>
          <Img
            src={
              "https://cdn.pixabay.com/photo/2012/04/11/12/54/blank-cards-28096_1280.png"
            }
          />
          <Typography
            align="center"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
           Social Cards
          </Typography>

          <Button onClick={handleClickOpen}>Normas de la Empresa</Button>
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                Politicas de Privacidad
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  1. Según la ley orgánica del 15/1999 queda totalmente prohibido compartir datos personales de los usuarios.
                </DialogContentText>
                <DialogContentText>
                  2. Según la ley orgánica del 5/1992 todo usuario podrá cambiar sus datos si es solicitado.
                </DialogContentText>
                <DialogContentText>
                  3. Según la ley orgánica del 3/2018 los usuarios solo podrán ver sus propios datos.
                </DialogContentText>
              </DialogContent>
          </Dialog>

      </Toolbar>
    </AppBar>
    
    <Box sx={{ display: 'flex', justifyContent: 'left' }}>
      <Typography
        align="center"
        variant="h6"
        component="div"
        sx={{ fontWeight: 'bold'}}
      >
        ¿Nuestra red social para que fue diseñada? No se algo tal que así
      </Typography>
    </Box>

    <h4><dd> Añandir aqui breve explicaion de todo</dd></h4>
    <h4><dd> Añandir aqui breve explicaion de todo</dd></h4>
    <h4><dd> Añandir aqui breve explicaion de todo</dd></h4>
    <h4><dd> Añandir aqui breve explicaion de todo</dd></h4>
       
    <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <Img
            src='https://img2.freepng.es/20180522/wpr/kisspng-earth-symbol-world-globe-globe-travel-5b03fd54d77e71.9387050515269881168827.jpg'
            />
    </Box>

    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <ThemeProvider theme={theme}>
      <Button color="primary" variant="outlined" onClick={() => navigate("./login")}>
          Iniciar Sesión
      </Button>
      <Button color="secondary" variant="outlined" onClick={() => navigate("./userSignUp")}>
          Registrarse
      </Button>
    </ThemeProvider>
    </Box>
    
    <Box sx={{ justifyContent: 'flex-end' }}>
      <Footer/> 
    </Box>
    
  </Box>
  );
}

export default Bienvenida;
