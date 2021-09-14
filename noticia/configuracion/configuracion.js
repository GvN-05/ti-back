// Environment
const configuracion = require('./environment/environment')

const MODULO = 'new'

module.exports = {
    COMPONENTE: MODULO,
    PUERTO: configuracion.PORT_CONFIG,
    CONEXION: configuracion.URL_DB,
    KEY: './key/' + configuracion.KEY_DB,
    TABLA: MODULO,

    PATH_CREATE_NEW: '/createNew',
    PATH_UPDATE_NEW: '/updateNew',
    PATH_DELETE_NEW: '/deleteNew',
    PATH_FIND_ALL_NEWS: '/findAllNews',
    PATH_FIND_NEWS_BY_USER_ID: '/findNewsByUserId',

    EXITO_CREATE: 'Noticia guardada exitosamente',
    EXITO_UPDATE: 'Noticia actualizada exitosamente',
    EXITO_DELETE: 'Noticia eliminada exitosamente',

    ERROR_REQUEST: 'Parametros insuficientes',
    ERROR_PROCEDIMIENTO: 'Ha ocurrido un error. Intente nuevamente'
}