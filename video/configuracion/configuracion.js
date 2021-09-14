// Environment
const configuracion = require('./environment/environment')

const MODULO = 'video'

module.exports = {
    COMPONENTE: MODULO,
    PUERTO: configuracion.PORT_CONFIG,
    CONEXION: configuracion.URL_DB,
    KEY: './key/' + configuracion.KEY_DB,
    TABLA: MODULO,

    PATH_CREATE_VIDEO: '/createVideo',
    PATH_UPDATE_VIDEO: '/updateVideo',
    PATH_DELETE_VIDEO: '/deleteVideo',
    PATH_FIND_ALL_VIDEOS: '/findAllVideos',
    PATH_FIND_VIDEOS_BY_USER_ID: '/findVideosByUserId',

    EXITO_CREATE: 'Video guardado exitosamente',
    EXITO_UPDATE: 'Video actualizado exitosamente',
    EXITO_DELETE: 'Video eliminado exitosamente',

    ERROR_REQUEST: 'Parametros insuficientes',
    ERROR_PROCEDIMIENTO: 'Ha ocurrido un error. Intente nuevamente'
}