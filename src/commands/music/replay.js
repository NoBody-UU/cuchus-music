const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("../../../settings/config");

module.exports = {
    config: {
        name: "replay",
        aliases: [],
        description: "Replays the current song.",
        accessableby: "Member",
        category: "music",
    },
/**
 * @param {import('discord.js').Message} message - the message object that triggered the command
 */
  run: async (client, message, args) => {
        const msg = await message.channel.send("⏳ **Processing.....**");

        const queue = client.distube.getQueue(message);
        if (!queue) return msg.edit(`❌ |There is nothing in the queue right now!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("❌ **| You need to be in a same/voice channel.**")

        await queue.seek(0)

        const embed = new EmbedBuilder()
            .setColor(EMBED_COLORS.DEFAULT)
            .setDescription("🔁 **| Song has been:** `Replay`")

        msg.edit({ content: ' ', embeds: [embed] });
        
    }
}


