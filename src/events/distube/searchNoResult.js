const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("../../../settings/config");

module.exports = async (client, query, queue) => {
    const embed = new EmbedBuilder()
        .setColor(EMBED_COLORS.ERROR)
        .setDescription(`❌ **| No result found for** ${query}**!**`)

    queue.textChannel.send({ embeds: [embed] })
}

