const express = require('express');
const bodyParser=require('body-parser');

//const cors = require('cors');
const api = express();

api.listen(3000, (req,res) => {
    console.log('Servidor Iniciado...')
});

api.post('/login',(req,res)=>{
    //console.log(req);
    res.send("hello world!");
})

/*
server.use(bodyParser.json());
server.use(cors());


server.get("/usuarios", (req, res) => {
    const {user_mail, clave} = req.query;
    const usuarioEncontrado = usuarios.find(usuarioEncontrado => usuarioEncontrado.mail === user_mail);
    usuarioActual = usuarioEncontrado;
    if (usuarioEncontrado) {
        if (usuarioEncontrado.clave === clave) {
            res.json(usuarioEncontrado)
                
        } else {
            res.status(404).json('Mail/contrasenia incorrecta')
                
        }
    } else {
        res.status(404).json('Mail Inexistente')
            
    }
}); 
*/
