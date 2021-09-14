const db = require('../db/config.js')
const configuracion = require('../configuracion/configuracion')
const validacion = require('./validacion')
const parse = require('./parse')

const log = require('../configuracion/log')
const LoggerLevel = log.LoggerLevel

exports.createSuggestion = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'createSuggestion'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidCreateSuggestion'

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
                name: body.name,
                phone: body.phone,
                mail: body.mail,
                subject: body.subject,
                comment: body.comment,
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

exports.updateSuggestion = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'updateSuggestion'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidUpdateSuggestion'

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

            let suggestion_item = {
                name: body.name,
                phone: body.phone,
                mail: body.mail,
                subject: body.subject,
                comment: body.comment
            }

            await db.conexion.child(body.id).update(suggestion_item)

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

exports.deleteSuggestion = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'deleteSuggestion'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidDeleteSuggestion'

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

exports.findAllSuggestions = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'findAllSuggestions'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidFindAllSuggestions'

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
                suggestions: arrayFinal
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

exports.findSuggestionsByUserId = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'findSuggestionsByUserId'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidFindSuggestionsByUserId'

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
                suggestions: arrayFinal
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