const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();

server.listen(3000, () => {
    console.log('Servidor Iniciado...')
});

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
