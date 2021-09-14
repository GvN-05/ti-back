const validacion = require('../util/validacion')

const configuracion = require('../../configuracion/configuracion')

const user_config = require('../../configuracion/module/user')

const request = require('../util/request')
const response = require('../util/response')

const log = require('../../configuracion/log')
const LoggerLevel = log.LoggerLevel

const REST_OPERATION = request.REST_OPERATION

exports.loginUser = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

    let header = {
        funcion: 'loginUser'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidLoginUser'

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

        let bodyReadUserByLogin = {}

        if (body.mail)
            bodyReadUserByLogin.mail = body.mail

        if (body.phone)
            bodyReadUserByLogin.phone = body.phone

        let resReadUserByLogin = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.POST,
            url: user_config.URL_LOGIN_USER,
            body: bodyReadUserByLogin,
            key: 'user'
        })

        let codigo

        if (resReadUserByLogin.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: user_config.URL_LOGIN_USER,
                    entrada: JSON.stringify(bodyReadUserByLogin),
                    salida: JSON.stringify(resReadUserByLogin),
                    ttl: new Date() - now
                }
            })

            codigo = configuracion.ERROR_CODE

            if (resReadUserByLogin.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resReadUserByLogin.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resReadUserByLogin.status).send(respuesta)
        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: user_config.URL_LOGIN_USER,
                    entrada: JSON.stringify(bodyReadUserByLogin),
                    salida: JSON.stringify(resReadUserByLogin),
                    ttl: new Date() - now
                }
            })

            codigo = configuracion.SUCCESS_CODE

            let usuario = resReadUserByLogin.data

            if (usuario.length > 0) {
                if (usuario[0].clave != body.clave)
                    codigo = configuracion.USER_INCORRECT_PASSWORD_CODE
            } else
                codigo = configuracion.USER_NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo, codigo == configuracion.SUCCESS_CODE ? usuario : undefined)
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

exports.readUsers = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

    let header = {
        funcion: 'readUsers'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidReadUsers'

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

        let bodyReadUsers = {}

        let resReadUsers = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.POST,
            url: user_config.URL_READ_USERS,
            body: bodyReadUsers,
            key: 'users'
        })

        if (resReadUsers.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: recomendation_config.URL_READ_USERS,
                    entrada: JSON.stringify(bodyReadUsers),
                    salida: JSON.stringify(resReadUsers),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resReadUsers.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resReadUsers.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resReadUsers.status).send(respuesta)
        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: recomendation_config.URL_READ_USERS,
                    entrada: JSON.stringify(bodyReadUsers),
                    salida: JSON.stringify(resReadUsers),
                    ttl: new Date() - now
                }
            })

            let users = resReadUsers.data

            respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, users)
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

exports.createUser = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

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

        let bodyCreateUser = {
            name: body.name,
            lastname: body.lastname,
            user: body.user,
            mail: body.mail,
            phone: body.phone,
            password: body.password,
            address: body.address,
            profile: body.profile
        }

        let resCreateUser = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.POST,
            url: user_config.URL_CREATE_USER,
            body: bodyCreateUser,
            key: 'respuesta'
        })

        if (resCreateUser.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: user_config.URL_CREATE_USER,
                    entrada: JSON.stringify(bodyCreateUser),
                    salida: JSON.stringify(resCreateUser),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resCreateUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resCreateUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resCreateUser.status).send(respuesta)
            continuar = false

        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: user_config.URL_CREATE_USER,
                    entrada: JSON.stringify(bodyCreateUser),
                    salida: JSON.stringify(resCreateUser),
                    ttl: new Date() - now
                }
            })
        }

        if (continuar == true) {

            let bodyReadUsers = {}

            let resReadUsers = await request.enviarPeticion({
                uuid: header.uuid,
                tipoOperacion: REST_OPERATION.POST,
                url: user_config.URL_READ_USERS,
                body: bodyReadUsers,
                key: 'users'
            })

            if (resReadUsers.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: recomendation_config.URL_READ_USERS,
                        entrada: JSON.stringify(bodyReadUsers),
                        salida: JSON.stringify(resReadUsers),
                        ttl: new Date() - now
                    }
                })

                let codigo = configuracion.ERROR_CODE

                if (resReadUsers.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                    codigo = configuracion.NOT_PARAMETERS_CODE

                if (resReadUsers.status == request.REST_STATUS_CODE.NOT_FOUND)
                    codigo = configuracion.NOT_FOUND_CODE

                respuesta = response.crearRespuesta(codigo)
                res.status(resReadUsers.status).send(respuesta)
            } else {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.INFO,
                        accion: recomendation_config.URL_READ_USERS,
                        entrada: JSON.stringify(bodyReadUsers),
                        salida: JSON.stringify(resReadUsers),
                        ttl: new Date() - now
                    }
                })

                let users = resReadUsers.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, users)
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

exports.updateUser = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

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

        let bodyUpdateUser = {
            id: body.id,
            name: body.name,
            lastname: body.lastname,
            user: body.user,
            mail: body.mail,
            phone: body.phone,
            password: body.password,
            address: body.address,
            profile: body.profile
        }

        let resUpdateUser = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.PUT,
            url: user_config.URL_UPDATE_USER,
            body: bodyUpdateUser,
            key: 'respuesta'
        })

        if (resUpdateUser.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: user_config.URL_CREATE_USER,
                    entrada: JSON.stringify(bodyUpdateUser),
                    salida: JSON.stringify(resUpdateUser),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resUpdateUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resUpdateUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resUpdateUser.status).send(respuesta)
            continuar = false

        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: user_config.URL_CREATE_USER,
                    entrada: JSON.stringify(bodyUpdateUser),
                    salida: JSON.stringify(resUpdateUser),
                    ttl: new Date() - now
                }
            })
        }

        if (continuar == true) {

            let bodyReadUsers = {}

            let resReadUsers = await request.enviarPeticion({
                uuid: header.uuid,
                tipoOperacion: REST_OPERATION.POST,
                url: user_config.URL_READ_USERS,
                body: bodyReadUsers,
                key: 'users'
            })

            if (resReadUsers.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: recomendation_config.URL_READ_USERS,
                        entrada: JSON.stringify(bodyReadUsers),
                        salida: JSON.stringify(resReadUsers),
                        ttl: new Date() - now
                    }
                })

                let codigo = configuracion.ERROR_CODE

                if (resReadUsers.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                    codigo = configuracion.NOT_PARAMETERS_CODE

                if (resReadUsers.status == request.REST_STATUS_CODE.NOT_FOUND)
                    codigo = configuracion.NOT_FOUND_CODE

                respuesta = response.crearRespuesta(codigo)
                res.status(resReadUsers.status).send(respuesta)
            } else {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.INFO,
                        accion: recomendation_config.URL_READ_USERS,
                        entrada: JSON.stringify(bodyReadUsers),
                        salida: JSON.stringify(resReadUsers),
                        ttl: new Date() - now
                    }
                })

                let users = resReadUsers.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, users)
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

exports.deleteUser = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

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

        let bodyDeleteUser = {
            id: body.id
        }

        let resDeleteUser = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.DELETE,
            url: user_config.URL_DELETE_USER,
            body: bodyDeleteUser,
            key: 'respuesta'
        })

        if (resDeleteUser.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: user_config.URL_CREATE_USER,
                    entrada: JSON.stringify(bodyDeleteUser),
                    salida: JSON.stringify(resDeleteUser),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resDeleteUser.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resDeleteUser.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resDeleteUser.status).send(respuesta)
            continuar = false

        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: user_config.URL_CREATE_USER,
                    entrada: JSON.stringify(bodyDeleteUser),
                    salida: JSON.stringify(resDeleteUser),
                    ttl: new Date() - now
                }
            })
        }

        if (continuar == true) {

            let bodyReadUsers = {}

            let resReadUsers = await request.enviarPeticion({
                uuid: header.uuid,
                tipoOperacion: REST_OPERATION.POST,
                url: user_config.URL_READ_USERS,
                body: bodyReadUsers,
                key: 'users'
            })

            if (resReadUsers.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: recomendation_config.URL_READ_USERS,
                        entrada: JSON.stringify(bodyReadUsers),
                        salida: JSON.stringify(resReadUsers),
                        ttl: new Date() - now
                    }
                })

                let codigo = configuracion.ERROR_CODE

                if (resReadUsers.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                    codigo = configuracion.NOT_PARAMETERS_CODE

                if (resReadUsers.status == request.REST_STATUS_CODE.NOT_FOUND)
                    codigo = configuracion.NOT_FOUND_CODE

                respuesta = response.crearRespuesta(codigo)
                res.status(resReadUsers.status).send(respuesta)
            } else {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.INFO,
                        accion: recomendation_config.URL_READ_USERS,
                        entrada: JSON.stringify(bodyReadUsers),
                        salida: JSON.stringify(resReadUsers),
                        ttl: new Date() - now
                    }
                })

                let users = resReadUsers.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, users)
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