const express = require("express");
const router = express.Router();
const User = require("../models/users");

//Función que apartir de un dni recibido por parametros te devuelve el id del objeto
router.get("/:dni", async function(req, res){
    let dni = req.params.dni;

    try{
        const userDni = await User.findOne({dni:dni});

        if(!userDni){
            return res.status(400).send("Usuario no encontrado ");
        }

        return res.status(200).send({userDni});
    }catch(e){
        console.log("Error en la peticion get del id", e);
        res.status(400).send("Error en el servidor en peticion get del id");
    }
});

//Metodo el cual verifica si el usuario esta dentro de la base de datos con su 
//respectivo email y contrasena
router.get("/", async function(req, res){
    let email = req.body.email;
    let contrasena = req.body.contrasena;

    try{
        const userDni = await User.findOne({emial:emal, contrasena:contrasena});
        console.log(userDni);
        if(userDni===[]){ //El codigo de HTTP para estos casos es el 202 
            return res.status(202).send("Usuario no encontrado en la base de datos"); //https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP#3xx:_Redirecciones
        }
        //Una vez encontrado el usuario enviamos al propio usuario
        return res.status(200).send(userDni);
    }catch(e){
        res.status(400).send("Error en el servidor en peticion get del usuario");
    }

})

module.exports = router;