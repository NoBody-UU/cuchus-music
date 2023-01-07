const chalk = require("chalk");


module.exports = (client, id) => {
    client.logger.warn(chalk.yellow(`[Shard #${id}] Reconnecting...`))
}

