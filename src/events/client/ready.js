const figlet = require('figlet');
const chalk = require('chalk');
const delay = require("delay");


module.exports = async (client) => {
  try { 
    figlet(client.user.tag, function(err, data) {
    if (err) {
        client.logger.error('Something went wrong...', err);
        return;
    }

    console.log(chalk.yellow(data));
  });

  let guilds = client.guilds.cache.size;
  let members = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
  let channels = client.channels.cache.size;
    // Precense
  const activities = [
      `${client.prefix}help | ${guilds} Servers`,
      `${client.prefix}play <song> | ${members} users`,
      `${client.prefix}stop | ${channels} channels`,
      `${guilds} Servers | ${members} users `   
  ]
  setInterval(() => {
      client.user.setPresence({ 
       activities: [{ name: `${activities[Math.floor(Math.random() * activities.length)]}`, type: 3 }], 
       status: 'online', 
   });
}, 13000)

client.logger.success(chalk.green("BOT ONLINE"))
} catch (error) {
    client.logger.error(error)
    process.exit();
  }

}


