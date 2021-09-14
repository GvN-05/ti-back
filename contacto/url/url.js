module.exports = app => {
    const configuracion = require('../configuracion/configuracion')
    const control = require('../control/control')

    var router = require('express').Router()

    router.post(configuracion.PATH_CREATE_CONTACT, control.createContact)

    router.put(configuracion.PATH_UPDATE_CONTACT, control.updateContact)

    router.delete(configuracion.PATH_DELETE_CONTACT, control.deleteContact)
    
    router.post(configuracion.PATH_FIND_ALL_CONTACTS, control.findAllContacts)

    router.post(configuracion.PATH_FIND_CONTACTS_BY_USER_ID, control.findContactsByUserId)

    app.use('/' + configuracion.COMPONENTE, router)
}