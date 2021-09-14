function validarBody(body, funcion) {
    switch (funcion) {
        case 'createContact':
            if (body.service &&
                body.name &&
                body.lastname &&
                body.address &&
                body.phone &&
                body.user_id)
                return true

        case 'updateContact':
            if (body.id &&
                body.service &&
                body.name &&
                body.lastname &&
                body.address &&
                body.phone)
                return true

        case 'deleteContact':
            if (body.id)
                return true
        
        case 'findContactsByUserId':
            if (body.user_id)
                return true
    }
    return false
}

function validarHeader(header) {
    if (header.uuid)
        return true
    else
        return false
}

module.exports = {
    validarBody,
    validarHeader
}