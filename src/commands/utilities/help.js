const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const config = require("../../../settings/config");
const { EMBED_COLORS } = require("../../../settings/config");
const { getSettings } = require("../../Database/schemas/Guild");

/**
 * @type {import("../../structures/cmd")}
 */
module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands", "ayuda"],
        usage: "(command)",
        category: "utilities",
        description: "Show all the commands that the bot has.",
        accessableby: "Members"
    },
/**
 * @param {import('discord.js').Message} message - the message object that triggered the command
*/
  run: async (client, message, args) => {
        const settings = getSettings(message.guild);
        const PREFIX = settings.prefix;
        const embed = new EmbedBuilder()
            .setColor(EMBED_COLORS.DEFAULT)
            .setAuthor({ name: `${message.guild.members.me.displayName} Help Command!`, iconURL: message.guild.iconURL({ dynamic: true })})
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }));

        if(!args[0]) {
            const categories = readdirSync("./src/commands")

            embed.setDescription(`The bot prefix is: **${PREFIX}**`)
            embed.setFooter({ text: `© ${message.guild.members.me.displayName} | Total Commands: ${client.commands.size}`, iconURL: client.user.displayAvatarURL({ dynamic: true })});

            categories.forEach(category => {
                const dir = client.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addFields({ name: `❯ ${capitalise} [${dir.size}]:`, value: dir.map(c => `\`${c.config.name}\``).join(" "), inline: false })
                } catch(e) {
                    client.logger.log(e)
                }
            })

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Support")
                    .setURL(config.LINKS.SUPPORT_SERVER)
                    .setEmoji("🎫")
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setLabel("Invite")   
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${config.BOT_ID}&permissions=8&scope=bot%20applications.commands`)
                    .setEmoji('🔗')
                    .setStyle(ButtonStyle.Link)
                    )

                return message.channel.send({ embeds: [embed], components: [row] });
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send({ embeds: [embed.setTitle("Invalid Command.").setDescription(`Do \`${PREFIX}help\` for the list of the commands.`)] })
            command = command.config

            return message.reply({ embeds: [
                new EmbedBuilder()
                .setColor(EMBED_COLORS.DEFAULT)
                .setDescription(stripIndents`The client's prefix is: \`${PREFIX}\`\n
                
                **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
                **Description:** ${command.description || "No Description provided."}
                **Usage:** ${command.usage ? `\`${PREFIX}${command.name} ${command.usage}\`` : "No Usage"}
                **Accessible by:** ${command.accessableby || "Members"}
                **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)
            
            ] })
        }
    }
}

