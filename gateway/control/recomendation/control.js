const validacion = require('../util/validacion')

const configuracion = require('../../configuracion/configuracion')

const recomendation_config = require('../../configuracion/module/recomendation')

const request = require('../util/request')
const response = require('../util/response')

const log = require('../../configuracion/log')
const LoggerLevel = log.LoggerLevel

const REST_OPERATION = request.REST_OPERATION

exports.readRecomendationsByUser = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

    let header = {
        funcion: 'readRecomendationsByUser'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidReadRecomendationsByUser'

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

        respuesta = response.crearRespuesta(configuracion.NOT_PARAMETERS_CODE)

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

        res.status(400).send(respuesta)
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

        respuesta = response.crearRespuesta(configuracion.NOT_PARAMETERS_CODE)

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

        res.status(400).send(respuesta)
        return
    }

    const procesarPeticion = async () => {

        let bodyReadRecomendationsByUser = {
            user_id: body.user_id
        }

        let resReadRecomendationsByUser = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.POST,
            url: recomendation_config.URL_READ_RECOMENDATIONS_BY_USER,
            body: bodyReadRecomendationsByUser,
            key: 'recomendations'
        })

        if (resReadRecomendationsByUser.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: recomendation_config.URL_READ_RECOMENDATIONS_BY_USER,
                    entrada: JSON.stringify(bodyReadRecomendationsByUser),
                    salida: JSON.stringify(resReadRecomendationsByUser),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resReadRecomendationsByUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resReadRecomendationsByUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resReadRecomendationsByUser.status).send(respuesta)
        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: recomendation_config.URL_READ_RECOMENDATIONS_BY_USER,
                    entrada: JSON.stringify(bodyReadRecomendationsByUser),
                    salida: JSON.stringify(resReadRecomendationsByUser),
                    ttl: new Date() - now
                }
            })

            let recomendations = resReadRecomendationsByUser.data

            respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, recomendations)
            res.send(respuesta)
        }

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.INFO,
                accion: 'FIN',
                entrada: JSON.stringify(body),
                salida: JSON.stringify(respuesta),
                ttl: new Date() - now
            }
        })

    }

    procesarPeticion()

}

exports.createRecomendation = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

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

        respuesta = response.crearRespuesta(configuracion.NOT_PARAMETERS_CODE)

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

        res.status(400).send(respuesta)
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

        respuesta = response.crearRespuesta(configuracion.NOT_PARAMETERS_CODE)

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

        res.status(400).send(respuesta)
        return
    }

    const procesarPeticion = async () => {

        let continuar = true

        let bodyCreateRecomendation = {
            title: body.title,
            category: body.category,
            description: body.description,
            portalImage: body.portalImage,
            profileImage: body.profileImage,
            user_id: body.user_id
        }

        let resCreateRecomendation = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.POST,
            url: recomendation_config.URL_CREATE_RECOMENDATION,
            body: bodyCreateRecomendation,
            key: 'respuesta'
        })

        if (resCreateRecomendation.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: recomendation_config.URL_CREATE_RECOMENDATION,
                    entrada: JSON.stringify(bodyCreateRecomendation),
                    salida: JSON.stringify(resCreateRecomendation),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resCreateRecomendation.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resCreateRecomendation.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resCreateRecomendation.status).send(respuesta)
            continuar = false

        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: recomendation_config.URL_CREATE_RECOMENDATION,
                    entrada: JSON.stringify(bodyCreateRecomendation),
                    salida: JSON.stringify(resCreateRecomendation),
                    ttl: new Date() - now
                }
            })
        }

        if (continuar == true) {

            let bodyReadRecomendationsByUser = {
                user_id: body.user_id
            }

            let resReadRecomendationsByUser = await request.enviarPeticion({
                uuid: header.uuid,
                tipoOperacion: REST_OPERATION.POST,
                url: recomendation_config.URL_READ_RECOMENDATIONS_BY_USER,
                body: bodyReadRecomendationsByUser,
                key: 'recomendations'
            })

            if (resReadRecomendationsByUser.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: recomendation_config.URL_READ_RECOMENDATIONS_BY_USER,
                        entrada: JSON.stringify(bodyReadRecomendationsByUser),
                        salida: JSON.stringify(resReadRecomendationsByUser),
                        ttl: new Date() - now
                    }
                })

                let codigo = configuracion.ERROR_CODE

                if (resReadRecomendationsByUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                    codigo = configuracion.NOT_PARAMETERS_CODE

                if (resReadRecomendationsByUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                    codigo = configuracion.NOT_FOUND_CODE

                respuesta = response.crearRespuesta(codigo)
                res.status(resReadRecomendationsByUser.status).send(respuesta)
            } else {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.INFO,
                        accion: recomendation_config.URL_READ_RECOMENDATIONS_BY_USER,
                        entrada: JSON.stringify(bodyReadRecomendationsByUser),
                        salida: JSON.stringify(resReadRecomendationsByUser),
                        ttl: new Date() - now
                    }
                })

                let recomendations = resReadRecomendationsByUser.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, recomendations)
                res.send(respuesta)
            }

        }

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.INFO,
                accion: 'FIN',
                entrada: JSON.stringify(body),
                salida: JSON.stringify(respuesta),
                ttl: new Date() - now
            }
        })

    }

    procesarPeticion()

}

exports.updateRecomendation = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

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

        respuesta = response.crearRespuesta(configuracion.NOT_PARAMETERS_CODE)

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

        res.status(400).send(respuesta)
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

        respuesta = response.crearRespuesta(configuracion.NOT_PARAMETERS_CODE)

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

        res.status(400).send(respuesta)
        return
    }

    const procesarPeticion = async () => {

        let continuar = true

        let bodyUpdateRecomendation = {
            id: body.id,
            title: body.title,
            category: body.category,
            description: body.description,
            portalImage: body.portalImage,
            profileImage: body.profileImage
        }

        let resUpdateRecomendation = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.PUT,
            url: recomendation_config.URL_UPDATE_RECOMENDATION,
            body: bodyUpdateRecomendation,
            key: 'respuesta'
        })

        if (resUpdateRecomendation.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: recomendation_config.URL_UPDATE_RECOMENDATION,
                    entrada: JSON.stringify(bodyUpdateRecomendation),
                    salida: JSON.stringify(resUpdateRecomendation),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resUpdateRecomendation.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resUpdateRecomendation.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resUpdateRecomendation.status).send(respuesta)
            continuar = false

        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: recomendation_config.URL_UPDATE_RECOMENDATION,
                    entrada: JSON.stringify(bodyUpdateRecomendation),
                    salida: JSON.stringify(resUpdateRecomendation),
                    ttl: new Date() - now
                }
            })
        }

        if (continuar == true) {

            let bodyReadRecomendationsByUser = {
                user_id: body.user_id
            }

            let resReadRecomendationsByUser = await request.enviarPeticion({
                uuid: header.uuid,
                tipoOperacion: REST_OPERATION.POST,
                url: recomendation_config.URL_READ_RECOMENDATIONS_BY_USER,
                body: bodyReadRecomendationsByUser,
                key: 'recomendations'
            })

            if (resReadRecomendationsByUser.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: recomendation_config.URL_READ_RECOMENDATIONS_BY_USER,
                        entrada: JSON.stringify(bodyReadRecomendationsByUser),
                        salida: JSON.stringify(resReadRecomendationsByUser),
                        ttl: new Date() - now
                    }
                })

                let codigo = configuracion.ERROR_CODE

                if (resReadRecomendationsByUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                    codigo = configuracion.NOT_PARAMETERS_CODE

                if (resReadRecomendationsByUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                    codigo = configuracion.NOT_FOUND_CODE

                respuesta = response.crearRespuesta(codigo)
                res.status(resReadRecomendationsByUser.status).send(respuesta)
            } else {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.INFO,
                        accion: recomendation_config.URL_READ_RECOMENDATIONS_BY_USER,
                        entrada: JSON.stringify(bodyReadRecomendationsByUser),
                        salida: JSON.stringify(resReadRecomendationsByUser),
                        ttl: new Date() - now
                    }
                })

                let recomendations = resReadRecomendationsByUser.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, recomendations)
                res.send(respuesta)
            }

        }

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.INFO,
                accion: 'FIN',
                entrada: JSON.stringify(body),
                salida: JSON.stringify(respuesta),
                ttl: new Date() - now
            }
        })

    }

    procesarPeticion()

}

exports.deleteRecomendation = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

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

        respuesta = response.crearRespuesta(configuracion.NOT_PARAMETERS_CODE)

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

        res.status(400).send(respuesta)
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

        respuesta = response.crearRespuesta(configuracion.NOT_PARAMETERS_CODE)

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

        res.status(400).send(respuesta)
        return
    }

    const procesarPeticion = async () => {

        let continuar = true

        let bodyDeleteRecomendation = {
            id: body.id
        }

        let resDeleteRecomendation = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.DELETE,
            url: recomendation_config.URL_DELETE_RECOMENDATION,
            body: bodyDeleteRecomendation,
            key: 'respuesta'
        })

        if (resDeleteRecomendation.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: recomendation_config.URL_DELETE_RECOMENDATION,
                    entrada: JSON.stringify(bodyDeleteRecomendation),
                    salida: JSON.stringify(resDeleteRecomendation),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resDeleteRecomendation.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resDeleteRecomendation.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resDeleteRecomendation.status).send(respuesta)
            continuar = false
        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: recomendation_config.URL_DELETE_RECOMENDATION,
                    entrada: JSON.stringify(bodyDeleteRecomendation),
                    salida: JSON.stringify(resDeleteRecomendation),
                    ttl: new Date() - now
                }
            })
        }

        if (continuar == true) {

            let bodyReadRecomendationsByUser = {
                user_id: body.user_id
            }

            let resReadRecomendationsByUser = await request.enviarPeticion({
                uuid: header.uuid,
                tipoOperacion: REST_OPERATION.POST,
                url: recomendation_config.URL_READ_RECOMENDATIONS_BY_USER,
                body: bodyReadRecomendationsByUser,
                key: 'recomendations'
            })

            if (resReadRecomendationsByUser.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: recomendation_config.URL_READ_RECOMENDATIONS_BY_USER,
                        entrada: JSON.stringify(bodyReadRecomendationsByUser),
                        salida: JSON.stringify(resReadRecomendationsByUser),
                        ttl: new Date() - now
                    }
                })

                let codigo = configuracion.ERROR_CODE

                if (resReadRecomendationsByUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                    codigo = configuracion.NOT_PARAMETERS_CODE

                if (resReadRecomendationsByUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                    codigo = configuracion.NOT_FOUND_CODE

                respuesta = response.crearRespuesta(codigo)
                res.status(resReadRecomendationsByUser.status).send(respuesta)
            } else {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.INFO,
                        accion: recomendation_config.URL_READ_RECOMENDATIONS_BY_USER,
                        entrada: JSON.stringify(bodyReadRecomendationsByUser),
                        salida: JSON.stringify(resReadRecomendationsByUser),
                        ttl: new Date() - now
                    }
                })

                let recomendations = resReadRecomendationsByUser.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, recomendations)
                res.send(respuesta)
            }

        }

        log.escribirLog({
            header: header,
            data: {
                nivel: LoggerLevel.INFO,
                accion: 'FIN',
                entrada: JSON.stringify(body),
                salida: JSON.stringify(respuesta),
                ttl: new Date() - now
            }
        })

    }

    procesarPeticion()

}