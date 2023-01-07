const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("../../../settings/config");

module.exports = async (client, message, result, query) => {
    const i = 0
    const embed = new EmbedBuilder()
        .setColor(EMBED_COLORS.DEFAULT)
        .setTitle(`Song Selection...`)
        .setDescription(`${result.map(song => `**(${++i}.) [${song.name}](${song.url})** - \`${song.formattedDuration}\``).join("\n")}`)
        .setFooter({ text: `Please select a song in 30 seconds.` });

    message.channel.send({ embeds: [embed] });
}

