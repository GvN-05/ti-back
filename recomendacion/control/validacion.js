function validarBody(body, funcion) {
    switch (funcion) {
        case 'createRecomendation':
            if (body.title &&
                body.category &&
                body.description &&
                body.portalImage &&
                body.profileImage &&
                body.user_id)
                return true

        case 'updateRecomendation':
            if (body.id &&
                body.title &&
                body.category &&
                body.description &&
                body.portalImage &&
                body.profileImage)
                return true

        case 'deleteRecomendation':
            if (body.id)
                return true
        
        case 'findRecomendationsByUserId':
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