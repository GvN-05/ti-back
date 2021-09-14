const log4js = require('log4js')
const configuracion = require('../configuracion/configuracion')

const LoggerLevel = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    FATAL: 'FATAL',
    DEBUG: 'DEBUG'
}

log4js.configure({
    appenders: {
        out: {
            type: 'dateFile',
            filename: 'log/' + configuracion.COMPONENT + '.log',
            layout: {
                type: 'pattern',
                pattern: '%d{dd-MM-yyyy hh:mm:ss,SSS} - %p - %X{uuid} - %X{funcion} - %m'
            }
        }
    },
    categories: {
        default: {
            appenders: [ 'out' ],
            level: 'debug'
        }
    }
})

const logger = log4js.getLogger(configuracion.COMPONENT)

function escribirLog(registro) {

    try {

        let header = registro.header
        let data = registro.data

        logger.addContext('uuid', header.uuid)
        logger.addContext('funcion', header.funcion)

        let linea = ''

        if (data.accion != undefined)
            linea += data.accion
        
        linea += ' - '

        if (data.entrada != undefined)
            linea += data.entrada
        
        linea += ' - '

        if (data.salida != undefined)
            linea += data.salida
        
        linea += ' - '

        if (data.ttl != undefined)
            linea += data.ttl

        switch (data.nivel) {
            case LoggerLevel.INFO:
                logger.info(linea)
                break
            case LoggerLevel.WARN:
                logger.warn(linea)
                break
            case LoggerLevel.ERROR:
                logger.error(linea)
                break
            case LoggerLevel.FATAL:
                logger.fatal(linea)
                break
            default:
                logger.info(linea)
                break
        }

    } catch (error) {
        console.log('ERROR EN CABECERA')
    }

}

module.exports = {
    LoggerLevel,
    escribirLog
}