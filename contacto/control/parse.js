async function construirObjeto(resultado) {
    let arrayFinal = []

    for (let item in resultado) {
        arrayFinal.push({
            id: item,
            service: resultado[item].service,
            name: resultado[item].name,
            lastname: resultado[item].lastname,
            address: resultado[item].address,
            phone: resultado[item].phone,
            user_id: resultado[item].user_id
        })
    }

    return arrayFinal
}

module.exports = {
    construirObjeto
}