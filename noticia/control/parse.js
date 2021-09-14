async function construirObjeto(resultado) {
    let arrayFinal = []

    for (let item in resultado) {
        arrayFinal.push({
            id: item,
            title: resultado[item].title,
            smallDescription: resultado[item].smallDescription,
            category: resultado[item].category,
            imageUrl: resultado[item].imageUrl,
            content: resultado[item].content,
            font: resultado[item].font,
            user_id: resultado[item].user_id
        })
    }

    return arrayFinal
}

module.exports = {
    construirObjeto
}