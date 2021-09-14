async function construirObjeto(resultado) {
    let arrayFinal = []

    for (let item in resultado) {
        arrayFinal.push({
            id: item,
            name: resultado[item].name,
            phone: resultado[item].phone,
            mail: resultado[item].mail,
            subject: resultado[item].subject,
            comment: resultado[item].comment,
            user_id: resultado[item].user_id
        })
    }

    return arrayFinal
}

module.exports = {
    construirObjeto
}