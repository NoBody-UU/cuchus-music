const { readdirSync } = require("fs")
const delay = require('delay');
const {log, success} = require("../helpers/Logger");
const chalk = require('chalk');

module.exports = async (client) => {
    log('[LOADING] Commands...');
    const load = dirs => {
        const commands = readdirSync(`./src/commands/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`./../commands/${dirs}/${file}`);
            client.commands.set(pull.config.name, pull);
            if (pull.config.aliases) pull.config.aliases.forEach(a => client.aliases.set(a, pull.config.name));
          };
        };

        ["music", "filters", "utilities", "owner"].forEach(x => load(x));
        await delay(4000);
        success(chalk.green(`[BOT] Commands Loaded`));
};