// Environment
const configuracion = require('./environment/environment')

const MODULO = 'suggestion'

module.exports = {
    COMPONENTE: MODULO,
    PUERTO: configuracion.PORT_CONFIG,
    CONEXION: configuracion.URL_DB,
    KEY: './key/' + configuracion.KEY_DB,
    TABLA: MODULO,

    PATH_CREATE_SUGGESTION: '/createSuggestion',
    PATH_UPDATE_SUGGESTION: '/updateSuggestion',
    PATH_DELETE_SUGGESTION: '/deleteSuggestion',
    PATH_FIND_ALL_SUGGESTIONS: '/findAllSuggestions',
    PATH_FIND_SUGGESTIONS_BY_USER_ID: '/findSuggestionsByUserId',

    EXITO_CREATE: 'Sugerencia guardada exitosamente',
    EXITO_UPDATE: 'Sugerencia actualizada exitosamente',
    EXITO_DELETE: 'Sugerencia eliminada exitosamente',

    ERROR_REQUEST: 'Parametros insuficientes',
    ERROR_PROCEDIMIENTO: 'Ha ocurrido un error. Intente nuevamente'
}