const db = require('../db/config.js')
const configuracion = require('../configuracion/configuracion')
const validacion = require('./validacion')
const parse = require('./parse')

const log = require('../configuracion/log')
const LoggerLevel = log.LoggerLevel

exports.createUser = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'createUser'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidCreateUser'

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
                lastname: body.lastname,
                user: body.user,
                mail: body.mail,
                phone: body.phone,
                password: body.password,
                address: body.address,
                profile: body.profile
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

exports.updateUser = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'updateUser'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidUpdateUser'

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

            let user_item = {
                name: body.name,
                lastname: body.lastname,
                user: body.user,
                mail: body.mail,
                phone: body.phone,
                password: body.password,
                address: body.address,
                profile: body.profile
            }

            await db.conexion.child(body.id).update(user_item)

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

exports.deleteUser = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'deleteUser'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidDeleteUser'

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

exports.findAllUsers = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'findAllUsers'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidFindAllUsers'

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
                users: arrayFinal
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

exports.findUserByLogin = (req, res) => {

    var now = new Date()
    const body = req.body
    let response = {}

    let header = {
        funcion: 'findUserByLogin'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidFindUserByLogin'

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

            let orderByChild = ''
            let equalTo = ''

            if (body.mail) {
                orderByChild = 'mail'
                equalTo = body.mail
            }
            
            if (body.phone) {
                orderByChild = 'phone'
                equalTo = body.phone
            }

            let resGet = await db.conexion.orderByChild(orderByChild).equalTo(equalTo).once('value')

            let resultado = resGet.val()

            let arrayFinal = []

            if (resultado != undefined)
                arrayFinal = await parse.construirObjeto(resultado)

            response = {
                user: arrayFinal
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