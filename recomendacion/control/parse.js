async function construirObjeto(resultado) {
    let arrayFinal = []

    for (let item in resultado) {
        arrayFinal.push({
            id: item,
            title: resultado[item].title,
            category: resultado[item].category,
            description: resultado[item].description,
            portalImage: resultado[item].portalImage,
            profileImage: resultado[item].profileImage,
            user_id: resultado[item].user_id
        })
    }

    return arrayFinal
}

module.exports = {
    construirObjeto
}