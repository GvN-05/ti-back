const environment = require('../environment/environment')
const configuracion = require('../configuracion')

const MS_HOST = environment.MS_NEW_HOST
const MS_PORT = environment.MS_NEW_PORT

const MS_URL = 'http://' + MS_HOST + ':' + MS_PORT + configuracion.PATH_NEW

const MS_CREATE_NEW = '/createNew'
const MS_UPDATE_NEW = '/updateNew'
const MS_DELETE_NEW = '/deleteNew'
const MS_FIND_ALL_NEWS = '/findAllNews'
const MS_FIND_NEWS_BY_USER_ID = '/findNewsByUserId'

module.exports = {
    URL_CREATE_NEW: MS_URL + MS_CREATE_NEW,
    URL_UPDATE_NEW: MS_URL + MS_UPDATE_NEW,
    URL_DELETE_NEW: MS_URL + MS_DELETE_NEW,
    URL_READ_NEWS: MS_URL + MS_FIND_ALL_NEWS,
    URL_READ_NEWS_BY_USER: MS_URL + MS_FIND_NEWS_BY_USER_ID
}