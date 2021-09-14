const environment = require('../environment/environment')
const configuracion = require('../configuracion')

const MS_HOST = environment.MS_USER_HOST
const MS_PORT = environment.MS_USER_PORT

const MS_URL = 'http://' + MS_HOST + ':' + MS_PORT + configuracion.PATH_USER

const MS_CREATE_USER = '/createUser'
const MS_UPDATE_USER = '/updateUser'
const MS_DELETE_USER = '/deleteUser'
const MS_FIND_ALL_USERS = '/findAllUsers'
const MS_FIND_USER_BY_LOGIN = '/findUserByLogin'

module.exports = {
    URL_CREATE_USER: MS_URL + MS_CREATE_USER,
    URL_UPDATE_USER: MS_URL + MS_UPDATE_USER,
    URL_DELETE_USER: MS_URL + MS_DELETE_USER,
    URL_READ_USERS: MS_URL + MS_FIND_ALL_USERS,
    URL_LOGIN_USER: MS_URL + MS_FIND_USER_BY_LOGIN
}