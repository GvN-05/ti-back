function validarBody(body, funcion) {
    switch (funcion) {
        case 'createNew':
            if (body.title &&
                body.smallDescription &&
                body.category &&
                body.imageUrl &&
                body.content &&
                body.font &&
                body.user_id)
                return true

        case 'updateNew':
            if (body.id &&
                body.title &&
                body.smallDescription &&
                body.category &&
                body.imageUrl &&
                body.content &&
                body.font)
                return true

        case 'deleteNew':
            if (body.id)
                return true
        
        case 'findNewsByUserId':
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