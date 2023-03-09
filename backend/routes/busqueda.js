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
router.post("/", async function(req, res){
    let email = req.body.email;
    let contrasena = req.body.contrasena;

    try{
        const userDni = await User.find({dni:dni});
        console.log(userDni);
        if(userDni===[]){
            return res.status(200).send("DNI no encontrado en la base de datos");
        }

        return res.status(200).send("DNI encontrado en la base de datos");
    }catch(e){
        res.status(400).send("Error en el servidor en peticion post del id");
    }

})

module.exports = router;