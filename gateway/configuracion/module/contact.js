const environment = require('../environment/environment')
const configuracion = require('../configuracion')

const MS_HOST = environment.MS_CONTACT_HOST
const MS_PORT = environment.MS_CONTACT_PORT

const MS_URL = 'http://' + MS_HOST + ':' + MS_PORT + configuracion.PATH_CONTACT

const MS_CREATE_CONTACT = '/createContact'
const MS_UPDATE_CONTACT = '/updateContact'
const MS_DELETE_CONTACT = '/deleteContact'
const MS_FIND_ALL_CONTACTS = '/findAllContacts'
const MS_FIND_CONTACTS_BY_USER_ID = '/findContactsByUserId'

module.exports = {
    URL_CREATE_CONTACT: MS_URL + MS_CREATE_CONTACT,
    URL_UPDATE_CONTACT: MS_URL + MS_UPDATE_CONTACT,
    URL_DELETE_CONTACT: MS_URL + MS_DELETE_CONTACT,
    URL_READ_CONTACTS: MS_URL + MS_FIND_ALL_CONTACTS,
    URL_READ_CONTACTS_BY_USER: MS_URL + MS_FIND_CONTACTS_BY_USER_ID
}