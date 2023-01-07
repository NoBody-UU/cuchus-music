const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { EMBED_COLORS, LINKS } = require("../../../settings/config");

module.exports = {
    config: {
        name: "invite",
        aliases: ["invitar", "invitacion"],
        category: "utilities",
        description: "Invite the Bot to your server.",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const embed = new EmbedBuilder()
        .setColor(EMBED_COLORS.DEFAULT)
        .setAuthor({ name: `💡 › Invite ${message.guild.members.me.displayName}`})
        .setDescription(`\n**⭐ ›** **[Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)**\n`)
        .setTimestamp()
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL()});

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Invite")
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
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


