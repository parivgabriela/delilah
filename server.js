const express = require('express');
const bodyParser=require('body-parser');
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const utils = require("./utils.js");

//const cors = require('cors');
const api = express();

api.listen(3000, (req,res) => {
    console.log('Servidor Delilah resto activo...')
});


api.post('/login', (req, res) => {
    //console.log(req);
    const { usuario_o_mail, password } = req.body;
    const usuarioEncontrado = comprobarCuentaIngreso(usuario_o_mail, password);
    if (!usuarioEncontrado) {
        res.send('Error, no se encontro usuario/mail inexistente en el sistema');
        res.status(statusError);
    }
    res.send('Ok. Ingreso exitoso');

    res.json(req.body);
});
api.post('/usuario', (req, res, next) => {
    const { usuario, nombre_ape, mail, telefono, domicilio, psw } = req.query;
    const usuarioAComprobar = comprobarCuentaIngreso(usuario);
    const mailAComprobar = comprobarCuentaIngreso(mail);
    if (!usuarioAComprobar && !mailAComprobar) {
       /* const insert = await sequelize.query(
            "INSERT INTO users (usuario, nombre_ape, mail, email, telefono, domicilio) VALUES (:usuario, :nombre_ape,:mail,:telefono, :domicilio,:psw)", { replacements: { usuario, nombre_ape, mail, telefono, domicilio, psw } }
        );*/
        res.status(statusOk).json("Usuario creado exitosamente");
        next();
    } else {
        res.status(statusError).json("Usuario/mail existente");
    }
});
api.get('/productos', (req, res) => {
    const listaProductos = listarTodosProductos();
});

function comprobarCuentaIngreso(usuario_o_mail, password) {
    //query para que busque, 
    let resultadoUsuario=[],resultadoMail;
    resultadoUsuario=usuarios.find(usuarioEncontrado=>(usuarioEncontrado.mail===usuario_o_mail));
    resultadoMail=usuarios.find(usuarioEncontrado=>(usuarioEncontrado.usuario===usuario_o_mail));
    if(resultadoUsuario||resultadoMail){
        let resultadoPassword=usuarios.find(usuarioEncontrado.password===password);
    }
}

function buscarEnDB(unaTabla, unaColumna) {
    //revisar la busqueda
  //  const searchResults = await sequelize.query(`SELECT * FROM ${unaTabla} WHERE ${unaColumna} = :replacementParam`);
}

async function validate_token(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    try {
        /*
        const verification = jwt.verify(token, signature);
        const found_user = await get_by_param("users", "user_id", verification.id);
        const isDisabled = !!found_user.is_disabled;
        if (isDisabled) {
            res.status(401).json("Unauthorized - User account is disabled");
        } else {
            req.token_info = verification;
            next();
        }
        */
       
    } catch (e) {
        res.status(401).json("Unauthorized - Invalid Token");
    }
}

function comprobarIngreso(usuario_o_mail, password) {
    //query para que busque los productos
    usuarios.find(usuarioEncontrado => ((usuarioEncontrado.mail === usuario_o_mail) || usuarioEncontrado.usuario === usuario_o_mail));
}

function buscarEnDB(unaTabla, unaColumna) {
    //revisar la busqueda
  //  const searchResults = await sequelize.query(`SELECT * FROM ${unaTabla} WHERE ${unaColumna} = :replacementParam`);
}


function listarTodosProductos() {
    console.log("bla bla");
}
