// Environment
const configuracion = require('./environment/environment')

const MODULO = 'user'

module.exports = {
    COMPONENTE: MODULO,
    PUERTO: configuracion.PORT_CONFIG,
    CONEXION: configuracion.URL_DB,
    KEY: './key/' + configuracion.KEY_DB,
    TABLA: MODULO,

    PATH_CREATE_USER: '/createUser',
    PATH_UPDATE_USER: '/updateUser',
    PATH_DELETE_USER: '/deleteUser',
    PATH_FIND_ALL_USERS: '/findAllUsers',
    PATH_FIND_USER_BY_LOGIN: '/findUserByLogin',

    EXITO_CREATE: 'Usuario guardado exitosamente',
    EXITO_UPDATE: 'Usuario actualizado exitosamente',
    EXITO_DELETE: 'Usuario eliminado exitosamente',

    ERROR_REQUEST: 'Parametros insuficientes',
    ERROR_PROCEDIMIENTO: 'Ha ocurrido un error. Intente nuevamente'
}