const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("../../../settings/config");

module.exports = {
    config: {
        name: "previous",
        aliases: ["prev"],
        description: "Plays the previous song in the queue.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`❌ **| There is nothing in the queue right now!**`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("❌ **| You need to be in voice channel.")

        if (queue.previousSongs.length == 0) {
            const embed = new EmbedBuilder()
                .setColor(EMBED_COLORS.DEFAULT)
                .setDescription("🚨 | **There are no** `Previous` **songs**")

            msg.edit({ content: ' ', embeds: [embed] });
        } else {
            client.distube.previous(message)

            const embed = new EmbedBuilder()
                .setColor(EMBED_COLORS.DEFAULT)
                .setDescription("⏮ | **Song has been:** `Previous`")

            msg.edit({ content: ' ', embeds: [embed] });
        }
    }
}