const validacion = require('../util/validacion')

const configuracion = require('../../configuracion/configuracion')

const suggestion_config = require('../../configuracion/module/suggestion')

const request = require('../util/request')
const response = require('../util/response')

const log = require('../../configuracion/log')
const LoggerLevel = log.LoggerLevel

const REST_OPERATION = request.REST_OPERATION

exports.readSuggestionsByUser = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

    let header = {
        funcion: 'readSuggestionsByUser'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidReadSuggestionsByUser'

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

        let bodyReadSuggestionsByUser = {
            user_id: body.user_id
        }

        let resReadSuggestionsByUser = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.POST,
            url: suggestion_config.URL_READ_SUGGESTIONS_BY_USER,
            body: bodyReadSuggestionsByUser,
            key: 'suggestions'
        })

        if (resReadSuggestionsByUser.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: suggestion_config.URL_READ_SUGGESTIONS_BY_USER,
                    entrada: JSON.stringify(bodyReadSuggestionsByUser),
                    salida: JSON.stringify(resReadSuggestionsByUser),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resReadSuggestionsByUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resReadSuggestionsByUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resReadSuggestionsByUser.status).send(respuesta)
        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: suggestion_config.URL_READ_SUGGESTIONS_BY_USER,
                    entrada: JSON.stringify(bodyReadSuggestionsByUser),
                    salida: JSON.stringify(resReadSuggestionsByUser),
                    ttl: new Date() - now
                }
            })

            let suggestions = resReadSuggestionsByUser.data

            respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, suggestions)
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

exports.createSuggestion = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

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

        let bodyCreateSuggestion = {
            name: body.name,
            phone: body.phone,
            mail: body.mail,
            subject: body.subject,
            comment: body.comment,
            user_id: body.user_id
        }

        let resCreateSuggestion = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.POST,
            url: suggestion_config.URL_CREATE_SUGGESTION,
            body: bodyCreateSuggestion,
            key: 'respuesta'
        })

        if (resCreateSuggestion.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: suggestion_config.URL_CREATE_SUGGESTION,
                    entrada: JSON.stringify(bodyCreateSuggestion),
                    salida: JSON.stringify(resCreateSuggestion),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resCreateSuggestion.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resCreateSuggestion.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resCreateSuggestion.status).send(respuesta)
            continuar = false

        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: suggestion_config.URL_CREATE_SUGGESTION,
                    entrada: JSON.stringify(bodyCreateSuggestion),
                    salida: JSON.stringify(resCreateSuggestion),
                    ttl: new Date() - now
                }
            })
        }

        if (continuar == true) {

            let bodyReadSuggestionsByUser = {
                user_id: body.user_id
            }

            let resReadSuggestionsByUser = await request.enviarPeticion({
                uuid: header.uuid,
                tipoOperacion: REST_OPERATION.POST,
                url: suggestion_config.URL_READ_SUGGESTIONS_BY_USER,
                body: bodyReadSuggestionsByUser,
                key: 'suggestions'
            })

            if (resReadSuggestionsByUser.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: suggestion_config.URL_READ_SUGGESTIONS_BY_USER,
                        entrada: JSON.stringify(bodyReadSuggestionsByUser),
                        salida: JSON.stringify(resReadSuggestionsByUser),
                        ttl: new Date() - now
                    }
                })

                let codigo = configuracion.ERROR_CODE

                if (resReadSuggestionsByUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                    codigo = configuracion.NOT_PARAMETERS_CODE

                if (resReadSuggestionsByUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                    codigo = configuracion.NOT_FOUND_CODE

                respuesta = response.crearRespuesta(codigo)
                res.status(resReadSuggestionsByUser.status).send(respuesta)
            } else {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.INFO,
                        accion: suggestion_config.URL_READ_SUGGESTIONS_BY_USER,
                        entrada: JSON.stringify(bodyReadSuggestionsByUser),
                        salida: JSON.stringify(resReadSuggestionsByUser),
                        ttl: new Date() - now
                    }
                })

                let suggestions = resReadSuggestionsByUser.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, suggestions)
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

exports.updateSuggestion = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

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

        let bodyUpdateSuggestion = {
            id: body.id,
            name: body.name,
            phone: body.phone,
            mail: body.mail,
            subject: body.subject,
            comment: body.comment
        }

        let resUpdateSuggestion = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.PUT,
            url: suggestion_config.URL_UPDATE_SUGGESTION,
            body: bodyUpdateSuggestion,
            key: 'respuesta'
        })

        if (resUpdateSuggestion.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: suggestion_config.URL_UPDATE_SUGGESTION,
                    entrada: JSON.stringify(bodyUpdateSuggestion),
                    salida: JSON.stringify(resUpdateSuggestion),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resUpdateSuggestion.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resUpdateSuggestion.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resUpdateSuggestion.status).send(respuesta)
            continuar = false

        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: suggestion_config.URL_UPDATE_SUGGESTION,
                    entrada: JSON.stringify(bodyUpdateSuggestion),
                    salida: JSON.stringify(resUpdateSuggestion),
                    ttl: new Date() - now
                }
            })
        }

        if (continuar == true) {

            let bodyReadSuggestionsByUser = {
                user_id: body.user_id
            }

            let resReadSuggestionsByUser = await request.enviarPeticion({
                uuid: header.uuid,
                tipoOperacion: REST_OPERATION.POST,
                url: suggestion_config.URL_READ_SUGGESTIONS_BY_USER,
                body: bodyReadSuggestionsByUser,
                key: 'suggestions'
            })

            if (resReadSuggestionsByUser.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: suggestion_config.URL_READ_SUGGESTIONS_BY_USER,
                        entrada: JSON.stringify(bodyReadSuggestionsByUser),
                        salida: JSON.stringify(resReadSuggestionsByUser),
                        ttl: new Date() - now
                    }
                })

                let codigo = configuracion.ERROR_CODE

                if (resReadSuggestionsByUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                    codigo = configuracion.NOT_PARAMETERS_CODE

                if (resReadSuggestionsByUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                    codigo = configuracion.NOT_FOUND_CODE

                respuesta = response.crearRespuesta(codigo)
                res.status(resReadSuggestionsByUser.status).send(respuesta)
            } else {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.INFO,
                        accion: suggestion_config.URL_READ_SUGGESTIONS_BY_USER,
                        entrada: JSON.stringify(bodyReadSuggestionsByUser),
                        salida: JSON.stringify(resReadSuggestionsByUser),
                        ttl: new Date() - now
                    }
                })

                let suggestions = resReadSuggestionsByUser.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, suggestions)
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

exports.deleteSuggestion = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

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

        let bodyDeleteSuggestion = {
            id: body.id
        }

        let resDeleteSuggestion = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.DELETE,
            url: suggestion_config.URL_DELETE_SUGGESTION,
            body: bodyDeleteSuggestion,
            key: 'respuesta'
        })

        if (resDeleteSuggestion.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: suggestion_config.URL_DELETE_SUGGESTION,
                    entrada: JSON.stringify(bodyDeleteSuggestion),
                    salida: JSON.stringify(resDeleteSuggestion),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resDeleteSuggestion.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resDeleteSuggestion.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resDeleteSuggestion.status).send(respuesta)
            continuar = false
        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: suggestion_config.URL_DELETE_SUGGESTION,
                    entrada: JSON.stringify(bodyDeleteSuggestion),
                    salida: JSON.stringify(resDeleteSuggestion),
                    ttl: new Date() - now
                }
            })
        }

        if (continuar == true) {

            let bodyReadSuggestionsByUser = {
                user_id: body.user_id
            }

            let resReadSuggestionsByUser = await request.enviarPeticion({
                uuid: header.uuid,
                tipoOperacion: REST_OPERATION.POST,
                url: suggestion_config.URL_READ_SUGGESTIONS_BY_USER,
                body: bodyReadSuggestionsByUser,
                key: 'suggestions'
            })

            if (resReadSuggestionsByUser.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: suggestion_config.URL_READ_SUGGESTIONS_BY_USER,
                        entrada: JSON.stringify(bodyReadSuggestionsByUser),
                        salida: JSON.stringify(resReadSuggestionsByUser),
                        ttl: new Date() - now
                    }
                })

                let codigo = configuracion.ERROR_CODE

                if (resReadSuggestionsByUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                    codigo = configuracion.NOT_PARAMETERS_CODE

                if (resReadSuggestionsByUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                    codigo = configuracion.NOT_FOUND_CODE

                respuesta = response.crearRespuesta(codigo)
                res.status(resReadSuggestionsByUser.status).send(respuesta)
            } else {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.INFO,
                        accion: suggestion_config.URL_READ_SUGGESTIONS_BY_USER,
                        entrada: JSON.stringify(bodyReadSuggestionsByUser),
                        salida: JSON.stringify(resReadSuggestionsByUser),
                        ttl: new Date() - now
                    }
                })

                let suggestions = resReadSuggestionsByUser.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, suggestions)
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