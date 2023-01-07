const chalk = require("chalk")

module.exports = client => {
    client.logger.log(`[${client.user.username}] || Disconnected at ${new Date()}.`)
}


