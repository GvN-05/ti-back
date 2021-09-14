const environment = require('../environment/environment')
const configuracion = require('../configuracion')

const MS_HOST = environment.MS_RECOMENDATION_HOST
const MS_PORT = environment.MS_RECOMENDATION_PORT

const MS_URL = 'http://' + MS_HOST + ':' + MS_PORT + configuracion.PATH_RECOMENDATION

const MS_CREATE_RECOMENDATION = '/createRecomendation'
const MS_UPDATE_RECOMENDATION = '/updateRecomendation'
const MS_DELETE_RECOMENDATION = '/deleteRecomendation'
const MS_FIND_ALL_RECOMENDATIONS = '/findAllRecomendations'
const MS_FIND_RECOMENDATIONS_BY_USER_ID = '/findRecomendationsByUserId'

module.exports = {
    URL_CREATE_RECOMENDATION: MS_URL + MS_CREATE_RECOMENDATION,
    URL_UPDATE_RECOMENDATION: MS_URL + MS_UPDATE_RECOMENDATION,
    URL_DELETE_RECOMENDATION: MS_URL + MS_DELETE_RECOMENDATION,
    URL_READ_RECOMENDATIONS: MS_URL + MS_FIND_ALL_RECOMENDATIONS,
    URL_READ_RECOMENDATIONS_BY_USER: MS_URL + MS_FIND_RECOMENDATIONS_BY_USER_ID
}