const validacion = require('../util/validacion')

const configuracion = require('../../configuracion/configuracion')

const new_config = require('../../configuracion/module/new')

const request = require('../util/request')
const response = require('../util/response')

const log = require('../../configuracion/log')
const LoggerLevel = log.LoggerLevel

const REST_OPERATION = request.REST_OPERATION

exports.readNewsByUser = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

    let header = {
        funcion: 'readNewsByUser'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidReadNewsByUser'

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

        let bodyReadNewsByUser = {
            user_id: body.user_id
        }

        let resReadNewsByUser = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.POST,
            url: new_config.URL_READ_NEWS_BY_USER,
            body: bodyReadNewsByUser,
            key: 'news'
        })

        if (resReadNewsByUser.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: new_config.URL_READ_NEWS_BY_USER,
                    entrada: JSON.stringify(bodyReadNewsByUser),
                    salida: JSON.stringify(resReadNewsByUser),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resReadNewsByUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resReadNewsByUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resReadNewsByUser.status).send(respuesta)
        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: new_config.URL_READ_NEWS_BY_USER,
                    entrada: JSON.stringify(bodyReadNewsByUser),
                    salida: JSON.stringify(resReadNewsByUser),
                    ttl: new Date() - now
                }
            })

            let news = resReadNewsByUser.data

            respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, news)
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

exports.createNew = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

    let header = {
        funcion: 'createNew'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidCreateNew'

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

        let bodyCreateNew = {
            title: body.title,
            smallDescription: body.smallDescription,
            category: body.category,
            imageUrl: body.imageUrl,
            content: body.content,
            font: body.font,
            user_id: body.user_id
        }

        let resCreateNew = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.POST,
            url: new_config.URL_CREATE_NEW,
            body: bodyCreateNew,
            key: 'respuesta'
        })

        if (resCreateNew.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: new_config.URL_CREATE_NEW,
                    entrada: JSON.stringify(bodyCreateNew),
                    salida: JSON.stringify(resCreateNew),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resCreateNew.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resCreateNew.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resCreateNew.status).send(respuesta)
            continuar = false

        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: new_config.URL_CREATE_NEW,
                    entrada: JSON.stringify(bodyCreateNew),
                    salida: JSON.stringify(resCreateNew),
                    ttl: new Date() - now
                }
            })
        }

        if (continuar == true) {

            let bodyReadContactsByUser = {
                user_id: body.user_id
            }

            let resReadContactsByUser = await request.enviarPeticion({
                uuid: header.uuid,
                tipoOperacion: REST_OPERATION.POST,
                url: new_config.URL_READ_NEWS_BY_USER,
                body: bodyReadContactsByUser,
                key: 'news'
            })

            if (resReadContactsByUser.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: new_config.URL_READ_NEWS_BY_USER,
                        entrada: JSON.stringify(bodyReadContactsByUser),
                        salida: JSON.stringify(resReadContactsByUser),
                        ttl: new Date() - now
                    }
                })

                let codigo = configuracion.ERROR_CODE

                if (resReadContactsByUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                    codigo = configuracion.NOT_PARAMETERS_CODE

                if (resReadContactsByUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                    codigo = configuracion.NOT_FOUND_CODE

                respuesta = response.crearRespuesta(codigo)
                res.status(resReadContactsByUser.status).send(respuesta)
            } else {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.INFO,
                        accion: new_config.URL_READ_NEWS_BY_USER,
                        entrada: JSON.stringify(bodyReadContactsByUser),
                        salida: JSON.stringify(resReadContactsByUser),
                        ttl: new Date() - now
                    }
                })

                let news = resReadContactsByUser.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, news)
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

exports.updateNew = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

    let header = {
        funcion: 'updateNew'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidUpdateNew'

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

        let bodyUpdateNew = {
            id: body.id,
            title: body.title,
            smallDescription: body.smallDescription,
            category: body.category,
            imageUrl: body.imageUrl,
            content: body.content,
            font: body.font
        }

        let resUpdateNew = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.PUT,
            url: new_config.URL_UPDATE_NEW,
            body: bodyUpdateNew,
            key: 'respuesta'
        })

        if (resUpdateNew.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: new_config.URL_UPDATE_NEW,
                    entrada: JSON.stringify(bodyUpdateNew),
                    salida: JSON.stringify(resUpdateNew),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resUpdateNew.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resUpdateNew.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resUpdateNew.status).send(respuesta)
            continuar = false

        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: new_config.URL_UPDATE_NEW,
                    entrada: JSON.stringify(bodyUpdateNew),
                    salida: JSON.stringify(resUpdateNew),
                    ttl: new Date() - now
                }
            })
        }

        if (continuar == true) {

            let bodyReadNewsByUser = {
                user_id: body.user_id
            }

            let resReadNewsByUser = await request.enviarPeticion({
                uuid: header.uuid,
                tipoOperacion: REST_OPERATION.POST,
                url: new_config.URL_READ_NEWS_BY_USER,
                body: bodyReadNewsByUser,
                key: 'news'
            })

            if (resReadNewsByUser.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: new_config.URL_READ_NEWS_BY_USER,
                        entrada: JSON.stringify(bodyReadNewsByUser),
                        salida: JSON.stringify(resReadNewsByUser),
                        ttl: new Date() - now
                    }
                })

                let codigo = configuracion.ERROR_CODE

                if (resReadNewsByUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                    codigo = configuracion.NOT_PARAMETERS_CODE

                if (resReadNewsByUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                    codigo = configuracion.NOT_FOUND_CODE

                respuesta = response.crearRespuesta(codigo)
                res.status(resReadNewsByUser.status).send(respuesta)
            } else {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.INFO,
                        accion: new_config.URL_READ_NEWS_BY_USER,
                        entrada: JSON.stringify(bodyReadNewsByUser),
                        salida: JSON.stringify(resReadNewsByUser),
                        ttl: new Date() - now
                    }
                })

                let contactos = resReadNewsByUser.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, contactos)
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

exports.deleteNew = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

    let header = {
        funcion: 'deleteNew'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidDeleteNew'

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

        let bodyDeleteNew = {
            id: body.id
        }

        let resDeleteNew = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.DELETE,
            url: new_config.URL_DELETE_NEW,
            body: bodyDeleteNew,
            key: 'respuesta'
        })

        if (resDeleteNew.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: new_config.URL_DELETE_NEW,
                    entrada: JSON.stringify(bodyDeleteNew),
                    salida: JSON.stringify(resDeleteNew),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resDeleteNew.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resDeleteNew.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resDeleteNew.status).send(respuesta)
            continuar = false
        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: new_config.URL_DELETE_NEW,
                    entrada: JSON.stringify(bodyDeleteNew),
                    salida: JSON.stringify(resDeleteNew),
                    ttl: new Date() - now
                }
            })
        }

        if (continuar == true) {

            let bodyReadNewsByUser = {
                user_id: body.user_id
            }

            let resReadNewsByUser = await request.enviarPeticion({
                uuid: header.uuid,
                tipoOperacion: REST_OPERATION.POST,
                url: new_config.URL_READ_NEWS_BY_USER,
                body: bodyReadNewsByUser,
                key: 'news'
            })

            if (resReadNewsByUser.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: new_config.URL_READ_NEWS_BY_USER,
                        entrada: JSON.stringify(bodyReadNewsByUser),
                        salida: JSON.stringify(resReadNewsByUser),
                        ttl: new Date() - now
                    }
                })

                let codigo = configuracion.ERROR_CODE

                if (resReadNewsByUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                    codigo = configuracion.NOT_PARAMETERS_CODE

                if (resReadNewsByUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                    codigo = configuracion.NOT_FOUND_CODE

                respuesta = response.crearRespuesta(codigo)
                res.status(resReadNewsByUser.status).send(respuesta)
            } else {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.INFO,
                        accion: new_config.URL_READ_NEWS_BY_USER,
                        entrada: JSON.stringify(bodyReadNewsByUser),
                        salida: JSON.stringify(resReadNewsByUser),
                        ttl: new Date() - now
                    }
                })

                let contactos = resReadNewsByUser.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, contactos)
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