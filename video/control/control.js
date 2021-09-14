const db = require('../db/config.js')
const configuracion = require('../configuracion/configuracion')
const validacion = require('./validacion')
const parse = require('./parse')

const log = require('../configuracion/log')
const LoggerLevel = log.LoggerLevel

exports.createVideo = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'createVideo'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidCreateVideo'

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
                credites: body.credites,
                videoUrl: body.videoUrl,
                videoLocal: body.videoLocal,
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

exports.updateVideo = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'updateVideo'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidUpdateVideo'

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

            let video_item = {
                title: body.title,
                credites: body.credites,
                videoUrl: body.videoUrl,
                videoLocal: body.videoLocal
            }

            await db.conexion.child(body.id).update(video_item)

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

exports.deleteVideo = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'deleteVideo'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidDeleteVideo'

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

exports.findAllVideos = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'findAllVideos'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidFindAllVideos'

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
                videos: arrayFinal
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

exports.findVideosByUserId = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'findVideosByUserId'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidFindVideosByUserId'

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
                videos: arrayFinal
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