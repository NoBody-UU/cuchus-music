const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { EMBED_COLORS, LINKS } = require("../../../settings/config");

/**
 * @type {import("../../structures/cmd")}
 */
module.exports = {
    config: {
        name: "invite",
        aliases: ["invitar", "invitacion"],
        category: "utilities",
        description: "Invite the Bot to your server.",
        accessableby: "Members"
    },
/**
 * @param {import('discord.js').Message} message - the message object that triggered the command
 */
  run: async (client, message, args) => {
        const embed = new EmbedBuilder()
        .setColor(EMBED_COLORS.DEFAULT)
        .setAuthor({ name: `💡 › Invite ${message.guild.members.me.displayName}`})
        .setDescription(`\n**⭐ ›** **[Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=3262528&scope=bot)**\n`)
        .setTimestamp()
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL()});

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Invite")
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=3262528&scope=bot`)
                    .setEmoji("🔗")
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setLabel("Support")
                    .setURL(LINKS.SUPPORT_SERVER)
                    .setEmoji("🎫")
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                .setLabel('INVITE CUCHUS')
                .setEmoji('⭐')
                .setURL('https://discord.com/api/oauth2/authorize?client_id=892993411169267722&scope=bot+applications.commands&permissions=1374891928950')
                .setStyle(ButtonStyle.Link),
            )
            
        
               message.channel.send({ embeds: [embed], components: [row] });
    }
}


