const { EmbedBuilder } = require('discord.js');
const delay = require('delay');
const { EMBED_COLORS } = require('../../../settings/config');

module.exports = {
    config: {
        name: "gate",
        description: "Turning on gate filter",
        category: "filters",
        accessableby: "Member",
        aliases: []
    },
/**
 * @param {import('discord.js').Message} message - the message object that triggered the command
 */
    run: async (client, message) => {
        const msg = await message.channel.send("⏳ **Processing.....**")
        
        const queue = client.distube.getQueue(message);
        if (!queue) return msg.edit(`❌ **| There is nothing in the queue right now!**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("❌ **| You need to be in a same/voice channel.**")

        queue.filters.add("gate")

        const embed = new EmbedBuilder()
            .setAuthor({ name:'Turned on: Gate', iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
            .setColor(EMBED_COLORS.DEFAULT);

        await delay(5000);
        msg.edit({ content: ' ', embeds: [embed] })
    }
}; /// testing version

