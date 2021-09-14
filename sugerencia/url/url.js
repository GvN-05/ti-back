module.exports = app => {
    const configuracion = require('../configuracion/configuracion')
    const control = require('../control/control')

    var router = require('express').Router()

    router.post(configuracion.PATH_CREATE_SUGGESTION, control.createSuggestion)

    router.put(configuracion.PATH_UPDATE_SUGGESTION, control.updateSuggestion)

    router.delete(configuracion.PATH_DELETE_SUGGESTION, control.deleteSuggestion)
    
    router.post(configuracion.PATH_FIND_ALL_SUGGESTIONS, control.findAllSuggestions)

    router.post(configuracion.PATH_FIND_SUGGESTIONS_BY_USER_ID, control.findSuggestionsByUserId)

    app.use('/' + configuracion.COMPONENTE, router)
}