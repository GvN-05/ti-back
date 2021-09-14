// Environment
const configuracion = require('./environment/environment')

const MODULO = 'contact'

module.exports = {
    COMPONENTE: MODULO,
    PUERTO: configuracion.PORT_CONFIG,
    CONEXION: configuracion.URL_DB,
    KEY: './key/' + configuracion.KEY_DB,
    TABLA: MODULO,

    PATH_CREATE_CONTACT: '/createContact',
    PATH_UPDATE_CONTACT: '/updateContact',
    PATH_DELETE_CONTACT: '/deleteContact',
    PATH_FIND_ALL_CONTACTS: '/findAllContacts',
    PATH_FIND_CONTACTS_BY_USER_ID: '/findContactsByUserId',

    EXITO_CREATE: 'Contacto guardado exitosamente',
    EXITO_UPDATE: 'Contacto actualizado exitosamente',
    EXITO_DELETE: 'Contacto eliminado exitosamente',

    ERROR_REQUEST: 'Parametros insuficientes',
    ERROR_PROCEDIMIENTO: 'Ha ocurrido un error. Intente nuevamente'
}