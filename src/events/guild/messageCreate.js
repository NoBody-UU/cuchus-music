const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { link } = require("fs");
const config = require("../../../settings/config");
const { EMBED_COLORS, LINKS } = require("../../../settings/config");

module.exports = async (client, message) => { 
    if(message.author.bot || message.channel.type === "dm") return;
    const PREFIX = config.PREFIX;

    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(mention)) {
      const embed = new EmbedBuilder()
        .setColor(EMBED_COLORS.DEFAULT)
        .setTitle(`Hi! I'm ${message.guild.members.me.displayName}`)
        .setDescription(`__**MY PREFIX:**__ \`${PREFIX}\``)
        .setFooter({ text: `© ${message.guild.members.me.displayName} | By: NoBody#9666`, iconURL: client.user.displayAvatarURL({ dynamic: true })})
        .setThumbnail(client.user.displayAvatarURL());

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
                    .setStyle(ButtonStyle.Link)    
                    )
                    
                
      message.channel.send({ embeds: [embed], components: [row] });
    };
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [ matchedPrefix ] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(!command) return;
    
    if(!message.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return await message.author.dmChannel.send({ content: `❌ | I don't have perm  **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute command!` }).catch(() => {});
    if(!message.guild.members.me.permissions.has(PermissionsBitField.Flags.EmbedLinks)) return await message.channel.send({ content: `❌ | I don't have perm **\`EMBED_LINKS\`** to execute command!` }).catch(() => {});
    
    client.logger.log(`[COMMAND: ${command.config.name}] Executed by ${message.author.tag}`);   

    try {
        command.run(client, message, args);
    } catch (error) {
        client.logger.error(error);
        const embed = new EmbedBuilder()
            .setColor(EMBED_COLORS.ERROR)
            .setDescription("❌ **| There was an error executing that command.**");

        return message.channel.send({ embeds: [embed] });
    }
}

