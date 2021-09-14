const validacion = require('../util/validacion')

const configuracion = require('../../configuracion/configuracion')

const contact_config = require('../../configuracion/module/contact')

const request = require('../util/request')
const response = require('../util/response')

const log = require('../../configuracion/log')
const LoggerLevel = log.LoggerLevel

const REST_OPERATION = request.REST_OPERATION

exports.readContactsByUser = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

    let header = {
        funcion: 'readContactsByUser'
    }

    if (!validacion.validarHeader(req.headers)) {

        header.uuid = 'uuidReadContactsByUser'

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

        let bodyReadContactsByUser = {
            user_id: body.user_id
        }

        let resReadContactsByUser = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.POST,
            url: contact_config.URL_READ_CONTACTS_BY_USER,
            body: bodyReadContactsByUser,
            key: 'contacts'
        })

        if (resReadContactsByUser.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: contact_config.URL_READ_CONTACTS_BY_USER,
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
                    accion: contact_config.URL_READ_CONTACTS_BY_USER,
                    entrada: JSON.stringify(bodyReadContactsByUser),
                    salida: JSON.stringify(resReadContactsByUser),
                    ttl: new Date() - now
                }
            })

            let contacts = resReadContactsByUser.data

            respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, contacts)
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

exports.createContact = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

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

        let bodyCreateContact = {
            service: body.service,
            name: body.name,
            lastname: body.lastname,
            address: body.address,
            phone: body.phone,
            user_id: body.user_id
        }

        let resCreateContact = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.POST,
            url: contact_config.URL_CREATE_CONTACT,
            body: bodyCreateContact,
            key: 'respuesta'
        })

        if (resCreateContact.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: contact_config.URL_CREATE_CONTACT,
                    entrada: JSON.stringify(bodyCreateContact),
                    salida: JSON.stringify(resCreateContact),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resCreateContact.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resCreateContact.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resCreateContact.status).send(respuesta)
            continuar = false

        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: contact_config.URL_CREATE_CONTACT,
                    entrada: JSON.stringify(bodyCreateContact),
                    salida: JSON.stringify(resCreateContact),
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
                url: contact_config.URL_READ_CONTACTS_BY_USER,
                body: bodyReadContactsByUser,
                key: 'contacts'
            })

            if (resReadContactsByUser.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: contact_config.URL_READ_CONTACTS_BY_USER,
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
                        accion: contact_config.URL_READ_CONTACTS_BY_USER,
                        entrada: JSON.stringify(bodyReadContactsByUser),
                        salida: JSON.stringify(resReadContactsByUser),
                        ttl: new Date() - now
                    }
                })

                let contacts = resReadContactsByUser.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, contacts)
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

exports.updateContact = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

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

        let bodyUpdateContact = {
            id: body.id,
            service: body.service,
            name: body.name,
            lastname: body.lastname,
            address: body.address,
            phone: body.phone
        }

        let resUpdateContact = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.PUT,
            url: contact_config.URL_UPDATE_CONTACT,
            body: bodyUpdateContact,
            key: 'respuesta'
        })

        if (resUpdateContact.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: contact_config.URL_UPDATE_CONTACT,
                    entrada: JSON.stringify(bodyUpdateContact),
                    salida: JSON.stringify(resUpdateContact),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resUpdateContact.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resUpdateContact.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resUpdateContact.status).send(respuesta)
            continuar = false

        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: contact_config.URL_UPDATE_CONTACT,
                    entrada: JSON.stringify(bodyUpdateContact),
                    salida: JSON.stringify(resUpdateContact),
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
                url: contact_config.URL_READ_CONTACTS_BY_USER,
                body: bodyReadContactsByUser,
                key: 'contacts'
            })

            if (resReadContactsByUser.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: contact_config.URL_READ_CONTACTS_BY_USER,
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
                        accion: contact_config.URL_READ_CONTACTS_BY_USER,
                        entrada: JSON.stringify(bodyReadContactsByUser),
                        salida: JSON.stringify(resReadContactsByUser),
                        ttl: new Date() - now
                    }
                })

                let contacts = resReadContactsByUser.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, contacts)
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

exports.deleteContact = (req, res) => {

    var now = new Date()
    const body = req.body
    let respuesta = {}

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

        let bodyDeleteContact = {
            id: body.id
        }

        let resDeleteContact = await request.enviarPeticion({
            uuid: header.uuid,
            tipoOperacion: REST_OPERATION.DELETE,
            url: contact_config.URL_DELETE_CONTACT,
            body: bodyDeleteContact,
            key: 'respuesta'
        })

        if (resDeleteContact.status != request.REST_STATUS_CODE.OK) {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.ERROR,
                    accion: contact_config.URL_DELETE_CONTACT,
                    entrada: JSON.stringify(bodyDeleteContact),
                    salida: JSON.stringify(resDeleteContact),
                    ttl: new Date() - now
                }
            })

            let codigo = configuracion.ERROR_CODE

            if (resDeleteContact.status == request.REST_STATUS_CODE.NOT_PARAMETERS)
                codigo = configuracion.NOT_PARAMETERS_CODE

            if (resDeleteContact.status == request.REST_STATUS_CODE.NOT_FOUND)
                codigo = configuracion.NOT_FOUND_CODE

            respuesta = response.crearRespuesta(codigo)
            res.status(resDeleteContact.status).send(respuesta)
            continuar = false
        } else {

            log.escribirLog({
                header: header,
                data: {
                    nivel: LoggerLevel.INFO,
                    accion: contact_config.URL_DELETE_CONTACT,
                    entrada: JSON.stringify(bodyDeleteContact),
                    salida: JSON.stringify(resDeleteContact),
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
                url: contact_config.URL_READ_CONTACTS_BY_USER,
                body: bodyReadContactsByUser,
                key: 'contacts'
            })

            if (resReadContactsByUser.status != request.REST_STATUS_CODE.OK) {

                log.escribirLog({
                    header: header,
                    data: {
                        nivel: LoggerLevel.ERROR,
                        accion: contact_config.URL_READ_CONTACTS_BY_USER,
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
                        accion: contact_config.URL_READ_CONTACTS_BY_USER,
                        entrada: JSON.stringify(bodyReadContactsByUser),
                        salida: JSON.stringify(resReadContactsByUser),
                        ttl: new Date() - now
                    }
                })

                let contacts = resReadContactsByUser.data

                respuesta = response.crearRespuesta(configuracion.SUCCESS_CODE, contacts)
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