const { readdirSync } = require("fs");
const delay = require("delay");
const Logger = require("../helpers/Logger");
const chalk = require('chalk');

module.exports = async (client) => {
    Logger.log('[LOADING] Distube...');
    try {
        readdirSync("./src/events/distube").forEach(file => {
            
            const event = require(`../events/distube/${file}`);
            let eventName = file.split(".")[0];
            client.distube.on(eventName, event.bind(null, client));
          });
    } catch (e) {
        Logger.error(e);
    }
    await delay(4000);
    Logger.success(chalk.green(`[BOT] Distube Loaded`));
};

