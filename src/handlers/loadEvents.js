const { readdirSync } = require("fs")
const delay = require('delay');
const Logger = require("../helpers/Logger");
const chalk = require('chalk');

module.exports = async (client, message) => {
  Logger.log('[LOADING] Global Events...');
    const load = dirs => {    
        const events = readdirSync(`./src/events/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of events) {
            const evt = require(`./../events/${dirs}/${file}`);
            let eName = file.split('.')[0];
            client.on(eName, evt.bind(null, client));
          };
        };
      ["client", "guild"].forEach(x => load(x));
      await delay(4000);
      Logger.success(chalk.green(`[BOT] Global Events Loaded`));
};