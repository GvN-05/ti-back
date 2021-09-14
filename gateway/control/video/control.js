const validacion = require('../util/validacion')

const configuracion = require('../../configuracion/configuracion')

const video_config = require('../../configuracion/module/video')

const request = require('../util/request')
const response = require('../util/response')

const log = require('../../configuracion/log')
const LoggerLevel = log.LoggerLevel

const REST_OPERATION = request.REST_OPERATION

exports.readVideosByUser = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

    let header = {
        funcion: 'readVideosByUser'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidReadVideosByUser'

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

        let bodyReadVideosByUser = {
            user_id: body.user_id
        }

        let resReadVideosByUser = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.POST,
            url: video_config.URL_READ_VIDEOS_BY_USER,
            body: bodyReadVideosByUser,
            key: 'videos'
        })

        if (resReadVideosByUser.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: video_config.URL_READ_VIDEOS_BY_USER,
                    entrada: JSON.stringify(bodyReadVideosByUser),
                    salida: JSON.stringify(resReadVideosByUser),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resReadVideosByUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resReadVideosByUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resReadVideosByUser.status).send(respuesta)
        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: video_config.URL_READ_VIDEOS_BY_USER,
                    entrada: JSON.stringify(bodyReadVideosByUser),
                    salida: JSON.stringify(resReadVideosByUser),
                    ttl: new Date() - now
                }
            })

            let videos = resReadVideosByUser.data

            respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, videos)
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

exports.createVideo = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

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

        let bodyCreateVideo = {
            title: body.title,
            credites: body.credites,
            videoUrl: body.videoUrl,
            videoLocal: body.videoLocal,
            user_id: body.user_id
        }

        let resCreateVideo = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.POST,
            url: video_config.URL_CREATE_VIDEO,
            body: bodyCreateVideo,
            key: 'respuesta'
        })

        if (resCreateVideo.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: video_config.URL_CREATE_VIDEO,
                    entrada: JSON.stringify(bodyCreateVideo),
                    salida: JSON.stringify(resCreateVideo),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resCreateVideo.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resCreateVideo.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resCreateVideo.status).send(respuesta)
            continuar = false

        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: video_config.URL_CREATE_VIDEO,
                    entrada: JSON.stringify(bodyCreateVideo),
                    salida: JSON.stringify(resCreateVideo),
                    ttl: new Date() - now
                }
            })
        }

        if (continuar == true) {

            let bodyReadVideosByUser = {
                user_id: body.user_id
            }

            let resReadVideosByUser = await request.enviarPeticion({
                uuid: header.uuid,
                tipoOperacion: REST_OPERATION.POST,
                url: video_config.URL_READ_VIDEOS_BY_USER,
                body: bodyReadVideosByUser,
                key: 'videos'
            })

            if (resReadVideosByUser.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: video_config.URL_READ_VIDEOS_BY_USER,
                        entrada: JSON.stringify(bodyReadVideosByUser),
                        salida: JSON.stringify(resReadVideosByUser),
                        ttl: new Date() - now
                    }
                })

                let codigo = configuracion.ERROR_CODE

                if (resReadVideosByUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                    codigo = configuracion.NOT_PARAMETERS_CODE

                if (resReadVideosByUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                    codigo = configuracion.NOT_FOUND_CODE

                respuesta = response.crearRespuesta(codigo)
                res.status(resReadVideosByUser.status).send(respuesta)
            } else {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.INFO,
                        accion: video_config.URL_READ_VIDEOS_BY_USER,
                        entrada: JSON.stringify(bodyReadVideosByUser),
                        salida: JSON.stringify(resReadVideosByUser),
                        ttl: new Date() - now
                    }
                })

                let videos = resReadVideosByUser.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, videos)
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

exports.updateVideo = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

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

        let bodyUpdateVideo = {
            id: body.id,
            title: body.title,
            credites: body.credites,
            videoUrl: body.videoUrl,
            videoLocal: body.videoLocal
        }

        let resUpdateVideo = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.PUT,
            url: video_config.URL_UPDATE_VIDEO,
            body: bodyUpdateVideo,
            key: 'respuesta'
        })

        if (resUpdateVideo.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: video_config.URL_UPDATE_VIDEO,
                    entrada: JSON.stringify(bodyUpdateVideo),
                    salida: JSON.stringify(resUpdateVideo),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resUpdateVideo.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resUpdateVideo.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resUpdateVideo.status).send(respuesta)
            continuar = false

        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: video_config.URL_UPDATE_VIDEO,
                    entrada: JSON.stringify(bodyUpdateVideo),
                    salida: JSON.stringify(resUpdateVideo),
                    ttl: new Date() - now
                }
            })
        }

        if (continuar == true) {

            let bodyReadVideosByUser = {
                user_id: body.user_id
            }

            let resReadVideosByUser = await request.enviarPeticion({
                uuid: header.uuid,
                tipoOperacion: REST_OPERATION.POST,
                url: video_config.URL_READ_VIDEOS_BY_USER,
                body: bodyReadVideosByUser,
                key: 'videos'
            })

            if (resReadVideosByUser.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: video_config.URL_READ_VIDEOS_BY_USER,
                        entrada: JSON.stringify(bodyReadVideosByUser),
                        salida: JSON.stringify(resReadVideosByUser),
                        ttl: new Date() - now
                    }
                })

                let codigo = configuracion.ERROR_CODE

                if (resReadVideosByUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                    codigo = configuracion.NOT_PARAMETERS_CODE

                if (resReadVideosByUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                    codigo = configuracion.NOT_FOUND_CODE

                respuesta = response.crearRespuesta(codigo)
                res.status(resReadVideosByUser.status).send(respuesta)
            } else {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.INFO,
                        accion: video_config.URL_READ_VIDEOS_BY_USER,
                        entrada: JSON.stringify(bodyReadVideosByUser),
                        salida: JSON.stringify(resReadVideosByUser),
                        ttl: new Date() - now
                    }
                })

                let videos = resReadVideosByUser.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, videos)
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

exports.deleteVideo = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

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

        let bodyDeleteVideo = {
            id: body.id
        }

        let resDeleteVideo = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.DELETE,
            url: video_config.URL_DELETE_VIDEO,
            body: bodyDeleteVideo,
            key: 'respuesta'
        })

        if (resDeleteVideo.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: video_config.URL_DELETE_VIDEO,
                    entrada: JSON.stringify(bodyDeleteVideo),
                    salida: JSON.stringify(resDeleteVideo),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resDeleteVideo.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resDeleteVideo.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resDeleteVideo.status).send(respuesta)
            continuar = false
        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: video_config.URL_DELETE_VIDEO,
                    entrada: JSON.stringify(bodyDeleteVideo),
                    salida: JSON.stringify(resDeleteVideo),
                    ttl: new Date() - now
                }
            })
        }

        if (continuar == true) {

            let bodyReadVideosByUser = {
                user_id: body.user_id
            }

            let resReadVideosByUser = await request.enviarPeticion({
                uuid: header.uuid,
                tipoOperacion: REST_OPERATION.POST,
                url: video_config.URL_READ_VIDEOS_BY_USER,
                body: bodyReadVideosByUser,
                key: 'videos'
            })

            if (resReadVideosByUser.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: video_config.URL_READ_VIDEOS_BY_USER,
                        entrada: JSON.stringify(bodyReadVideosByUser),
                        salida: JSON.stringify(resReadVideosByUser),
                        ttl: new Date() - now
                    }
                })

                let codigo = configuracion.ERROR_CODE

                if (resReadVideosByUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                    codigo = configuracion.NOT_PARAMETERS_CODE

                if (resReadVideosByUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                    codigo = configuracion.NOT_FOUND_CODE

                respuesta = response.crearRespuesta(codigo)
                res.status(resReadVideosByUser.status).send(respuesta)
            } else {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.INFO,
                        accion: video_config.URL_READ_VIDEOS_BY_USER,
                        entrada: JSON.stringify(bodyReadVideosByUser),
                        salida: JSON.stringify(resReadVideosByUser),
                        ttl: new Date() - now
                    }
                })

                let videos = resReadVideosByUser.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, videos)
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