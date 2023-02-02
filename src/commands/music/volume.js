const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("../../../settings/config");

module.exports = {
    config: {
        name: "volume",
        aliases: ["vol", "v"],
        description: "Changes the volume of the music playing.",
        accessableby: "Member",
        category: "music",
    },
/**
 * @param {import('discord.js').Message} message - the message object that triggered the command
 */
  run: async (client, message, args) => {
        const msg = await message.channel.send("⏳ **Processing.....**");

        const queue = client.distube.getQueue(message);
        if (!queue) return msg.edit(`❌ **| There is nothing in the queue right now!**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("❌ **| You need to be in a same/voice channel.**")

        const volume = parseInt(args[0]);

        if (!volume) {
            const embed = new EmbedBuilder()
                .setColor(EMBED_COLORS.DEFAULT)
                .setDescription(`Current **volume** : \`${queue.volume}\`%`)

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        if (isNaN(volume)) {
            const embed = new EmbedBuilder()
                .setColor(EMBED_COLORS.DEFAULT)
                .setDescription(`**Please enter a valid number**`);

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        if (Number(volume) < 1 || Number(volume) > 100) return msg.edit(`**Please provide a number between 1 and 100**`)

        client.distube.setVolume(message, volume);

        const embed = new EmbedBuilder()
            .setColor(EMBED_COLORS.DEFAULT)
            .setDescription(`🔊 | **Change volume to:** \`${args[0]}\`%`)

        msg.edit({ content: ' ', embeds: [embed] });

    }
}


