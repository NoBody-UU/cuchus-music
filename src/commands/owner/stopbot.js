const chalk = require('chalk');
const { EmbedBuilder } = require('discord.js');
const { EMBED_COLORS } = require('../../../settings/config');
const Logger = require('../../helpers/Logger');


module.exports = {
    config: {
        name: "stopbot",
        description: "shuts down the client!",
        category: "owner",
        accessableby: "Owner",
        aliases: ["sbot"]
    },
/**
 * @param {import('discord.js').Message} message - the message object that triggered the command
 */
  run: async (client, message, args) => {
        if(message.author.id != client.owner){
            return message.reply({embeds: [new EmbedBuilder().setTitle('ERROR') .setDescription("This command is only for bot owners") .setColor(EMBED_COLORS.ERROR)]})
        }
    const restart = new EmbedBuilder()
        .setDescription(`**${message.guild.members.me.displayName} has been**: \`Shutting down...\``)
        .setColor(EMBED_COLORS.DEFAULT);

    await message.reply({ embeds: [restart] });
        Logger.warn(chalk.yellow(`[BOT] Restarting...`));
            
    process.exit();
    
}
};

