function validarBody(body, funcion) {
    switch (funcion) {
        //#region CONTACT
        case 'readContactsByUser':
            if (body.user_id)
                return true

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
                body.phone &&
                body.user_id)
                return true
        
        case 'deleteContact':
            if (body.id &&
                body.user_id)
                return true
        //#endregion

        //#region NEW
        case 'readNewsByUser':
            if (body.user_id)
                return true

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
                body.font &&
                body.user_id)
                return true
        
        case 'deleteNew':
            if (body.id &&
                body.user_id)
                return true
        //#endregion

        //#region RECOMENDATION
        case 'readRecomendationsByUser':
            if (body.user_id)
                return true

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
                body.profileImage &&
                body.user_id)
                return true
        
        case 'deleteRecomendation':
            if (body.id &&
                body.user_id)
                return true
        //#endregion

        //#region SUGGESTION
        case 'readSuggestionsByUser':
            if (body.user_id)
                return true

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
                body.comment &&
                body.user_id)
                return true
        
        case 'deleteSuggestion':
            if (body.id &&
                body.user_id)
                return true
        //#endregion

        //#region USUARIO
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
                body.profile &&
                body.user_id)
                return true
        
        case 'deleteUser':
            if (body.id)
                return true

        case 'loginUser':
            if ((body.mail ||
                body.phone) &&
                body.password)
                return true
        //#endregion

        //#region VIDEO
        case 'readVideosByUser':
            if (body.user_id)
                return true

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
                body.videoLocal &&
                body.user_id)
                return true
        
        case 'deleteVideo':
            if (body.id &&
                body.user_id)
                return true
        //#endregion
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