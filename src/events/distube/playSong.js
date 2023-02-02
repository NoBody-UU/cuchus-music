const { EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require("discord.js");
const { EMBED_COLORS } = require("../../../settings/config");
const buttons =require("../../../settings/buttons")

module.exports = async (client, queue, track) => {
  var newQueue = client.distube.getQueue(queue.id)
  var data = disspace(newQueue, track)

  const nowplay = await queue.textChannel.send(data)

  const filter = (message) => {
    if (message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId === message.member.voice.channelId) return true;
    else {
      message.reply({ content: "You need to be in a same/voice channel.", ephemeral: true });
    }
  };
  const collector = nowplay.createMessageComponentCollector({ filter, time: 240000 });

  collector.on('collect', async (message) => {
    const id = message.customId;
    const queue = client.distube.getQueue(message.guild.id);
    if (id === "pause") {
      if (!queue) {
        collector.stop();
      }
      if (queue.paused) {
        await client.distube.resume(message.guild.id);
        const embed = new EmbedBuilder()
          .setColor(EMBED_COLORS.DEFAULT)
          .setDescription(`\`⏯\` | **Song has been:** \`Resumed\``);

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        await client.distube.pause(message.guild.id);
        const embed = new EmbedBuilder()
          .setColor(EMBED_COLORS.DEFAULT)
          .setDescription(`\`⏯\` | **Song has been:** \`Paused\``);

        message.reply({ embeds: [embed], ephemeral: true });
      }
    } else if (id === "skip") {
      if (!queue) {
        collector.stop();
      }
      if (queue.songs.length === 1 && queue.autoplay === false) {
        const embed = new EmbedBuilder()
          .setColor(EMBED_COLORS.DEFAULT)
          .setDescription("\`🚨\` | **There are no** `Songs` **in queue**")

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        await client.distube.skip(message)
            const embed = new EmbedBuilder()
              .setColor(EMBED_COLORS.DEFAULT)
              .setDescription("\`⏭\` | **Song has been:** `Skipped`")

            nowplay.edit({ components: [] });
            message.reply({ embeds: [embed], ephemeral: true });
      }
    } else if (id === "stop") {
      if (!queue) {
        collector.stop();
      }

      await client.distube.stop(message.guild.id);

      const embed = new EmbedBuilder()
        .setDescription(`\`🚫\` | **Song has been:** | \`Stopped\``)
        .setColor(EMBED_COLORS.DEFAULT);

      await nowplay.edit({ components: [] });
      message.reply({ embeds: [embed], ephemeral: true });
    } else if (id === "loop") {
      if (!queue) {
        collector.stop();
      }
      if (queue.repeatMode === 0) {
        client.distube.setRepeatMode(message.guild.id, 1);
        const embed = new EmbedBuilder()
          .setColor(EMBED_COLORS.DEFAULT)
          .setDescription(`\`🔁\` | **Song is loop:** \`Current\``)

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        client.distube.setRepeatMode(message.guild.id, 0);
        const embed = new EmbedBuilder()
          .setColor(EMBED_COLORS.DEFAULT)
          .setDescription(`\`🔁\` | **Song is unloop:** \`Current\``)

        message.reply({ embeds: [embed], ephemeral: true });
      }
    } else if (id === "previous") {
      if (!queue) {
        collector.stop();
      }
      if (queue.previousSongs.length == 0) {
        const embed = new EmbedBuilder()
          .setColor(EMBED_COLORS.DEFAULT)
          .setDescription("\`🚨\` | **There are no** `Previous` **songs**")

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        await client.distube.previous(message)
        const embed = new EmbedBuilder()
          .setColor(EMBED_COLORS.DEFAULT)
          .setDescription("\`⏮\` | **Song has been:** `Previous`")

        nowplay.edit({ components: [] });
        message.reply({ embeds: [embed], ephemeral: true });
      }
    }
  });
  collector.on('end', async (collected, reason) => {
    if (reason === "time") {
      nowplay.edit({ components: [] });
    }
  });
}

function disspace(nowQueue, nowTrack) {
  const embeded = new EmbedBuilder()
    .setAuthor({ name: `Starting Playing...`, iconURL: 'https://cdn.discordapp.com/emojis/741605543046807626.gif' })
    .setThumbnail(nowTrack.thumbnail)
    .setColor(EMBED_COLORS.DEFAULT)
    .setDescription(`**[${nowTrack.name}](${nowTrack.url})**`)
    .addFields({ name: `Uploader:`, value: `**[${nowTrack.uploader.name}](${nowTrack.uploader.url})**`, inline: true })
    .addFields({ name: `Requester:`, value: `${nowTrack.user}`, inline: true })
    .addFields({ name: `Current Volume:`, value: `${nowQueue.volume}%`, inline: true })
    .addFields({ name: `Filters:`, value: `${nowQueue.filters.names.join(", ") || "Normal"}`, inline: true })
    .addFields({ name: `Autoplay:`, value: `${nowQueue.autoplay ? "Activated" : "Not Active"}`, inline: true })
    .addFields({ name: `Total Duration:`, value: `${nowQueue.formattedDuration}`, inline: true })
    .addFields({ name: `Current Duration: \`[0:00 / ${nowTrack.formattedDuration}]\``, value:`\`\`\`🔴 | 🎶──────────────────────────────\`\`\``, inline: false })
    .setTimestamp()

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("pause")
        .setLabel(buttons.PLAYING.pause.label)
        .setEmoji(buttons.PLAYING.pause.emoji)
        .setStyle(buttons.PLAYING.pause.style)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("previous")
        .setLabel(buttons.PLAYING.previous.label)
        .setEmoji(buttons.PLAYING.previous.emoji)
        .setStyle(buttons.PLAYING.previous.style)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("stop")
        .setLabel(buttons.PLAYING.stop.label)
        .setEmoji(buttons.PLAYING.stop.emoji)
        .setStyle(buttons.PLAYING.stop.style)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("skip")
        .setLabel(buttons.PLAYING.skip.label)
        .setEmoji(buttons.PLAYING.skip.emoji)
        .setStyle(buttons.PLAYING.skip.style)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("loop")
        .setLabel(buttons.PLAYING.loop.label)
        .setEmoji(buttons.PLAYING.loop.emoji)
        .setStyle(buttons.PLAYING.loop.style)
    )
  return {
    embeds: [embeded],
    components: [row]
  }
}