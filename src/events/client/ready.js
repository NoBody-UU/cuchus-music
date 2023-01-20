const figlet = require('figlet');
const chalk = require('chalk');
const delay = require("delay");
const express = require('express');
const { PREFIX } = require('../../../settings/config');
const Discord = require('discord.js');
const app = express();


module.exports = async (client) => {
  app.get('/', (req, res) => res.send(`<h1>${client.user.tag} Online</h1><h3>¡Please leave a ⭐ to help the project <a href="https://github.com/NoBody-UU/cuchus-music">CLIC HERE</a></h3>`)) 
  app.listen(1313, () =>
  client.logger.success(chalk.green(`Your app is listening a http://localhost:1313`))
);
  try { 
    figlet(client.user.tag, function(err, data) {
    if (err) {
        client.logger.error('Something went wrong...', err);
        return;
    }

    console.log(chalk.yellow(data));
  });
  console.table({ 
    'Bot User:' : `${client.user.tag}` ,
    'Guild(s):' : `${client.guilds.cache.size} Servers` ,
    'Watching:' : `${client.guilds.cache.reduce((a, b) => a + b?.memberCount, 0)} Members` ,
    'Prefix:' : `${PREFIX}` ,
    'Discord.js:' : `v${Discord.version}` ,
    'Node.js:' : `${process.version}` ,
    'Plattform:' : `${process.platform} ${process.arch}` ,
    'Memory:' : `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`
  });


  let guilds = client.guilds.cache.size;
  let members = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
  let channels = client.channels.cache.size;
    // Precense
  const activities = [
      `${members} Users On ${guilds} Servers`,
      `${channels} channels`,
      `By: NoBody#9666`,
      //``
  ]
  setInterval(() => {
      client.user.setPresence({ 
       activities: [{ name: `${activities[Math.floor(Math.random() * activities.length)]}`, type: 3 }], 
       status: 'online', 
   });
}, 15000)

client.logger.success(chalk.green("BOT ONLINE"))
} catch (error) {
    client.logger.error(error)
    process.exit();
  }

}


