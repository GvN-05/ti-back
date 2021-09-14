const configuracion = require('../../configuracion/configuracion')

function crearRespuesta(cod, res = undefined) {
    let respuesta = {
        codigo: cod
    }

    if (res)
        respuesta.respuesta = res

    return respuesta
}

module.exports = {
    crearRespuesta
}