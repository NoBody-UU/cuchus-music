const delay = require("delay");
const chalk = require("chalk")

module.exports = async (client, id) => { 
    await delay(2000); 
    client.logger.success(chalk.green(`[Shard #${id}] Ready`))
}

