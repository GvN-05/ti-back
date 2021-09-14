function validarBody(body, funcion) {
    switch (funcion) {
        case 'createVideo':
            if (body.title &&
                body.credites &&
                body.videoUrl &&
                body.videoLocal &&
                body.user_id)
                return true

        case 'updateVideo':
            if (body.id &&
                body.title &&
                body.credites &&
                body.videoUrl &&
                body.videoLocal)
                return true

        case 'deleteVideo':
            if (body.id)
                return true
        
        case 'findVideosByUserId':
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