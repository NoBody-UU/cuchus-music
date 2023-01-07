const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("../../../settings/config");

module.exports = async (client, queue, playlist) => {
    const embed = new EmbedBuilder()
        .setDescription(`**Queued • [${playlist.name}](${playlist.url})** \`${queue.formattedDuration}\` (${playlist.songs.length} tracks) • ${playlist.user}`)
        .setColor(EMBED_COLORS.DEFAULT)
  
      queue.textChannel.send({ embeds: [embed] })
}

