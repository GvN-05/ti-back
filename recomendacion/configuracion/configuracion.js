// Environment
const configuracion = require('./environment/environment')

const MODULO = 'recomendation'

module.exports = {
    COMPONENTE: MODULO,
    PUERTO: configuracion.PORT_CONFIG,
    CONEXION: configuracion.URL_DB,
    KEY: './key/' + configuracion.KEY_DB,
    TABLA: MODULO,

    PATH_CREATE_RECOMENDATION: '/createRecomendation',
    PATH_UPDATE_RECOMENDATION: '/updateRecomendation',
    PATH_DELETE_RECOMENDATION: '/deleteRecomendation',
    PATH_FIND_ALL_RECOMENDATIONS: '/findAllRecomendations',
    PATH_FIND_RECOMENDATIONS_BY_USER_ID: '/findRecomendationsByUserId',

    EXITO_CREATE: 'Recomendacion guardada exitosamente',
    EXITO_UPDATE: 'Recomendacion actualizada exitosamente',
    EXITO_DELETE: 'Recomendacion eliminada exitosamente',

    ERROR_REQUEST: 'Parametros insuficientes',
    ERROR_PROCEDIMIENTO: 'Ha ocurrido un error. Intente nuevamente'
}