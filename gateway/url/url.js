module.exports = app => {
    const configuracion = require('../configuracion/configuracion')
    
    const controlContact = require('../control/contact/control')
    const controlNew = require('../control/new/control')
    const controlRecomendation = require('../control/recomendation/control')
    const controlSuggestion = require('../control/suggestion/control')
    const controlUser = require('../control/user/control')
    const controlVideo = require('../control/video/control')

    var router = require('express').Router()

    router.post(configuracion.PATH_READ_CONTACTS_BY_USER, controlContact.readContactsByUser)
    router.post(configuracion.PATH_CREATE_CONTACT, controlContact.createContact)
    router.post(configuracion.PATH_UPDATE_CONTACT, controlContact.updateContact)
    router.post(configuracion.PATH_DELETE_CONTACT, controlContact.deleteContact)

    router.post(configuracion.PATH_READ_NEWS_BY_USER, controlNew.readNewsByUser)
    router.post(configuracion.PATH_CREATE_NEW, controlNew.createNew)
    router.post(configuracion.PATH_UPDATE_NEW, controlNew.updateNew)
    router.post(configuracion.PATH_DELETE_NEW, controlNew.deleteNew)

    router.post(configuracion.PATH_READ_RECOMENDATIONS_BY_USER, controlRecomendation.readRecomendationsByUser)
    router.post(configuracion.PATH_CREATE_RECOMENDATION, controlRecomendation.createRecomendation)
    router.post(configuracion.PATH_UPDATE_RECOMENDATION, controlRecomendation.updateRecomendation)
    router.post(configuracion.PATH_DELETE_RECOMENDATION, controlRecomendation.deleteRecomendation)

    router.post(configuracion.PATH_READ_SUGGESTIONS_BY_USER, controlSuggestion.readSuggestionsByUser)
    router.post(configuracion.PATH_CREATE_SUGGESTION, controlSuggestion.createSuggestion)
    router.post(configuracion.PATH_UPDATE_SUGGESTION, controlSuggestion.updateSuggestion)
    router.post(configuracion.PATH_DELETE_SUGGESTION, controlSuggestion.deleteSuggestion)

    router.post(configuracion.PATH_LOGIN_USER, controlUser.loginUser)
    router.post(configuracion.PATH_READ_USERS, controlUser.readUsers)
    router.post(configuracion.PATH_CREATE_USER, controlUser.createUser)
    router.post(configuracion.PATH_UPDATE_USER, controlUser.updateUser)
    router.post(configuracion.PATH_DELETE_USER, controlUser.deleteUser)

    router.post(configuracion.PATH_READ_VIDEOS_BY_USER, controlVideo.readVideosByUser)
    router.post(configuracion.PATH_CREATE_VIDEO, controlVideo.createVideo)
    router.post(configuracion.PATH_UPDATE_VIDEO, controlVideo.updateVideo)
    router.post(configuracion.PATH_DELETE_VIDEO, controlVideo.deleteVideo)

    app.use('/api', router)
}