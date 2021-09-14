module.exports = app => {
    const configuracion = require('../configuracion/configuracion')
    const control = require('../control/control')

    var router = require('express').Router()

    router.post(configuracion.PATH_CREATE_VIDEO, control.createVideo)

    router.put(configuracion.PATH_UPDATE_VIDEO, control.updateVideo)

    router.delete(configuracion.PATH_DELETE_VIDEO, control.deleteVideo)
    
    router.post(configuracion.PATH_FIND_ALL_VIDEOS, control.findAllVideos)

    router.post(configuracion.PATH_FIND_VIDEOS_BY_USER_ID, control.findVideosByUserId)

    app.use('/' + configuracion.COMPONENTE, router)
}