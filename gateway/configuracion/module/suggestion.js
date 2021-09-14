const environment = require('../environment/environment')
const configuracion = require('../configuracion')

const MS_HOST = environment.MS_SUGGESTION_HOST
const MS_PORT = environment.MS_SUGGESTION_PORT

const MS_URL = 'http://' + MS_HOST + ':' + MS_PORT + configuracion.PATH_SUGGESTION

const MS_CREATE_SUGGESTION = '/createSuggestion'
const MS_UPDATE_SUGGESTION = '/updateSuggestion'
const MS_DELETE_SUGGESTION = '/deleteSuggestion'
const MS_FIND_ALL_SUGGESTIONS = '/findAllSuggestions'
const MS_FIND_SUGGESTIONS_BY_USER_ID = '/findSuggestionsByUserId'

module.exports = {
    URL_CREATE_SUGGESTION: MS_URL + MS_CREATE_SUGGESTION,
    URL_UPDATE_SUGGESTION: MS_URL + MS_UPDATE_SUGGESTION,
    URL_DELETE_SUGGESTION: MS_URL + MS_DELETE_SUGGESTION,
    URL_READ_SUGGESTIONS: MS_URL + MS_FIND_ALL_SUGGESTIONS,
    URL_READ_SUGGESTIONS_BY_USER: MS_URL + MS_FIND_SUGGESTIONS_BY_USER_ID
}