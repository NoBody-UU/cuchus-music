const chalk = require("chalk");

module.exports = client => {
    client.logger.warn(chalk.yellow(`[${client.user.username}] || Reconnceting at ${new Date()}.`));
}


