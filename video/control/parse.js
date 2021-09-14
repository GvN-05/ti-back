async function construirObjeto(resultado) {
    let arrayFinal = []

    for (let item in resultado) {
        arrayFinal.push({
            id: item,
            title: resultado[item].title,
            credites: resultado[item].credites,
            videoUrl: resultado[item].videoUrl,
            videoLocal: resultado[item].videoLocal,
            user_id: resultado[item].user_id
        })
    }

    return arrayFinal
}

module.exports = {
    construirObjeto
}