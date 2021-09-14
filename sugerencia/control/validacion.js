function validarBody(body, funcion) {
    switch (funcion) {
        case 'createSuggestion':
            if (body.name &&
                body.phone &&
                body.mail &&
                body.subject &&
                body.comment &&
                body.user_id)
                return true

        case 'updateSuggestion':
            if (body.id &&
                body.name &&
                body.phone &&
                body.mail &&
                body.subject &&
                body.comment)
                return true

        case 'deleteSuggestion':
            if (body.id)
                return true
        
        case 'findSuggestionsByUserId':
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