const express = require('express')
const app = express()
const bodyParser = require('body-parser')
cors = require('cors')

const configuracion = require('./configuracion/configuracion')

app.use(cors())
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

app.listen(configuracion.PORT, () => {
    console.log('SERVIDOR ONLINE - PUERTO: ' + configuracion.PORT)
    console.log(Date.now())
})