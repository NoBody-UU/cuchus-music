const { EmbedBuilder } = require('discord.js');
const delay = require('delay');
const { EMBED_COLORS } = require('../../../settings/config');
const { getSettings } = require('../../Database/schemas/Guild');

module.exports = {
    config: {
        name: "filter",
        description: "Change the filter if you want!",
        category: "filters",
        accessableby: "Member",
        aliases: []
    },
/**
 * @param {import('discord.js').Message} message - the message object that triggered the command
 */
  run: async (client, message, args) => {
        const settings = getSettings(message.guild);
        const PREFIX = settings.prefix;
        const msg = await message.channel.send("⏳ **Processing.....**")
        
        const queue = client.distube.getQueue(message);
        if (!queue) return msg.edit(`❌ **| There is nothing in the queue right now!**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("❌ **| You need to be in a same/voice channel.**")

        const filter = args[0];

        if (filter === "off" && queue.filters.size) queue.filters.clear();
        else if (Object.keys(client.distube.filters).includes(filter)) {
            if (queue.filters.has(filter)) queue.filters.remove(filter)
            else queue.filters.add(filter)
        } else if (args[0]) msg.edit(`Invalid filter!`)

        const embed = new EmbedBuilder()
            .setAuthor({ name: `Currently Filter`, iconURL: `https://cdn.discordapp.com/emojis/741605543046807626.gif`})
            .setDescription(`\🎲 **Filter:** \`${queue.filters.names.join(", ") || "Normal"}\``)
            .setFooter({ text: `🔩 **Example:** \`${PREFIX}filter 3d\``})
            .setTimestamp()
            .setColor(EMBED_COLORS.DEFAULT);

        await delay(3000)
        msg.edit({ content: ' ', embeds: [embed] })
    } 
}; // testing version

