const statusOk = 200,
    statusErrorCliente = 400,//bad request
    statusErrorCredenciales=401,//Unauthorized
    statusNotFound=404,
    statusErrorServidor=500;//Internal Server Error

//def estados de los pedidos
const pedidoNuevo=10,pedidoConfirmado=20,pedidoPreparado=30,pedidoEnviado=40,pedidoCancelado=50,pedidoEntregado=60;


//prueba para ejecutar la consola
let usuarios = [{
    nombre_ape: "lolo pari",
    usuario: "lolopari",
    domicilio: "estados unidos",
    psw: "lolo",
    mail: "lolo@gmail.com",
    rol: true
},
{
    nombre_ape: "charlotte pari",
    usuario: "charlotte",
    domicilio: "francia",
    psw: "charlotte",
    mail: "charlotte@gmail.com",
    rol: false
}
];