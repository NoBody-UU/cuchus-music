const chalk = require("chalk");

module.exports = (client, error, id) => {
    client.logger.error(chalk.red(`[Shard #${id}] Errored`))
}

