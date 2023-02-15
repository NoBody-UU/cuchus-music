const { EmbedBuilder } = require("discord.js");

module.exports = async (client, guild) => {
  if (!guild.available) return;
  client.logger.log(`Guild Left: ${guild.name} Members: ${guild.memberCount}`);

  if (!client.joinLeaveWebhook) return;

  let ownerTag;
  const ownerId = guild.ownerId || settings.data.owner;
  try {
    const owner = await client.users.fetch(ownerId);
    ownerTag = owner.tag;
  } catch (err) {
    ownerTag = "Deleted User";
  }

  const embed = new EmbedBuilder()
    .setTitle("Guild Left")
    .setThumbnail(guild.iconURL())
    .setColor(client.config.EMBED_COLORS.ERROR)
    .addFields(
      {
        name: "Guild Name",
        value: guild.name || "NA",
        inline: false,
      },
      {
        name: "ID",
        value: `\`${guild.id}\``,
        inline: false,
      },
      {
        name: "Owner",
        value: `${ownerTag} [\`${ownerId}\`]`,
        inline: false,
      },
      {
        name: "Members",
        value: `\`\`\`yaml\n${guild.memberCount}\`\`\``,
        inline: false,
      }
    )
    .setFooter({ text: `Guild #${client.guilds.cache.size}` });

  client.joinLeaveWebhook.send({
    username: "Server | Leave",
    avatarURL: client.user.displayAvatarURL(),
    embeds: [embed],
  });
};
