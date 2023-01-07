const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("../../../settings/config");

module.exports = async (client, queue, song) => {
    let embed = new EmbedBuilder()
    .setDescription(`**ADDED • [${song.name}](${song.url})** \`${song.formattedDuration}\` • ${song.user}`)
    .setColor(EMBED_COLORS.DEFAULT)

    queue.textChannel.send({ content: ' ', embeds: [embed] })
}

