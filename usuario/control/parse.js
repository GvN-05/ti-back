async function construirObjeto(resultado) {
    let arrayFinal = []

    for (let item in resultado) {
        arrayFinal.push({
            id: item,
            name: resultado[item].name,
            lastname: resultado[item].lastname,
            user: resultado[item].user,
            mail: resultado[item].mail,
            phone: resultado[item].phone,
            password: resultado[item].password,
            address: resultado[item].address,
            profile: resultado[item].profile
        })
    }

    return arrayFinal
}

module.exports = {
    construirObjeto
}