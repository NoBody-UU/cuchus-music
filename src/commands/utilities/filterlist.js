const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require('../../../settings/config');
const { getSettings } = require("../../Database/schemas/Guild");

/**
 * @type {import("../../structures/cmd")}
 */
module.exports = {
    config: {
        name: "filterlist",
        aliases: ["fl"],
        usage: "(command)",
        category: "utilities",
        description: "Displays all filters that the bot has.",
        accessableby: "Members"
    },
/**
 * @param {import('discord.js').Message} message - the message object that triggered the command
 */
    run: async (client, message) => {
        const settings = getSettings(message.guild);
        const PREFIX = settings.prefix;
        const msg = await message.channel.send("Processing...");
        const embed = new EmbedBuilder()
            .setColor(EMBED_COLORS.DEFAULT)
            .setAuthor({ name: `Filter List`, iconURL: message.guild.iconURL({ dynamic: true })})
            .setDescription(`**Displays all filters that the bot has.**`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .addFields({ name: '** **', value: `\`3d\``, inline: true })
            .addFields({ name: '** **', value: `\`bassboost\``, inline: true })
            .addFields({ name: '** **', value: `\`echo\``, inline: true })
            .addFields({ name: '** **', value: `\`karaoke\``, inline: true })
            .addFields({ name: '** **', value: `\`nightcore\``, inline: true })
            .addFields({ name: '** **', value: `\`vaporwave\``, inline: true })
            .addFields({ name: '** **', value: `\`flanger\``, inline: true })
            .addFields({ name: '** **', value: `\`gate\``, inline: true })
            .addFields({ name: '** **', value: `\`haas\``, inline: true })
            .addFields({ name: '** **', value: `\`reverse\``, inline: true })
            .addFields({ name: '** **', value: `\`surround\``, inline: true })
            .addFields({ name: '** **', value: `\`mcompand\``, inline: true })
            .addFields({ name: '** **', value: `\`phaser\``, inline: true })
            .addFields({ name: '** **', value: `\`tremolo\``, inline: true })
            .addFields({ name: '** **', value: `\`earwax\``, inline: true })
            .setFooter({ text: `Example: ${PREFIX}filter bassboost` })
            .setTimestamp()

            msg.edit({ content: ' ', embeds: [embed] })
        }
}; // testing version


