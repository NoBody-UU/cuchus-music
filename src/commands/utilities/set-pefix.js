const { EmbedBuilder } = require('discord.js');
const { EMBED_COLORS } = require('../../../settings/config');
const { getSettings } = require('../../Database/schemas/Guild');
/**
 * @type {import("../../structures/cmd")}
 */
module.exports = {
    config: {
        name: "prefix",
        aliases: [],
        category: "utilities",
        description: "set prefix",
        accessableby: "Members"
    },
 /**
     * @param {import('discord.js').Message} message 
     * */
/**
 * @param {import('discord.js').Message} message - the message object that triggered the command
 */
  run: async (client, message, args) => {
        const data = await getSettings(message.guild);
        const newPrefix = args.join(" ")
        if (newPrefix.length > 2) return "❌ | **New Prefix cannot exceed `2` characters**";
        data.prefix = newPrefix;
        await data.save();
        
        message.reply({ embeds: [
            new EmbedBuilder()
            .setTitle('New Prefix set SUCCESSFULLY')
            .setDescription(`**❯ New Prefix:** \`${newPrefix}\``)
            .setColor(EMBED_COLORS.DEFAULT)
        ]})
      
}
}