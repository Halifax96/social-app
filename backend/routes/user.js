const express = require("express");
const router = express.Router();
const User = require("../models/users");
//const jwt = require("jsonwebtoken");

//Función que devuelve todos los usuarios
router.get("/", async function(req, res){
    try{
        const useresp = await User.find();
        res.json(useresp);
    }catch(e){
        console.log("Error en la peticion get", e);
        res.status(400).send("Error en el servidor");
    }
});

//Añade una card desde el body
router.post("/", async function(req, res) {  
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let email = req.body.email;
    let dni = req.body.dni;
    let lugarNacimiento = req.body.lugarNacimiento;
    let descripcionPersonal = req.body.descripcionPersonal;
    let telefono = req.body.telefono;
    let contrasena = req.body.contrasena;
    let fechaCreacion = req.body.fechaCreacion;
    let rol = req.body.rol;
    let comentario = req.body.comentario;
    let favoritos = req.body.favoritos;
    let avatar = req.body.avatar;

    try{
        const usuario = {};

        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.direccion = email;
        usuario.dni = dni;
        usuario.lugarNacimiento = lugarNacimiento;
        usuario.descripcionPersonal = descripcionPersonal;
        usuario.telefono = telefono;
        usuario.contrasena = contrasena;
        usuario.fechaCreacion = fechaCreacion;
        usuario.rol = rol;
        usuario.comentario = comentario;
        usuario.avatar = avatar;
        usuario.favoritos = favoritos;
        const user = new User(usuario);
        await user.save();

        //Creamos el token y enviamos a qn fue ananido a la base de datos
        //const token = jwt.sign({dni:dni}, "ClaveCifrado", { expiresIn: "3m" });
        //Enviamos el token
        
        return res.status(200).send("Usuario Añadido correctamente");/*.json({ token })*/
    }catch(e){
        console.log("Error al añadir un usuario", e);
        return  res.status(400).send("Error al añadir un usuario");
    }
});

//Añade una card desde el body
router.put("/", async function(req, res){    
    let idUser = req.body.id;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let email = req.body.email;
    let dni = req.body.dni;
    let lugarNacimiento = req.body.lugarNacimiento;
    let descripcionPersonal = req.body.descripcionPersonal;
    let telefono = req.body.telefono;
    let fechaCreacion = req.body.fechaCreacion;
    let rol = req.body.rol;
    let comentario = req.body.comentario;
    let favoritos = req.body.favoritos;
    let avatar = req.body.avatar;      
    
    try{
        //mirar por si acaso el id de mongo
        console.log(idUser);
        let currentCard = await User.findById(idUser);
        if(!currentCard){
            return res.status(400).send("Usuario no encontrado ");
        }

        let nuevaCard = await User.findOneAndUpdate({id:idUser}, {nombre:nombre, apellido:apellido, email:email, dni:dni, lugarNacimiento:lugarNacimiento, descripcionPersonal:descripcionPersonal, telefono:telefono, fechaCreacion:fechaCreacion, rol:rol, comentario:comentario, favoritos:favoritos, avatar:avatar});

        //Creamos el token y enviamos a qn fue ananido a la base de datos
        //const token = jwt.sign({dni:dni}, "ClaveCifrado", { expiresIn: "3m" });
        //Enviamos el token

        return res.status(200).send("Usuario cambaiado perfectamente");/*.json({ token })*/
        
    }catch(e){
        console.log("Error al modificar el usuario",e);
        return  res.status(400).send("Error al cambiar usuario");
    }
});

//Elimina una card desde el body
router.delete("/:id", async function(req, res) {     

    let idUser = req.params.id;

    try{
        let usuario = await User.findOne({_id:idUser});
        let dni = usuario.dni;
        
        let borrados = await User.deleteOne({_id:idUser});
        if(borrados.deletedCount === 0){
            return res.status(400).send("Usuario no existe por lo tanto no se puede eliminar");
        }

        //Creamos el token y enviamos a qn fue ananido a la base de datos
        //const token = jwt.sign({dni:dni}, "ClaveCifrado", { expiresIn: "3m" });
        //Enviamos el token

        return res.status(200).send("Usuario eliminado perfectamente");/*.send({ token })*/
    }catch(e){
        console.log("Error al borrar el usuario en la base de datos", e);
        return res.status(400).send("Error al eliminar usuario");
    }
});

module.exports = router;