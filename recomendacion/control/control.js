const db = require('../db/config.js')
const configuracion = require('../configuracion/configuracion')
const validacion = require('./validacion')
const parse = require('./parse')

const log = require('../configuracion/log')
const LoggerLevel = log.LoggerLevel

exports.createRecomendation = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'createRecomendation'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidCreateRecomendation'

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
                title: body.title,
                category: body.category,
                description: body.description,
                portalImage: body.portalImage,
                profileImage: body.profileImage,
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

exports.updateRecomendation = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'updateRecomendation'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidUpdateRecomendation'

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

            let recomendation_item = {
                title: body.title,
                category: body.category,
                description: body.description,
                portalImage: body.portalImage,
                profileImage: body.profileImage
            }

            await db.conexion.child(body.id).update(recomendation_item)

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

exports.deleteRecomendation = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'deleteRecomendation'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidDeleteRecomendation'

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

exports.findAllRecomendations = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'findAllRecomendations'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidFindAllRecomendations'

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
                recomendations: arrayFinal
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

exports.findRecomendationsByUserId = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'findRecomendationsByUserId'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidFindRecomendationsByUserId'

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
                recomendations: arrayFinal
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