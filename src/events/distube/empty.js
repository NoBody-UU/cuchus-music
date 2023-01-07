const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("../../../settings/config");

module.exports = async (client, queue) => {
    const embed = new EmbedBuilder()
    .setColor(EMBED_COLORS.DEFAULT)
    .setDescription(`❌ **| Empty channel!**`)

    queue.textChannel.send({ embeds: [embed] })
}

