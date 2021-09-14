const db = require('../db/config.js')
const configuracion = require('../configuracion/configuracion')
const validacion = require('./validacion')
const parse = require('./parse')

const log = require('../configuracion/log')
const LoggerLevel = log.LoggerLevel

exports.createContact = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'createContact'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidCreateContact'

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.INFO,
                accion: 'INICIO',
                entrada: JSON.stringify(body),
                salida: JSON.stringify(response),
                ttl: 0
            }
        })

        response = {
            respuesta: configuracion.ERROR_REQUEST
        }

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.WARN,
                accion: 'FIN',
                entrada: JSON.stringify(body),
                salida: 'HEADER INCORRECTO',
                ttl: new Date() - now
            }
        })

        res.status(400).send(response)
        return
    }

    header.uuid = req.header('uuid')

    log.escribirLog({
        header: header,
        data: {
            nivel: LoggerLevel.INFO,
            accion: 'INICIO',
            entrada: JSON.stringify(body),
            salida: JSON.stringify(response),
            ttl: 0
        }
    })

    if (!validacion.validarBody(body, header.funcion)) {

        response = {
            respuesta: configuracion.ERROR_REQUEST
        }

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.ERROR,
                accion: 'FIN',
                entrada: JSON.stringify(body),
                salida: 'REQUEST INCORRECTO',
                ttl: new Date() - now
            }
        })

        res.status(400).send(response)
        return
    }

    const procesarPeticion = async () => {

        try {

            let item = {
                service: body.service,
                name: body.name,
                lastname: body.lastname,
                address: body.address,
                phone: body.phone,
                user_id: body.user_id
            }

            await db.conexion.push(item)

            response = {
                respuesta: configuracion.EXITO_CREATE
            }

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: 'FIN',
                    entrada: JSON.stringify(body),
                    salida: JSON.stringify(response),
                    ttl: new Date() - now
                }
            })

            res.send(response)

        } catch (error) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: 'FIN',
                    entrada: JSON.stringify(body),
                    salida: error.message,
                    ttl: new Date() - now
                }
            })

            res.status(500).send({
                respuesta: configuracion.ERROR_PROCEDIMIENTO
            })

        }

    }

    procesarPeticion()

}

exports.updateContact = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'updateContact'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidUpdateContact'

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.INFO,
                accion: 'INICIO',
                entrada: JSON.stringify(body),
                salida: JSON.stringify(response),
                ttl: 0
            }
        })

        response = {
            respuesta: configuracion.ERROR_REQUEST
        }

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.WARN,
                accion: 'FIN',
                entrada: JSON.stringify(body),
                salida: 'HEADER INCORRECTO',
                ttl: new Date() - now
            }
        })

        res.status(400).send(response)
        return
    }

    header.uuid = req.header('uuid')

    log.escribirLog({
        header: header,
        data: {
            nivel: LoggerLevel.INFO,
            accion: 'INICIO',
            entrada: JSON.stringify(body),
            salida: JSON.stringify(response),
            ttl: 0
        }
    })

    if (!validacion.validarBody(body, header.funcion)) {

        response = {
            respuesta: configuracion.ERROR_REQUEST
        }

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.ERROR,
                accion: 'FIN',
                entrada: JSON.stringify(body),
                salida: 'REQUEST INCORRECTO',
                ttl: new Date() - now
            }
        })

        res.status(400).send(response)
        return
    }

    const procesarPeticion = async () => {

        try {

            let contact_item = {
                service: body.service,
                name: body.name,
                lastname: body.lastname,
                address: body.address,
                phone: body.phone
            }

            await db.conexion.child(body.id).update(contact_item)

            response = {
                respuesta: configuracion.EXITO_UPDATE
            }

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: 'FIN',
                    entrada: JSON.stringify(body),
                    salida: JSON.stringify(response),
                    ttl: new Date() - now
                }
            })

            res.send(response)

        } catch (error) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: 'FIN',
                    entrada: JSON.stringify(body),
                    salida: error.message,
                    ttl: new Date() - now
                }
            })

            res.status(500).send({
                respuesta: configuracion.ERROR_PROCEDIMIENTO
            })

        }

    }

    procesarPeticion()

}

exports.deleteContact = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'deleteContact'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidDeleteContact'

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.INFO,
                accion: 'INICIO',
                entrada: JSON.stringify(body),
                salida: JSON.stringify(response),
                ttl: 0
            }
        })

        response = {
            respuesta: configuracion.ERROR_REQUEST
        }

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.WARN,
                accion: 'FIN',
                entrada: JSON.stringify(body),
                salida: 'HEADER INCORRECTO',
                ttl: new Date() - now
            }
        })

        res.status(400).send(response)
        return
    }

    header.uuid = req.header('uuid')

    log.escribirLog({
        header: header,
        data: {
            nivel: LoggerLevel.INFO,
            accion: 'INICIO',
            entrada: JSON.stringify(body),
            salida: JSON.stringify(response),
            ttl: 0
        }
    })

    if (!validacion.validarBody(body, header.funcion)) {

        response = {
            respuesta: configuracion.ERROR_REQUEST
        }

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.ERROR,
                accion: 'FIN',
                entrada: JSON.stringify(body),
                salida: 'REQUEST INCORRECTO',
                ttl: new Date() - now
            }
        })

        res.status(400).send(response)
        return
    }

    const procesarPeticion = async () => {

        try {

            await db.conexion.child(body.id).remove()

            response = {
                respuesta: configuracion.EXITO_DELETE
            }

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: 'FIN',
                    entrada: JSON.stringify(body),
                    salida: JSON.stringify(response),
                    ttl: new Date() - now
                }
            })

            res.send(response)

        } catch (error) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: 'FIN',
                    entrada: JSON.stringify(body),
                    salida: error.message,
                    ttl: new Date() - now
                }
            })

            res.status(500).send({
                respuesta: configuracion.ERROR_PROCEDIMIENTO
            })

        }

    }

    procesarPeticion()

}

exports.findAllContacts = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'findAllContacts'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidFindAllContacts'

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.INFO,
                accion: 'INICIO',
                entrada: JSON.stringify(body),
                salida: JSON.stringify(response),
                ttl: 0
            }
        })

        response = {
            respuesta: configuracion.ERROR_REQUEST
        }

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.WARN,
                accion: 'FIN',
                entrada: JSON.stringify(body),
                salida: 'HEADER INCORRECTO',
                ttl: new Date() - now
            }
        })

        res.status(400).send(response)
        return
    }

    header.uuid = req.header('uuid')

    log.escribirLog({
        header: header,
        data: {
            nivel: LoggerLevel.INFO,
            accion: 'INICIO',
            entrada: JSON.stringify(body),
            salida: JSON.stringify(response),
            ttl: 0
        }
    })

    const procesarPeticion = async () => {

        try {

            let resGet = await db.conexion.once('value')

            let resultado = resGet.val()

            let arrayFinal = []

            if (resultado != undefined)
                arrayFinal = await parse.construirObjeto(resultado)

            response = {
                contacts: arrayFinal
            }

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: 'FIN',
                    entrada: JSON.stringify(body),
                    salida: JSON.stringify(response),
                    ttl: new Date() - now
                }
            })

            res.send(response)

        } catch (error) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: 'FIN',
                    entrada: JSON.stringify(body),
                    salida: error.message,
                    ttl: new Date() - now
                }
            })

            res.status(500).send({
                respuesta: configuracion.ERROR_PROCEDIMIENTO
            })

        }

    }

    procesarPeticion()

}

exports.findContactsByUserId = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'findContactsByUserId'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidFindContactsByUserId'

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.INFO,
                accion: 'INICIO',
                entrada: JSON.stringify(body),
                salida: JSON.stringify(response),
                ttl: 0
            }
        })

        response = {
            respuesta: configuracion.ERROR_REQUEST
        }

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.WARN,
                accion: 'FIN',
                entrada: JSON.stringify(body),
                salida: 'HEADER INCORRECTO',
                ttl: new Date() - now
            }
        })

        res.status(400).send(response)
        return
    }

    header.uuid = req.header('uuid')

    log.escribirLog({
        header: header,
        data: {
            nivel: LoggerLevel.INFO,
            accion: 'INICIO',
            entrada: JSON.stringify(body),
            salida: JSON.stringify(response),
            ttl: 0
        }
    })

    if (!validacion.validarBody(body, header.funcion)) {

        response = {
            respuesta: configuracion.ERROR_REQUEST
        }

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.ERROR,
                accion: 'FIN',
                entrada: JSON.stringify(body),
                salida: 'REQUEST INCORRECTO',
                ttl: new Date() - now
            }
        })

        res.status(400).send(response)
        return
    }

    const procesarPeticion = async () => {

        try {

            let resGet = await db.conexion.orderByChild('user_id').equalTo(body.user_id).once('value')

            let resultado = resGet.val()

            let arrayFinal = []

            if (resultado != undefined)
                arrayFinal = await parse.construirObjeto(resultado)

            response = {
                contacts: arrayFinal
            }

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: 'FIN',
                    entrada: JSON.stringify(body),
                    salida: JSON.stringify(response),
                    ttl: new Date() - now
                }
            })

            res.send(response)

        } catch (error) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: 'FIN',
                    entrada: JSON.stringify(body),
                    salida: error.message,
                    ttl: new Date() - now
                }
            })

            res.status(500).send({
                respuesta: configuracion.ERROR_PROCEDIMIENTO
            })

        }

    }

    procesarPeticion()

}