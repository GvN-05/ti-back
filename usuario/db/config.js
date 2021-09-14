const admin = require("firebase-admin");

const configuracion = require('../configuracion/configuracion')

var serviceAccount = require(configuracion.KEY)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: configuracion.CONEXION
})

var db = admin.database()
var conexion = db.ref(configuracion.COMPONENTE)

module.exports = {
    conexion: conexion
}