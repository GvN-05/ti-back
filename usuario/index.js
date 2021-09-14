const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const constantes = require('./configuracion/configuracion')

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send({
        error: true,
        codigo: 200,
        mensaje: 'CONECTADO'
    })
})

require('./url/url')(app)

app.listen(constantes.PUERTO, () => {
    console.log('SERVIDOR ONLINE - PUERTO: ' + constantes.PUERTO)
})