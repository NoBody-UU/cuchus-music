const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("../../../settings/config");

module.exports = async (client, queue) => {
    const embed = new EmbedBuilder()
        .setDescription(`🎵 **| Song Ended! **\n` )
        .setColor(EMBED_COLORS.DEFAULT)

    queue.textChannel.send({ embeds: [embed] })
}

