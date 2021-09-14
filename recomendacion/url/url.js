module.exports = app => {
    const configuracion = require('../configuracion/configuracion')
    const control = require('../control/control')

    var router = require('express').Router()

    router.post(configuracion.PATH_CREATE_RECOMENDATION, control.createRecomendation)

    router.put(configuracion.PATH_UPDATE_RECOMENDATION, control.updateRecomendation)

    router.delete(configuracion.PATH_DELETE_RECOMENDATION, control.deleteRecomendation)
    
    router.post(configuracion.PATH_FIND_ALL_RECOMENDATIONS, control.findAllRecomendations)

    router.post(configuracion.PATH_FIND_RECOMENDATIONS_BY_USER_ID, control.findRecomendationsByUserId)

    app.use('/' + configuracion.COMPONENTE, router)
}