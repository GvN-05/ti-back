function validarBody(body, funcion) {
    switch (funcion) {
        case 'createUser':
            if (body.name &&
                body.lastname &&
                body.user &&
                body.mail &&
                body.phone &&
                body.password &&
                body.address &&
                body.profile)
                return true
        
        case 'updateUser':
            if (body.id &&
                body.name &&
                body.lastname &&
                body.user &&
                body.mail &&
                body.phone &&
                body.password &&
                body.address &&
                body.profile)
                return true
        
        case 'deleteUser':
            if (body.id)
                return true

        case 'findUserByLogin':
            if (body.mail ||
                body.phone)
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