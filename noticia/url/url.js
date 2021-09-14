module.exports = app => {
    const configuracion = require('../configuracion/configuracion')
    const control = require('../control/control')

    var router = require('express').Router()

    router.post(configuracion.PATH_CREATE_NEW, control.createNew)

    router.put(configuracion.PATH_UPDATE_NEW, control.updateNew)

    router.delete(configuracion.PATH_DELETE_NEW, control.deleteNew)
    
    router.post(configuracion.PATH_FIND_ALL_NEWS, control.findAllNews)

    router.post(configuracion.PATH_FIND_NEWS_BY_USER_ID, control.findNewsByUserId)

    app.use('/' + configuracion.COMPONENTE, router)
}