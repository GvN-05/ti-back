const environment = require('../environment/environment')
const configuracion = require('../configuracion')

const MS_HOST = environment.MS_VIDEO_HOST
const MS_PORT = environment.MS_VIDEO_PORT

const MS_URL = 'http://' + MS_HOST + ':' + MS_PORT + configuracion.PATH_VIDEO

const MS_CREATE_VIDEO = '/createVideo'
const MS_UPDATE_VIDEO = '/updateVideo'
const MS_DELETE_VIDEO = '/deleteVideo'
const MS_FIND_ALL_VIDEOS = '/findAllVideos'
const MS_FIND_VIDEOS_BY_USER_ID = '/findVideosByUserId'

module.exports = {
    URL_CREATE_VIDEO: MS_URL + MS_CREATE_VIDEO,
    URL_UPDATE_VIDEO: MS_URL + MS_UPDATE_VIDEO,
    URL_DELETE_VIDEO: MS_URL + MS_DELETE_VIDEO,
    URL_READ_VIDEOS: MS_URL + MS_FIND_ALL_VIDEOS,
    URL_READ_VIDEOS_BY_USER: MS_URL + MS_FIND_VIDEOS_BY_USER_ID
}