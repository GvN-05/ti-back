const configuracion = require('../../configuracion/configuracion')
const axios = require('axios')

const REST_OPERATION = {
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

const REST_STATUS_CODE = {
    OK: 200,
    NOT_PARAMETERS: 400,
    NOT_FOUND: 404
}

async function enviarPeticion (peticion) {

    let respuesta
    
    try {

        let request = {
            method: peticion.tipoOperacion,
            url: peticion.url,
            data: peticion.body,
            config: {
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            headers: {
                uuid: peticion.uuid
            }
        }

        let response = await axios(request)

        respuesta = {
            status: response.status,
            data: response.data[peticion.key]
        }

    } catch (error) {

        respuesta = {
            status: error.response.status,
            data: error.response.data.respuesta
        }

    }

    return respuesta
}

module.exports = {
    REST_OPERATION,
    REST_STATUS_CODE,

    enviarPeticion
}