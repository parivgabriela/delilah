const statusOk = 200,
    statusOkValidacion=201,
    statusErrorCliente = 400,//bad request
    statusErrorCredenciales=401,//Unauthorized
    statusNotFound=404,
    statusErrorServidor=500;//Internal Server Error
    const statusOkMensaje = 'Ingreso exitoso',
    statusOkValidacionMensaje="Usuario verificado",
    statusErrorClienteMensaje ='Peticion Erronea',//bad request
    statusErrorCredencialesMensaje='Credencial inválida, no puede ingresar',//Unauthorized
    statusNotFoundMensaje='status not found',
    statusErrorServidorMensaje='Internal Server Error';//Internal Server Error
//def estados de los pedidos
const pedidoNuevo=10,pedidoConfirmado=20,pedidoPreparado=30,pedidoEnviado=40,pedidoCancelado=50,pedidoEntregado=60;

const estadoPedidos={
    pedidoNuevo,pedidoConfirmado,pedidoPreparado,pedidoCancelado,pedidoEntregado
}
const estadoDeServer={statusOk,statusOkValidacion,statusErrorCliente,statusErrorCredenciales,statusNotFound,statusErrorServidor}
const mensajeServer={statusOkMensaje,statusOkValidacionMensaje,statusErrorClienteMensaje,statusErrorCredencialesMensaje,statusNotFoundMensaje,statusErrorServidorMensaje};
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
module.exports = { estadoDeServer,estadoPedidos,mensajeServer};