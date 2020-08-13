const express = require('express');
const bodyParser=require('body-parser');
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const utils = require("./utils");
const { Utils } = require('sequelize');
const sequelize = require('sequelize');
const { query } = require('express');
const claveToken=' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 ';
//const cors = require('cors');
const api = express();

api.listen(3000, (req,res) => {
    console.log('Servidor Delilah resto activo...')
});

api.post('/usuarios', (req, res, next) => {
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
api.get('/usuarios', (req, res) => {
    //console.log(req);
    const { usuario_o_mail, password } = req.body;
    const usuarioEncontrado = comprobarCuentaIngreso(usuario_o_mail, password);
    if (!usuarioEncontrado) {
        res.send('Error, no se encontro usuario/mail inexistente en el sistema');
        res.status(utils.estadoDeServer.statusErrorCliente);
    }
    res.send('Ok. Ingreso exitoso');

    res.json(req.body);
});

api.get('/productos', (req, res) => {
    const listaProductos = listarTodosProductos();
});
api.post('/login',(req,res)=>{
 let {usuario_o_mail,password}=req.body;
 const usuarios= await traerTabla("usuarios");
 let ingresoXusuario=usuarios.find(unUsuario=>unUsuario.usuario==usuario_o_mail);
 let ingresoXmail=usuarios.find((unUsuario=>unUsuario.mail==usuario_o_mail));
 if(ingresoXmail){
     if(ingresoXmail.password===password){
        if(ingresoXusuario.isAdmin===true){
            let token=jwt.sign({usuario,isAdmin:true},claveToken);
            res.status(201).json({token});
            console.log("usuario existente");
         }
         else{
             const token=jwt.sign({usuario,isAdmin:false},claveToken);
             res.status(utils.estadoDeServer.statusOk).json({token});
             console.log('usuario Existente');
         }
     }
     else{
         res.status(utils.estadoDeServer.statusErrorCliente).send(utils.mensajeServer.statusErrorClienteMensaje);
     }
 }
 else{
    res.status(utils.estadoDeServer.statusErrorCliente).send(utils.mensajeServer.statusErrorClienteMensaje);
 }
 
});

api.delete('/platos/:idPlato',autenticarUsuario,(req,res)=>{
    let idPlato=req.params.idPlato;
    // comprobar si funciona console.log(idPlato);
    sequelize.query('DELETE FROM platos WHERE id_plato=?',{
        replacements:[id_plato],
        type: sequelize.QueryTypes.DELETE
    }).then(function(resultados){
        res.status(utils.estadoDeServer.statusOk).json(utils.mensajeServer.statusOkMensaje);
    })
});

api.post('/pedidos',autenticarUsuario,(req,res)=>{
    let unPedido  ;
    let {id_usuario,carrito_platos,t_pago,p_time,estado,total}=req.body;
    sequelize.query('INSERT INTO pedidos VALUE (NULL,?,?,?,?,?,?)',{
        replacements:[id_usuario,carrito_platos,t_pago,p_time,estado,total],
        type:sequelize.QueryTypes.INSERT
    }).then(function(resultados){
        //console.log(resultados[0]);
        unPedido=resultados[0];
            for(let i=0;i<carrito_platos.length;i++){
            sequelize.query('INSERT INTO carritos VALUE(NULL,?,?,?,?)',{
                replacements: [unPedido,carrito_platos[i].id_plato,carrito_platos[i].cantidad],
                type:sequelize.QueryTypes.INSERT
            }).then(function(resultados){
                console.log(utils.mensajeServer.statusCargadoCarritoMensaje);
            });
        
            }
    });
    res.status(utils.estadoDeServer.statusOkPedido).json(utils.mensajeServer.statusOkPedidoMensaje);
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
async function traerTabla(unaTabla){
const unaTabla= await sequelize.query('SELECT * FROM ${unatabla}',{
    type:sequelize.QueryTypes.SELECT
})
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
//el usuario autenticado es aquel con el rol admin
function autenticarUsuario(req,res,next){
    try{
        const token=req.headers.authorization.split(' ')[1];
        const autenticarToken=jwt.verify(token,claveToken) ;
        if(autenticarToken){
            req.usuario=autenticarToken;
            console.log(utils.mensajeServer.statusOkValidacionMensaje);
            next();
        }
    }
    catch(error){
        console.log(utils.mensajeServer.statusErrorCredencialesMensaje);
        res.status().json('Error al validar usuario');
    }

}

//cuando el usuario haga una peticion sobre un pedido especifico verifico que ese pedido sea propio
function autenticarConsultaDeUsuario(req, res,next){
    try{
        const token=req.headers.authorization.split(' ')[1];
        const autenticarToken=jwt.verify(token,claveToken) ;
        console.log(autenticarToken.token);
        if(autenticarToken.usuario===req.params.usuario){
            req.usuario=autenticarToken;
            console.log('Usuario verificado');
            next();
        }
        else{
            //verificar si toma el valor del import
            res.status(utils.statusErrorCredenciales).json('Error el usuario no esta autorizado');
        }
    }
    catch(error)
    {
        console.log('Error usuario no autenticado');
        res.status(utils.statusErrorCredenciales).json('Error al verificar usuario');
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
