const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("../../../settings/config");

module.exports = {
    config: {
        name: "skipto",
        aliases: ["st"],
        description: "Skip to a song in the queue.",
        accessableby: "Member",
        category: "music",
    },
/**
 * @param {import('discord.js').Message} message - the message object that triggered the command
 */
  run: async (client, message, args) => {
        const msg = await message.channel.send("⏳ **Processing.....**");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`❌ **| There is nothing in the queue right now!**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("❌ **| You need to be in a same/voice channel.**")

        if (isNaN(args[0])) {
            const embed = new EmbedBuilder()
                .setColor(EMBED_COLORS.DEFAULT)
                .setDescription(`**Please enter a valid number!**`);

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        await client.distube.jump(message, parseInt(args[0]))
            .then(queue => {
                const embed = new EmbedBuilder()
                    .setColor(EMBED_COLORS.DEFAULT)
                    .setDescription(`⏭ **| Skipto:** ${args[0]}`)

                msg.edit({ content: ' ', embeds: [embed] });
            });
    }
}


