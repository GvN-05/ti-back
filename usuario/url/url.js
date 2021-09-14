module.exports = app => {
    const configuracion = require('../configuracion/configuracion')
    const control = require('../control/control')

    var router = require('express').Router()

    router.post(configuracion.PATH_CREATE_USER, control.createUser)

    router.put(configuracion.PATH_UPDATE_USER, control.updateUser)

    router.delete(configuracion.PATH_DELETE_USER, control.deleteUser)

    router.post(configuracion.PATH_FIND_ALL_USERS, control.findAllUsers)

    router.post(configuracion.PATH_FIND_USER_BY_LOGIN, control.findUserByLogin)

    app.use('/' + configuracion.COMPONENTE, router)
}