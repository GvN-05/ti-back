const env = process.env.NODE_ENV || 'desarrollo'
module.exports = require(`../environment/.${env}.js`)